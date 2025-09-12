// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import clsx from "clsx";
// import { useSafeAreaBottom } from "../App";

// interface IOSModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   className?: string;
//   backdropClassName?: string;
//   onClick?: (e: React.MouseEvent) => void;
//   [key: string]: any;
// }

// const BottomSheet: React.FC<IOSModalProps> = ({
//   isOpen,
//   onClose,
//   children,
//   className,
//   backdropClassName,
//   onClick,
//   ...rest
// }) => {
//   const { safeAreaBottom } = useSafeAreaBottom();
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             className={clsx(
//               "fixed inset-0 bg-black/40 z-40",
//               backdropClassName
//             )}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />

//           {/* Modal content */}
//           <motion.div
//             className={clsx(
//               "fixed bottom-0 left-0 right-0 border-t border-[#BDBDBD] bg-white rounded-t-4xl py-5 px-3 z-50 shadow-lg",
//               className
//             )}
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             onClick={onClick}
//             style={{ marginBottom: safeAreaBottom }}
//             {...rest}
//           >
//             {/* Drag handle */}
//             <div className="w-32 h-1.5 bg-black rounded-full mx-auto mb-4" />

//             {children}
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default BottomSheet;

// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import clsx from "clsx";
// import { useSafeAreaBottom } from "../App";

// interface IOSModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   className?: string;
//   backdropClassName?: string;
//   onClick?: (e: React.MouseEvent) => void;
//   [key: string]: any;
// }

// const BottomSheet: React.FC<IOSModalProps> = ({
//   isOpen,
//   onClose,
//   children,
//   className,
//   backdropClassName,
//   onClick,
//   ...rest
// }) => {
//   const { safeAreaBottom } = useSafeAreaBottom();

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             className={clsx(
//               "fixed inset-0 bg-black/40 z-40",
//               backdropClassName
//             )}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />

//           {/* Modal content */}
//           <motion.div
//             className={clsx(
//               "fixed bottom-0 left-0 right-0 border-t border-[#BDBDBD] bg-white rounded-t-4xl py-5 px-3 z-50 shadow-lg touch-none",
//               className
//             )}
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%", opacity: 0 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             drag="y"
//             dragConstraints={{ top: 0, bottom: 0 }}
//             dragElastic={0.2}
//             onDragEnd={(_, info) => {
//               if (info.offset.y > 100) {
//                 onClose();
//               }
//             }}
//             onClick={onClick}
//             style={{ marginBottom: safeAreaBottom, touchAction: "none" }}
//             {...rest}
//           >
//             {/* Drag handle */}
//             <div className="w-32 h-1.5 bg-black rounded-full mx-auto mb-4" />

//             {children}
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default BottomSheet;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useSafeAreaBottom } from "../App";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  backdropClassName?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  className,
  backdropClassName,
  onClick,
}) => {
  const { safeAreaBottom } = useSafeAreaBottom();
  const [dragging, setDragging] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={clsx(
              "fixed inset-0 bg-black/40 z-40",
              backdropClassName
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: dragging ? 0.2 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* BottomSheet container */}
          <motion.div
            className={clsx(
              "fixed bottom-0 left-0 right-0 border-t border-[#BDBDBD] bg-white rounded-t-4xl py-5 px-3 z-50 shadow-lg touch-none",
              className
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragStart={() => setDragging(true)}
            onDragEnd={(_, info) => {
              setDragging(false);
              if (info.offset.y > 100) {
                onClose();
              }
            }}
            style={{
              marginBottom: safeAreaBottom,
              touchAction: "none", // iOS gesture bloklanadi
              overscrollBehavior: "none",
              WebkitOverflowScrolling: "touch",
            }}
            onClick={onClick}
          >
            {/* Drag handle */}
            <div className="w-32 h-1.5 bg-black/20 rounded-full mx-auto mb-4" />

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
