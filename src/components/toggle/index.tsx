import React, { useState } from "react";

interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ checked = false, onChange }) => {
  const [isOn, setIsOn] = useState(checked);

  const handleToggle = () => {
    setIsOn((prev) => {
      const newState = !prev;
      if (onChange) onChange(newState);
      return newState;
    });
  };

  return (
    <div className="p-[1px] rounded-full bg-gradient-to-r from-[#E37A1E] to-[#D1B606] w-fit flex items-center justify-center">
      <button
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${
          isOn ? "bg-primaryDefault gradient-border rounded-2xl" : "bg-white"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full transition ${
            isOn ? "translate-x-7 bg-white" : "translate-x-1 bg-primaryDefault"
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;
