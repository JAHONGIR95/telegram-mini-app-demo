// // import { useState } from 'react'
// // import { ReactReader } from 'react-reader'

// // export const BookReader = () => {
// //   const [location, setLocation] = useState<string | number>(0)
// //   const locationChanged = (epubcfi: string) => setLocation(epubcfi)
// //   return (
// //     <div style={{ height: '80vh' }}>
// //       <ReactReader
// //         url="https://react-reader.metabits.no/files/alice.epub"
// //         location={location}
// //         locationChanged={locationChanged}
// //       />
// //     </div>
// //   )
// // }

// // export default BookReader

// /*
// EpubReader.tsx
// A single-file React + TypeScript component that implements an EPUB reader using epub.js
// Features:
//  - Load EPUB from URL or File
//  - Continuous scroll mode (scrolled flow)
//  - Text highlight + save
//  - Add comment to a highlight
//  - Persist highlights/comments in localStorage
//  - Jump to highlight/comment

// Usage:
//  <EpubReader epubUrl="/path/to/book.epub" storageKey="my-book-key" />

// Notes for Telegram Mini App:
//  - This is a web component; wrap it inside your Telegram Mini App webview.
//  - If you use Telegram WebApp JS API, you can access window.Telegram.WebApp to interact with Telegram.
//  - Make sure your Mini App manifest allows loading the EPUB URL or host the EPUB inside the Mini App origin.

// Dependencies:
//  - react, react-dom
//  - epubjs (install: npm i epubjs)
//  - tailwindcss (optional — used for styling here but not required)
// */

// import React, { useEffect, useRef, useState } from "react";
// import ePub, { Book, Rendition, Contents } from "epubjs";

// type SavedHighlight = {
//   id: string;
//   cfiRange: string;
//   text: string;
//   comment?: string;
//   createdAt: string;
// };

// type Props = {
//   epubUrl?: string; // either URL to .epub or undefined if using file input
//   storageKey: string; // key to persist highlights/comments
//   allowFile?: boolean; // show file input to load local .epub
// };

// export default function EpubReader({
//   epubUrl,
//   storageKey,
//   allowFile = true,
// }: Props) {
//   const viewerRef = useRef<HTMLDivElement | null>(null);
//   const bookRef = useRef<Book | null>(null);
//   const renditionRef = useRef<Rendition | null>(null);
//   const [highlights, setHighlights] = useState<SavedHighlight[]>([]);
//   const [selectedText, setSelectedText] = useState("");
//   const [selectedCfi, setSelectedCfi] = useState("");
//   const [showCommentModal, setShowCommentModal] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [currentEpubUrl, setCurrentEpubUrl] = useState<string | undefined>(
//     epubUrl
//   );
//   const [fontSize, setFontSize] = useState(16);

//   // load saved highlights from localStorage
//   useEffect(() => {
//     const raw = localStorage.getItem(storageKey);
//     if (raw) {
//       try {
//         const parsed = JSON.parse(raw) as SavedHighlight[];
//         setHighlights(parsed);
//       } catch (e) {
//         console.warn("Could not parse saved highlights", e);
//       }
//     }
//   }, [storageKey]);

//   // init book + rendition when epub URL changes
//   useEffect(() => {
//     if (!currentEpubUrl || !viewerRef.current) return;

//     // clean up previous
//     if (renditionRef.current) {
//       renditionRef.current.destroy();
//       renditionRef.current = null;
//     }
//     if (bookRef.current) {
//       try {
//         bookRef.current.destroy();
//       } catch (e) {}
//       bookRef.current = null;
//     }

//     const book = ePub(currentEpubUrl);
//     bookRef.current = book;

//     const rendition = book.renderTo(viewerRef.current, {
//       width: "100%",
//       height: "100%",
//       flow: "scrolled", // continuous scroll
//     }) as Rendition;

//     renditionRef.current = rendition;

//     rendition.themes.default({
//       body: { "font-size": `${fontSize}px`, "line-height": "1.6" },
//     });

//     rendition.on("selected", (cfiRange: string, contents: Contents) => {
//       // get selected text
//       const sel = contents.window.getSelection();
//       const text = sel ? sel.toString().trim() : "";
//       if (!text) {
//         setSelectedText("");
//         setSelectedCfi("");
//         return;
//       }
//       setSelectedText(text);
//       setSelectedCfi(cfiRange);
//       // show a tiny quick-action UI — we'll just open comment modal here
//       setCommentText("");
//       setShowCommentModal(true);
//       // clear selection
//       sel?.removeAllRanges();
//     });

//     // when rendition is ready, display
//     rendition.display();

//     // when layout changes (e.g., user scrolls or resizes) we might re-apply annotations
//     rendition.on("rendered", () => {
//       applySavedHighlights();
//     });

//     // when a user clicks a highlighted annotation, open comment
//     // epubjs doesn't provide a unified annotation-click event; we'll add a delegated listener later

//     // cleanup on unmount or URL change
//     return () => {
//       try {
//         rendition.destroy();
//       } catch (e) {}
//       try {
//         book.destroy();
//       } catch (e) {}
//       renditionRef.current = null;
//       bookRef.current = null;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentEpubUrl]);

//   // update font size when changed
//   useEffect(() => {
//     if (renditionRef.current) {
//       renditionRef.current.themes.default({
//         body: { "font-size": `${fontSize}px`, "line-height": "1.6" },
//       });
//     }
//   }, [fontSize]);

//   // apply saved highlights into rendition
//   function applySavedHighlights() {
//     const rendition = renditionRef.current;
//     if (!rendition) return;
//     // first, remove existing annotation elements (epub.js will manage its own, but to avoid duplicates)
//     // then re-add
//     highlights.forEach((h) => {
//       try {
//         rendition.annotations.add(
//           "highlight",
//           h.cfiRange,
//           {},
//           null,
//           "my-highlight"
//         );
//       } catch (e) {
//         // adding an annotation may fail if the cfi is not in current rendered chapter yet
//         // epub.js will attach when that chapter is rendered, so ignore errors
//       }
//     });
//   }

//   // helper to persist highlights to localStorage
//   function persistHighlights(next: SavedHighlight[]) {
//     setHighlights(next);
//     localStorage.setItem(storageKey, JSON.stringify(next));
//   }

//   // add highlight + optional comment
//   function saveHighlight(cfiRange: string, text: string, comment?: string) {
//     const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
//     const h: SavedHighlight = {
//       id,
//       cfiRange,
//       text,
//       comment,
//       createdAt: new Date().toISOString(),
//     };
//     const next = [...highlights, h];
//     persistHighlights(next);
//     // add into rendition visuals
//     try {
//       renditionRef.current?.annotations.add(
//         "highlight",
//         cfiRange,
//         {},
//         (e: any) => {
//           // click handler for the annotation's element: open comment
//           // epub.js will insert an element with class 'epubjs-hl'
//         },
//         "my-highlight"
//       );
//     } catch (e) {
//       // ignore
//     }
//   }

//   // user confirms comment modal
//   function onConfirmComment() {
//     if (!selectedCfi || !selectedText) {
//       setShowCommentModal(false);
//       return;
//     }
//     saveHighlight(selectedCfi, selectedText, commentText || undefined);
//     setCommentText("");
//     setSelectedText("");
//     setSelectedCfi("");
//     setShowCommentModal(false);
//   }

//   // delete highlight
//   // function deleteHighlight(id: string) {
//   //   const next = highlights.filter((h) => h.id !== id);
//   //   persistHighlights(next);
//   //   // re-apply
//   //   // epub.js doesn't have a global remove by id; rebuild all annotations
//   //   renditionRef.current?.annotations.removeAll();
//   //   applySavedHighlights();
//   // }

//   // jump to highlight
//   // function goToHighlight(h: SavedHighlight) {
//   //   renditionRef.current?.display(h.cfiRange);
//   //   // also scroll a bit — rendition of scrolled flow will position
//   // }

//   // file input handling
//   async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     // create object URL
//     const url = URL.createObjectURL(file);
//     setCurrentEpubUrl(url);
//   }

//   return (
//     <div className="h-full w-full flex flex-col">
//       <div className="flex items-center gap-2 p-2 border-b">
//         <div className="flex gap-2 items-center">
//           <button
//             className="px-3 py-1 rounded bg-gray-200"
//             onClick={() => renditionRef.current?.prev()}
//           >
//             Prev
//           </button>
//           <button
//             className="px-3 py-1 rounded bg-gray-200"
//             onClick={() => renditionRef.current?.next()}
//           >
//             Next
//           </button>
//         </div>
//         <div className="ml-4 flex items-center gap-2">
//           <label className="flex items-center gap-2">
//             Font:
//             <input
//               type="range"
//               min={12}
//               max={28}
//               value={fontSize}
//               onChange={(e) => setFontSize(Number(e.target.value))}
//             />
//             <span className="ml-2">{fontSize}px</span>
//           </label>
//         </div>

//         <div className="ml-auto flex items-center gap-2">
//           {allowFile && (
//             <label className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer">
//               Load file
//               <input
//                 type="file"
//                 accept=".epub"
//                 onChange={onFileChange}
//                 className="hidden"
//               />
//             </label>
//           )}
//           <button
//             className="px-3 py-1 rounded bg-green-500 text-white"
//             onClick={() => {
//               // export highlights as JSON
//               const data = JSON.stringify(highlights, null, 2);
//               const blob = new Blob([data], { type: "application/json" });
//               const url = URL.createObjectURL(blob);
//               const a = document.createElement("a");
//               a.href = url;
//               a.download = `${storageKey}-highlights.json`;
//               a.click();
//               URL.revokeObjectURL(url);
//             }}
//           >
//             Export
//           </button>
//         </div>
//       </div>

//       <div className="flex-1 flex min-h-0">
//         <div
//           ref={viewerRef}
//           className="flex-1 overflow-auto"
//           style={{ minHeight: 0 }}
//         />

//         {/* <aside className="w-80 border-l p-2 overflow-auto bg-gray-50">
//           <h4 className="font-semibold">Highlights & Comments</h4>
//           {highlights.length === 0 && (
//             <p className="text-sm text-gray-500">
//               No highlights yet — select text to highlight and add a comment.
//             </p>
//           )}
//           <ul className="mt-2 space-y-2">
//             {highlights.map((h) => (
//               <li key={h.id} className="p-2 bg-white rounded shadow-sm">
//                 <div className="text-sm mb-1">
//                   {h.text.length > 120 ? `${h.text.slice(0, 120)}…` : h.text}
//                 </div>
//                 <div className="text-xs text-gray-600 mb-2">
//                   {h.comment || <em>No comment</em>}
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
//                     onClick={() => goToHighlight(h)}
//                   >
//                     Go to
//                   </button>
//                   <button
//                     className="px-2 py-1 text-sm bg-red-500 text-white rounded"
//                     onClick={() => deleteHighlight(h.id)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </aside> */}
//       </div>

//       {/* Comment Modal */}
//       {showCommentModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white rounded p-4 w-96">
//             <h3 className="font-semibold mb-2">Add highlight & comment</h3>
//             <div className="text-sm mb-2 text-gray-700">{selectedText}</div>
//             <textarea
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               className="w-full border p-2 rounded mb-2"
//               placeholder="Optional comment"
//             />
//             <div className="flex gap-2 justify-end">
//               <button
//                 className="px-3 py-1 rounded bg-gray-200"
//                 onClick={() => {
//                   setShowCommentModal(false);
//                   setSelectedText("");
//                   setSelectedCfi("");
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-3 py-1 rounded bg-blue-600 text-white"
//                 onClick={onConfirmComment}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
