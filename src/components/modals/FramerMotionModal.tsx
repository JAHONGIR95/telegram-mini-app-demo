import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const sheet = {
  hidden: { y: "100%" },
  visible: { y: 0 },
};

export default function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-lg z-50 p-4"
            variants={sheet}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="h-1 w-10 bg-gray-300 rounded-full mx-auto mb-4" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
