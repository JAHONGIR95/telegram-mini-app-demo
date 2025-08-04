
import PostCard from "@/components/postCard";
// import Loader from "@/components/Loader"
// import { useState } from "react";

const HomePage = () => {
  // const [isLoading, setIsLoading] = useState(!false);

  // if (!isLoading) {
  //   return <Loader />
  // }

  return (
    <>
      <h1 className="font-extrabold text-tertiary text-2xl text-center">
        Dharma Human
      </h1>
      {/* <div className="text-4xl dark:text-tertiary p-4 bg-ring">Home</div>
      <Link to="/about">About</Link>
      <br />
      <Link to="/gallery">Gallery</Link>
      hello world
      <div className="space-y-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading...</Button>
      </div> */}

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
