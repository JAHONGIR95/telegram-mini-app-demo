import mainLogo from "@/assets/images/main-logo.svg";
import clsx from "clsx";

const Header = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx("relative z-10 ", className ? className : "shadow-[0_15px_20px_-2px_#F8F4ED]")}>
      <div className="flex justify-center py-6 opacity-50">
        <img src={mainLogo} className="w-24 h-12" />
      </div>

      {children}
    </div>
  );
};

export default Header;
