import Loader from "@/components/Loader";
import PostCard from "@/components/postCard";
import { Post, posts } from "@/utils/constantValues";
import { useEffect, useState } from "react";

const AdvancedView = () => {
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
        />
      ))}
    </>
  );
};

export default AdvancedView;
