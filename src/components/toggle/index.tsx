// import React, { useState } from "react";

// interface ToggleProps {
//   checked?: boolean;
//   onChange?: (checked: boolean) => void;
// }

// const Toggle: React.FC<ToggleProps> = ({ checked = false, onChange }) => {
//   const [isOn, setIsOn] = useState(checked);

//   const handleToggle = () => {
//     setIsOn((prev) => {
//       const newState = !prev;
//       if (onChange) onChange(newState);
//       return newState;
//     });
//   };

//   return (
//     <div className="p-[1px] rounded-full bg-gradient-to-r from-[#E37A1E] to-[#D1B606] w-fit flex items-center justify-center">
//       <button
//         onClick={handleToggle}
//         className={`relative inline-flex h-6 w-14 items-center rounded-full transition ${
//           isOn ? "bg-transparent" : "bg-white"
//         }`}
//       >
//         <span
//           className={`inline-block h-4.5 w-4.5 transform rounded-full transition ${
//             isOn ? "translate-x-8.5 bg-white" : "translate-x-1 bg-primaryDefault"
//           }`}
//         />
//       </button>
//     </div>
//   );
// };

// export default Toggle;

import React, { useState } from "react";

interface ToggleProps {
  name: string; // ✅ form uchun kerak
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ name, checked = false, onChange }) => {
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
      {/* ✅ yashirin input */}
      <input
        type="checkbox"
        name={name}
        checked={isOn}
        onChange={handleToggle}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-14 items-center rounded-full transition ${
          isOn ? "bg-transparent" : "bg-white"
        }`}
      >
        <span
          className={`inline-block h-4.5 w-4.5 transform rounded-full transition ${
            isOn
              ? "translate-x-8.5 bg-white"
              : "translate-x-1 bg-primaryDefault"
          }`}
        />
      </button>
    </div>
  );
};

export default Toggle;
