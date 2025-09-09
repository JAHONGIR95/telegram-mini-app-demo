import Header from "@/components/Header";
import BookmarkIcon from "@/components/icons/bookmark";
import BottomSheet from "@/components/modals/BottomSheet";
import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { useSafeAreaBottom } from "@/components/App";
import { readingPassage } from "@/utils/constantValues";
import SettingsView from "@/views/readingPage/Settings";
import FragmentsView from "@/views/readingPage/Fragments";
import SearchingView from "@/views/readingPage/Searching";
import ReadingView from "@/views/readingPage/ReadingView";
import clsx from "clsx";

const ReadingPage = () => {
  const [showToolbar, setShowToolbar] = useState(false);
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
    <div className="flex flex-col h-screen bg-globe">
      <Header imageClassName="pb-5">
        <div className="flex items-center justify-between px-3 pb-3">
          <p className="text-sm leading-3 font-normal">12 / 2465</p>
          <BookmarkIcon />
        </div>
      </Header>

      <div className="px-3 p-4 overflow-y-auto space-y-5">
        <p className="text-base leading-5 font-medium text-justify tracking-wider font-lato text-primaryColor">
         {readingPassage}
        </p>

        {/* Toolbar */}
        <div
          onClick={handleToolbar} // Click propagation to‘xtadi
          className={`flex items-center justify-around fixed left-0 right-0 bottom-0 bg-white text-white h-[70px] transition-transform rounded-[40px] duration-300 z-100 mb-0 mx-5 border border-borderColor shadow-[0_8px_16px_0_#29292947] ${
            showToolbar ? "translate-y-0" : "translate-y-full"
          }`}
          style={{
            bottom: showToolbar ? safeAreaBottom : 20,
          }}
        >
          {/* <div className="flex justify-around"> */}
          <button className="px-4 py-2 bg-gray-700 rounded" onClick={() => setActiveSegment('reading')}>RE</button>
          <button className="px-4 py-2 bg-gray-700 rounded" onClick={() => setActiveSegment('settings')}>St</button>
          <button className="px-4 py-2 bg-gray-700 rounded" onClick={() => setActiveSegment('fragments')}>Fr</button>
          <button className="px-4 py-2 bg-gray-700 rounded" onClick={() => setActiveSegment('searching')}>Se</button>
          {/* </div> */}
        </div>

        <BottomSheet
          className={clsx("flex flex-col max-h-3/4 overflow-y-auto px-5 pb-26", activeSegment === 'searching' && 'h-full')}
          backdropClassName="!bg-black/0"
          isOpen={isBottomSheetOpen}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          onClose={() => setIsBottomSheetOpen(false)}
        >
          {activeSegment === 'reading' && <ReadingView />}
          {activeSegment === 'settings' && <SettingsView />}
          {activeSegment === 'fragments' && <FragmentsView />}
          {activeSegment === 'searching' && <SearchingView />}

        </BottomSheet>
      </div>
    </div>
  );
};

export default ReadingPage;
