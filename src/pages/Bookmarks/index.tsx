import Button from "@/components/buttons/Button";
import Header from "@/components/Header";
import Books from "@/views/bookmarks/Books";
import Drafts from "@/views/bookmarks/Drafts";
import Meanings from "@/views/bookmarks/Meanings";
import clsx from "clsx";
import { useState } from "react";

const Bookmarks = () => {
  const [activeSection, setActiveSection] = useState("books");
  const buttons = [
    {
      label: "Книги",
      value: "books",
    },
    {
      label: "Черновики",
      value: "drafts",
    },
    {
      label: "Смыслы",
      value: "meanings",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-globe">
      <Header className="shadow-[0px_5px_10px_-2px_#F8F4ED]">
        <h1 className="font-extrabold text-tertiary text-2xl text-center mb-6">
          Закладки
        </h1>
        <div className="flex justify-between gap-4 px-3">
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
        <div className="divider before:bg-[#A5a5a5] after:bg-[#a5a5a5] mb-1 px-3"></div>
      </Header>

      <div className="pt-3 pb-25 overflow-y-auto px-3 space-y-5">
        {activeSection === "books" && <Books />}
        {activeSection === "drafts" && <Drafts />}
        {activeSection === "meanings" && <Meanings />}
      </div>
    </div>
  );
};

export default Bookmarks;
