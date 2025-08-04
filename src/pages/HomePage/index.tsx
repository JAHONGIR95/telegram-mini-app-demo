import Button from "@/components/buttons/PrimaryButton";
// import Loader from "@/components/Loader"
// import { useState } from "react";
import { Link } from "react-router-dom"

const HomePage = () => {
  // const [isLoading, setIsLoading] = useState(!false);

  // if (!isLoading) {
  //   return <Loader />
  // }
  
  return (
    <>
      <div className="text-4xl dark:text-tertiary p-4 bg-ring">Home</div>
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
    </div>
    </>
  )
}

export default HomePage
