// import BottomSheet from "@/components/modals/FramerMotionModal";
import PostCard from "@/components/postCard";
// import { useState } from "react";
import bell from "/icons/bell.svg";
import { Link } from "react-router-dom";
// import Loader from "@/components/Loader"
// import { useState } from "react";

import Header from "@/components/Header";
import BottomSheet from "@/components/modals/BottomSheet";
import { useEffect, useState } from "react";
import Button from "@/components/buttons/Button";
import Comment from "@/components/comment";
import { allOpinions, Opinion, Post, posts } from "@/utils/constantValues";
import { useRef } from "react";
import { useSafeAreaBottom } from "@/components/App";
import Loader from "@/components/Loader";

const HomePage = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { safeAreaBottom } = useSafeAreaBottom();
  // const [isLoading, setIsLoading] = useState(!false);
  // const [isOpen, setIsOpen] = useState(false);

  // if (!isLoading) {
  //   return <Loader />
  // }

  {
    /* <button
      onClick={() => setIsOpen(true)}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg"
    >
      Show Bottom Sheet
    </button>

    <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <h2 className="text-lg font-bold mb-2">Hello iPhone style!</h2>
      <p className="text-sm text-gray-600">This is a bottom sheet modal.</p>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => setIsOpen(false)}
      >
        Close
      </button>
    </BottomSheet> */
  }

  const [opinions, setOpinions] = useState<Opinion[]>(allOpinions);
  const [replyTo, setReplyTo] = useState<Opinion | null>(null); // qaysi commentga javob
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMarked, setIsMarked] = useState(false);

  const handleResponse = (user: Opinion) => {
    setReplyTo(user);
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.value = `@${user.userName} `; // mention
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset
      textarea.style.height = `${textarea.scrollHeight}px`; // fit content
    }
  };

  const handleLike = (id: number | string) => {
    const inc = (list: Opinion[]): Opinion[] =>
      list.map((item) =>
        item.id === id
          ? { ...item, likes: item.likes + 1 }
          : {
              ...item,
              responses: item.responses ? inc(item.responses) : [],
            }
      );
    setOpinions((prev) => inc(prev));
  };

  const handleSubmit = () => {
    if (!textareaRef.current) return;
    const text = textareaRef.current.value.trim();
    if (!text) return;

    const newComment: Opinion = {
      id: Date.now(),
      userName: "You", // hozircha fixed, keyinchalik auth userdan olasan
      name: "You",
      date: "сейчас",
      text,
      likes: 0,
      userImage: "images/human.webp",
      responses: [],
    };

    if (replyTo) {
      // response qo'shish
      setOpinions((prev) =>
        prev.map((item) => {
          if (item.id === replyTo.id) {
            return {
              ...item,
              responses: [...(item.responses || []), newComment],
            };
          }
          // agar reply responsega qilingan bo'lsa ham, u parent comment responsesiga qo'shiladi
          if (item.responses?.some((res) => res.id === replyTo.id)) {
            return {
              ...item,
              responses: [...item.responses, { ...newComment, text: text }],
            };
          }
          return item;
        })
      );
    } else {
      // yangi comment
      setOpinions((prev) => [...prev, newComment]);
    }

    textareaRef.current.value = "";
    setReplyTo(null);
  };

  const handlePostComment = (data: Post) => {
    console.log(data);
    setIsBottomSheetOpen(true);
  };

  const handleMarks = () => {
    setIsMarked(!isMarked);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      setIsLoading(true);
    };
  }, [isBottomSheetOpen]);

  return (
    <div className="flex flex-col h-screen bg-globe">
      <Header>
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="w-5" />
          <h1 className="font-extrabold text-tertiary text-[22px] leading-5.5 text-center font-rubik">
            Dharma Human
          </h1>
          <Link
            to="/notifications"
            className="relative inline-block cursor-pointer"
          >
            <img
              src={bell}
              alt="avatar"
              className="w-5 h-5 rounded-full object-cover"
              loading="lazy"
            />
            <span className="absolute -top-1 -right-[2px] text-[6px] bg-iconLink px-[2px] font-bold rounded-full">
              4
            </span>
          </Link>
        </div>
      </Header>

      <div
        className="px-3 pt-4 overflow-y-auto space-y-5"
        style={{ paddingBottom: safeAreaBottom + 80 }}
      >
        {posts?.map((post) => (
          <PostCard
            key={post.id}
            data={post}
            handlePostComment={handlePostComment}
            isMarked={isMarked}
            handleMarks={handleMarks}
          />
        ))}
        <BottomSheet
          className="flex flex-col max-h-3/4 overflow-y-auto px-5 h-full"
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          style={{ paddingBottom: safeAreaBottom + 20 }}
        >
          <h2 className="text-sm leading-4 mb-4 font-extrabold font-primaryColor text-center">
            Комментарии
          </h2>
          {/* <Opinions /> */}
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-3 rounded-2xl bg-white min-h-0 relative">
              <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                {opinions.map((opinion) => (
                  <Comment
                    key={opinion.id}
                    comment={opinion}
                    handleResponse={handleResponse}
                    handleLike={handleLike}
                  />
                ))}
              </div>
              <div className="flex items-end gap-4 focus-within:sticky focus-within:bottom-0 focus-within:w-[100%] focus-within:left-0 focus-within:right-0">
                <div className="flex items-start border flex-1 border-inputDefault rounded-[28px] py-2 px-3">
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    maxLength={200}
                    onInput={handleInput}
                    className="flex-1 border-none outline-none resize-none overflow-y-auto
                   text-tertiary placeholder:text-[#4B008226] placeholder:font-semibold font-medium
                   leading-3.3 text-sm max-h-[80px]"
                    placeholder={
                      replyTo
                        ? `Ответить ${replyTo.userName}`
                        : "Оставьте комментарий"
                    }
                  />
                </div>
                <Button
                  variant="primary"
                  className="w-10 h-10 !bg-primaryDefault"
                  onClick={handleSubmit}
                >
                  <span className="icon comment_send_icon" />
                </Button>
              </div>
            </div>
          )}
        </BottomSheet>
      </div>
    </div>
  );
};

export default HomePage;
