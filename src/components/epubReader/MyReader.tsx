// import { useEffect, useRef, useState } from "react";
// import { ReactReader, ReactReaderStyle } from "react-reader";

// const MyReader = () => {
//   // And your own state logic to persist state
//   const [size, setSize] = useState(100);
//   const [selections, setSelections] = useState([]);
//   const [page, setPage] = useState("");
//   const [showToc, setShowToc] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [firstRenderDone, setFirstRenderDone] = useState(false);
//   const tocRef = useRef(null);
//   const renditionRef = useRef<any>(null);
//   const locationChanged = (epubcifi: any) => {
//     if (renditionRef.current && tocRef.current) {
//       const { displayed, href } = renditionRef.current.location.start;
//       const chapter = tocRef.current.find(
//         (item) => item.href?.split("#")?.[0] === href
//       );
//       console.log(tocRef.current, chapter, href);
//       setPage(
//         `Page ${displayed.page} of ${displayed.total} in chapter ${
//           chapter ? chapter.label : "n/a"
//         }`
//       );
//     }
//     if (!firstRenderDone) {
//       setLocation(localStorage.getItem("book-progress"));
//       setFirstRenderDone(true);
//       return;
//     }

//     localStorage.setItem("book-progress", epubcifi);

//     setLocation(epubcifi);
//   };

//   const changeSize = (newSize: number) => {
//     setSize(newSize);
//   };

//   const handleChapterClick = async (item: any) => {
//     if (renditionRef.current && item.href) {
//       try {
//         await renditionRef.current.display(item.href);
//         setLocation(item.href);
//         localStorage.setItem("book-progress", item.href);
//         setShowToc(false);
//       } catch (error) {
//         console.error("Chapter o'tishda xato:", error);
//       }
//     } else {
//       console.warn("Rendition yoki href mavjud emas");
//     }
//   };
//   useEffect(() => {
//     if (renditionRef.current) {
//       renditionRef.current.themes.fontSize(`${size}%`);
//       renditionRef.current.themes.font("arial");
//     }
//   }, [size]);

//   useEffect(() => {
//     if (renditionRef.current) {
//       function setRenderSelection(cfiRange, contents) {
//         setSelections(
//           selections.concat({
//             text: renditionRef.current.getRange(cfiRange).toString(),
//             cfiRange,
//           })
//         );

//         localStorage.setItem(
//           "highlights",
//           JSON.stringify(
//             selections.concat({
//               text: renditionRef.current.getRange(cfiRange).toString(),
//               cfiRange,
//             })
//           )
//         );

//         renditionRef.current.annotations.add(
//           "highlight",
//           cfiRange,
//           {},
//           null,
//           "hl",
//           { fill: "green", "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
//         );
//         contents.window.getSelection().removeAllRanges();
//       }
//       renditionRef.current.on("selected", setRenderSelection);
//       return () => {
//         renditionRef.current.off("selected", setRenderSelection);
//       };
//     }
//   }, [setSelections, selections]);

//   const ownStyles = {
//     ...ReactReaderStyle,
//     reader: {
//       ...ReactReaderStyle.reader,
//       background: "#F8F4ED", // tashqi container foni
//       position: "sticky",
//       inset: 0,
//       width: "100%",
//       height: "100vh",
//       padding: 0,
//       margin: 0,
//       boxSizing: "border-box",
//     },
//     container: {
//       ...ReactReaderStyle.container,
//       width: "100%",
//       height: "100%",
//       padding: 0,
//       margin: 0,
//     },
//     view: {
//       ...ReactReaderStyle.view,
//       padding: 0,
//       margin: 0,
//     },
//     arrow: {
//       display: "none",
//     },
//   };
//   console.log(renditionRef.current);

//   return (
//     <>
//       <div
//         style={{
//           width: "100vw",
//           height: "100vh",
//           margin: 0,
//           padding: 0,
//           overflowY: "auto",
//         }}
//       >
//         <ReactReader
//           readerStyles={ownStyles}
//           location={location}
//           locationChanged={locationChanged}
//           url="https://react-reader.metabits.no/files/alice.epub"
//           getRendition={(rendition) => {
//             renditionRef.current = rendition;
//             renditionRef.current.themes.default({
//               "::selection": {
//                 background: "orange",
//               },
//             });

//             const highlights = JSON.parse(
//               localStorage.getItem("highlights") || "[]"
//             );

//             highlights.forEach((highlight) => {
//               renditionRef.current.annotations.add(
//                 "highlight",
//                 highlight.cfiRange,
//                 {},
//                 null,
//                 "hl",
//                 {
//                   fill: "green",
//                   "fill-opacity": "0.5",
//                   "mix-blend-mode": "multiply",
//                 }
//               );
//             });
//             setSelections(highlights);
//             renditionRef.current.themes.register("custom", {
//               "*": {
//                 color: "#000",
//                 background: "#F8F4ED !important",
//               },
//               "body.x-ebookmaker": {
//                 padding: "16px !important",
//                 margin: "0 !important",
//               },
//             });
//             renditionRef.current.themes.select("custom");
//           }}
//           tocChanged={(toc) => (tocRef.current = toc)}
//           showToc={false}
//           epubOptions={{
//             flow: "scrolled",
//             manager: "continuous",
//             allowPopups: true, // Adds `allow-popups` to sandbox-attribute
//             allowScriptedContent: true, // Adds `allow-scripts` to sandbox-attribute
//           }}
//         />

//         <button
//           onClick={() => setShowToc(!showToc)}
//           style={{
//             position: "absolute",
//             top: "1rem",
//             right: "1rem",
//             zIndex: 10,
//             padding: "8px 12px",
//             background: "#333",
//             color: "#fff",
//             borderRadius: "4px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           ☰ Chapters
//         </button>

//         {showToc && (
//           <div
//             style={{
//               position: "absolute",
//               top: "3.5rem",
//               right: "1rem",
//               zIndex: 10,
//               width: "250px",
//               maxHeight: "60vh",
//               overflowY: "auto",
//               background: "#fff",
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
//             }}
//           >
//             <ul style={{ listStyle: "none", padding: "0.5rem", margin: 0 }}>
//               {tocRef.current?.map((item) => (
//                 <li
//                   key={item.href}
//                   onClick={() => {
//                     handleChapterClick(item);
//                   }}
//                   style={{
//                     padding: "8px",
//                     cursor: "pointer",
//                     borderRadius: "4px",
//                     transition: "background 0.2s",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.background = "#eee")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.background = "transparent")
//                   }
//                 >
//                   {item.label}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </>
//   );
//   // return null
// };

// export default MyReader;

// import { useEffect, useRef, useState } from "react";
// import { ReactReader, ReactReaderStyle } from "react-reader";

// const MyReader = () => {
//   const bookRef = useRef<any>(null);
//   const [size, setSize] = useState(100);
//   const [selections, setSelections] = useState<any[]>([]);
//   const [page, setPage] = useState("");
//   const [showToc, setShowToc] = useState(false);
//   const [location, setLocation] = useState<string | null>(null);
//   const [firstRenderDone, setFirstRenderDone] = useState(false);
//   const [popup, setPopup] = useState<{ x: number; y: number; text: string; cfi: string } | null>(null);
//   const tocRef = useRef<any>(null);
//   const renditionRef = useRef<any>(null);

//   const locationChanged = (epubcifi: any) => {
//     if (renditionRef.current && tocRef.current) {
//       const { displayed, href } = renditionRef.current.location.start;
//       const chapter = tocRef.current.find(
//         (item: any) => item.href?.split("#")?.[0] === href
//       );
//       setPage(
//         `Page ${displayed.page} of ${displayed.total} in chapter ${
//           chapter ? chapter.label : "n/a"
//         }`
//       );
//     }
//     if (!firstRenderDone) {
//       setLocation(localStorage.getItem("book-progress"));
//       setFirstRenderDone(true);
//       return;
//     }
//     localStorage.setItem("book-progress", epubcifi);
//     setLocation(epubcifi);
//   };

//   const handleChapterClick = async (item: any) => {
//     if (renditionRef.current && item.href) {
//       try {
//         await renditionRef.current.display(item.href);
//         setLocation(item.href);
//         localStorage.setItem("book-progress", item.href);
//         setShowToc(false);
//       } catch (error) {
//         console.error("Chapter o'tishda xato:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     if (renditionRef.current) {
//       renditionRef.current.themes.fontSize(`${size}%`);
//       renditionRef.current.themes.font("arial");
//     }
//   }, [size]);

//   useEffect(() => {
//     if (renditionRef.current) {
//       function setRenderSelection(cfiRange: any, contents: any) {
//         const text = renditionRef.current.getRange(cfiRange).toString();

//         // ✅ Koordinatalarni olish
//         const range = contents.window.getSelection().getRangeAt(0);
//         const rect = range.getBoundingClientRect();

//         // 📌 Popup ko‘rsatish
//         setPopup({
//           x: rect.left + rect.width / 2,
//           y: rect.top - 40,
//           text,
//           cfi: cfiRange,
//         });

//         // Avvalgi highlightni qo‘shmaymiz, faqat popup ko‘rsatamiz
//         contents.window.getSelection().removeAllRanges();
//       }

//       renditionRef.current.on("selected", setRenderSelection);
//       return () => {
//         renditionRef.current.off("selected", setRenderSelection);
//       };
//     }
//   }, [setSelections, selections]);

//   const addHighlight = (popupData: any) => {
//     if (renditionRef.current) {
//       renditionRef.current.annotations.add(
//         "highlight",
//         popupData.cfi,
//         {},
//         null,
//         "hl",
//         { fill: "green", "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
//       );

//       const newSelections = [
//         ...selections,
//         { text: popupData.text, cfiRange: popupData.cfi },
//       ];
//       setSelections(newSelections);
//       localStorage.setItem("highlights", JSON.stringify(newSelections));
//       setPopup(null);
//     }
//   };

//   const cancelPopup = () => {
//     setPopup(null);
//   };

//   const ownStyles = {
//     ...ReactReaderStyle,
//     reader: {
//       ...ReactReaderStyle.reader,
//       background: "#F8F4ED",
//       position: "sticky",
//       inset: 0,
//       width: "100%",
//       height: "100vh",
//       padding: 0,
//       margin: 0,
//       boxSizing: "border-box",
//     },
//     container: {
//       ...ReactReaderStyle.container,
//       width: "100%",
//       height: "100%",
//       padding: 0,
//       margin: 0,
//     },
//     view: {
//       ...ReactReaderStyle.view,
//       padding: 0,
//       margin: 0,
//     },
//     arrow: { display: "none" },
//   };

//   return (
//     <>
//       <div
//         style={{
//           width: "100vw",
//           height: "100vh",
//           margin: 0,
//           padding: 0,
//           overflowY: "auto",
//         }}
//       >
//         <ReactReader
//           readerStyles={ownStyles}
//           location={location || undefined}
//           locationChanged={locationChanged}
//           url="https://react-reader.metabits.no/files/alice.epub"
//           getRendition={(rendition) => {
//             renditionRef.current = rendition;
//             renditionRef.current.themes.default({
//               "::selection": { background: "orange" },
//             });

//             const highlights = JSON.parse(localStorage.getItem("highlights") || "[]");
//             highlights.forEach((hl: any) => {
//               renditionRef.current.annotations.add(
//                 "highlight",
//                 hl.cfiRange,
//                 {},
//                 null,
//                 "hl",
//                 { fill: "green", "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
//               );
//             });
//             setSelections(highlights);

//             renditionRef.current.themes.register("custom", {
//               "*": {
//                 color: "#000",
//                 background: "#F8F4ED !important",
//               },
//             });
//             renditionRef.current.themes.select("custom");
//           }}
//           tocChanged={(toc) => (tocRef.current = toc)}
//           showToc={false}
//           epubOptions={{
//             flow: "scrolled",
//             manager: "continuous",
//             allowPopups: true,
//             allowScriptedContent: true,
//           }}
//         />

//         {/* 📚 Chapter menu */}
//         <button
//           onClick={() => setShowToc(!showToc)}
//           style={{
//             position: "absolute",
//             top: "1rem",
//             right: "1rem",
//             zIndex: 10,
//             padding: "8px 12px",
//             background: "#333",
//             color: "#fff",
//             borderRadius: "4px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           ☰ Chapters
//         </button>

//         {showToc && (
//           <div
//             style={{
//               position: "absolute",
//               top: "3.5rem",
//               right: "1rem",
//               zIndex: 10,
//               width: "250px",
//               maxHeight: "60vh",
//               overflowY: "auto",
//               background: "#fff",
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
//             }}
//           >
//             <ul style={{ listStyle: "none", padding: "0.5rem", margin: 0 }}>
//               {tocRef.current?.map((item: any) => (
//                 <li
//                   key={item.href}
//                   onClick={() => handleChapterClick(item)}
//                   style={{
//                     padding: "8px",
//                     cursor: "pointer",
//                     borderRadius: "4px",
//                     transition: "background 0.2s",
//                   }}
//                   onMouseEnter={(e) => (e.currentTarget.style.background = "#eee")}
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.background = "transparent")
//                   }
//                 >
//                   {item.label}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* 🟡 Popup menyu */}
//         {popup && (
//           <div
//             style={{
//               position: "fixed",
//               top: popup.y,
//               left: popup.x,
//               transform: "translate(-50%, -100%)",
//               background: "#fff",
//               padding: "6px 10px",
//               borderRadius: "6px",
//               boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
//               zIndex: 999,
//               display: "flex",
//               gap: "8px",
//             }}
//           >
//             <button
//               onClick={() => addHighlight(popup)}
//               style={{
//                 background: "#4caf50",
//                 color: "#fff",
//                 border: "none",
//                 padding: "4px 8px",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               ✅ Highlight
//             </button>
//             <button
//               onClick={cancelPopup}
//               style={{
//                 background: "#f44336",
//                 color: "#fff",
//                 border: "none",
//                 padding: "4px 8px",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               ✖ Cancel
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MyReader;

// import { useEffect, useRef, useState } from "react";
// import { ReactReader, ReactReaderStyle } from "react-reader";

// interface Highlight {
//   cfiRange: string;
//   text: string;
//   color: string;
//   comment?: string;
// }

// const MyReader = () => {
//   const [size, setSize] = useState(100);
//   const [selections, setSelections] = useState<Highlight[]>([]);
//   const [page, setPage] = useState("");
//   const [showToc, setShowToc] = useState(false);
//   const [location, setLocation] = useState<string | null>(null);
//   const [firstRenderDone, setFirstRenderDone] = useState(false);

//   const tocRef = useRef<any>(null);
//   const renditionRef = useRef<any>(null);

//   type PopupType = { x: number; y: number; cfi: string; text: string } | null;
//   const [popup, setPopup] = useState<PopupType>(null);
//   const [selectedCfi, setSelectedCfi] = useState<string | null>(null);
//   const [selectedText, setSelectedText] = useState<string>("");
//   const [showCommentInput, setShowCommentInput] = useState(false);
//   const [commentText, setCommentText] = useState("");

//   const colors = ["green", "yellow", "red", "blue"]; // sariq, ko'k, yashil

//   const locationChanged = (epubcifi: any) => {
//     if (renditionRef.current && tocRef.current) {
//       const { displayed, href } = renditionRef.current.location.start;
//       const chapter = tocRef.current.find(
//         (item) => item.href?.split("#")?.[0] === href
//       );
//       setPage(
//         `Page ${displayed.page} of ${displayed.total} in chapter ${
//           chapter ? chapter.label : "n/a"
//         }`
//       );
//     }
//     if (!firstRenderDone) {
//       setLocation(localStorage.getItem("book-progress"));
//       setFirstRenderDone(true);
//       return;
//     }

//     localStorage.setItem("book-progress", epubcifi);
//     setLocation(epubcifi);
//   };

//   const changeSize = (newSize: number) => {
//     setSize(newSize);
//   };

//   const handleChapterClick = async (item: any) => {
//     if (renditionRef.current && item.href) {
//       try {
//         await renditionRef.current.display(item.href);
//         setLocation(item.href);
//         localStorage.setItem("book-progress", item.href);
//         setShowToc(false);
//       } catch (error) {
//         console.error("Chapter o'tishda xato:", error);
//       }
//     } else {
//       console.warn("Rendition yoki href mavjud emas");
//     }
//   };

//   // === Highlight tanlash ===
//   const handleHighlight = (color: string) => {
//     if (selectedCfi && renditionRef.current) {
//       renditionRef.current.annotations.add(
//         "highlight",
//         selectedCfi,
//         {},
//         null,
//         "hl",
//         {
//           fill: color,
//           "fill-opacity": "0.4",
//           "mix-blend-mode": "multiply",
//         }
//       );

//       const newHighlight: Highlight = {
//         cfiRange: selectedCfi,
//         color,
//         text: selectedText,
//       };

//       const updated = [...selections, newHighlight];
//       setSelections(updated);
//       localStorage.setItem("highlights", JSON.stringify(updated));

//       setPopup(null);
//       setSelectedCfi(null);
//       setSelectedText("");
//     }
//   };

//   const handleAddComment = () => {
//     setShowCommentInput(true);
//   };

//   const handleSaveComment = () => {
//     if (!commentText.trim() || !selectedCfi) return;
//     const updated = selections.map((h) =>
//       h.cfiRange === selectedCfi ? { ...h, comment: commentText } : h
//     );
//     setSelections(updated);
//     localStorage.setItem("highlights", JSON.stringify(updated));
//     setCommentText("");
//     setShowCommentInput(false);
//     setPopup(null);
//   };

//   useEffect(() => {
//     if (renditionRef.current) {
//       renditionRef.current.themes.fontSize(`${size}%`);
//       renditionRef.current.themes.font("arial");
//     }
//   }, [size]);

//   // Replace your existing useEffect that registers "selected" with this block
//   useEffect(
//     () => {
//       if (!renditionRef.current) return;

//       const setRenderSelection = (cfiRange: string, contents: any) => {
//         try {
//           // 1) getSelection xavfsiz tekshirish
//           const sel = contents?.window?.getSelection?.();
//           if (!sel || sel.rangeCount === 0) {
//             // Ba'zida selection CFI bilan qaytadi, lekin DOM selection yo'q.
//             // Shu holatda, epub.js yordamida range olishga harakat qilamiz
//             try {
//               const view = renditionRef.current.annotations.rendition.manager?.views?._views?.[0];
//               if (view) {
//                 const rangeFromCfi = view.contents.range(cfiRange);
//                 if (rangeFromCfi) {
//                   const rects = rangeFromCfi.getClientRects();
//                   if (rects.length > 0) {
//                     const r = rects[0];
//                     const iframeEl = view.window.frameElement;
//                     const iframeRect = iframeEl?.getBoundingClientRect?.() ?? {
//                       left: 0,
//                       top: 0,
//                     };
//                     setPopupPositionAndState(
//                       cfiRange,
//                       rangeFromCfi.toString(),
//                       r,
//                       iframeRect
//                     );
//                   }
//                 }
//               }
//             } catch (e) {
//               console.warn("No DOM selection and fallback failed", e);
//             }
//             return;
//           }

//           // 2) Normal flow: DOM selection exists
//           const range = sel.getRangeAt(0);
//           if (!range) return;

//           // bounding rect of selection range (in iframe viewport)
//           const rect = range.getBoundingClientRect();

//           // frameElement ni olish (iframe DOM el); ba'zi versiyalarda contents.iframe mavjud bo‘ladi
//           const iframeEl =
//             contents?.iframe ||
//             contents?.window?.frameElement ||
//             renditionRef.current.annotations.rendition.manager?.views?._views?.[0]?.window
//               ?.frameElement;

//           const iframeRect = iframeEl?.getBoundingClientRect?.() ?? {
//             left: 0,
//             top: 0,
//           };

//           // 3) popup uchun x,y ni hosil qiluvchi funksiya chaqiramiz
//           setPopupPositionAndState(cfiRange, sel.toString(), rect, iframeRect);

//           // tozalash
//           sel.removeAllRanges();
//         } catch (err) {
//           console.error("setRenderSelection error:", err);
//         }
//       };

//       // helper: popupni position va selected state ga qo'yadi
//       const setPopupPositionAndState = (
//         cfi: string,
//         text: string,
//         rect: DOMRect,
//         iframeRect: { left: number; top: number }
//       ) => {
//         // Bu yerda scroll holatini ham hisoblashimiz mumkin:
//         // overall page scroll (window) va iframe ichidagi scroll (rect top allaqachon iframe ichiga nisbatan)
//         // Endi popup x,y ni global viewportga moslab hisoblaymiz
//         // const x = iframeRect.left + rect.left + rect.width / 2;
//         // const y = iframeRect.top + rect.top; // yuqoriga joylash uchun - offset qo‘shmaymiz, transform bilan ko‘chiramiz
//         const x = iframeRect.left + rect.left + rect.width / 2;
//         const y = iframeRect.top + rect.top + window.scrollY;

//         setPopup({ x, y, cfi, text });
//         setSelectedCfi(cfi);
//         setSelectedText(text);
//         // comment inputni oldindan yopin
//         setShowCommentInput(false);
//         setCommentText("");
//       };

//       renditionRef.current.on("selected", setRenderSelection);
//       return () => {
//         renditionRef.current.off("selected", setRenderSelection);
//       };
//     },
//     [renditionRef.current
//       /* deps: agar kerak bo'lsa qo'shing */
//     ]
//   );

//   const ownStyles = {
//     ...ReactReaderStyle,
//     reader: {
//       ...ReactReaderStyle.reader,
//       background: "#F8F4ED",
//       position: "sticky",
//       inset: 0,
//       width: "100%",
//       height: "100vh",
//       padding: 0,
//       margin: 0,
//       boxSizing: "border-box",
//     },
//     container: {
//       ...ReactReaderStyle.container,
//       width: "100%",
//       height: "100%",
//       padding: 0,
//       margin: 0,
//     },
//     view: {
//       ...ReactReaderStyle.view,
//       padding: 0,
//       margin: 0,
//     },
//     arrow: {
//       display: "none",
//     },
//   };

//   return (
//     <>
//       <div
//         style={{
//           width: "100vw",
//           height: "100vh",
//           margin: 0,
//           padding: 0,
//           overflowY: "auto",
//         }}
//       >
//         <ReactReader
//           readerStyles={ownStyles}
//           location={location}
//           locationChanged={locationChanged}
//           url="https://react-reader.metabits.no/files/alice.epub"
//           getRendition={(rendition) => {
//             renditionRef.current = rendition;

//             renditionRef.current.themes.default({
//               "::selection": { background: "orange" },
//             });

//             // Avvalgi highlightlarni yuklash
//             const highlights = JSON.parse(
//               localStorage.getItem("highlights") || "[]"
//             );
//             highlights.forEach((highlight: Highlight) => {
//               renditionRef.current.annotations.add(
//                 "highlight",
//                 highlight.cfiRange,
//                 {},
//                 null,
//                 "hl",
//                 {
//                   fill: highlight.color,
//                   "fill-opacity": "0.4",
//                   "mix-blend-mode": "multiply",
//                 }
//               );
//             });
//             setSelections(highlights);

//             renditionRef.current.themes.register("custom", {
//               "*": {
//                 color: "#000",
//                 background: "#F8F4ED !important",
//               },
//               "body.x-ebookmaker": {
//                 padding: "16px !important",
//                 margin: "0 !important",
//               },
//             });
//             renditionRef.current.themes.select("custom");
//           }}
//           tocChanged={(toc) => (tocRef.current = toc)}
//           showToc={false}
//           epubOptions={{
//             flow: "scrolled",
//             manager: "continuous",
//             allowPopups: true,
//             allowScriptedContent: true,
//           }}
//         />

//         {/* Popup */}
//         {popup && (
//           <div
//             className="absolute bg-white shadow-lg rounded-lg p-2 flex space-x-2"
//             style={{
//               position: "absolute",
//               top: popup.y,
//               left: popup.x,
//               transform: "translate(-50%, -100%)",
//               zIndex: 1000,
//             }}
//           >
//             {colors.map((color) => (
//               <button
//                 key={color}
//                 className="w-6 h-6 rounded-full border"
//                 style={{ backgroundColor: color }}
//                 onClick={() => handleHighlight(color)}
//               />
//             ))}
//             <button
//               onClick={handleAddComment}
//               className="px-2 py-1 text-sm bg-gray-200 rounded"
//             >
//               💬
//             </button>
//           </div>
//         )}

//         {/* Comment input */}
//         {showCommentInput && popup && (
//           <div
//             className="absolute bg-white shadow-lg rounded-lg p-2 flex flex-col space-y-2"
//             style={{
//               top: popup.y,
//               left: popup.x,
//               transform: "translate(-50%, -120%)",
//               zIndex: 1000,
//             }}
//           >
//             <textarea
//               className="border rounded p-1 w-48 h-16 text-sm"
//               placeholder="Write comment..."
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//             />
//             <button
//               onClick={handleSaveComment}
//               className="bg-blue-500 text-white text-sm px-2 py-1 rounded"
//             >
//               Save
//             </button>
//           </div>
//         )}

//         {/* TOC */}
//         <button
//           onClick={() => setShowToc(!showToc)}
//           style={{
//             position: "absolute",
//             top: "1rem",
//             right: "1rem",
//             zIndex: 10,
//             padding: "8px 12px",
//             background: "#333",
//             color: "#fff",
//             borderRadius: "4px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           ☰ Chapters
//         </button>

//         {showToc && (
//           <div
//             style={{
//               position: "absolute",
//               top: "3.5rem",
//               right: "1rem",
//               zIndex: 10,
//               width: "250px",
//               maxHeight: "60vh",
//               overflowY: "auto",
//               background: "#fff",
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
//             }}
//           >
//             <ul style={{ listStyle: "none", padding: "0.5rem", margin: 0 }}>
//               {tocRef.current?.map((item: any) => (
//                 <li
//                   key={item.href}
//                   onClick={() => handleChapterClick(item)}
//                   style={{
//                     padding: "8px",
//                     cursor: "pointer",
//                     borderRadius: "4px",
//                     transition: "background 0.2s",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.background = "#eee")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.background = "transparent")
//                   }
//                 >
//                   {item.label}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Izohlar ro‘yxati */}
//         {selections.length > 0 && (
//           <div className="absolute bottom-0 left-0 w-full bg-gray-100 p-2 max-h-40 overflow-y-auto">
//             <h4 className="font-semibold mb-2">📌 Comments & Highlights</h4>
//             {selections.map((h, idx) => (
//               <div key={idx} className="mb-2 text-sm">
//                 <div>
//                   <span
//                     className="inline-block w-3 h-3 mr-2 rounded-full"
//                     style={{ backgroundColor: h.color }}
//                   ></span>
//                   {h.text}
//                 </div>
//                 {h.comment && (
//                   <div className="ml-5 italic text-gray-600">
//                     💬 {h.comment}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MyReader;

// import { useEffect, useRef, useState } from "react";
// import { ReactReader, ReactReaderStyle } from "react-reader";

// interface Highlight {
//   cfiRange: string;
//   text: string;
//   color: string;
//   comment?: string;
//   position?: { x: number; y: number }; // 📌 joylashuvni saqlaymiz
// }

// const MyReader = () => {
//   const [size, setSize] = useState(100);
//   const [selections, setSelections] = useState<Highlight[]>([]);
//   const [page, setPage] = useState("");
//   const [showToc, setShowToc] = useState(false);
//   const [location, setLocation] = useState<string | null>(null);
//   const [firstRenderDone, setFirstRenderDone] = useState(false);

//   const tocRef = useRef<any>(null);
//   const renditionRef = useRef<any>(null);

//   type PopupType = { x: number; y: number; cfi: string; text: string } | null;
//   const [popup, setPopup] = useState<PopupType>(null);
//   const [selectedCfi, setSelectedCfi] = useState<string | null>(null);
//   const [selectedText, setSelectedText] = useState<string>("");
//   const [showCommentInput, setShowCommentInput] = useState(false);
//   const [commentText, setCommentText] = useState("");

//   const colors = ["green", "yellow", "red", "blue"];

//   const locationChanged = (epubcifi: any) => {
//     if (renditionRef.current && tocRef.current) {
//       const { displayed, href } = renditionRef.current.location.start;
//       const chapter = tocRef.current.find(
//         (item) => item.href?.split("#")?.[0] === href
//       );
//       setPage(
//         `Page ${displayed.page} of ${displayed.total} in chapter ${
//           chapter ? chapter.label : "n/a"
//         }`
//       );
//     }
//     if (!firstRenderDone) {
//       setLocation(localStorage.getItem("book-progress"));
//       setFirstRenderDone(true);
//       return;
//     }

//     localStorage.setItem("book-progress", epubcifi);
//     setLocation(epubcifi);
//   };

//   const handleChapterClick = async (item: any) => {
//     if (renditionRef.current && item.href) {
//       try {
//         await renditionRef.current.display(item.href);
//         setLocation(item.href);
//         localStorage.setItem("book-progress", item.href);
//         setShowToc(false);
//       } catch (error) {
//         console.error("Chapter o'tishda xato:", error);
//       }
//     } else {
//       console.warn("Rendition yoki href mavjud emas");
//     }
//   };

//   // === Highlight tanlash ===
//   const handleHighlight = (color: string) => {
//     if (selectedCfi && popup && renditionRef.current) {
//       renditionRef.current.annotations.add(
//         "highlight",
//         selectedCfi,
//         {},
//         null,
//         "hl",
//         {
//           fill: color,
//           "fill-opacity": "0.4",
//           "mix-blend-mode": "multiply",
//         }
//       );

//       const newHighlight: Highlight = {
//         cfiRange: selectedCfi,
//         color,
//         text: selectedText,
//         position: { x: popup.x, y: popup.y },
//       };

//       const updated = [...selections, newHighlight];
//       setSelections(updated);
//       localStorage.setItem("highlights", JSON.stringify(updated));
//       localStorage.setItem("comments", JSON.stringify(updated)); // 📌 komentlar ham shu yerga yoziladi

//       setPopup(null);
//       setSelectedCfi(null);
//       setSelectedText("");
//     }
//   };

//   const handleAddComment = () => {
//     setShowCommentInput(true);
//   };

//   const handleSaveComment = () => {
//     if (!commentText.trim() || !selectedCfi) return;
//     const updated = selections.map((h) =>
//       h.cfiRange === selectedCfi
//         ? { ...h, comment: commentText, position: popup ? { x: popup.x, y: popup.y } : h.position }
//         : h
//     );
//     setSelections(updated);
//     localStorage.setItem("highlights", JSON.stringify(updated));
//     localStorage.setItem("comments", JSON.stringify(updated)); // 📌
//     setCommentText("");
//     setShowCommentInput(false);
//     setPopup(null);
//   };

//   useEffect(() => {
//     if (renditionRef.current) {
//       renditionRef.current.themes.fontSize(`${size}%`);
//       renditionRef.current.themes.font("arial");
//     }
//   }, [size]);

//   // 📌 tanlangan matn uchun popup
//   useEffect(() => {
//     if (!renditionRef.current) return;

//     const setRenderSelection = (cfiRange: string, contents: any) => {
//       try {
//         const sel = contents?.window?.getSelection?.();
//         if (!sel || sel.rangeCount === 0) return;
//         const range = sel.getRangeAt(0);
//         const rect = range.getBoundingClientRect();
//         const iframeEl =
//           contents?.iframe ||
//           contents?.window?.frameElement ||
//           renditionRef.current.annotations.rendition.manager?.views?._views?.[0]
//             ?.window?.frameElement;

//         const iframeRect = iframeEl?.getBoundingClientRect?.() ?? {
//           left: 0,
//           top: 0,
//         };
//         const x = iframeRect.left + rect.left + rect.width / 2;
//         const y = iframeRect.top + rect.top + window.scrollY;

//         setPopup({ x, y, cfi: cfiRange, text: sel.toString() });
//         setSelectedCfi(cfiRange);
//         setSelectedText(sel.toString());
//         setShowCommentInput(false);
//         setCommentText("");

//         sel.removeAllRanges();
//       } catch (err) {
//         console.error("setRenderSelection error:", err);
//       }
//     };

//     renditionRef.current.on("selected", setRenderSelection);
//     return () => {
//       renditionRef.current.off("selected", setRenderSelection);
//     };
//   }, [renditionRef.current]);

//   const ownStyles = {
//     ...ReactReaderStyle,
//     reader: {
//       ...ReactReaderStyle.reader,
//       background: "#F8F4ED",
//     },
//     arrow: { display: "none" },
//   };

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("highlights") || "[]");
//     setSelections(saved);
//   }, []);

//   return (
//     <>
//       <div
//         style={{
//           width: "100vw",
//           height: "100vh",
//           margin: 0,
//           padding: 0,
//           overflowY: "auto",
//         }}
//       >
//         <ReactReader
//           readerStyles={ownStyles}
//           location={location}
//           locationChanged={locationChanged}
//           url="https://react-reader.metabits.no/files/alice.epub"
//           getRendition={(rendition) => {
//             renditionRef.current = rendition;
//             renditionRef.current.themes.default({
//               "::selection": { background: "orange" },
//             });

//             // Avvalgi highlightlarni yuklash
//             const highlights = JSON.parse(
//               localStorage.getItem("highlights") || "[]"
//             );
//             highlights.forEach((highlight: Highlight) => {
//               renditionRef.current.annotations.add(
//                 "highlight",
//                 highlight.cfiRange,
//                 {},
//                 null,
//                 "hl",
//                 {
//                   fill: highlight.color,
//                   "fill-opacity": "0.4",
//                   "mix-blend-mode": "multiply",
//                 }
//               );
//             });
//             setSelections(highlights);

//             renditionRef.current.themes.register("custom", {
//               "*": {
//                 color: "#000",
//                 background: "#F8F4ED !important",
//               },
//             });
//             renditionRef.current.themes.select("custom");
//           }}
//           tocChanged={(toc) => (tocRef.current = toc)}
//           showToc={false}
//           epubOptions={{
//             flow: "scrolled",
//             manager: "continuous",
//             allowPopups: true,
//             allowScriptedContent: true,
//           }}
//         />

//         {/* Popup rang tanlash */}
//         {popup && (
//           <div
//             className="absolute bg-white shadow-lg rounded-lg p-2 flex space-x-2"
//             style={{
//               top: popup.y,
//               left: popup.x,
//               transform: "translate(-50%, -100%)",
//               zIndex: 1000,
//             }}
//           >
//             {colors.map((color) => (
//               <button
//                 key={color}
//                 className="w-6 h-6 rounded-full border"
//                 style={{ backgroundColor: color }}
//                 onClick={() => handleHighlight(color)}
//               />
//             ))}
//             <button
//               onClick={handleAddComment}
//               className="px-2 py-1 text-sm bg-gray-200 rounded"
//             >
//               💬
//             </button>
//           </div>
//         )}

//         {/* Comment input */}
//         {showCommentInput && popup && (
//           <div
//             className="absolute bg-white shadow-lg rounded-lg p-2 flex flex-col space-y-2"
//             style={{
//               top: popup.y,
//               left: popup.x,
//               transform: "translate(-50%, -120%)",
//               zIndex: 1000,
//             }}
//           >
//             <textarea
//               className="border rounded p-1 w-48 h-16 text-sm"
//               placeholder="Write comment..."
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//             />
//             <button
//               onClick={handleSaveComment}
//               className="bg-blue-500 text-white text-sm px-2 py-1 rounded"
//             >
//               Save
//             </button>
//           </div>
//         )}

//         {/* 📌 Komment belgilarini joylash */}
//         {selections
//           .filter((h) => h.comment && h.position)
//           .map((h, idx) => (
//             <div
//               key={idx}
//               style={{
//                 position: "absolute",
//                 top: h.position!.y - 10,
//                 left: h.position!.x,
//                 transform: "translate(-50%, -100%)",
//                 zIndex: 500,
//                 background: "#FFD54F",
//                 padding: "2px 6px",
//                 borderRadius: "50%",
//                 fontSize: "14px",
//                 cursor: "pointer",
//               }}
//               title={h.comment}
//             >
//               💬
//             </div>
//           ))}

//         {/* TOC */}
//         <button
//           onClick={() => setShowToc(!showToc)}
//           style={{
//             position: "absolute",
//             top: "1rem",
//             right: "1rem",
//             zIndex: 10,
//             padding: "8px 12px",
//             background: "#333",
//             color: "#fff",
//             borderRadius: "4px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           ☰ Chapters
//         </button>

//         {showToc && (
//           <div
//             style={{
//               position: "absolute",
//               top: "3.5rem",
//               right: "1rem",
//               zIndex: 10,
//               width: "250px",
//               maxHeight: "60vh",
//               overflowY: "auto",
//               background: "#fff",
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
//             }}
//           >
//             <ul style={{ listStyle: "none", padding: "0.5rem", margin: 0 }}>
//               {tocRef.current?.map((item: any) => (
//                 <li
//                   key={item.href}
//                   onClick={() => handleChapterClick(item)}
//                   style={{
//                     padding: "8px",
//                     cursor: "pointer",
//                     borderRadius: "4px",
//                     transition: "background 0.2s",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.background = "#eee")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.background = "transparent")
//                   }
//                 >
//                   {item.label}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* 📜 Izohlar ro‘yxati */}
//         {selections.length > 0 && (
//           <div className="absolute bottom-0 left-0 w-full bg-gray-100 p-2 max-h-40 overflow-y-auto">
//             <h4 className="font-semibold mb-2">📌 Comments & Highlights</h4>
//             {selections.map((h, idx) => (
//               <div key={idx} className="mb-2 text-sm">
//                 <div>
//                   <span
//                     className="inline-block w-3 h-3 mr-2 rounded-full"
//                     style={{ backgroundColor: h.color }}
//                   ></span>
//                   {h.text}
//                 </div>
//                 {h.comment && (
//                   <div className="ml-5 italic text-gray-600">
//                     💬 {h.comment}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MyReader;

import { useEffect, useRef, useState } from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";

interface Highlight {
  cfiRange: string;
  text: string;
  color: string;
  comment?: string;
  position?: { x: number; y: number }; // Joylashuv qo'shildi
}

const MyReader = () => {
  // const [size, setSize] = useState(100);
  const [selections, setSelections] = useState<Highlight[]>([]);
  // const [page, setPage] = useState("");
  const [showToc, setShowToc] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [firstRenderDone, setFirstRenderDone] = useState(false);
  const [popup, setPopup] = useState<{
    x: number;
    y: number;
    cfi: string;
    text: string;
  } | null>(null);
  const [selectedCfi, setSelectedCfi] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string>("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");

  const tocRef = useRef<any>(null);
  const renditionRef = useRef<any>(null);

  const colors = ["green", "yellow", "red", "blue"];

  // Telegram Web App SDK integratsiyasi
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).Telegram?.WebApp) {
      const tg = (window as any).Telegram.WebApp;
      tg.ready();
      tg.expand();
    }
  }, []);

  const locationChanged = (epubcifi: any) => {
    // if (renditionRef.current && tocRef.current) {
    //   const { displayed, href } = renditionRef.current.location.start;
    //   const chapter = tocRef.current.find(
    //     (item) => item.href?.split("#")?.[0] === href
    //   );
    //   setPage(
    //     `Page ${displayed.page} of ${displayed.total} in chapter ${
    //       chapter ? chapter.label : "n/a"
    //     }`
    //   );
    // }
    if (!firstRenderDone) {
      setLocation(localStorage.getItem("book-progress"));
      setFirstRenderDone(true);
      return;
    }

    localStorage.setItem("book-progress", epubcifi);
    setLocation(epubcifi);
  };

  // const changeSize = (newSize: number) => {
  //   setSize(newSize);
  // };

  const handleChapterClick = async (item: any) => {
    if (renditionRef.current && item.href) {
      try {
        await renditionRef.current.display(item.href);
        setLocation(item.href);
        localStorage.setItem("book-progress", item.href);
        setShowToc(false);
      } catch (error) {
        console.error("Chapter o'tishda xato:", error);
      }
    } else {
      console.warn("Rendition yoki href mavjud emas");
    }
  };

  // Highlight tanlash
  const handleHighlight = (color: string) => {
    if (selectedCfi && renditionRef.current && popup) {
      renditionRef.current.annotations.add(
        "highlight",
        selectedCfi,
        {},
        null,
        "hl",
        {
          fill: color,
          "fill-opacity": "0.4",
          "mix-blend-mode": "multiply",
        }
      );

      const newHighlight: Highlight = {
        cfiRange: selectedCfi,
        color,
        text: selectedText,
        position: { x: popup.x, y: popup.y }, // Joylashuv saqlanadi
      };

      const updated = [...selections, newHighlight];
      setSelections(updated);
      localStorage.setItem("highlights", JSON.stringify(updated));

      setPopup(null);
      setSelectedCfi(null);
      setSelectedText("");
    }
  };

  const handleAddComment = () => {
    setShowCommentInput(true);
  };

  const handleSaveComment = () => {
    if (!commentText.trim() || !selectedCfi || !popup) return;
    const updated = selections.map((h) =>
      h.cfiRange === selectedCfi
        ? { ...h, comment: commentText, position: { x: popup.x, y: popup.y } }
        : h
    );
    if (!updated.some((h) => h.cfiRange === selectedCfi)) {
      updated.push({
        cfiRange: selectedCfi,
        text: selectedText,
        color: colors[0], // Default rang
        comment: commentText,
        position: { x: popup.x, y: popup.y },
      });
    }
    setSelections(updated);
    localStorage.setItem("highlights", JSON.stringify(updated));
    setCommentText("");
    setShowCommentInput(false);
    setPopup(null);
  };

  // Font o'lchami va uslubini yangilash
  useEffect(() => {
    if (renditionRef.current) {
      renditionRef.current.themes.fontSize(`${16}px`);
      renditionRef.current.themes.font("arial");
    }
  }, []);

  // Highlight va commentlarni qayta yuklash
  useEffect(() => {
    if (renditionRef.current) {
      const highlights = JSON.parse(localStorage.getItem("highlights") || "[]");
      highlights.forEach((highlight: Highlight) => {
        renditionRef.current.annotations.add(
          "highlight",
          highlight.cfiRange,
          {},
          null,
          "hl",
          {
            fill: highlight.color || "green",
            "fill-opacity": "0.4",
            "mix-blend-mode": "multiply",
          }
        );
        if (highlight) {
          console.log('view ', renditionRef.current)
          const view =
            renditionRef.current.annotations.rendition.manager?.views
              ?._views?.[0];
          if (view) {
            const rangeFromCfi = view.contents?.range(highlight.cfiRange);
            if (rangeFromCfi) {
              const dot = view.document.createElement("span");
              dot.className = "annotation-dot";
              dot.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background-color:#F59E0B;
                border: 1px solid #F59E0B;
                border-radius: 50%;
                cursor: pointer;
                z-index: 10;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                transition: transform 0.2s;
              `;

              const rects = rangeFromCfi.getClientRects();

              if (rects.length > 0) {
                const firstRect = rects[0];
                // console.log(firstRect, view);

                dot.style.left = `${
                  firstRect.left - (firstRect.left - firstRect.right)
                }px`;
                dot.style.top = `${firstRect.top + firstRect.height / 2 - 6}px`;
              }
              dot.onclick = (e: MouseEvent) => {
                e.stopPropagation();
                // const iframe = view.window.frameElement;
                // const iframeRect = iframe.getBoundingClientRect();
                // const dotRect = dot.getBoundingClientRect();

                // setSelectedAnnotation({ 
                //    annotation,
                //   position: {
                //     top: iframeRect.top + dotRect.top + 20,
                //     left: iframeRect.left + dotRect.left,
                //   },
                // });
              };

              // Добавляем точку в документ
              view.document.body.appendChild(dot);   
            }
          }
        }
      });

      setSelections(highlights);
    }
  }, [renditionRef.current]);
  
  // Matn tanlash va popupni ko'rsatish
  useEffect(() => {
    if (!renditionRef.current) return;

    const setRenderSelection = (cfiRange: string, contents: any) => {
      try {
        const sel = contents?.window?.getSelection?.();
        let range, text, rect, iframeRect;

        if (!sel || sel.rangeCount === 0) {
          try {
            const view =
              renditionRef.current.annotations.rendition.manager?.views
                ?._views?.[0];
            if (view) {
              // const rangeFromCfi = view.contents.range(cfiRange); 
              // if (rangeFromCfi) {
              //   const dot = view.document.createElement("span"); 
              //   dot.className = "annotation-dot";
              //   dot.style.cssText = `
              //   position: absolute;
              //   width: 10px;
              //   height: 10px;
              //   background-color: #FCD34D;
              //   border: 1px solid #F59E0B;
              //   border-radius: 50%;
              //   cursor: pointer;
              //   z-index: 10;
              //   box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              //   transition: transform 0.2s;  
              // `;
              //   text = rangeFromCfi.toString();
              //   const rects = rangeFromCfi.getClientRects();
              //   if (rects.length > 0) {
              //     rect = rects[0];
              //     const iframeEl = view.window.frameElement;
              //     iframeRect = iframeEl?.getBoundingClientRect?.() ?? {
              //       left: `${rect.left - (rect.left - rect.right)}px`,
              //       top: `${rect.top + rect.height / 2 - 6}px`,
              //     };
              //   }
              //   if (rects.length > 0) {
              //     const firstRect = rects[0];
              //     // console.log(firstRect, view);

              //     dot.style.left = `${
              //       firstRect.left - (firstRect.left - firstRect.right)
              //     }px`;
              //     dot.style.top = `${
              //       firstRect.top + firstRect.height / 2 - 6
              //     }px`;
              //   }
              //   view.document.body.appendChild(dot);
              // }
            }
          } catch (e) {
            console.warn("No DOM selection and fallback failed", e);
            return;
          }
        } else {
          range = sel.getRangeAt(0);
          if (!range) return;
          text = sel.toString();
          rect = range.getBoundingClientRect();
          const iframeEl =
            contents?.iframe ||
            contents?.window?.frameElement ||
            renditionRef.current.annotations.rendition.manager?.views
              ?._views?.[0]?.window?.frameElement;
          iframeRect = iframeEl?.getBoundingClientRect?.() ?? {
            left: 0,
            top: 0,
          };
          sel.removeAllRanges();
        }

        if (text && rect) {
          const x = iframeRect.left + rect.left + rect.width / 2;
          const y = iframeRect.top + rect.top + window.scrollY - 60;
          setPopup({ x, y, cfi: cfiRange, text });
          setSelectedCfi(cfiRange);
          setSelectedText(text);
          setShowCommentInput(false);
          setCommentText("");
        }
      } catch (err) {
        console.error("setRenderSelection error:", err);
      }
    };

    renditionRef.current.on("selected", setRenderSelection);

    const handleClickOutside = () => {
      setPopup(null);
      setShowCommentInput(false);
      setCommentText("");
    };

    renditionRef.current.on("click", handleClickOutside);

    return () => {
      renditionRef.current.off("selected", setRenderSelection);
      renditionRef.current.off("click", handleClickOutside);
    };
  }, [selections, renditionRef.current]);

  const ownStyles = {
    ...ReactReaderStyle,
    reader: {
      ...ReactReaderStyle.reader,
      background: "#F8F4ED",
      position: "sticky",
      inset: 0,
      width: "100%",
      height: "100vh",
      padding: 0,
      margin: 0,
      boxSizing: "border-box",
    },
    container: {
      ...ReactReaderStyle.container,
      width: "100%",
      height: "100%",
      padding: 0,
      margin: 0,
    },
    arrow: {
      display: "none",
    },
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflowY: "auto",
        position: "relative",
      }}
    >
      <ReactReader
        readerStyles={ownStyles as any}
        location={location}
        locationChanged={locationChanged}
        url="https://react-reader.metabits.no/files/alice.epub"
        getRendition={(rendition) => {
          renditionRef.current = rendition;
          rendition.themes.default({
            "::selection": { background: "orange" },
          });
          rendition.themes.register("custom", {
            "*": {
              color: "#000",
              background: "#F8F4ED !important",
            },
            "body.x-ebookmaker": {
              padding: "16px !important",
              margin: "0 !important",
            },
          });
          rendition.themes.select("custom");
        }}
        tocChanged={(toc) => (tocRef.current = toc)}
        showToc={false}
        epubOptions={{
          flow: "scrolled",
          manager: "continuous",
          allowPopups: true,
          allowScriptedContent: true,
        }}
      />

      {/* Popup */}
      {popup && (
        <div
          className="absolute bg-white shadow-lg rounded-lg p-2 flex space-x-2"
          style={{
            position: "fixed",
            top: popup.y,
            left: popup.x,
            transform: "translate(-50%, -100%)",
            zIndex: 1000,
          }}
        >
          {colors.map((color) => (
            <button
              key={color}
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: color }}
              onClick={() => handleHighlight(color)}
            />
          ))}
          <button
            onClick={handleAddComment}
            className="px-2 py-1 text-sm bg-gray-200 rounded"
          >
            💬
          </button>
        </div>
      )}

      {/* Comment input */}
      {showCommentInput && popup && (
        <div
          className="absolute bg-white shadow-lg rounded-lg p-2 flex flex-col space-y-2"
          style={{
            position: "fixed",
            top: popup.y,
            left: popup.x,
            transform: "translate(-50%, -120%)",
            zIndex: 1000,
          }}
        >
          <textarea
            className="border rounded p-1 w-48 h-16 text-sm"
            placeholder="Write comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button
            onClick={handleSaveComment}
            className="bg-blue-500 text-white text-sm px-2 py-1 rounded"
          >
            Save
          </button>
        </div>
      )}

      {/* TOC */}
      <button
        onClick={() => setShowToc(!showToc)}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 1000,
          padding: "8px 12px",
          background: "#333",
          color: "#fff",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        }}
      >
        ☰ Chapters
      </button>

      {showToc && (
        <div
          style={{
            position: "fixed",
            top: "3.5rem",
            right: "1rem",
            zIndex: 1000,
            width: "250px",
            maxHeight: "60vh",
            overflowY: "auto",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          <ul style={{ listStyle: "none", padding: "0.5rem", margin: 0 }}>
            {tocRef.current?.map((item: any) => (
              <li
                key={item.href}
                onClick={() => handleChapterClick(item)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#eee")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Comment belgisi */}
      {selections.map(
        (highlight, idx) =>
          highlight.comment &&
          highlight.position && (
            <div
              key={idx}
              className="absolute"
              style={{
                position: "fixed",
                top: highlight.position.y,
                left: highlight.position.x + 10, // Highlight yonida joylashadi
                zIndex: 999,
                cursor: "pointer",
              }}
              title={highlight.comment} // Hover qilganda izoh ko'rinadi
              onClick={() => {
                // setPopup({
                //   x: highlight.position.x,
                //   y: highlight.position.y,
                //   cfi: highlight.cfiRange,
                //   text: highlight.text,
                // });
                setSelectedCfi(highlight.cfiRange);
                setSelectedText(highlight.text);
                setCommentText(highlight.comment || "");
                setShowCommentInput(true);
              }}
            >
              💬
            </div>
          )
      )}

      {/* Izohlar ro'yxati */}
      {selections.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full bg-gray-100 p-2 max-h-40 overflow-y-auto">
          <h4 className="font-semibold mb-2">📌 Comments & Highlights</h4>
          {selections.map((h, idx) => (
            <div key={idx} className="mb-2 text-sm">
              <div>
                <span
                  className="inline-block w-3 h-3 mr-2 rounded-full"
                  style={{ backgroundColor: h.color }}
                ></span>
                {h.text}
              </div>
              {h.comment && (
                <div className="ml-5 italic text-gray-600">💬 {h.comment}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReader;


// import { useEffect, useRef, useState } from "react";
// import { ReactReader, ReactReaderStyle } from "react-reader";

// // Ranglar ro'yxati
// const highlightColors = [
//   { name: "Yashil", value: "green", opacity: "0.5" },
//   { name: "Sariq", value: "yellow", opacity: "0.3" },
//   { name: "Qizil", value: "red", opacity: "0.4" },
//   { name: "Ko'k", value: "blue", opacity: "0.4" },
// ];

// const MyReader = () => {
//   const [size, setSize] = useState(100);
//   const [selections, setSelections] = useState([]);
//   const [page, setPage] = useState("");
//   const [showToc, setShowToc] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [firstRenderDone, setFirstRenderDone] = useState(false);
//   const [popup, setPopup] = useState<{
//     visible: boolean;
//     text: string;
//     cfiRange: string;
//     position: { top: number; left: number };
//     selectedColor: string;
//   }>({
//     visible: false,
//     text: "",
//     cfiRange: "",
//     position: { top: 0, left: 0 },
//     selectedColor: highlightColors[0].value,
//   });
//   const tocRef = useRef(null);
//   const renditionRef = useRef<any>(null);

//   // Telegram Web App SDK integratsiyasi
//   useEffect(() => {
//     if (typeof window !== "undefined" && (window as any).Telegram?.WebApp) {
//       const tg = (window as any).Telegram.WebApp;
//       tg.ready();
//       tg.expand();
//     }
//   }, []);

//   const locationChanged = (epubcifi: any) => {
//     if (renditionRef.current && tocRef.current) {
//       const { displayed, href } = renditionRef.current.location.start;
//       const chapter = tocRef.current.find(
//         (item) => item.href?.split("#")?.[0] === href
//       );
//       setPage(
//         `Page ${displayed.page} of ${displayed.total} in chapter ${
//           chapter ? chapter.label : "n/a"
//         }`
//       );
//     }
//     if (!firstRenderDone) {
//       setLocation(localStorage.getItem("book-progress"));
//       setFirstRenderDone(true);
//       return;
//     }

//     localStorage.setItem("book-progress", epubcifi);
//     setLocation(epubcifi);
//   };

//   const changeSize = (newSize: number) => {
//     setSize(newSize);
//   };

//   const handleChapterClick = async (item: any) => {
//     if (renditionRef.current && item.href) {
//       try {
//         await renditionRef.current.display(item.href);
//         setLocation(item.href);
//         localStorage.setItem("book-progress", item.href);
//         setShowToc(false);
//       } catch (error) {
//         console.error("Chapter o'tishda xato:", error);
//       }
//     } else {
//       console.warn("Rendition yoki href mavjud emas");
//     }
//   };

//   // Font o'lchami va uslubini yangilash
//   useEffect(() => {
//     if (renditionRef.current) {
//       renditionRef.current.themes.fontSize(`${size}%`);
//       renditionRef.current.themes.font("arial");
//     }
//   }, [size]);

//   // Highlightlarni qayta yuklash
//   useEffect(() => {
//     if (renditionRef.current) {
//       const highlights = JSON.parse(localStorage.getItem("highlights") || "[]");
//       highlights.forEach((highlight) => {
//         console.log("Highlight: ", renditionRef.current.annotations?.rendition?.manager);
//         renditionRef.current.annotations.add(
//           "highlight",
//           highlight.cfiRange,
//           {},
//           null,
//           "hl",
//           {
//             fill: highlight.color || "green",
//             "fill-opacity": highlight.opacity || "0.5",
//             "mix-blend-mode": "multiply",
//           }
//         );
//       });
//       setSelections(highlights);
//     }
//   }, []);

//   // Matn tanlash va popupni ko'rsatish
//   useEffect(() => {
//     if (renditionRef.current) {
//       const setRenderSelection = (cfiRange: string, contents: any) => {
//         try {
//           const range = renditionRef.current.getRange(cfiRange);
//           const text = range.toString();
//           const rect = range.getBoundingClientRect();

//           console.log("Selected text:", text, "Rect:", rect); // Debug

//           // Popup pozitsiyasini hisoblash
//           setPopup({
//             visible: true,
//             text,
//             cfiRange,
//             position: {
//               top: rect.top + window.scrollY - 60, // Yuqorida joylashadi
//               left: rect.left + window.scrollX + rect.width / 2,
//             },
//             selectedColor: highlightColors[0].value,
//           });

//           contents.window.getSelection().removeAllRanges();
//         } catch (error) {
//           console.error("Matn tanlashda xato:", error);
//         }
//       };

//       renditionRef.current.on("selected", setRenderSelection);

//       // Popupni yopish uchun click hodisasini qo'shish
//       const handleClickOutside = () => {
//         setPopup((prev) => ({ ...prev, visible: false }));
//       };

//       renditionRef.current.on("click", handleClickOutside);

//       return () => {
//         renditionRef.current.off("selected", setRenderSelection);
//         renditionRef.current.off("click", handleClickOutside);
//       };
//     }
//   }, [selections]);

//   // Highlightni qo'shish yoki o'chirish
//   const addHighlight = (color: string, opacity: string) => {
//     if (renditionRef.current && popup.cfiRange) {
//       renditionRef.current.annotations.add(
//         "highlight",
//         popup.cfiRange,
//         {},
//         null,
//         "hl",
//         { fill: color, "fill-opacity": opacity, "mix-blend-mode": "multiply" }
//       );

//       const newSelections = selections.concat({
//         text: popup.text,
//         cfiRange: popup.cfiRange,
//         color,
//         opacity,
//       });
//       setSelections(newSelections);
//       localStorage.setItem("highlights", JSON.stringify(newSelections));
//       setPopup({ ...popup, visible: false });
//     }
//   };

//   const removeHighlight = () => {
//     if (renditionRef.current && popup.cfiRange) {
//       renditionRef.current.annotations.remove(popup.cfiRange, "highlight");
//       const newSelections = selections.filter(
//         (s) => s.cfiRange !== popup.cfiRange
//       );
//       setSelections(newSelections);
//       localStorage.setItem("highlights", JSON.stringify(newSelections));
//       setPopup({ ...popup, visible: false });
//     }
//   };

//   const ownStyles = {
//     ...ReactReaderStyle,
//     reader: {
//       ...ReactReaderStyle.reader,
//       background: "#F8F4ED",
//       position: "sticky",
//       inset: 0,
//       width: "100%",
//       height: "100vh",
//       padding: 0,
//       margin: 0,
//       boxSizing: "border-box",
//     },
//     container: {
//       ...ReactReaderStyle.container,
//       width: "100%",
//       height: "100%",
//       padding: 0,
//       margin: 0,
//     },
//     view: {
//       ...ReactReaderStyle.view,
//       padding: 0,
//       margin: 0,
//     },
//     arrow: {
//       display: "none",
//     },
//   };

//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         margin: 0,
//         padding: 0,
//         overflowY: "auto",
//         position: "relative",
//       }}
//     >
//       <ReactReader
//         readerStyles={ownStyles}
//         location={location}
//         locationChanged={locationChanged}
//         url="https://react-reader.metabits.no/files/alice.epub"
//         getRendition={(rendition) => {
//           renditionRef.current = rendition;
//           rendition.themes.default({
//             "::selection": { background: "orange" },
//           });
//           rendition.themes.register("custom", {
//             "*": {
//               color: "#000",
//               background: "#F8F4ED !important",
//             },
//             "body.x-ebookmaker": {
//               padding: "16px !important",
//               margin: "0 !important",
//             },
//           });
//           rendition.themes.select("custom");
//         }}
//         tocChanged={(toc) => (tocRef.current = toc)}
//         showToc={false}
//         epubOptions={{
//           flow: "scrolled",
//           manager: "continuous",
//           allowPopups: true,
//           allowScriptedContent: true,
//         }}
//       />

//       <button
//         onClick={() => setShowToc(!showToc)}
//         style={{
//           position: "absolute",
//           top: "1rem",
//           right: "1rem",
//           zIndex: 1000, // Yuqori z-index
//           padding: "8px 12px",
//           background: "#333",
//           color: "#fff",
//           borderRadius: "4px",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         ☰ Chapters
//       </button>

//       {showToc && (
//         <div
//           style={{
//             position: "fixed",
//             top: "3.5rem",
//             right: "1rem",
//             zIndex: 1000,
//             width: "250px",
//             maxHeight: "60vh",
//             overflowY: "auto",
//             background: "#fff",
//             border: "1px solid #ccc",
//             borderRadius: "8px",
//             boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
//           }}
//         >
//           <ul style={{ listStyle: "none", padding: "0.5rem", margin: 0 }}>
//             {tocRef.current?.map((item) => (
//               <li
//                 key={item.href}
//                 onClick={() => handleChapterClick(item)}
//                 style={{
//                   padding: "8px",
//                   cursor: "pointer",
//                   borderRadius: "4px",
//                   transition: "background 0.2s",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.background = "#eee")}
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.background = "transparent")
//                 }
//               >
//                 {item.label}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {popup.visible && (
//         <div
//           style={{
//             position: "fixed", // Telegram Mini App uchun fixed
//             top: `${popup.position.top}px`,
//             left: `${popup.position.left}px`,
//             transform: "translateX(-50%)",
//             zIndex: 1000, // Yuqori z-index
//             background: "#fff",
//             border: "1px solid #ccc",
//             borderRadius: "8px",
//             padding: "8px",
//             boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
//             maxWidth: "300px",
//             textAlign: "center",
//           }}
//         >
//           <p style={{ margin: "0 0 8px", fontSize: "14px" }}>
//             "{popup.text.length > 50 ? popup.text.substring(0, 50) + "..." : popup.text}"
//           </p>
//           <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
//             {highlightColors.map((color) => (
//               <button
//                 key={color.value}
//                 onClick={() => addHighlight(color.value, color.opacity)}
//                 style={{
//                   padding: "4px 8px",
//                   background: color.value,
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   opacity: color.opacity,
//                 }}
//               >
//                 {color.name}
//               </button>
//             ))}
//             <button
//               onClick={removeHighlight}
//               style={{
//                 padding: "4px 8px",
//                 background: "#dc3545",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//               }}
//             >
//               O'chirish
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyReader;

// const MyReader = () => {
//   return <div>MyReader</div>
// }

// export default MyReader
