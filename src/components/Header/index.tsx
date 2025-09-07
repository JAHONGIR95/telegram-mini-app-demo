import { useSafeAreaBottom } from "../App";
import mainLogo from "/images/main-logo.svg";
import clsx from "clsx";

const Header = ({
  children,
  className,
  imageClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  imageClassName?: string;
}) => {

  const { safeAreaTop } = useSafeAreaBottom();

  return (
    <div className={clsx("relative z-10 ", className ? className : "shadow-[0_15px_20px_-2px_#F8F4ED]")}>
      <div className={clsx("flex justify-center pb-6 opacity-50", imageClassName)} style={{ paddingTop: safeAreaTop}}>
        <img src={mainLogo} className="w-24 h-12" />
      </div>

      {children}
    </div>
  );
};

export default Header;
