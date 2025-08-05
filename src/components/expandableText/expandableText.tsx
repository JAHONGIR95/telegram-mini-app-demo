import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface ExpandableTextProps {
  children: React.ReactNode;
  collapsedLines?: number;
  overlayClass?: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  children,
  collapsedLines = 3,
  overlayClass
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | string>('auto');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div className="relative w-full max-w-xl mx-auto text-gray-800 cursor-pointer">
      <AnimatePresence initial={false}>
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? contentHeight : `${collapsedLines * 1.3}em` }}
          exit={{ height: `${collapsedLines * 1.5}em` }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden relative"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div ref={contentRef} className="whitespace-pre-line text-sm text-black font-medium leading-">
            {children}
          </div>

          {!isExpanded && (
            <div className={clsx("absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#f5f5f5] to-transparent pointer-events-none", overlayClass)} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ExpandableText;
