import { useState, useRef } from "react";
import { ReactReader } from "react-reader";

interface Highlight {
  text: string;
  cfiRange: string;
  note: string;
}

const CustomReader = ({ url }: { url: string }) => {
  const [location, setLocation] = useState<string | number>(0);
  const [fontSize, setFontSize] = useState("100%");
  const [fontFamily, setFontFamily] = useState("serif");
  const [isScroll, setIsScroll] = useState(true);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const renditionRef = useRef<any>(null);

  // Rendition tayyor bo‘lganda style qo‘llash
  const applyStyles = (rendition: any) => {
    rendition.themes.fontSize(fontSize);
    rendition.themes.font(fontFamily);
    rendition.flow(isScroll ? "scrolled" : "paginated");
  };

  // Highlight qo‘shish
  const handleHighlight = () => {
    const rendition = renditionRef.current;
    if (!rendition) return;

    const selection = rendition.getSelection();
    if (selection && selection.text) {
      const note = prompt("Meaning/Izoh qo‘shing:") || "";
      setHighlights((prev) => [
        ...prev,
        { text: selection.text, cfiRange: selection.cfiRange, note },
      ]);

      rendition.annotations.add(
        "highlight",
        selection.cfiRange,
        {},
        undefined,
        "hl",
        { fill: "yellow", "fill-opacity": "0.5" }
      );
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "10px",
          background: "#f5f5f5",
          alignItems: "center",
        }}
      >
        <button onClick={() => setIsScroll((prev) => !prev)}>
          {isScroll ? "Horizontal Mode" : "Scroll Mode"}
        </button>

        <select
          value={fontSize}
          onChange={(e) => {
            setFontSize(e.target.value);
            if (renditionRef.current) renditionRef.current.themes.fontSize(e.target.value);
          }}
        >
          <option value="80%">Small</option>
          <option value="100%">Normal</option>
          <option value="120%">Large</option>
          <option value="150%">XLarge</option>
        </select>

        <select
          value={fontFamily}
          onChange={(e) => {
            setFontFamily(e.target.value);
            if (renditionRef.current) renditionRef.current.themes.font(e.target.value);
          }}
        >
          <option value="serif">Serif</option>
          <option value="sans-serif">Sans-serif</option>
          <option value="monospace">Monospace</option>
        </select>

        <button onClick={handleHighlight}>Highlight</button>
      </div>

      {/* Reader */}
      <div style={{ flex: 1 }}>
        <ReactReader
          url={url}
          location={location}
          locationChanged={(epubcfi: string) => setLocation(epubcfi)}
          getRendition={(rendition) => {
            renditionRef.current = rendition;
            applyStyles(rendition);
          }}
          
        />
      </div>

      {/* Highlightlar */}
      {highlights.length > 0 && (
        <div style={{ padding: "10px", background: "#fafafa", borderTop: "1px solid #ddd" }}>
          <h4>Highlights</h4>
          <ul>
            {highlights.map((hl, idx) => (
              <li key={idx}>
                <b>{hl.text}</b> – {hl.note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomReader;
