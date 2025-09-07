import Button from "@/components/buttons/Button";
import Comment from "@/components/comment";
import { allOpinions, Opinion } from "@/utils/constantValues";
import { useRef, useState } from "react";

const Opinions = () => {
  const [opinions, setOpinions] = useState<Opinion[]>(allOpinions);
  const [replyTo, setReplyTo] = useState<Opinion | null>(null); // qaysi commentga javob
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  return (
    <div className="flex-1 mx-2 border p-4 flex flex-col gap-3 border-[#BDBDBD] rounded-2xl bg-white min-h-0 relative">
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
              replyTo ? `Ответить ${replyTo.userName}` : "Оставьте комментарий"
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
  );
};

export default Opinions;
