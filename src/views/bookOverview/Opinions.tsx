import clsx from "clsx";
import { useState } from "react";

const Opinions = () => {
  const opinions = [
    {
      id: 1,
      userName: "John Doe",
      date: "1 июня",
      text: "Написание будет проще запомнить, если задуматься о происхождении слова. Оно происходит от латинского «commentaries», которое означает «заметки». В таком виде слово перешло и в русский язык. В молодежной среде «комментарий» часто сокращают до «коммента».",
      likes: 10,
      userImage: "images/human.webp",
      responses: [
        {
          id: 1.1,
          userName: "John Doe",
          date: "2 июня",
          text: "Написание будет проще запомнить, если задуматься о происхождении слова.",
          likes: 10,
          userImage: "images/human.webp",
        },
        {
          id: 1.2,
          userName: "John Doe",
          date: "2 июня",
          text: "Написание будет проще запомнить, если задуматься о происхождении слова.",
          likes: 10,
          userImage: "images/human.webp",
        },
        {
          id: 1.3,
          userName: "John Doe",
          date: "2 июня",
          text: "Написание будет проще запомнить, если задуматься о происхождении слова.",
          likes: 10,
          userImage: "images/human.webp",
        },
      ],
    },
    {
      id: 2,
      userName: "John Doe",
      date: "1 июня",
      text: "Написание будет проще запомнить, если задуматься о происхождении слова.",
      likes: 10,
      userImage: "images/human.webp",
      responses: [],
    },
    {
      id: 3,
      userName: "John Doe",
      date: "1 июня",
      text: "Написание будет проще запомнить, если задуматься о происхождении слова.",
      likes: 10,
      userImage: "images/human.webp",
      responses: [
        {
          id: 3.1,
          userName: "John Doe",
          date: "2 июня",
          text: "Написание будет проще запомнить, если задуматься о происхождении слова.",
          likes: 10,
          userImage: "images/human.webp",
        },
        {
          id: 3.2,
          userName: "John Doe",
          date: "2 июня",
          text: "Написание будет проще запомнить, если задуматься о происхождении слова.",
          likes: 10,
          userImage: "images/human.webp",
        },
      ],
    },
    {
      id: 4,
      userName: "John Doe",
      date: "1 июня",
      text: "Написание будет проще запомнить, если задуматься о происхождении слова.",
      likes: 10,
      userImage: "images/human.webp",
      responses: [],
    },
  ];

  return (
    <div className="flex-1 mx-2 border p-4 flex flex-col gap-3 border-[#BDBDBD] rounded-2xl bg-white overflow-auto">
      <div className="flex flex-col gap-3">
        {opinions.map((opinion) => (
            <Comment key={opinion.id} comment={opinion} />
        ))}
      </div>
      <div className="w-full bg-black h-12"></div>
    </div>
  );
};

const Comment = ({ comment }: { comment: any }) => {
  const [isOpen, setIsOpen] = useState<boolean>();

  return (
    <div className="flex gap-2">
      <img
        src={comment.userImage}
        alt=""
        className="w-6 h-6 rounded-full inline-block"
      />
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <p className="text-xs leading-2 font-bold text-black">
            {comment.userName}
          </p>
          <p className="text-[10px] leading-2 font-normal text-tertiary">
            {comment.date}
          </p>
        </div>
        <div className="flex justify-between gap-3">
          <p className="text-xs leading-4 text-secondaryColor font-normal">
            {comment.text}
          </p>
          <div className="">LB</div>
        </div>

        {/* Responses */}
        <div className="flex justify-between gap-2">
          {comment.responses?.length > 0 ? (
            <p
              className="collapse-title p-0 font-extrabold text-sm leading-4 text-tertiary flex items-center gap-2 font-nunito"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Посмотреть ответы:{" "}
              <span
                className={clsx(
                  "arrow_down_icon transition-transform duration-400",
                  isOpen ? "-rotate-180" : "rotate-0"
                )}
              />
            </p>
          ) : (
            <div />
          )}

          <span className="text-nunito font-extrabold leading-2 text-tertiary text-xs p-2">
            Ответить
          </span>
        </div>
        <div
          className={clsx(
            "flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {comment?.responses?.map((res: any) => (
            <Comment key={res.id} comment={res} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Opinions;
