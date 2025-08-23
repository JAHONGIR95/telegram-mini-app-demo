import human from "/images/human.webp";
import { Link } from "react-router-dom";

const People = ({ search }: { search: string }) => {
  const subscribers = [
    {
      id: 1,
      img: human,
      username: "Vladislav Vladislavovich",
    },
    {
      id: 2,
      img: human,
      username: "Brid Gleason",
    },
    {
      id: 3,
      img: human,
      username: "John Doe",
    },
    {
      id: 4,
      img: human,
      username: "Anna Smith",
    },
  ].filter((subscriber) =>
    subscriber.username.toLowerCase().includes(search.toLowerCase())
  );

  if (subscribers?.length === 0) {
    return <div className="text-center font-bold mt-20">К сожалению ничего не нашлось (</div>;
  }

  return (
    <>
      <p className="text-base font-bold text-[#1E1D1E]">
        По вашему поиску нашлось:
      </p>
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

export default People;
