import { debounce } from 'throttle-debounce';

export class BookReader {
  book?: BookRecord;
  epub?: Book;
  iframe?: Window & { $$valtioSnapshot: Window };
  rendition?: Rendition & { manager?: any };
  nav?: Navigation;
  locationToReturn?: Location;
  section?: ISection;
  sections?: ISection[];
  results?: IMatch[];
  activeResultID?: string;
  rendered = false;

  get container() {
    return this?.rendition?.manager?.container as HTMLDivElement | undefined;
  }

  timeline: TimelineItem[] = [];
  get location() {
    return this.timeline[0]?.location;
  }

  get title() {
    return this.book?.name ?? 'dh-app';
  }

  display(target?: string, returnable = true) {
    this.rendition?.display(target);
    if (returnable) this.showPrevLocation();
  }

  displayFromSelector(selector: string, section: ISection, returnable = true) {
    try {
      const el = section.document.querySelector(selector);
      if (el) this.display(section.cfiFromElement(el), returnable);
    } catch (err) {
      this.display(section.href, returnable);
    }
  }

  prev() {
    this.rendition?.prev();
    // avoid content flash
    if (this.container?.scrollLeft === 0 && !this.location?.atStart) {
      this.rendered = false;
    }
  }

  next() {
    this.rendition?.next();
  }

  updateBook(changes: Partial<BookRecord>) {
    if (!this.book) return;

    changes = {
      ...changes,
      updatedAt: Date.now(),
    };
    // don't wait promise resolve to make valtio batch updates
    this.book = { ...this.book, ...changes };
    db?.books.update(this.book.id, changes);
  }

  annotationRange?: Range;
  setAnnotationRange(cfi: string) {
    const range = this.view?.contents.range(cfi);
    if (range) this.annotationRange = ref(range);
  }

  define(def: string[]) {
    if (!this.book) return;
    this.updateBook({ definitions: [...this.book.definitions, ...def] });
  }

  undefine(def: string) {
    if (!this.book) return;
    this.updateBook({
      definitions: this.book.definitions.filter((d) => !compareDefinition(d, def)),
    });
  }

  isDefined(def: string) {
    if (!this.book) return false;
    return this.book.definitions.some((d) => compareDefinition(d, def));
  }

  rangeToCfi(range: Range) {
    return this.view.contents.cfiFromRange(range);
  }

  putAnnotation(
    type: AnnotationType,
    cfi: string,
    color: AnnotationColor,
    text: string,
    notes?: string,
  ) {
    if (!this.book) return;
    const spine = this.section;
    if (!spine?.navitem) return;

    const i = this.book.annotations.findIndex((a) => a.cfi === cfi);
    let annotation = this.book.annotations[i];

    const now = Date.now();
    if (!annotation) {
      annotation = {
        id: uuidv4(),
        bookId: this.book.id,
        cfi,
        spine: {
          index: spine.index,
          title: spine.navitem.label,
        },
        createAt: now,
        updatedAt: now,
        type,
        color,
        notes,
        text,
      };

      this.updateBook({
        // DataCloneError: Failed to execute 'put' on 'IDBObjectStore': #<Object> could not be cloned.
        annotations: [...snapshot(this.book.annotations), annotation],
      });
    } else {
      annotation = {
        ...this.book.annotations[i]!,
        type,
        updatedAt: now,
        color,
        notes,
        text,
      };
      this.book.annotations.splice(i, 1, annotation);
      this.updateBook({
        annotations: [...snapshot(this.book.annotations)],
      });
    }
  }

  removeAnnotation(cfi: string) {
    if (!this.book) return;
    return this.updateBook({
      annotations: snapshot(this.book.annotations).filter((a) => a.cfi !== cfi),
    });
  }

  keyword = '';
  setKeyword(keyword: string) {
    if (this.keyword === keyword) return;
    this.keyword = keyword;
    this.onKeywordChange();
  }

  // only use throttle/debounce for side effects
  // @debounce(1000)
  // async onKeywordChange() {
  //   this.results = await this.search();
  // }

  private onKeywordChange = debounce(1000, async () => {
    this.results = await this.search();
  });

  get totalLength() {
    return this.sections?.reduce((acc, s) => acc + s.length, 0) ?? 0;
  }

  toggle(id: string) {
    const item = find(this.nav?.toc, id) as INavItem;
    if (item) item.expanded = !item.expanded;
  }

  toggleResult(id: string) {
    const item = find(this.results, id);
    if (item) item.expanded = !item.expanded;
  }

  showPrevLocation() {
    this.locationToReturn = this.location;
  }

  hidePrevLocation() {
    this.locationToReturn = undefined;
  }

  mapSectionToNavItem(sectionHref: string) {
    let navItem: NavItem | undefined;
    this.nav?.toc.forEach((item) =>
      dfs(item as NavItem, (i) => {
        if (compareHref(sectionHref, i.href)) navItem ??= i;
      }),
    );
    return navItem;
  }

  get currentHref() {
    return this.location?.start.href;
  }

  get currentNavItem() {
    return this.section?.navitem;
  }

  get view() {
    return this.rendition?.manager?.views._views[0];
  }

  getNavPath(navItem = this.currentNavItem) {
    const path: INavItem[] = [];

    if (this.nav) {
      while (navItem) {
        path.unshift(navItem);
        const parentId = navItem.parent;
        if (!parentId) {
          navItem = undefined;
        } else {
          const index = this.nav.tocById[parentId]!;
          navItem = this.nav.getByIndex(parentId, index, this.nav.toc);
        }
      }
    }

    return path;
  }

  searchInSection(keyword = this.keyword, section = this.section) {
    if (!section) return;

    const subitems = section.find(keyword) as unknown as IMatch[];
    if (!subitems.length) return;

    const navItem = section.navitem;
    if (navItem) {
      const path = this.getNavPath(navItem);
      path.pop();
      return {
        id: navItem.href,
        excerpt: navItem.label,
        description: path.map((i) => i.label).join(' / '),
        subitems: subitems.map((i) => ({ ...i, id: i.cfi! })),
        expanded: true,
      };
    }
  }

  search(keyword = this.keyword) {
    // avoid blocking input
    return new Promise<IMatch[] | undefined>((resolve) => {
      requestIdleCallback(() => {
        if (!keyword) {
          resolve(undefined);
          return;
        }

        const results: IMatch[] = [];

        this.sections?.forEach((s) => {
          const result = this.searchInSection(keyword, s);
          if (result) results.push(result);
        });

        resolve(results);
      });
    });
  }

  private _el?: HTMLDivElement;
  onRender?: () => void;

  async openBook(book: BookRecord) {
    this.book = book;
    this.rendered = false;
    this.timeline = [];
    this.results = undefined;
    this.keyword = '';

    if (this._el) {
      await this.render(this._el);
    }
  }

  async render(el: HTMLDivElement) {
    if (!this.book) return;
    if (el === this._el) return;
    this._el = ref(el);

    const file = await db?.files.get(this.book.id);
    if (!file) return;

    this.epub = ref(await fileToEpub(file.file));

    this.epub.loaded.navigation.then((nav) => {
      this.nav = nav;
    });

    console.log(this.epub);

    this.epub.loaded.spine.then((spine: any) => {
      const sections = spine.spineItems as ISection[];
      // https://github.com/futurepress/epub.js/issues/887#issuecomment-700736486
      const promises = sections.map((s) => s.load(this.epub?.load.bind(this.epub)));

      Promise.all(promises).then(() => {
        sections.forEach((s) => {
          s.length = s.document.body.textContent?.length ?? 0;
          s.images = [...s.document.querySelectorAll('img')].map((el) => el.src);
          this.epub!.loaded.navigation.then(() => {
            s.navitem = this.mapSectionToNavItem(s.href);
          });
        });
        this.sections = ref(sections);
      });
    });

    this.rendition = ref(
      this.epub.renderTo(el, {
        width: '100%',
        height: '100%',
        allowScriptedContent: true,
      }),
    );

    console.log(this.rendition);

    this.rendition.display(this.location?.start.cfi ?? this.book.cfi ?? undefined);

    this.rendition.themes.default(defaultStyle);

    this.rendition.hooks.render.register((view: any) => {
      console.log('hooks.render', view);
      this.onRender?.();
    });

    this.rendition.on('relocated', (loc: Location) => {
      console.log('relocated', loc);
      this.rendered = true;
      this.timeline.unshift({
        location: loc,
        timestamp: Date.now(),
      });

      // calculate percentage
      if (this.sections) {
        const start = loc.start;
        const i = this.sections.findIndex((s) => s.href === start.href);
        const previousSectionsLength = this.sections
          .slice(0, i)
          .reduce((acc, s) => acc + s.length, 0);
        const previousSectionsPercentage = previousSectionsLength / this.totalLength;
        const currentSectionPercentage = this.sections[i]!.length / this.totalLength;
        const displayedPercentage = start.displayed.page / start.displayed.total;

        const percentage =
          previousSectionsPercentage + currentSectionPercentage * displayedPercentage;

        this.updateBook({ cfi: start.cfi, percentage });
      }
    });

    this.rendition.on('attached', (...args: any[]) => {
      console.log('attached', args);
    });
    this.rendition.on('started', (...args: any[]) => {
      console.log('started', args);
    });
    this.rendition.on('displayed', (...args: any[]) => {
      console.log('displayed', args);
    });
    this.rendition.on('rendered', (section: ISection, view: any) => {
      console.log('rendered', [section, view]);
      this.section = ref(section);
      this.iframe = ref(view.window as Window);
    });
    this.rendition.on('selected', (...args: any[]) => {
      console.log('selected', args);
    });
    this.rendition.on('removed', (...args: any[]) => {
      console.log('removed', args);
    });
  }

  clear() {
    this.book = undefined;
    this.epub = undefined;
    this.rendition = undefined;
    this.nav = undefined;
    this.rendered = false;
    this.timeline = [];
  }

  resize() {
    try {
      this.rendition?.resize();
    } catch (error) {
      console.error(error);
    }
  }
}