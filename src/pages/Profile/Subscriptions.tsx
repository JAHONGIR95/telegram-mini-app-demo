import Header from "@/components/Header";
import human from "/images/human.webp";
import { Link } from "react-router-dom";

const Subscriptions = () => {
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
  ];

  return (
    <div className="h-screen bg-accent flex flex-col">
      <Header className="shadow-[0px_5px_10px_-2px_#FFF0D8]">
        <h1 className="font-extrabold text-tertiary text-2xl text-center mb-4">
          Подписчики
        </h1>
        <div className="divider before:bg-[#FFD5AE] after:bg-[#FFD5AE] mb-1 px-3"></div>
      </Header>

      <div className="px-3 pt-4 pb-25 overflow-y-auto  space-y-2.5">
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
      </div>
    </div>
  );
};

export default Subscriptions;
