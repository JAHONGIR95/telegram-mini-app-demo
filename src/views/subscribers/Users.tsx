import human from "@/assets/images/human.webp";
import { Link } from "react-router-dom";

const Users = () => {
  const subscribers = [
    {
      id: 1,
      img: human,
      username: "Vladislav",
    },
    {
      id: 2,
      img: human,
      username: "Vladislav",
    },
    {
      id: 3,
      img: human,
      username: "Vladislav",
    },
    {
      id: 4,
      img: human,
      username: "Vladislav",
    },
    {
      id: 5,
      img: human,
      username: "Vladislav",
    },
    {
      id: 6,
      img: human,
      username: "Vladislav",
    },
    {
      id: 7,
      img: human,
      username: "Vladislav",
    },
    {
      id: 8,
      img: human,
      username: "Vladislav",
    },
    {
      id: 9,
      img: human,
      username: "Vladislav",
    },
    {
      id: 10,
      img: human,
      username: "Vladislav",
    },
    {
      id: 11,
      img: human,
      username: "Vladislav",
    },
    {
      id: 12,
      img: human,
      username: "Vladislav",
    },
  ];

  return (
    <>
      {subscribers.map((subscriber) => (
        <Link
          to={`/guest-profile/${subscriber.id}`}
          className="flex justify-between items-center bg-islandInner p-4 rounded-2xl border border-borderColor shadow-[0_4px_16px_0px_#FC8F285E]"
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={subscriber.img} className="w-9 h-9 rounded-full" />
            <p className="text-black font-semibold text-sm leading-3">
              {subscriber.username}
            </p>
          </div>
          <p className="text-sm font-bold  bg-gradientText bg-clip-text text-transparent">
            перейти
          </p>
        </Link>
      ))}
    </>
  );
};

export default Users;
