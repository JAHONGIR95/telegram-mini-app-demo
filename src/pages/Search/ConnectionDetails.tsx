import Button from "@/components/buttons/Button";
import Header from "@/components/Header";
import PostCard from "@/components/postCard";
import SortButtons from "@/components/sort";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Post, posts } from "@/utils/constantValues";

const ConnectionDetails = () => {
  const { state } = useLocation();
  const category = state as { id: number; image: string; title: string };
  const [activeSort, setActiveSort] = useState("date");

  const handlePostComment = (data: Post) => {
      console.log(data);
    };

  const data = [
    { label: "Дате", value: "date" },
    { label: "Комментариям", value: "comments" },
    { label: "Популярным", value: "popular" },
  ];

    const [isMarked, setIsMarked] = useState(false);
  const handleMarks = () => {
    setIsMarked(!isMarked);
  };

  return (
    <div className="flex flex-col h-screen bg-globe">
      <Header>
        <h1 className="font-extrabold text-tertiary text-2xl text-center mb-6">
          {category?.title}
        </h1>
        <div className="px-3 flex items-center gap-2">
          <p className="text-sm font-bold text-[#484848]">Сортировка по:</p>
          <SortButtons
            data={data}
            renderItem={({
              label,
              value,
            }: {
              label: string;
              value: string;
            }) => (
              <Button
                variant="ghost"
                className={clsx(
                  "rounded-lg p-2.5 text-[#1E1D1E]",
                  value === activeSort
                    ? "!bg-[#D8D8D8] text-xs/3 font-bold"
                    : "bg-transparent border border-[#D8D8D8] text-xs/3 font-medium"
                )}
                onClick={() => setActiveSort(value)}
              >
                {label}
              </Button>
            )}
          />
        </div>
        <div className="divider before:bg-[#a5a5a5] after:bg-[#a5a5a5] mb-1 px-3 mt-2"></div>
      </Header>

      <div className="pt-3 pb-25 overflow-y-auto px-3 space-y-5">
        {posts?.map((post) => (
          <PostCard
            key={post.id}
            data={post}
            handlePostComment={handlePostComment}
            handleMarks={handleMarks}
            isMarked={isMarked}
          />
        ))}
      </div>
    </div>
  );
};

export default ConnectionDetails;
