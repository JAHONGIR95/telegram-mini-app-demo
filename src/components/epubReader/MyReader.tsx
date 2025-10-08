// import { useEffect, useRef, useState } from "react";
// import { EpubViewStyle, ReactReader, ReactReaderStyle } from "react-reader";

// const MyReader = () => {
//   // And your own state logic to persist state
//   const [size, setSize] = useState(100);
//   const [selections, setSelections] = useState([]);
//   const [page, setPage] = useState("");
//   const [location, setLocation] = useState(null);
//   const [firstRenderDone, setFirstRenderDone] = useState(false);
//   const tocRef = useRef(null);
//   const renditionRef = useRef<any>(null);
//   const locationChanged = (epubcifi: any) => {
//     if (renditionRef.current && tocRef.current) {
//       const { displayed, href } = renditionRef.current.location.start;
//       const chapter = tocRef.current.find((item) => item.href === href);
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

//   const changeSize = (newSize) => {
//     setSize(newSize);
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
//     arrow: {
//       display: "none",
//     },
//     progress: {
//       display: "none",
//     },
//     sidebar: {
//       display: "none",
//     },
//     toc: {
//       display: "none",
//     },
//     viewer: {
//       height: "100vh",
//       padding: 0,
//       width: "100vw",
//       display: 'none'
//     },
//     // container: {
//       // height: "100vh",
//       // padding: 0,
//       // width: "100vw",
//       // display: 'none'
//     // },
//     // content: {
//     //   height: "100vh",
//     //   padding: 0,
//     //   width: "100vw",
//     //   // display: 'none'
//     // },
//     // holder: {
//     //   height: "100vh",
//     //   padding: 0,
//     //   width: "100vw",
//     //   // display: 'none'
//     // },
//     // book: {
//     //   height: "100vh",
//     //   padding: 0,
//     //   width: "100vw",
//     //   // display: 'none'
//     // },
//   };

//   const epubViewStyle = {
//     ...EpubViewStyle,
//     display: "none",
//     viewer: {
//       height: "100vh",
//       padding: 0,
//       width: "100vw",
//       display: 'none'
//     },
//   };
//   // const ownStyles = {
//   //   ...ReactReaderStyle,
//   //   arrow: {
//   //     ...ReactReaderStyle.arrow,
//   //     color: "red",
//   //   },
//   // };

//   return (
//     <>
//       <div>
//         <button onClick={() => changeSize(Math.max(80, size - 10))}>-</button>
//         <span>Current size: {size}%</span>
//         <button onClick={() => changeSize(Math.min(130, size + 10))}>+</button>
//       </div>
//       <div style={{ height: "100vh" }}>
//         <ReactReader
//           readerStyles={ownStyles}
//           epubViewStyles={epubViewStyle}
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
//             setSelections([]);
//           }}
//           tocChanged={(toc) => (tocRef.current = toc)}
//           showToc={false}
//           epubOptions={{
//             flow: "scrolled",
//             manager: "continuous",
//           }}
//         />
//         <div
//           style={{
//             //   position: 'absolute',
//             //   bottom: '1rem',
//             //   right: '1rem',
//             //   left: '1rem',
//             textAlign: "center",
//             zIndex: 1,
//           }}
//         >
//           {page}
//         </div>
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

//   console.log(toc, location);

//   // Oldingi pozitsiyani tiklash
//   useEffect(() => {
//     const saved = localStorage.getItem("book-progress");
//     if (saved) setLocation(saved);
//   }, [location]);

//   const locationChanged = (epubcifi: string) => {
//     setLocation(epubcifi);
//     localStorage.setItem("book-progress", epubcifi);
//   };

//   const handleChapterClick = async (item: any) => {
//     if (renditionRef.current && item.href) {
//       // Ehtiyot uchun kichik delay qo'yish
//       await new Promise((resolve) => setTimeout(resolve, 50));
//       renditionRef.current.display(item.href);
//       localStorage.setItem("book-progress", item.href);
//       setLocation(item.href);
//       setShowToc(false);
//     } else {
//       console.warn("Rendition hali yuklanmagan");
//     }
//   };

//   return (
//     <div style={{ position: "relative", height: "100vh" }}>
//       <ReactReader
//         location={'890231480751205683_11-h-3.htm.xhtml#pgepubid00005'}
//         locationChanged={locationChanged}
//         url="https://react-reader.metabits.no/files/alice.epub"
//         getRendition={(rendition) => {
//           renditionRef.current = rendition;
//           renditionRef.current.themes.default({
//             "::selection": { background: "orange" },
//           });
//         }}
//         tocChanged={(toc) => {
//           setToc(toc);
//         }}
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
