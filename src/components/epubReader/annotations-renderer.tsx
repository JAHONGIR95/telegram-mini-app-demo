// 📄 components/AnnotationsRenderer.tsx
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { readerStore } from "./readerStore";

export const AnnotationsRenderer = ({ rendition, onDotClick }) => {
  const snap = useSnapshot(readerStore);

  useEffect(() => {
    if (!rendition) return;

    snap.annotations.forEach((annotation) => {
      rendition.annotations.add(
        "highlight",
        annotation.cfi,
        {},
        (e: any) => {
          const rect = e.target.getBoundingClientRect();
          onDotClick(annotation, {
            top: rect.top + window.scrollY,
            left: rect.left + rect.width / 2,
          });
        },
        "hl",
        {
          fill: annotation.color,
          "fill-opacity": "0.4",
          "mix-blend-mode": "multiply",
        }
      );
    });
  }, [rendition, snap.annotations]);

  return null;
};
