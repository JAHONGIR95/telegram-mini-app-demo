import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../buttons/Button";

interface IOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const IOSModal: React.FC<IOSModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Orqa fon */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal o‘rtada */}
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-4xl z-50 shadow-lg w-[90%] max-w-sm border border-[#BDBDBD]"
            style={{ transform: "translate(-50%, -50%)" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Yuqori chiziq (iOS style) */}
            <Button variant="ghost" className="absolute top-3 right-3 p-2 rounded-full" onClick={onClose}>
              <img src="icons/close.svg" alt="" />
            </Button>

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default IOSModal;
