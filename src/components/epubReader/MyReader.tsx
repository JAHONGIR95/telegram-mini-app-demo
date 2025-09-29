import { useRef, useState } from "react";
import { ReactReader } from "react-reader";

const MyReader = () => {
  // And your own state logic to persist state
//   const [page, setPage] = useState("");
  const [location, setLocation] = useState(null);
  const [firstRenderDone, setFirstRenderDone] = useState(false);
//   const tocRef = useRef(null);
  const renditionRef = useRef<any>(null);
  const locationChanged = (epubcifi: any) => {
    // if (renditionRef.current && tocRef.current) {
    //   const { displayed, href } = renditionRef.current.location.start;
    //   const chapter = tocRef.current.find((item) => item.href === href);
    //   setPage(
    //     `Page ${displayed.page} of ${displayed.total} in chapter ${
    //       chapter ? chapter.label : "n/a"
    //     }`
    //   );
    // }
    if (!firstRenderDone) {
    //   setLocation(localStorage.getItem("book-progress"));
      setFirstRenderDone(true);
      return;
    }

    localStorage.setItem("book-progress", epubcifi);

    setLocation(epubcifi);
  };
  return (
    <div style={{ height: "100vh" }}>
      <ReactReader
        location={location}
        locationChanged={locationChanged}
        url="https://react-reader.metabits.no/files/alice.epub"
        getRendition={(rendition) => (renditionRef.current = rendition)}
        // tocChanged={toc => (tocRef.current = toc)}
      />
      <div
        style={{
        //   position: 'absolute',
        //   bottom: '1rem',
        //   right: '1rem',
        //   left: '1rem',
          textAlign: 'center',
          zIndex: 1
        }}
      >
        {/* {page} */}
      </div>
    </div>
  );
};

export default MyReader;
