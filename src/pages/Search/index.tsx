import { useSafeAreaBottom } from "@/components/App";
import Button from "@/components/buttons/Button";
import Header from "@/components/Header";
import Books from "@/views/search/Books";
import Connections from "@/views/search/Connections";
import People from "@/views/search/People";
import clsx from "clsx";
import { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("books");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const { safeAreaBottom } = useSafeAreaBottom();

  const buttons = [
    {
      label: "Книги",
      value: "books",
    },
    {
      label: "Люди",
      value: "people",
    },
    {
      label: "#Связи",
      value: "connections",
    },
  ];

  const categories = [
    {
      label: "Все",
      value: "all",
    },
    {
      label: "Йога",
      value: "yoga",
    },
    {
      label: "Духовные",
      value: "spiritual",
    },
    {
      label: "Теология",
      value: "theology",
    },
    {
      label: "Теория",
      value: "theory",
    },
    {
      label: "Молитвенные",
      value: "prayers",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-globe">
      <Header imageClassName="!pb-2">
        <div className="px-3">
          <div className="search_wrapper mb-4">
            <img src="icons/search.svg" alt="search" loading="lazy" />
            <input
              type="text"
              placeholder="Например: Яблоко"
              className="search_input"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Sections */}
        <div className="flex justify-between gap-4 px-3 mb-2">
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

        {/* Collapse */}
        {activeSection === "books" && <div className="collapse mb-0 pb-0">
          <input
            type="checkbox"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-block"
          />

          <p className="collapse-title font-extrabold text-sm leading-4 text-tertiary flex items-center gap-2">
            Категории:{" "}
            <span
              className={clsx(
                "icon arrow_down_icon transition-transform duration-400",
                isOpen ? "-rotate-180" : "rotate-0"
              )}
            />
          </p>
          <div className="collapse-content w-full overflow-x-auto no-scrollbar">
            {/* <div className="w-full overflow-x-auto no-scrollbar"> */}
            <div className="flex gap-2 w-max">
              {categories?.map((button, idx) => (
                <Button
                  key={idx}
                  variant={
                    button.value === activeCategory ? "ghost" : "outline"
                  }
                  className={clsx(
                    "rounded-sm p-2 text-xs",
                    button.value === activeCategory &&
                      "!bg-[#D8D8D8] text-[#1E1D1E]"
                  )}
                  onClick={() => setActiveCategory(button.value)}
                >
                  {button.label}
                </Button>
              ))}
            </div>
            {/* </div> */}
          </div>
        </div>}
      </Header>

      <div className="pt-3 overflow-y-auto px-3 space-y-3" style={{ paddingBottom: safeAreaBottom + 80 }}>
        {activeSection === "books" && <Books search={search} />}
        {activeSection === "people" && <People search={search} />}
        {activeSection === "connections" && <Connections search={search} />}
      </div>
    </div>
  );
};

export default Search;
