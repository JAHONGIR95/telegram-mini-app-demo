import BookCard from "@/components/BookCard";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

const Books = () => {
  const [isLoading, setIsLoading] = useState(!false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  
  const data = [
    {
      id: 1,
      img: "images/book.png",
      bookName: "Мастер и Маргарита",
      author: "Кто-то кто-то",
      rate: 9.7,
      idea: 255,
      inMark: 94,
      yourIdea: 17,
    },
    {
      id: 2,
      img: "images/book.png",
      bookName: "Мастер и Маргарита",
      author: "Кто-то кто-то",
      rate: 9.7,
      idea: 255,
      inMark: 94,
      yourIdea: 0,
    },
    {
      id: 3,
      img: "images/book.png",
      bookName: "Мастер и Маргарита",
      author: "Кто-то кто-то",
      rate: 9.7,
      idea: 255,
      inMark: 94,
      yourIdea: 17,
    },
    {
      id: 4,
      img: "images/book.png",
      bookName: "Мастер и Маргарита",
      author: "Кто-то кто-то",
      rate: 9.7,
      idea: 255,
      inMark: 94,
      yourIdea: 0,
    },
    {
      id: 5,
      img: "images/book.png",
      bookName: "Мастер и Маргарита",
      author: "Кто-то кто-то",
      rate: 9.7,
      idea: 255,
      inMark: 94,
      yourIdea: 17,
    },
  ];
  return (
    <>
      {data.map((book) => (
        <BookCard data={book} key={book.id} />
      ))}
    </>
  );
};

export default Books;
