import React, { useEffect, useRef, useState } from "react";
import { MdComment, MdClose } from "react-icons/md";

interface HighlightMenuProps {
  selection: Selection | null;
  onHighlight: (color: string) => void;
  onComment: (text: string) => void;
}

export const HighlightMenu: React.FC<HighlightMenuProps> = ({
  selection,
  onHighlight,
  onComment
}) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (!rect.width && !rect.height) return;

    const menuWidth = 200;
    const menuHeight = showCommentBox ? 160 : 50;

    let left = rect.left + window.scrollX + rect.width / 2 - menuWidth / 2;
    let top = rect.top + window.scrollY - menuHeight - 10;

    if (left < 10) left = 10;
    if (left + menuWidth > window.innerWidth - 10)
      left = window.innerWidth - menuWidth - 10;
    if (top < 10) top = rect.bottom + window.scrollY + 10;

    setPosition({ top, left });
  }, [selection, showCommentBox]);

  if (!selection || !selection.toString().trim()) return null;

  const handleSaveComment = () => {
    if (comment.trim()) {
      onComment(comment);
      setComment("");
      setShowCommentBox(false);
    }
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white rounded-lg shadow-xl p-2 border"
      style={{ top: position.top, left: position.left, width: 200 }}
    >
      {!showCommentBox ? (
        <div className="flex items-center space-x-2">
          {["yellow", "green", "blue", "red"].map((color) => (
            <button
              key={color}
              onClick={() => onHighlight(color)}
              className="w-8 h-8 rounded hover:opacity-80"
              style={{ backgroundColor: color }}
              title={`${color} highlight`}
            />
          ))}

          <div className="w-px h-6 bg-gray-300" />
          <button
            onClick={() => setShowCommentBox(true)}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Add comment"
          >
            <MdComment size={20} />
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Add comment</span>
            <button
              onClick={() => setShowCommentBox(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <MdClose size={16} />
            </button>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded resize-none text-sm"
            rows={3}
            placeholder="Enter comment..."
            autoFocus
          />
          <div className="flex justify-end mt-2 space-x-2">
            <button
              onClick={() => setShowCommentBox(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveComment}
              disabled={!comment.trim()}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
