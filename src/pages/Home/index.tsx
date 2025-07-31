import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to="/about">About</Link>
      <br />
      <Link to="/gallery">Gallery</Link>
    </>
  )
}

export default Home
