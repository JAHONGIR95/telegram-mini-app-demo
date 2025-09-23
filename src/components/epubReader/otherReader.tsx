import { useEffect, useRef, useState } from "react";
import ePub, { Rendition } from "epubjs";

type CommentType = {
  cfi: string;
  text: string;
  color: string;
};

const COLORS = ["#ffeb3b", "#4caf50", "#2196f3", "#f44336", "#9c27b0"];

export function OtherReader() {
  const bookRef = useRef<any>(null);
  const renditionRef = useRef<Rendition | null>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);

  const [comments, setComments] = useState<CommentType[]>([]);
  const [selectedCfi, setSelectedCfi] = useState<string | null>(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const book = ePub("https://react-reader.metabits.no/files/alice.epub");
    bookRef.current = book;

    const rendition = book.renderTo(viewerRef.current!, {
      width: "100%",
      height: "100vh",
      flow: "scrolled-doc",
      manager: "continuous",
    });

    renditionRef.current = rendition;
    rendition.display();

    // Matn ajratilganda toolbar chiqaramiz
    rendition.on("selected", (cfiRange: string, contents: any) => {
      setSelectedCfi(cfiRange);

      // Toolbar pozitsiyasini topamiz
      const selection = contents.window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const rect = selection.getRangeAt(0).getBoundingClientRect();
        setToolbarPos({
          top: rect.top + window.scrollY - 40,
          left: rect.left + rect.width / 2,
        });
        setShowToolbar(true);
      }
    });

    return () => {
      rendition.destroy();
    };
  }, []);

  // Rang tanlaganda highlight qilish
  const highlightWithColor = (color: string) => {
    if (selectedCfi && renditionRef.current) {
      renditionRef.current.annotations.highlight(
        selectedCfi,
        { className: "epubjs-hl", style: `background:${color}` },
        () => console.log("Highlighted:", selectedCfi)
      );
    }
    setShowCommentInput(true); // Rang tanlagandan so‘ng comment input chiqadi
    setShowToolbar(false);
  };

  // Comment saqlash
  const saveComment = () => {
    if (selectedCfi && commentText) {
      const highlight = document.querySelector(
        `span[data-epubcfi='${selectedCfi}']`
      ) as HTMLElement;

      if (highlight) {
        highlight.style.position = "relative";
        const icon = document.createElement("span");
        icon.innerText = "💬";
        icon.style.position = "absolute";
        icon.style.right = "-20px";
        icon.style.top = "-10px";
        icon.style.cursor = "pointer";
        icon.onclick = () => alert(`Comment: ${commentText}`);
        highlight.appendChild(icon);
      }

      setComments((prev) => [...prev, { cfi: selectedCfi, text: commentText, color: "yellow" }]);
      setCommentText("");
      setShowCommentInput(false);
      setSelectedCfi(null);
    }
  };

  return (
    <div>
      <h2>Custom Epub Reader</h2>
      <div ref={viewerRef} style={{ border: "1px solid #ccc", height: "80vh", overflow: "auto" }} />

      {/* Rang tanlash toolbar */}
      {showToolbar && (
        <div
          style={{
            position: "absolute",
            top: toolbarPos.top,
            left: toolbarPos.left,
            background: "white",
            border: "1px solid #ddd",
            padding: "5px",
            display: "flex",
            gap: "5px",
            transform: "translate(-50%, -100%)",
            zIndex: 9999,
          }}
        >
          {COLORS.map((c) => (
            <div
              key={c}
              onClick={() => highlightWithColor(c)}
              style={{
                width: 20,
                height: 20,
                background: c,
                cursor: "pointer",
                borderRadius: "50%",
              }}
            />
          ))}
        </div>
      )}

      { comments.map((comment) => (
        <span>{comment.text}</span>
      ))

      }

      {/* Comment input */}
      {showCommentInput && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "white",
            border: "1px solid #ccc",
            padding: "10px",
            zIndex: 9999,
          }}
        >
          <textarea
            placeholder="Komment yozing..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            style={{ width: 200, height: 60 }}
          />
          <br />
          <button onClick={saveComment}>Saqlash</button>
        </div>
      )}
    </div>
  );
}
