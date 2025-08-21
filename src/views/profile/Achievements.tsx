import IOSModal from "@/components/modals";
import { useState } from "react";

const AchievementsView = () => {
  const data = [
    {
      id: 1,
      image: "icons/achievement.svg",
      title: "Начало пути!",
      text: "Предложить краудсорсинговый перевод, который одобрили 100+ пользователей.",
      date: "12.02.2025",
    },
    {
      id: 2,
      image: "icons/achievement.svg",
      title: "Проводник",
      text: "Предложить краудсорсинговый перевод, который одобрили 100+ пользователей.",
      date: "12.02.2025",
    },
    {
      id: 3,
      image: "icons/achievement.svg",
      title: "Переводчик-самоучка",
      text: "Предложить краудсорсинговый перевод, который одобрили 100+ пользователей.",
      date: "12.02.2025",
    },
    {
      id: 4,
      image: "icons/achievement.svg",
      title: "Тишина",
      text: "Предложить краудсорсинговый перевод, который одобрили 100+ пользователей.",
      date: "12.02.2025",
    },
  ];

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<null | typeof data[0]>(null);

  const handleOpen = (item: typeof data[0]) => {
    setModalData(item);
    setOpen(true);
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      <IOSModal isOpen={open} onClose={() => setOpen(false)}>
        {modalData && (
          <div className="p-6 pt-2 flex flex-col justify-center items-center">
            <img
              src={modalData.image}
              alt="achievements"
              className="w-[170px]"
            />
            <div className="flex flex-col gap-1 items-center">
              <p className="text-base leading-4 font-extrabold text-secondaryColor mb-4 text-center">
                {modalData.title}
              </p>
              <p className="text-xs text-black font-semibold leading-3.5 mb-8 text-center">
                {modalData.text}
              </p>
              <p className="text-[10px] text-black font-normal leading-1.5">
                {modalData.date}
              </p>
            </div>
          </div>
        )}
      </IOSModal>

      {data.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl bg-white p-6 pt-4 flex flex-col justify-center items-center cursor-pointer"
          onClick={() => handleOpen(item)}
        >
          <img
            src={item.image}
            alt="achievements"
            className="w-[77px] text-center"
          />
          <div className="flex flex-col gap-2 items-center">
            <p className="text-base leading-4 font-extrabold text-secondaryColor text-center">
              {item.title}
            </p>
            <p className="text-[10px] text-black font-normal leading-1.5">
              {item.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AchievementsView;
