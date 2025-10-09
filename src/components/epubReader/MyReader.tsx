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

//   return (
//     <>
//       <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, overflowY: 'auto' }}>
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

// import { useRef, useState } from "react";
// import { ReactReader } from "react-reader";

// export default function MyReader() {
//   const renditionRef = useRef<any>(null);
//   const [location, setLocation] = useState<string | null>(null);
//   const [toc, setToc] = useState<any[]>([]);
//   const [showToc, setShowToc] = useState(false);

//   const locationChanged = (epubcifi: string) => {
//     setLocation(epubcifi);
//     localStorage.setItem("book-progress", epubcifi);
//   };

//   return (
//     <div style={{ position: "relative", height: "100vh" }}>
//       {/* 📖 Epub Reader */}
//       <ReactReader
//         location={location}
//         locationChanged={locationChanged}
//         url="https://react-reader.metabits.no/files/alice.epub"
//         getRendition={(rendition) => {
//           renditionRef.current = rendition;
//           // Flow type: scroll
//           renditionRef.current.themes.default({
//             "::selection": { background: "orange" },
//           });
//         }}
//         tocChanged={(toc) => setToc(toc)}
//         epubOptions={{
//           flow: "scrolled",
//           manager: "continuous",
//         }}
//         readerStyles={{
//           arrow: { display: "none" },
//           sidebar: { display: "none" },
//           toc: { display: "none" },
//           progress: { display: "none" },
//         }}
//       />

//       {/* 📚 Custom TOC Trigger */}
//       <button
//         onClick={() => setShowToc(!showToc)}
//         style={{
//           position: "absolute",
//           top: "1rem",
//           right: "1rem",
//           zIndex: 10,
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

//       {/* 🧭 Custom TOC List */}
//       {showToc && (
//         <div
//           style={{
//             position: "absolute",
//             top: "3.5rem",
//             right: "1rem",
//             zIndex: 10,
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
//             {toc.map((item) => (
//               <li
//                 key={item.href}
//                 onClick={() => {
//                   renditionRef.current.display(item.href);
//                   setShowToc(false);
//                 }}
//                 style={{
//                   padding: "8px",
//                   cursor: "pointer",
//                   borderRadius: "4px",
//                   transition: "background 0.2s",
//                 }}
//                 onMouseEnter={(e) => (e.currentTarget.style.background = "#eee")}
//                 onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
//               >
//                 {item.label}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useRef, useState, useEffect } from "react";
// import { ReactReader } from "react-reader";

// export default function MyReader() {
//   const renditionRef = useRef<any>(null);
//   const [location, setLocation] = useState<string | null>(null);
//   const [toc, setToc] = useState<any[]>([]);
//   const [showToc, setShowToc] = useState(false);

//   // Faqat birinchi yuklanishda localStorage dan o'qish
//   useEffect(() => {
//     const saved = localStorage.getItem("book-progress");
//     if (saved && !location) {
//       setLocation(saved);
//     }
//   }, []);

//   // Rendition tayyor bo'lganda location ni o'rnatish
//   useEffect(() => {
//     if (renditionRef.current && location) {
//       renditionRef.current.display(location).catch((err: any) => {
//         console.error("Location o'rnatishda xato:", err);
//       });
//     }
//   }, [renditionRef.current, location]);

//   const locationChanged = (epubcifi: string) => {
//     setLocation(epubcifi);
//     localStorage.setItem("book-progress", epubcifi);
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

//   return (
//     <div style={{ position: "relative", height: "100vh" }}>
//       <ReactReader
//         location={location}
//         locationChanged={locationChanged}
//         url="https://react-reader.metabits.no/files/alice.epub"
//         getRendition={(rendition) => {
//           renditionRef.current = rendition;
//           rendition.themes.default({
//             "::selection": { background: "orange" },
//           });
//         }}
//         tocChanged={(toc) => {
//           setToc(toc);
//           console.log("TOC:", toc); // Debug uchun
//         }}
//         // epubOptions={{
//           // flow: "paginated",
//           // manager: "continuous",
//         // }}
//         readerStyles={{
//           // arrow: { display: "none" },
//           // sidebar: { display: "none" },
//           toc: { display: "none" },
//           progress: { display: "none" },
//         }}
//       />

//       <button
//         onClick={() => setShowToc(!showToc)}
//         style={{
//           position: "absolute",
//           top: "1rem",
//           right: "1rem",
//           zIndex: 10,
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
//             position: "absolute",
//             top: "3.5rem",
//             right: "1rem",
//             zIndex: 10,
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
//             {toc.map((item) => (
//               <li
//                 key={item.href}
//                 onClick={() => handleChapterClick(item)}
//                 style={{
//                   padding: "8px",
//                   cursor: "pointer",
//                   borderRadius: "4px",
//                   transition: "background 0.2s",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.background = "#eee")
//                 }
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
//     </div>
//   );
// }

const MyReader = () => {
  return <div>MyReader</div>
}

export default MyReader
