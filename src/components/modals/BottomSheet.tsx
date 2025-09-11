import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface IOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  backdropClassName?: string;
  onClick?: (e: React.MouseEvent) => void;
  [key: string]: any;
}

const BottomSheet: React.FC<IOSModalProps> = ({ isOpen, onClose, children, className, backdropClassName, onClick, ...rest }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={clsx("fixed inset-0 bg-black/40 z-40", backdropClassName)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            className={clsx("fixed bottom-0 left-0 right-0 border-t border-[#BDBDBD] bg-white rounded-t-4xl py-5 px-3 z-50 shadow-lg", className)}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={onClick}
            {...rest}
          >
            {/* Drag handle */}
            <div className="w-32 h-1.5 bg-black rounded-full mx-auto mb-4" />

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;