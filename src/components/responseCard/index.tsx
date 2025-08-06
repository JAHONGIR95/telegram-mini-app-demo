import ExpandableText from "../expandableText/expandableText";

export default function ResponseCard() {
  return (
    <div className="rounded-2xl shadow-xl p-4 mb-5 bg-white ">
      {/* Автор */}
      <div className="flex justify-between mb-4">
        <div className="flex flex-col gap-1">
          <div className="font-extrabold text-base leading-4">Запрос</div>
          <div className="text-xs text-gray-500">5 мая</div>
        </div>
        <p className="text-sm leading-3.5 font-extrabold text-tertiary">
          Мастер и Маргарита
        </p>
      </div>

      <ExpandableText
        overlayClass="bg-gradient-to-t from-white via-white/80 to-transparent"
        collapsedLines={3}
      >
        “Мы говорим с тобой на разных языках, как всегда, - отозвался Воланд, -
        но вещи, о которых мы говорим, от этого не меняются.”“Мы говорим с тобой
        на разных языках, как всегда, - отозвался Воланд, - но вещи, о которых
        мы говорим, от этого не меняются.”“Мы говорим с тобой на разных языках,
        как всегда, - отозвался Воланд, - но вещи, о которых мы говорим, от
        этого не меняются.”
      </ExpandableText>

      <p className="text-sm leading-[3] font-bold bg-gradientText bg-clip-text text-transparent text-right">
        Перейти
      </p>
    </div>
  );
}
