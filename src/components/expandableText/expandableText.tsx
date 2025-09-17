// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import clsx from "clsx";

// interface ExpandableTextProps {
//   children: React.ReactNode;
//   collapsedLines?: number;
//   overlayClass?: string;
// }

// const ExpandableText: React.FC<ExpandableTextProps> = ({
//   children,
//   collapsedLines = 3,
//   overlayClass
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [contentHeight, setContentHeight] = useState<number | string>('auto');
//   const contentRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (contentRef.current) {
//       setContentHeight(contentRef.current.scrollHeight);
//     }
//   }, [children]);

//   return (
//     <div className="relative w-full max-w-xl mx-auto text-gray-800 cursor-pointer">
//       <AnimatePresence initial={false}>
//         <motion.div
//           initial={false}
//           animate={{ height: isExpanded ? contentHeight : `${collapsedLines * 1.3}em` }}
//           exit={{ height: `${collapsedLines * 1.5}em` }}
//           transition={{ duration: 0.4 }}
//           className="overflow-hidden relative"
//           onClick={() => setIsExpanded(!isExpanded)}
//         >
//           <div ref={contentRef} className="whitespace-pre-line text-sm text-black font-medium leading-">
//             {children}
//           </div>

//           {!isExpanded && (
//             <div className={clsx("absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#f5f5f5] to-transparent pointer-events-none", overlayClass)} />
//           )}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// };

import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
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
  overlayClass,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // const [contentHeight, setContentHeight] = useState<number>(0);
  const [shouldCollapse, setShouldCollapse] = useState(false);
  const [mounted, setMounted] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Mount bo‘lgandan keyin text balandligini o‘lchaymiz
  useLayoutEffect(() => {
    if (contentRef.current) {
      const fullHeight = contentRef.current.scrollHeight;
      // setContentHeight(fullHeight);

      const lineHeight = parseFloat(
        getComputedStyle(contentRef.current).lineHeight
      );
      const maxHeight = collapsedLines * lineHeight;

      setShouldCollapse(fullHeight > maxHeight + 1);
    }

    // Faqat birinchi renderdan keyin animatsiya yoqiladi
    // setMounted(true);
  }, [children, collapsedLines]);

  const handleSelectionChange = useCallback(() => {
    const selection = window.getSelection();
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (!selection || selection.rangeCount === 0 || !wrapper || !content)
      return;

    const range = selection.getRangeAt(0);
    if (!range.intersectsNode(wrapper)) return;

    const isStartOutside = !wrapper.contains(range.startContainer);
    const isEndOutside = !wrapper.contains(range.endContainer);

    if (isStartOutside || isEndOutside) {
      const newRange = range.cloneRange();
      if (isStartOutside) newRange.setStart(content, 0);
      if (isEndOutside) newRange.setEnd(content, content.childNodes.length);

      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    setMounted(true);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };

  }, [handleSelectionChange]);

  const collapsedHeight = `${collapsedLines * 1.5}em`;

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative w-full max-w-xl mx-auto text-gray-800 cursor-pointer"
      >
        <AnimatePresence initial={false}>
          <motion.div
            initial={false}
            animate={{
              height: shouldCollapse && !isExpanded ? collapsedHeight : "auto",
            }}
            transition={{ duration: mounted ? 0.4 : 0, ease: "easeInOut" }} // Mountda animatsiyasiz
            className="overflow-hidden relative"
            onClick={() => shouldCollapse && setIsExpanded(!isExpanded)}
          >
            <div
              ref={contentRef}
              className="whitespace-pre-line text-sm text-black font-medium leading-[1.5em]"
            >
              {children}
            </div>

            {!isExpanded && shouldCollapse && (
              <div
                className={clsx(
                  "absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#f5f5f5] to-transparent pointer-events-none",
                  overlayClass
                )}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default ExpandableText;
