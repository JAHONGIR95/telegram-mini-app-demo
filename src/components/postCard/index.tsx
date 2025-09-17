import human from "/images/human.webp";
import topIcon from "/icons/top-icon.svg";
import goToBookIcon from "/icons/go-to-book-icon.svg";
import commentIcon from "/icons/comment-icon-2.svg";
import shareIcon from "/icons/share-icon.svg";
import ExpandableText from "../expandableText/expandableText";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "@/utils/constantValues";
import BookmarksIconTwo from "../icons/Icon";
import Button from "../buttons/Button";
import BottomSheet from "../modals/BottomSheet";

export default function PostCard({
  footer,
  data,
  handlePostComment,
  isMarked,
  handleMarks,
}: {
  footer?: () => React.ReactNode;
  data: Post;
  handlePostComment: (data: Post) => void;
  isMarked?: boolean;
  handleMarks: (data: Post) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl shadow-xl p-1 bg-white ">
      {/* Автор */}
      <div className="bg-[#f5f5f5] rounded-2xl p-3">
        <div className="flex justify-between mb-4 items-start">
          <Link to="/guest-profile/1" className="flex items-center gap-3">
            <img
              src={human}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
              loading="lazy"
            />
            <div>
              <div className="font-semibold">{data?.name}</div>
              <div className="text-xs text-gray-500">5 мая</div>
            </div>
          </Link>
          <Button
            variant="ghost"
            className="px-2 py-0 h-auto text-secondaryColor text-xl font-extrabold"
            onClick={() => setIsOpen(true)}
          >
            ⋮
          </Button>
        </div>

        {data?.story && <ExpandableText>{data?.story}</ExpandableText>}

        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-[#6b6b6b]">
            Мастер и Маргарита
          </span>
          <Link to="/reading-page" className="flex items-center gap-2">
            <img
              src={goToBookIcon}
              alt="icon"
              loading="lazy"
              className="w-6 h-6 block"
            />
          </Link>
        </div>

        <div className="bg-white rounded-2xl -mx-3 -mb-3 mt-3 pb-3">
          <div className="rounded-xl p-3 overflow-hidden relative">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Раскрывает смысл</span>
              <span>#Tag</span>
            </div>

            {data?.meaning && (
              <ExpandableText
                overlayClass="bg-gradient-to-t from-white via-white/80 to-transparent"
                // collapsedLines={3}
              >
                {data?.meaning}
              </ExpandableText>
            )}
            {/* </p> */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-13 bg-gradient-to-t from-white via-white/80 to-transparent"></div> */}
          </div>

          <div className="border-b-1 border-[#bdbdbd] mx-3"></div>

          {footer ? (
            <div className="mt-4 px-3 gap-5">{footer()}</div>
          ) : (
            <div className="flex items-center mt-4 px-3 gap-5">
              <div className="flex items-center text-orange-500 font-semibold gap-2">
                <img src={topIcon} alt="top" className="w-6" loading="lazy" />
                <span>{data?.likes}</span>
              </div>
              <div
                className="flex items-center gap-2 text-gray-600 font-semibold"
                onClick={() => handlePostComment(data)}
              >
                <img
                  src={commentIcon}
                  className="w-6"
                  alt="comments"
                  loading="lazy"
                />
                <span>{data?.comments}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 font-semibold">
                <a href="https://t.me/share/url?url={ENCODED_URL}&text={ENCODED_TEXT}">
                  <img
                    src={shareIcon}
                    className="w-6 h-6"
                    alt="comments"
                    loading="lazy"
                  />
                </a>
              </div>

              <div className="flex items-center gap-2 text-gray-600 font-semibold ml-auto">
                <BookmarksIconTwo
                  active={isMarked}
                  size={24}
                  color="#6B6B6B"
                  onClick={() => handleMarks(data)}
                />
                {/* <TelegramShareButton url="https://t.me/share/url?url={ENCODED_URL}&text={ENCODED_TEXT}" /> */}
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="bg-white pb-10"
      >
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="!w-full bg-island !rounded-2xl flex items-center justify-start h-14 gap-4"
          >
            <img src="icons/edit.svg" alt="" />
            <p className="text-primaryColor text-base leading-4 font-extrabold">
              Редактировать
            </p>
          </Button>
          <Button
            variant="ghost"
            className="!w-full bg-island !rounded-2xl flex items-center justify-start h-14 gap-4"
          >
            <img src="icons/warning.svg" alt="" />
            <p className="text-primaryColor text-base leading-4 font-extrabold">
              Пожаловаться
            </p>
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}
