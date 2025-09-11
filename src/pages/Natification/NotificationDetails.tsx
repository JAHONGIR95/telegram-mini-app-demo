import PostCard from "@/components/postCard";
import mainLogo from "/images/main-logo.svg";
import { Post, posts } from "@/utils/constantValues";
import { useState } from "react";

const NotificationDetails = () => {
  const handlePostComment = (data: Post) => {
    console.log(data);
  };

    const [isMarked, setIsMarked] = useState(false);
    const handleMarks = () => {
      setIsMarked(!isMarked);
    };

  return (
    <div className="h-screen bg-accent flex flex-col">
      <div className="flex justify-center py-6 opacity-50">
        <img src={mainLogo} className="w-24 h-12" />
      </div>

      <h1 className="font-extrabold text-tertiary text-xl text-center">
        Смысл от 20.02.2025
      </h1>
      <div className="">
        <div className="px-3 pt-7 pb-20 overflow-y-auto">
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
    </div>
  );
};

export default NotificationDetails;
