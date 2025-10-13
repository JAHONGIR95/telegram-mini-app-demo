// 📄 components/AnnotationPopup.tsx
import { useState } from "react";

const colors = ["#FFD700", "#00FF7F", "#87CEFA", "#FF69B4"];

export const AnnotationPopup = ({ position, onSelectColor, onAddComment, onClose }) => {
  const [comment, setComment] = useState("");

  return (
    <div
      style={{
        position: "absolute",
        top: position.top + 20,
        left: position.left,
        transform: "translateX(-50%)",
        background: "white",
        border: "1px solid #ccc",
        padding: "8px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        zIndex: 1000,
        width: "200px",
      }}
    >
      <div style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
        {colors.map((c) => (
          <div
            key={c}
            onClick={() => onSelectColor(c)}
            style={{
              width: "20px",
              height: "20px",
              background: c,
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      <textarea
        placeholder="Comment yozing..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{
          width: "100%",
          minHeight: "50px",
          marginBottom: "6px",
          resize: "none",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() => {
            onAddComment(comment);
            setComment("");
          }}
          style={{
            background: "#333",
            color: "#fff",
            border: "none",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          Saqlash
        </button>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            color: "#333",
            border: "none",
            fontSize: "18px",
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};
