import clsx from "clsx";
import { useState } from "react";

const Comment = ({
  comment,
  handleResponse,
  handleLike,
}: {
  comment: any;
  handleResponse: (userdata: any) => void;
  handleLike: (id: number | string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>();

  return (
    <div className="flex gap-2">
      <img
        src={comment.userImage}
        alt=""
        className="w-6 h-6 rounded-full inline-block"
      />
      <div className="flex-1 flex flex-col gap-2">
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
          <div
            className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0"
            onClick={() => handleLike(comment?.id)}
          >
            <img
              src="icons/top-icon.svg"
              alt="top"
              className="w-6 h-6"
              loading="lazy"
            />
            <p className="text-[10px] leading-3 font-bold bg-gradientText bg-clip-text text-transparent p-0">
              {comment?.likes ?? 46}
            </p>
          </div>
        </div>

        {/* Responses */}
        <div className="flex justify-between gap-2">
          {comment.responses?.length > 0 ? (
            <p
              className="collapse-title p-0 font-extrabold text-xs leading-4 text-tertiary flex items-center gap-2 font-nunito"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Посмотреть ответы:{" "}
              <span
                className={clsx(
                  "icon arrow_down_icon transition-transform duration-400 !w-3",
                  isOpen ? "-rotate-180" : "rotate-0"
                )}
              />
            </p>
          ) : (
            <div />
          )}

          <span
            className="text-nunito font-extrabold leading-2 text-tertiary text-xs p-2 cursor-pointer"
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
              handleResponse={handleResponse}
              handleLike={handleLike}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
