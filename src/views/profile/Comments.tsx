import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

const CommentsView = () => {
  const [isLoading, setIsLoading] = useState(!false);

  const comments = [
    {
      id: 1,
      postDate: "05.08.2023",
      commentDate: "05.08.2023",
      comment:
        "Для меня это произведение М. Булгакова, одно из самых мистических в русской классической литературе. В юности, когда я читала не так как сейчас, а в десятки раз больше, мне в первую очередь понравилась некая сказочность.",
    },
    {
      id: 2,
      postDate: "05.08.2023",
      commentDate: "05.08.2023",
      comment:
        "Для меня это произведение М. Булгакова, одно из самых мистических в русской классической литературе. В юности, когда я читала не так как сейчас, а в десятки раз больше, мне в первую очередь понравилась некая сказочность.",
    },
    {
      id: 3,
      postDate: "05.08.2023",
      commentDate: "05.08.2023",
      comment:
        "Для меня это произведение М. Булгакова, одно из самых мистических в русской классической литературе. В юности, когда я читала не так как сейчас, а в десятки раз больше, мне в первую очередь понравилась некая сказочность.",
    },
    {
      id: 4,
      postDate: "05.08.2023",
      commentDate: "05.08.2023",
      comment:
        "Для меня это произведение М. Булгакова, одно из самых мистических в русской классической литературе. В юности, когда я читала не так как сейчас, а в десятки раз больше, мне в первую очередь понравилась некая сказочность.",
    },
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
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex flex-col p-4 bg-white rounded-2xl gap-2 shadow-[0px_8px_16px_0px_#EAE2D5]"
        >
          <div className="flex justify-between items-start">
            <p className="py-1 px-1.5 bg-primaryDefault rounded-[20px] text-white text-sm font-normal leading-2.5">
              Пост от {comment.postDate}
            </p>
            <p className="text-xs font-normal text-tertiary">
              {comment.commentDate}
            </p>
          </div>
          <p className="text-xs font-normal text-black">{comment.comment}</p>
        </div>
      ))}
    </>
  );
};

export default CommentsView;
