import Button from "@/components/buttons/Button";
import Loader from "@/components/Loader";
import PostCard from "@/components/postCard";
import { useEffect, useState } from "react";

const Drafts = () => {
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
    <>
      {responses.map((response) => (
        <PostCard
          key={response.id}
          footer={() => (
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold leading-2.5 text-red-500">
                Модерация не пройдена!
              </p>
              <Button
                variant="outline"
                className="!bg-island !text-primaryColor text-base font-semibold"
              >
                к правилам <img src="src/assets/icons/arrow.svg" alt="arrow" />
              </Button>
            </div>
          )}
        />
      ))}
    </>
  );
};

export default Drafts;
