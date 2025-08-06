import clsx from "clsx";

const ScrollableRow = ({
  buttons,
  onClick,
  activeSection,
  className,
}: {
  onClick: (value: number) => void;
  buttons: string[];
  activeSection: number;
  className?: string;
}) => {
  return (
    <div className={clsx("w-full overflow-x-auto no-scrollbar", className)}>
      <div className="flex gap-1 w-max">
        {buttons.map((label, idx) => (
          <button
            key={idx}
            // className={clsx("p-3 rounded-[20px] bg-islandInner text-tertiary text-xs/3 font-semibold", label === activeSection && "bg-primaryClicked text-primaryWhite text-xs/3 font-extrabold")}
            className={clsx(
              "p-3 rounded-[20px]",
              idx === activeSection
                ? "bg-primaryClicked text-[#F8F5FF] text-xs leading-3 font-extrabold"
                : "bg-[#FFFFFF] text-tertiary text-xs leading-3 font-semibold"
            )}
            onClick={() => onClick(idx)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollableRow;
