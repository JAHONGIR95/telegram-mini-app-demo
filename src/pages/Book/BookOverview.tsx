import Button from "@/components/buttons/Button";
import { Page } from "@/components/Page";
import Star from "@/components/star";
import Chapters from "@/views/bookOverview/Chapters";
import Description from "@/views/bookOverview/Description";
import Opinions from "@/views/bookOverview/Opinions";
import clsx from "clsx";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface Book {
  id: number;
  img: string;
  bookName: string;
  author: string;
  rate: number;
  idea: number;
  inMark: number;
  yourIdea: number;
}

const BookOverview = () => {
  const [activeSection, setActiveSection] = useState("description");
  const { state } = useLocation();
  const book = state as Book;

  console.log(book);

  const buttons = [
    {
      label: "Описание",
      value: "description",
    },
    {
      label: "Главы (32)",
      value: "chapters",
    },
    {
      label: "Мнения (56)",
      value: "opinions",
    },
  ];

  return (
    <Page>
      <div className="relative w-full h-screen">
        {/* Background image */}
        <div className="h-1/2 w-full bg-cover absolute top-0 bg-[url('/images/book-cover.jpg')] bg-no-repeat bg-contain bg-top">
          <div className="absolute bottom-0 flex justify-between items-center px-4 pb-13 w-full">
            <div className="flex flex-col gap-2">
              <p className="text-primaryWhite text-2xl leading-6 font-extrabold font-nunito">
                {book?.bookName}
              </p>
              <div className="flex items-start gap-5">
                <div className="flex flex-col gap-1">
                  <p className="text-secondaryWhite text-xs font-normal">
                    Смыслов
                  </p>
                  <p className="text-secondaryWhite text-xs font-extrabold font-nunito">
                    {book?.idea}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-secondaryWhite text-xs font-normal">
                    Сила смыслов
                  </p>
                  <p className="text-secondaryWhite text-xs font-extrabold font-nunito">
                    2654
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-secondaryWhite text-xs font-normal">
                    Закладки
                  </p>
                  <p className="text-secondaryWhite text-xs font-extrabold font-nunito">
                    {book?.inMark}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-12 h-12 border border-white rounded-full flex flex-col gap-1 items-center justify-center">
              <Star value={book?.rate / 10} />
              <p className="text-primaryWhite text-xs font-nunito font-extrabold">
                {book?.rate}
              </p>
            </div>
          </div>
        </div>

        {/* Content box */}
        <div className="absolute z-10 bottom-0 w-full rounded-t-4xl -mt-10 min-h-[calc(50%+30px)] max-h-[calc(80%+30px)] shadow-lg flex flex-col bg-globe pb-8 gap-4">
          <div className="flex justify-between gap-5 p-4 pb-0">
            {buttons?.map((button, idx) => (
              <Button
                key={idx}
                onClick={() => setActiveSection(button.value)}
                variant={button.value === activeSection ? "primary" : "outline"}
                className={clsx(
                  "flex-1",
                  button.value === activeSection
                    ? "!bg-primaryClicked font-extrabold"
                    : ""
                )}
              >
                {button.label}
              </Button>
            ))}
          </div>

          {activeSection === "description" && <Description />}
          {activeSection === "chapters" && <Chapters />}
          {activeSection === "opinions" && <Opinions />}

          <div className="px-4">
            {book?.yourIdea ? (
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <p className="text-secondaryColor font-nunito text-sm font-extrabold">
                    Вы читаете: 64%
                  </p>
                  <progress
                    className="progress  text-[#F5AB32] flex-1"
                    value={64}
                    max="100"
                  />
                </div>
                <Link to={"/reading-page"}>
                  <Button
                    className="w-full p-4 !bg-primaryDefault !font-extrabold !text-base !tracking-wider !leading-4"
                    variant="primary"
                  >
                    Продолжить читать
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/reading-page">
                <Button
                  className="w-full p-4 !bg-primaryDefault !font-extrabold !text-base !tracking-wider !leading-4"
                  variant="primary"
                >
                  Читать
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default BookOverview;
