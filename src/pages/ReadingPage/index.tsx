import Header from "@/components/Header";
import BookmarkIcon from "@/components/icons/bookmark";
import BottomSheet from "@/components/modals/BottomSheet";
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { useSafeAreaBottom } from "@/components/App";
import SettingsView from "@/views/readingPage/Settings";
import FragmentsView from "@/views/readingPage/Fragments";
import SearchingView from "@/views/readingPage/Searching";
import ReadingView from "@/views/readingPage/ReadingView";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Page } from "@/components/Page";
import SettingsIcon from "@/components/icons/Settings";
import ChaptersIcon from "@/components/icons/Chapters";
import FragmentsIcon from "@/components/icons/Fragments";
import BookSearchingIcon from "@/components/icons/BookSearching";
// import MyReader from "@/components/epubReader/MyReader";
// import OnlyEpubReader from "@/components/epubReader/onlyEpubReader";
import NewReader from "@/components/epubReader/NewReader";
// import NewReader from "@/components/epubReader/NewReader";
// import EpubReader from "@/components/epubReader";
// import SearchIcon from "@/components/icons/BookSearching";
// import { BookReader } from "@/components/epubReader";

interface ITab {
  id: string;
  Icon(props: { isActive: boolean }): React.ReactElement;
}

const settings: Array<ITab> = [
  {
    id: "reading",
    Icon: (props: { isActive: boolean }) => (
      <ChaptersIcon active={props.isActive} />
    ),
  },
  {
    id: "settings",
    Icon: (props: { isActive: boolean }) => (
      <SettingsIcon active={props.isActive} />
    ),
  },
  {
    id: "fragments",
    Icon: (props: { isActive: boolean }) => (
      <FragmentsIcon active={props.isActive} />
    ),
  },
  {
    id: "searching",
    Icon: (props: { isActive: boolean }) => (
      <BookSearchingIcon active={props.isActive} />
    ),
  },
];

const ReadingPage = () => {
  const [showToolbar, setShowToolbar] = useState<boolean>(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { safeAreaBottom } = useSafeAreaBottom();
  const [activeSegment, setActiveSegment] = useState<string | null>(null);

  const handleToolbar = (e: any) => {
    e.stopPropagation();
    setIsBottomSheetOpen(true);
  };

  useEffect(() => {
    WebApp.expand();
    WebApp.enableVerticalSwipes();
    WebApp.setHeaderColor("#ffffff");

    const handleClick = () => {
      // faqat scroll bo'lmaganda toolbar chiqsin
      // return;
      if (!isScrolling) {
        setShowToolbar((prev) => !prev);
      }
    };

    let isScrolling = false;
    let scrollTimeout: any;

    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);

      // 200ms ichida scroll to‘xtasa, yana click ishlaydi
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 200);
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Page>
      <div
        className="flex flex-col h-screen bg-globe"
        style={{ paddingBottom: safeAreaBottom }}
      >
        <Header imageClassName="pb-5">
          <div className="flex items-center justify-between px-3 pb-3">
            <p className="text-sm leading-3 font-normal">12 / 2465</p>
            <BookmarkIcon />
          </div>
        </Header>

        {/* <MyReader /> */}
        {/* <OnlyEpubReader /> */}

          <NewReader setShowToolbar={setShowToolbar} />
        <div className="px-3 p-4 overflow-y-auto space-y-5">

          {/* Toolbar */}
          <div
            onClick={handleToolbar} // Click propagation to‘xtadi
            className={`flex items-center justify-around fixed left-0 right-0 bottom-0 bg-white text-white h-[70px] transition-transform rounded-[40px] duration-300 z-100 mb-0 mx-5 border border-borderColor shadow-[0_8px_16px_0_#29292947] ${
              showToolbar ? "translate-y-0" : "translate-y-full"
            }`}
            style={{
              bottom: showToolbar ? safeAreaBottom + 20 : 0,
            }}
          >
            {/* <div className="flex justify-around"> */}
            {settings.map(({ id, Icon }) => (
              <div
                key={id}
                className="flex-1 flex items-center justify-center cursor-pointer"
                onClick={() => setActiveSegment(id)}
              >
                <motion.div
                  whileTap={{ scale: 0.9 }} // bosilganda kichrayadi
                  whileHover={{ scale: 1.05 }} // hoverda kattalashadi
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="flex items-center justify-center"
                >
                  <Icon isActive={activeSegment === id} />
                </motion.div>
              </div>
            ))}
            {/* <div
              className="flex-1 flex items-center justify-center cursor-pointer"
              onClick={() => setActiveSegment("reading")}
            >
              <motion.div
                whileTap={{ scale: 0.9 }} // bosilganda kichrayadi
                whileHover={{ scale: 1.05 }} // hoverda kattalashadi
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="flex items-center justify-center"
              >
                <ChaptersIcon active={activeSegment === "reading"} />
              </motion.div>
            </div>
            <div
              className="flex-1 flex items-center justify-center cursor-pointer"
              onClick={() => setActiveSegment("settings")}
            >
              <SettingsIcon active={activeSegment === "settings"} />
            </div>
            <div
              className="flex-1 flex items-center justify-center cursor-pointer"
              onClick={() => setActiveSegment("fragments")}
            >
              <FragmentsIcon active={activeSegment === "fragments"} />
            </div>
            <div
              className="flex-1 flex items-center justify-center cursor-pointer"
              onClick={() => setActiveSegment("searching")}
            >
              <BookSearchingIcon
                active={activeSegment === "searching"}
                size={36}
              />
            </div> */}
            {/* </div> */}
          </div>

          <BottomSheet
            className={clsx(
              "flex flex-col max-h-3/4 overflow-y-auto px-5 pb-26 z-101",
              activeSegment === "searching" && "h-full"
            )}
            style={{ paddingBottom: safeAreaBottom + 100 }}
            backdropClassName="!bg-black/0"
            isOpen={isBottomSheetOpen}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            onClose={() => {setIsBottomSheetOpen(false), setActiveSegment(null)}}
          >
            {activeSegment === "reading" && <ReadingView />}
            {activeSegment === "settings" && <SettingsView />}
            {activeSegment === "fragments" && <FragmentsView />}
            {activeSegment === "searching" && <SearchingView />}
          </BottomSheet>
        </div>
      </div>
      <div
        style={{
          height: safeAreaBottom,
          backgroundColor: "#000", // safe area fon rangi
        }}
        className="fixed left-0 right-0 bottom-0"
      />
    </Page>
  );
};

export default ReadingPage;
