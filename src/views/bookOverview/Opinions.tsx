import Button from "@/components/buttons/Button";
import BottomSheet from "@/components/modals/BottomSheet";
import clsx from "clsx";
import { useState } from "react";

const Opinions = () => {
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
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
    {
      id: 5,
      userName: "John Doe",
      date: "1 июня",
      text: "Написание будет проще запомнить, если задуматься о происхождении слова.",
      likes: 10,
      userImage: "images/human.webp",
      responses: [],
    },
    {
      id: 6,
      userName: "John Doe",
      date: "1 июня",
      text: "Написание будет проще запомнить, если задуматься о происхождении слова.",
      likes: 10,
      userImage: "images/human.webp",
      responses: [],
    },
  ];

  interface User {
    id: number,
    userName: string,
    date: string,
    text: string,
    likes: number,
    userImage: string,
  }
  const [userData, setUserData] = useState<User | null>(null);

  const handleResponse = (user: any) => {
    setIsResponseModalOpen(true);
    setUserData(user);
  };

  return (
    <div className="flex-1 mx-2 border p-4 flex flex-col gap-3 border-[#BDBDBD] rounded-2xl bg-white min-h-0">
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
        {opinions.map((opinion) => (
          <Comment
            key={opinion.id}
            comment={opinion}
            handleResponse={handleResponse}
          />
        ))}
      </div>

      <div className="flex items-center gap-4 border border-inputDefault rounded-[28px] py-2 px-3">
        <input
          type="text"
          className="flex-1 border-none outline-none text-tertiary placeholder:text-[#4B008226] font-semibold leading-3.3 text-sm"
          placeholder="Оставьте комментарий"
        />
        <Button variant="primary" className="w-10 h-10 !bg-primaryDefault">
          <span className="icon comment_send_icon" />
        </Button>
      </div>

      <BottomSheet
        isOpen={isResponseModalOpen}
        onClose={() => setIsResponseModalOpen(false)}
        className="bg-white"
      >
        <h2 className="text-lg font-bold mb-2">Hello iPhone style!</h2>
        <p className="text-sm text-gray-600">This is a bottom sheet modal.</p>
        <p className="text-sm text-gray-600">{userData?.text}</p>
        <p className="text-sm text-gray-600">This is a bottom sheet modal.</p>
      </BottomSheet>
    </div>
  );
};

const Comment = ({
  comment,
  handleResponse,
}: {
  comment: any;
  handleResponse: (userdata: any) => void;
}) => {
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
                  "icon arrow_down_icon transition-transform duration-400",
                  isOpen ? "-rotate-180" : "rotate-0"
                )}
              />
            </p>
          ) : (
            <div />
          )}

          <span
            className="text-nunito font-extrabold leading-2 text-tertiary text-xs p-2"
            onClick={() => handleResponse(comment)}
          >
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
            <Comment
              key={res.id}
              comment={res}
              handleResponse={() => handleResponse(res)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Opinions;
