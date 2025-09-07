import Button from "@/components/buttons/Button";
import Loader from "@/components/Loader";
import PostCard from "@/components/postCard";
import { Post, posts } from "@/utils/constantValues";
import { useEffect, useState } from "react";

const Drafts = () => {
  const [isLoading, setIsLoading] = useState(!false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handlePostComment = (data: Post) => {
      console.log(data);
    };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          data={post}
          handlePostComment={handlePostComment}
          footer={() => (
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold leading-2.5 text-red-500">
                Модерация не пройдена!
              </p>
              <Button
                variant="outline"
                className="!bg-island !text-primaryColor text-base font-semibold"
              >
                к правилам <img src="icons/arrow.svg" alt="arrow" />
              </Button>
            </div>
          )}
        />
      ))}
    </>
  );
};

export default Drafts;
