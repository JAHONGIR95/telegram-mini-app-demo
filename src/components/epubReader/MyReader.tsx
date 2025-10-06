import { useEffect, useRef, useState } from "react";
import { EpubViewStyle, ReactReader, ReactReaderStyle } from "react-reader";

const MyReader = () => {
  // And your own state logic to persist state
  // const [size, setSize] = useState(100);
  // const [selections, setSelections] = useState([]);
  // const [page, setPage] = useState("");
  // const [location, setLocation] = useState(null);
  // const [firstRenderDone, setFirstRenderDone] = useState(false);
  // const tocRef = useRef(null);
  // const renditionRef = useRef<any>(null);
  // const locationChanged = (epubcifi: any) => {
  //   if (renditionRef.current && tocRef.current) {
  //     const { displayed, href } = renditionRef.current.location.start;
  //     const chapter = tocRef.current.find((item) => item.href === href);
  //     setPage(
  //       `Page ${displayed.page} of ${displayed.total} in chapter ${
  //         chapter ? chapter.label : "n/a"
  //       }`
  //     );
  //   }
  //   if (!firstRenderDone) {
  //     setLocation(localStorage.getItem("book-progress"));
  //     setFirstRenderDone(true);
  //     return;
  //   }

  //   localStorage.setItem("book-progress", epubcifi);

  //   setLocation(epubcifi);
  // };

  // const changeSize = (newSize) => {
  //   setSize(newSize);
  // };
  // useEffect(() => {
  //   if (renditionRef.current) {
  //     renditionRef.current.themes.fontSize(`${size}%`);
  //     renditionRef.current.themes.font("arial");
  //   }
  // }, [size]);

  // useEffect(() => {
  //   if (renditionRef.current) {
  //     function setRenderSelection(cfiRange, contents) {
  //       setSelections(
  //         selections.concat({
  //           text: renditionRef.current.getRange(cfiRange).toString(),
  //           cfiRange,
  //         })
  //       );
  //       renditionRef.current.annotations.add(
  //         "highlight",
  //         cfiRange,
  //         {},
  //         null,
  //         "hl",
  //         { fill: "green", "fill-opacity": "0.5", "mix-blend-mode": "multiply" }
  //       );
  //       contents.window.getSelection().removeAllRanges();
  //     }
  //     renditionRef.current.on("selected", setRenderSelection);
  //     return () => {
  //       renditionRef.current.off("selected", setRenderSelection);
  //     };
  //   }
  // }, [setSelections, selections]);

  // const ownStyles = {
  //   ...ReactReaderStyle,
  //   arrow: {
  //     display: "none",
  //   },
  //   progress: {
  //     display: "none",
  //   },
  //   sidebar: {
  //     display: "none",
  //   },
  //   toc: {
  //     display: "none",
  //   },
  //   viewer: {
  //     height: "100vh",
  //     padding: 0,
  //     width: "100vw",
  //     display: 'none'
  //   },
  //   // container: {
  //     // height: "100vh",
  //     // padding: 0,
  //     // width: "100vw",
  //     // display: 'none'
  //   // },
  //   // content: {
  //   //   height: "100vh",
  //   //   padding: 0,
  //   //   width: "100vw",
  //   //   // display: 'none'
  //   // },
  //   // holder: {
  //   //   height: "100vh",
  //   //   padding: 0,
  //   //   width: "100vw",
  //   //   // display: 'none'
  //   // },
  //   // book: {
  //   //   height: "100vh",
  //   //   padding: 0,
  //   //   width: "100vw",
  //   //   // display: 'none'
  //   // },
  // };

  // const epubViewStyle = {
  //   ...EpubViewStyle,
  //   display: "none",
  //   viewer: {
  //     height: "100vh",
  //     padding: 0,
  //     width: "100vw",
  //     display: 'none'
  //   },
  // };
  // // const ownStyles = {
  // //   ...ReactReaderStyle,
  // //   arrow: {
  // //     ...ReactReaderStyle.arrow,
  // //     color: "red",
  // //   },
  // // };

  // return (
  //   <>
  //     <div>
  //       <button onClick={() => changeSize(Math.max(80, size - 10))}>-</button>
  //       <span>Current size: {size}%</span>
  //       <button onClick={() => changeSize(Math.min(130, size + 10))}>+</button>
  //     </div>
  //     <div style={{ height: "100vh" }}>
  //       <ReactReader
  //         readerStyles={ownStyles}
  //         epubViewStyles={epubViewStyle}
  //         location={location}
  //         locationChanged={locationChanged}
  //         url="https://react-reader.metabits.no/files/alice.epub"
  //         getRendition={(rendition) => {
  //           renditionRef.current = rendition;
  //           renditionRef.current.themes.default({
  //             "::selection": {
  //               background: "orange",
  //             },
  //           });
  //           setSelections([]);
  //         }}
  //         tocChanged={(toc) => (tocRef.current = toc)}
  //         epubOptions={{
  //           flow: "scrolled",
  //           manager: "continuous",
  //         }}
  //       />
  //       <div
  //         style={{
  //           //   position: 'absolute',
  //           //   bottom: '1rem',
  //           //   right: '1rem',
  //           //   left: '1rem',
  //           textAlign: "center",
  //           zIndex: 1,
  //         }}
  //       >
  //         {page}
  //       </div>
  //     </div>
  //   </>
  // );
  return null
};

export default MyReader;
