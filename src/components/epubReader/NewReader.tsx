// import React, { useRef, useState } from 'react';
// import { ReactReader } from 'react-reader';

// import { ReactReader } from "react-reader";

// const EpubReader: React.FC<{ url: string }> = ({ url }) => {
//   const renditionRef = useRef<any>(null);
//   const [highlights, setHighlights] = useState<string[]>([]);
//   const [showCommentModal, setShowCommentModal] = useState(false);
//   const [currentCfi, setCurrentCfi] = useState('');
//   const [commentText, setCommentText] = useState('');

//   const handleRendition = (rendition: any) => {
//     renditionRef.current = rendition;
//     rendition.themes.default({
//       body: {
//         overflow: 'auto',
//         height: '100vh',
//       },
//     });
//     rendition.book.ready.then(() => {
//       rendition.flow('scrolled');
//       rendition.spread('none');
//     });
//     rendition.on('selected', (cfiRange: string) => {
//       if (cfiRange) {
//         setCurrentCfi(cfiRange);
//         setShowCommentModal(true);
//       }
//     });
//   };

//   const saveHighlight = (cfiRange: string, isComment = false, comment = '') => {
//     if (renditionRef.current) {
//       const styles = isComment ? { 'background-color': 'rgba(0, 255, 0, 0.3)' } : { 'background-color': 'rgba(255, 255, 0, 0.5)' };
//       renditionRef.current.annotations.add(
//         isComment ? 'comment' : 'highlight',
//         cfiRange,
//         { comment },
//         () => console.log(isComment ? 'Comment added' : 'Highlight added'),
//         isComment ? 'comment-class' : 'highlight-class',
//         styles
//       );
//       setHighlights(prev => [...prev, cfiRange]);
//       localStorage.setItem('highlights', JSON.stringify([...highlights, cfiRange]));
//       if (isComment) {
//         localStorage.setItem('comments', JSON.stringify([...(JSON.parse(localStorage.getItem('comments') || '[]')), { cfi: cfiRange, text: comment }]));
//       }
//     }
//   };

//   return (
//     <div className="flex h-[calc(100vh-80px)] c-reader">
//       <div className="flex-1">
//         <ReactReader
//           url={url}
//           title="EPUB Book"
//           getRendition={handleRendition}
//           className="h-full"
//         />
//       </div>
//       <aside className="w-64 bg-white dark:bg-gray-800 p-4 overflow-y-auto shadow-lg">
//         <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Highlights & Comments</h2>
//         <ul>
//           {highlights.map((cfi, i) => (
//             <li key={i} className="mb-2">
//               <button
//                 onClick={() => renditionRef.current.display(cfi)}
//                 className="text-blue-500 hover:underline"
//               >
//                 Jump to {JSON.parse(localStorage.getItem('comments') || '[]').find((c: any) => c.cfi === cfi)?.text || 'Highlight'}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </aside>
//       {showCommentModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
//             <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Add Comment</h3>
//             <textarea
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               placeholder="Your comment..."
//               className="w-full p-2 border rounded mb-4 text-gray-800 dark:text-gray-200 dark:bg-gray-700"
//             />
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => {
//                   setShowCommentModal(false);
//                   saveHighlight(currentCfi);
//                 }}
//                 className="px-4 py-2 bg-yellow-500 text-white rounded"
//               >
//                 Highlight Only
//               </button>
//               <button
//                 onClick={() => {
//                   if (commentText) {
//                     saveHighlight(currentCfi, true, commentText);
//                     setShowCommentModal(false);
//                     setCommentText('');
//                   }
//                 }}
//                 className="px-4 py-2 bg-blue-500 text-white rounded"
//               >
//                 Save Comment
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EpubReader;

// import { useState } from "react";
// import { ReactReader as Reader } from "react-reader";

function NewReader() {
  // const [open, setOpen] = useState(true);

  return (
    <div className="h-screen w-screen bg-gray-100">
      {/* Reader komponenti */}
      {/* <Reader
        url={'public/Ramaiana.epub'}
        open={open}
        onClose={() => setOpen(false)}
        swipeable={true} // TMA da touch uchun
        epubInitOptions={{ manager: "continuous" }} // Sahifa navigatsiyasi
      /> */}
    </div>
  );
}

export default NewReader;
