import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Connections = ({ search }: { search: string }) => {
  const [isLoading, setIsLoading] = useState(!false);

  const data = [
    {
      id: 1,
      image: "images/1.png",
      title: "#Факт",
    },
    {
      id: 2,
      image: "images/2.png",
      title: "#История из жизни",
    },
    {
      id: 3,
      image: "images/3.png",
      title: "#Научно Доказано",
    },
    {
      id: 4,
      image: "images/4.png",
      title: "#Свободный",
    },
    {
      id: 5,
      image: "images/5.png",
      title: "#Мудрость",
    },
    {
      id: 6,
      image: "images/6.png",
      title: "#Мудрость Дня",
    },
    {
      id: 7,
      image: "images/7.png",
      title: "#Факт",
    },
    {
      id: 8,
      image: "images/1.png",
      title: "#Факт",
    },
  ]?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <p className="text-base font-bold text-[#1E1D1E]">
        По вашему поиску нашлось:
      </p>
      <div className="grid grid-cols-2 gap-3">
        {data.map((item) => (
          <Link
            to="connection-details"
            state={item}
            key={item.id}
            className="rounded-2xl bg-white p-3 flex flex-col justify-between items-center gap-2 cursor-pointer border border-borderColor"
          >
            <img src={item.image} alt="achievements" className="text-center" />
            <p className="text-base leading-4 font-extrabold text-secondaryColor text-center">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Connections;
