const FragmentsView = () => {
  const data = [
    {
      id: 1,
      text: "Мы говорим с тобой на разных языках, как всегда, - отозвался Воланд, - но вещи, о которых мы говорим, от этого не меняются.",
      date: "15.02.2026",
      page: 344,
    },
    {
      id: 2,
      text: "Он не заслужил света, он заслужил покой, - печальным голосом проговорил Левий.",
      date: "15.02.2026",
      page: 24,
    },
    {
      id: 3,
      text: "Он не заслужил света, он заслужил покой, - печальным голосом проговорил Левий.",
      date: "15.02.2026",
      page: 29,
    },
    {
      id: 4,
      text: "Он не заслужил света, он заслужил покой, - печальным голосом проговорил Левий.",
      date: "15.02.2026",
      page: 34,
    },
    {
      id: 5,
      text: "Он не заслужил света, он заслужил покой, - печальным голосом проговорил Левий.",
      date: "15.02.2026",
      page: 33,
    },
    {
      id: 6,
      text: "Он не заслужил света, он заслужил покой, - печальным голосом проговорил Левий.",
      date: "15.02.2026",
      page: 32,
    },
    {
      id: 7,
      text: "Он не заслужил света, он заслужил покой, - печальным голосом проговорил Левий.",
      date: "15.02.2026",
      page: 31,
    },
    {
      id: 8,
      text: "Он не заслужил света, он заслужил покой, - печальным голосом проговорил Левий.",
      date: "15.02.2026",
      page: 30,
    },
  ];

  return (
    <>
      <h2 className="text-sm leading-4 mb-5 font-extrabold font-primaryColor text-center">
        Фрагменты (14)
      </h2>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-start justify-between gap-3 bg-island rounded-xl p-3"
          >
            <div className="w-8 h-8 flex-shrink-0 rounded-full bg-primaryDefault flex items-center justify-center">
              <p className="text-primaryWhite font-extrabold leading-3 text-xs">
                {item?.page}
              </p>
            </div>
            <p className="text-sm leading-4 font-normal text-black">
              {item.text}
            </p>
            <div className="flex flex-col justify-end items-end gap-2 flex-shrink-0">
              <p className="text-[8px] font-normal left-2 text-tertiary">
                {item.date}
              </p>
              <p className="text-sm leading-3 font-bold bg-gradientText bg-clip-text text-transparent text-right font-rubik">
                перейти
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FragmentsView;
