import Button from "../buttons/Button";

const BookCard = ({ data }: { data: Record<string, string | number> }) => {
  return (
    <div className="flex gap-3 bg-islandInner rounded-[16px] p-4 border border-borderColor shadow-[0px_8px_16px_0px_#EAE2D5]">
      <img
        src="images/book.png"
        alt="book"
        className="w-[104px] block object-cover rounded-xl"
        loading="lazy"
      />
      <div className="flex flex-col flex-1 justify-between gap-3">
        <div className="flex flex-col gap-2">
          <p className="font-extrabold text-base leading-4 text-secondaryColor">
            {data?.bookName}
          </p>
          <p className="text-xs leading-2 font-bold text-tertiary">
            Автор: <span className="text-secondaryColor"> {data?.author}</span>
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-xs leading-3 font-semibold text-tertiary">
            Рейтинг: <span className="text-secondaryColor">{data?.rate}</span>
          </p>
          <div className="flex justify-between flex-wrap">
            <p className="text-xs leading-3 font-semibold text-tertiary">
              Смыслы: <span className="text-secondaryColor">{data?.idea}</span>
            </p>
            {!!data?.yourIdea && (
              <p className="text-xs leading-3 font-semibold text-tertiary">
                Ваши смыслы:{" "}
                <span className="text-secondaryColor">{data?.yourIdea}</span>
              </p>
            )}
          </div>
          <p className="text-xs leading-3 font-semibold text-tertiary">
            В закладках:{" "}
            <span className="text-secondaryColor">{data?.inMark}</span>
          </p>
        </div>

        {data?.yourIdea ? (
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] leading-3 font-bold text-tertiary font-nunito">
                Вы прочитали: <br /> 64%
              </p>
              <progress
                className="progress text-[#F5AB32] w-full"
                value={64}
                max="100"
              />
            </div>
            <Button
              variant="outline"
              className="!text-primaryColor !bg-island !font-bold !leading-3.5 text-sm "
            >
              Продолжить
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            className="ml-auto w-fit !bg-primaryDefault !font-bold !leading-3 text-sm px-8 py-3"
          >
            Читать
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
