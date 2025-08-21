import { Link } from "react-router-dom";

const Meanings = () => {

  return (
    <div className="flex gap-3">
      <Link to="/" className="flex-1 flex flex-col items-center justify-center gap-4 p-4 border border-borderColor rounded-[16px] bg-white">
        <img src="images/main-logo.svg" alt="logo" className="w-25" />
        <p className="text-base leading-4 font-bold text-primaryColor">Папка</p>
      </Link>
      <Link to="/" className="flex-1 flex flex-col items-center justify-center gap-4 p-4 border border-borderColor rounded-[16px] bg-white">
        <p className="text-base leading-4 font-bold text-primaryColor">Создать папку +</p>
      </Link>
    </div>
  );
};

export default Meanings;
