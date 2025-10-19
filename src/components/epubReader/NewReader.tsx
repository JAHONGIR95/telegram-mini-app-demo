import { useReaderSettingsStore } from "@/store/useReaderSettingStore";
import { useEffect, useRef, useState } from "react";
import { IReactReaderStyle, ReactReader, ReactReaderStyle } from "react-reader";
import type { Rendition } from "epubjs"; // 👉 type import

interface Highlight {
  cfiRange: string;
  text?: string;
}

export interface TocItem {
  id?: string;
  href?: string;
  label?: string;
  subitems?: TocItem[];
}

interface NewReaderProps {
  setShowToolbar: (prev: React.SetStateAction<boolean>) => void;
}
const NewReader: React.FC<NewReaderProps> = ({ setShowToolbar }) => {
  const { fontSize } = useReaderSettingsStore();
  const [selections, setSelections] = useState<Highlight[]>([]);
  // const [page, setPage] = useState("");
  const [showToc, setShowToc] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [firstRenderDone, setFirstRenderDone] = useState(false);
  const tocRef = useRef<TocItem[] | null>(null);
  const renditionRef = useRef<Rendition | null>(null);
  const locationChanged = (epubcifi: any) => {
    if (renditionRef.current && tocRef.current) {
      // const { displayed, href } = renditionRef.current.location.start;
      // const chapter = tocRef.current.find(
      //   (item) => item.href?.split("#")?.[0] === href
      // );
      // console.log(tocRef.current, chapter, href);
      // setPage(
      //   `Page ${displayed.page} of ${displayed.total} in chapter ${
      //     chapter ? chapter.label : "n/a"
      //   }`
      // );
    }
    if (!firstRenderDone) {
      setLocation(localStorage.getItem("book-progress"));
      setFirstRenderDone(true);
      return;
    }

    localStorage.setItem("book-progress", epubcifi);

    setLocation(epubcifi);
  };

  const handleChapterClick = async (item: TocItem) => {
    if (renditionRef.current && item.href) {
      try {
        await renditionRef.current.display(item.href);
        setLocation(item.href);
        localStorage.setItem("book-progress", item.href);
        setShowToc(false);
      } catch (error) {
        console.error("Chapter o'tishda xato:", error);
      }
    } else {
      console.warn("Rendition yoki href mavjud emas");
    }
  };
  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${fontSize}px`);
      renditionRef.current.themes.font("arial");
    }
  }, [fontSize]);

  useEffect(() => {
    if (renditionRef.current) {
      function setRenderSelection(cfiRange: string, contents: any): void {
        setSelections(
          selections.concat({
            text: renditionRef.current?.getRange(cfiRange).toString(),
            cfiRange,
          })
        );

        localStorage.setItem(
          "highlights",
          JSON.stringify(
            selections.concat({
              text: renditionRef.current?.getRange(cfiRange).toString(),
              cfiRange,
            })
          )
        );

        renditionRef.current?.annotations.add(
          "highlight",
          cfiRange,
          {},
          undefined,
          "hl",
          { fill: "green", "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
        );
        contents.window.getSelection().removeAllRanges();
      }
      renditionRef.current.on("selected", setRenderSelection);
      return () => {
        renditionRef.current?.off("selected", setRenderSelection);
      };
    }
  }, [setSelections, selections]);

  const ownStyles: IReactReaderStyle = {
    ...ReactReaderStyle,
    reader: {
      ...ReactReaderStyle.reader,
      background: "#F8F4ED", // tashqi container foni
      position: "sticky",
      inset: 0,
      width: "100%",
      height: "100vh",
      padding: 0,
      margin: 0,
      boxSizing: "border-box",
    },
    container: {
      ...ReactReaderStyle.container,
      width: "100%",
      height: "100%",
      padding: 0,
      margin: 0,
    },
    arrow: {
      display: "none",
    },
  };

  useEffect(() => {
    if (!renditionRef.current) return;

    renditionRef.current.on("rendered", () => {
      const iframe = document.querySelector("iframe");
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.document.addEventListener("click", () => {
          setShowToolbar((prev) => !prev);
        });
      }
    });
  }, [renditionRef.current]);

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          margin: 0,
          padding: 0,
          overflowY: "auto",
        }}
      >
        <ReactReader
          readerStyles={ownStyles}
          location={location}
          locationChanged={locationChanged}
          url="https://react-reader.metabits.no/files/alice.epub"
          getRendition={(rendition) => {
            renditionRef.current = rendition;
            renditionRef.current.themes.default({
              "::selection": {
                background: "orange",
              },
            });

            const highlights = JSON.parse(
              localStorage.getItem("highlights") || "[]"
            );

            highlights.forEach((highlight: Highlight) => {
              renditionRef.current?.annotations.add(
                "highlight",
                highlight.cfiRange,
                {},
                undefined,
                "hl",
                {
                  fill: "green",
                  "fill-opacity": "0.5",
                  "mix-blend-mode": "multiply",
                }
              );
            });
            setSelections(highlights);
            renditionRef.current.themes.register("custom", {
              "*": {
                color: "#000",
                background: "#F8F4ED !important",
              },
              "body.x-ebookmaker": {
                padding: "16px !important",
                margin: "0 !important",
              },
            });
            renditionRef.current.themes.select("custom");
          }}
          tocChanged={(toc: TocItem[]) => (tocRef.current = toc)}
          showToc={false}
          epubOptions={{
            flow: "scrolled",
            manager: "continuous",
            allowPopups: true, // Adds `allow-popups` to sandbox-attribute
            allowScriptedContent: true, // Adds `allow-scripts` to sandbox-attribute
          }}
        />

        <button
          onClick={() => setShowToc(!showToc)}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 10,
            padding: "8px 12px",
            background: "#333",
            color: "#fff",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          ☰ Chapters
        </button>

        {showToc && (
          <div
            style={{
              position: "absolute",
              top: "3.5rem",
              right: "1rem",
              zIndex: 10,
              width: "250px",
              maxHeight: "60vh",
              overflowY: "auto",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            <ul style={{ listStyle: "none", padding: "0.5rem", margin: 0 }}>
              {tocRef.current?.map((item) => (
                <li
                  key={item.href}
                  onClick={() => {
                    handleChapterClick(item);
                  }}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#eee")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
  // return null
};

export default NewReader;
