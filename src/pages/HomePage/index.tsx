import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <>
      <div className="">Home</div>
      <Link to="/about">About</Link>
      <br />
      <Link to="/gallery">Gallery</Link>
    </>
  )
}

export default HomePage
