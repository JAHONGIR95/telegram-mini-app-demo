import BottomSheet from "@/components/modals/FramerMotionModal";
import PostCard from "@/components/postCard";
import { useState } from "react";
// import Loader from "@/components/Loader"
// import { useState } from "react";

const HomePage = () => {
  // const [isLoading, setIsLoading] = useState(!false);
  const [isOpen, setIsOpen] = useState(false);

  // if (!isLoading) {
  //   return <Loader />
  // }

  return (
    <>
      <h1 className="font-extrabold text-tertiary text-2xl text-center">
        Dharma Human
      </h1>

      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Show Bottom Sheet
      </button>

      <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-lg font-bold mb-2">Hello iPhone style!</h2>
        <p className="text-sm text-gray-600">This is a bottom sheet modal.</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </BottomSheet>
      {/* </div> */}

      <div className="px-3 pt-7 pb-20">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </>
  );
};

export default HomePage;
