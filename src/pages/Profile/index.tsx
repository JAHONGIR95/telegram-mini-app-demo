import { useState } from "react";
import mainLogo from "/images/main-logo.svg";
import ResponseView from "@/views/profile/Response";
import PostsView from "@/views/profile/Posts";
import CommentsView from "@/views/profile/Comments";
import Button from "@/components/buttons/Button";
import clsx from "clsx";
import AdvancedView from "@/views/profile/Advanced";
import AchievementsView from "@/views/profile/Achievements";
import { Link } from "react-router-dom";
import BottomSheet from "@/components/modals/BottomSheet";
import { useSafeAreaBottom } from "@/components/App";

const buttons = [
  {
    label: "Посты",
    value: "posts",
  },
  {
    label: "Запросы",
    value: "requests",
  },
  {
    label: "Комментарии",
    value: "comments",
  },
  {
    label: "Продвинутые мной",
    value: "advanced",
  },
  {
    label: "Достижения",
    value: "achievements",
  },
];

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState<string>("posts");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const { safeAreaTop, safeAreaBottom } = useSafeAreaBottom();

  return (
    <div className="h-screen flex flex-col bg-profile">
      <div className="flex justify-center pb-2 opacity-50" style={{ paddingTop: safeAreaTop }}>
        <img src={mainLogo} className="w-24 h-12" />
      </div>
      <div className="overflow-y-auto">
        <div className="flex flex-col items-center pt-4 pb-8 gap-4 h-auto bg-[url('/icons/tree.svg')] bg-contain bg-center bg-no-repeat relative">
          <img
            src="images/ilon_mask.png"
            alt=""
            className="w-20 h-20 rounded-full"
            loading="lazy"
          />
          <Link to={"/profile/settings"}>
            <img src="icons/settings.svg" alt="settings" className="w-5 h-5 absolute top-4 right-3 cursor-pointer" loading="lazy" />
          </Link>
          <p className="text-2xl leading-6 font-extrabold text-primaryColor">
            Илон Маск
          </p>
          <div className="flex justify-center gap-8">
            <Link
              to="/profile/subscribers"
              className="flex flex-col gap-1 items-center"
            >
              <p className="text-sm leading-3 font-extrabold">298</p>
              <p className="text-[10px] leading-1.5 text-tertiary">
                Подписчиков
              </p>
            </Link>
            <div className="flex flex-col gap-1 items-center">
              <p className="text-sm leading-3 font-extrabold">88</p>
              <p className="text-[10px] leading-1.5 text-tertiary">Смыслов</p>
            </div>
            <Link
              to="/profile/subscriptions"
              className="flex flex-col gap-1 items-center"
            >
              <p className="text-sm leading-3 font-extrabold">2654</p>
              <p className="text-[10px] leading-1.5 text-tertiary">Подписок</p>
            </Link>
          </div>
        </div>
        <p className="font-normal text-tertiary text-xs leading-4 text-center px-12">
          «Жизнь не обязана давать нам то, чего мы ждём. Надо брать то, что она
          даёт, и быть благодарным уже за то, что это так, а не хуже» (М.
          Митчелл, «Унесённые ветром»).
        </p>
        <p
          className="text-sm leading-3 font-bold bg-gradientText text-transparent bg-clip-text text-center py-3 cursor-pointer"
          onClick={() => setIsBottomSheetOpen(true)}
        >
          см. ещё
        </p>

        <div className="pl-3 mt-3">
          <div className="w-full overflow-x-auto no-scrollbar">
            <div className="flex gap-2 w-max">
              {buttons?.map((button, idx) => (
                <Button
                  key={idx}
                  variant={
                    button.value === activeSection ? "primary" : "outline"
                  }
                  className={clsx(
                    button.value === activeSection &&
                      "bg-primaryClicked text-primaryWhite"
                  )}
                  onClick={() => setActiveSection(button.value)}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="">
          <div className="px-3 pt-7 overflow-y-auto space-y-5" style={{ paddingBottom: safeAreaBottom + 80 }}>
            {activeSection === "posts" && <PostsView />}
            {activeSection === "requests" && <ResponseView />}
            {activeSection === "comments" && <CommentsView />}
            {activeSection === "advanced" && <AdvancedView />}
            {activeSection === "achievements" && <AchievementsView />}
          </div>
        </div>
      </div>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        className="bg-white"
      >
        <h2 className="text-lg font-bold mb-2">Hello iPhone style!</h2>
        <p className="text-sm text-gray-600">This is a bottom sheet modal.</p>
      </BottomSheet>
    </div>
  );
};

export default ProfilePage;
