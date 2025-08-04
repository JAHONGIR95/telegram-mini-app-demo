import clsx from "clsx";
import React, { useState } from "react";

const FullTextCollapse = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={clsx(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#f5f5f5] to-transparent transition-all duration-500",
          isOpen ? "h-0" : "h-16"
        )}
      />

      <div
        className={clsx(
          "transition-all duration-400 ease-in-out overflow-hidden inline-block text-sm text-black font-medium leading-5 cursor-pointer",
          isOpen ? "max-h-[500px]" : "max-h-[60px]"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default FullTextCollapse;
