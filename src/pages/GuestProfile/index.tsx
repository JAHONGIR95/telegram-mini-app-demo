import { useState } from "react";
import mainLogo from "/images/main-logo.svg";
import ResponseView from "@/views/profile/Response";
import PostsView from "@/views/profile/Posts";
import CommentsView from "@/views/profile/Comments";
import Button from "@/components/buttons/Button";
import clsx from "clsx";
import AdvancedView from "@/views/profile/Advanced";
import AchievementsView from "@/views/profile/Achievements";
import human from "/images/human.webp";
import BottomSheet from "@/components/modals/BottomSheet";
import Toggle from "@/components/toggle";
import { Link } from "react-router-dom";
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

const GuestProfile = () => {
  const [activeSection, setActiveSection] = useState<string>("posts");
  const [subscribed, setSubscribed] = useState(false);
  const [isOpenSubscribe, setIsOpenSubscribe] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const { safeAreaTop, safeAreaBottom } = useSafeAreaBottom();

  const [toggles, setToggles] = useState({
    publications: true,
    requests: true,
    achievements: true,
  });

  // 🔹 State ni yangilash uchun handler
  const handleToggleChange = (key: keyof typeof toggles, value: boolean) => {
    setToggles((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="h-screen flex flex-col bg-profile">
      <div className="flex justify-center pb-2 opacity-50" style={{ paddingTop: safeAreaTop }}>
        <img src={mainLogo} className="w-24 h-12" />
      </div>
      <div className="overflow-y-auto">
        <div className="flex flex-col items-center pt-4 pb-8 gap-4 h-auto bg-[url('/icons/tree.svg')] bg-contain bg-center bg-no-repeat">
          <img
            src={human}
            alt=""
            className="w-20 h-20 rounded-full"
            loading="lazy"
          />
          <p className="text-2xl leading-6 font-extrabold text-primaryColor">
            Нервмежицкая Евгения
          </p>

          {!subscribed ? (
            <Button
              variant="primary"
              className="!bg-primaryDefault"
              onClick={() => setSubscribed(true)}
            >
              Подписаться +
            </Button>
          ) : (
            <Button
              variant="outline"
              className="!bg-island !text-primaryColor"
              onClick={() => setIsOpenSubscribe(true)}
            >
              Вы подписаны <img src="icons/arrowbottom.svg" alt="arrow" />
            </Button>
          )}
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
        isOpen={isOpenSubscribe}
        onClose={() => setIsOpenSubscribe(false)}
      >
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex justify-between items-center">
            <p className="text-primaryColor font-bold text-base">Публикации</p>
            <Toggle
              name="publications"
              checked={toggles.publications}
              onChange={(state) => handleToggleChange("publications", state)}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-primaryColor font-bold text-base">Запросы</p>
            <Toggle
              name="requests"
              checked={toggles.requests}
              onChange={(state) => handleToggleChange("requests", state)}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-primaryColor font-bold text-base">Достижения</p>
            <Toggle
              name="achievements"
              checked={toggles.achievements}
              onChange={(state) => handleToggleChange("achievements", state)}
            />
          </div>
          <Button
            variant="primary"
            className="w-full !bg-primaryDefault !text-primaryWhite !font-extrabold !text-base leading-4 py-6 rounded-full"
            onClick={() => {
              console.log("Yakuniy toggle state:", toggles);
              setIsOpenSubscribe(false);
              setSubscribed(false);
            }}
          >
            Отписаться
          </Button>
        </div>
      </BottomSheet>
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

export default GuestProfile;
