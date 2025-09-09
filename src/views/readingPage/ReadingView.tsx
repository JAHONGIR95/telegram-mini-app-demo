import Button from "@/components/buttons/Button";
import { bookmarks, chapters } from "@/utils/constantValues";
import clsx from "clsx";
import { useState } from "react";

const ReadingView = () => {
  const [activeSection, setActiveSection] = useState("contents");
  const [bookmarkList, setBookmarkList] = useState(bookmarks);

  const buttons = [
    {
      label: "Оглавление",
      value: "contents",
    },
    {
      label: "Закладки (6)",
      value: "bookmarks",
    },
  ];

  const deleteBookmark = (id: number) => {
    setBookmarkList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="flex justify-between gap-4 px-3 mb-5">
        {buttons?.map((button, idx) => (
          <Button
            key={idx}
            onClick={() => setActiveSection(button.value)}
            variant={button.value === activeSection ? "primary" : "outline"}
            className={clsx(
              "flex-1",
              button.value === activeSection ? "!bg-primaryClicked" : ""
            )}
          >
            {button.label}
          </Button>
        ))}
      </div>

      {activeSection === "contents" && (
        <div className="flex-1 px-4 space-y-2.5 overflow-y-auto">
          {chapters?.map((chapter) => (
            <p
              key={chapter.id}
              className="text-justify font-medium text-black text-xs"
            >
              <span className="w-1 h-1 bg-black inline-block mr-2 rounded-full align-middle" />{" "}
              {chapter.title}
            </p>
          ))}
        </div>
      )}

      {activeSection === "bookmarks" && (
        <div className="flex-1 space-y-2.5 overflow-y-auto">
          {bookmarkList?.map((bookmark) => (
            <div className="flex items-center justify-between">
              <div
                key={bookmark.id}
                className="flex flex-1 items-center justify-between bg-island rounded-[8px] py-1 pl-3"
              >
                <div className="flex items-center gap-2">
                  <p className="text-xs font-roboto font-bold">
                    {bookmark?.page} стр.
                  </p>
                  <p className="text-xs font-roboto font-normal">
                    {" "}
                    от {bookmark?.date}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="text-xs text-[#939393] font-nunito font-extrabold"
                >
                  Перейти
                </Button>
              </div>
              <Button
                variant="ghost"
                className="p-2"
                onClick={deleteBookmark.bind(null, bookmark.id)}
              >
                <img src="icons/trash-bin.svg" alt="" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ReadingView;
