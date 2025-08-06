import PostCard from "@/components/postCard";
import mainLogo from "@/assets/images/main-logo.svg";

const NotificationDetails = () => {
  return (
    <div className="h-screen bg-accent flex flex-col">
      <div className="flex justify-center py-6 opacity-50">
        <img src={mainLogo} className="w-24 h-12" />
      </div>

      <h1 className="font-extrabold text-tertiary text-xl text-center">
        Смысл от 20.02.2025
      </h1>
      <div className="">
        <div className="px-3 pt-7 pb-20 overflow-y-auto">
          <PostCard />
        </div>
      </div>
    </div>
  );
};

export default NotificationDetails;
