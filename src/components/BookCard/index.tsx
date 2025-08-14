import Button from "../buttons/Button";

const BookCard = ({ data }: { data: Record<string, string | number> }) => {
  return (
    <div className="flex gap-3 bg-islandInner rounded-[16px] p-4 border border-borderColor shadow-[0px_8px_16px_0px_#EAE2D5]">
      <img
        src="src/assets/images/book.png"
        alt="book"
        className="w-[104px] h-[144px]"
      />
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-base leading-4 text-secondaryColor">
            {data?.bookName}
          </p>
          <p className="text-xs leading-2 font-medium text-tertiary">
            Автор: <span className="text-secondaryColor"> {data?.author}</span>
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm leading-3 font-normal text-tertiary">
            Рейтинг: <span className="text-secondaryColor">{data?.rate}</span>
          </p>
          <div className="flex justify-between">
            <p className="text-sm leading-3 font-normal text-tertiary">
              Смыслы: <span className="text-secondaryColor">{data?.idea}</span>
            </p>
            {!!data?.yourIdea && (
              <p className="text-sm leading-3 font-normal text-tertiary">
                Ваши смыслы:{" "}
                <span className="text-secondaryColor">{data?.yourIdea}</span>
              </p>
            )}
          </div>
          <p className="text-sm leading-3 font-normal text-tertiary">
            В закладках:{" "}
            <span className="text-secondaryColor">{data?.inMark}</span>
          </p>
        </div>

        {data?.yourIdea ? (
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col gap-2">
              <p className="text-xs leading-3 font-bold text-tertiary">
                Вы прочитали: <br /> 64%
              </p>
              <progress
                className="progress  text-[#F5AB32] w-22"
                value={64}
                max="100"
              ></progress>
            </div>
            <Button
              variant="outline"
              className="!text-primaryColor !bg-island !font-extrabold !leading-3"
            >
              Продолжить
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            className="ml-auto w-fit !bg-primaryDefault !font-bold !leading-3 text-base px-8 py-3"
          >
            Читать
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
