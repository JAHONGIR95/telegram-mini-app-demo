// import BottomSheet from "@/components/modals/FramerMotionModal";
import PostCard from "@/components/postCard";
// import { useState } from "react";
import bell from "@/assets/icons/bell.svg";
import { Link } from "react-router-dom";
// import Loader from "@/components/Loader"
// import { useState } from "react";

import Header from "@/components/Header";
// import Button from "@/components/buttons/Button";

const HomePage = () => {
  // const [isLoading, setIsLoading] = useState(!false);
  // const [isOpen, setIsOpen] = useState(false);

  // if (!isLoading) {
  //   return <Loader />
  // }

  {
    /* <button
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
    </BottomSheet> */
  }

  return (
    <div className="flex flex-col h-screen bg-globe">
      <Header>
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="w-5" />
          <h1 className="font-extrabold text-tertiary text-2xl text-center">
            Dharma Human
          </h1>
          <Link
            to="/notifications"
            className="relative inline-block cursor-pointer"
          >
            <img
              src={bell}
              alt="avatar"
              className="w-5 h-5 rounded-full object-cover"
              loading="lazy"
            />
            <span className="absolute -top-1 -right-[2px] text-[6px] bg-iconLink px-[2px] font-bold rounded-full">
              4
            </span>
          </Link>
        </div>
      </Header>

      <div className="px-3 pt-4 pb-25 overflow-y-auto space-y-5">
        <PostCard />
        {/* <Button variant="primary">Primary</Button> */}
        {/* <Button variant="outline">Click me</Button> */}
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </div>
  );
};

export default HomePage;
