import Loader from "@/components/Loader";
import PostCard from "@/components/postCard";
import  { useEffect, useState } from "react";

const PostsView = () => {
  const [isLoading, setIsLoading] = useState(!false);

  const responses = [
    { id: 1, title: "Posts 1" },
    { id: 2, title: "Posts 2" },
    { id: 3, title: "Posts 3" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {responses.map((response) => (
        <PostCard key={response.id} />
      ))}
    </div>
  );
};

export default PostsView;
