import { useState } from "react";
import mainLogo from "@/assets/images/main-logo.svg";
import ScrollableRow from "@/components/buttons/ScrollableButtons";
// import PostCard from "@/components/postCard";
// import ResponseCard from "@/components/responseCard";
import ResponseView from "@/views/Response";
import PostsView from "@/views/Posts";

const buttons = [
  "Посты",
  "Запросы",
  "Комментарии",
  "Продвинутые мной",
  "Достижения",
];

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState<number>(0);
  return (
    <div className="h-screen flex flex-col bg-profile">
      <div className="flex justify-center pt-6 pb-2 opacity-50">
        <img src={mainLogo} className="w-24 h-12" />
      </div>
      <div className="overflow-y-auto">
        <div className="flex flex-col items-center pt-16 pb-8 gap-3 h-auto bg-[url('src/assets/icons/tree.svg')] bg-contain bg-center bg-no-repeat">
          <img
            src="src/assets/images/ilon_mask.png"
            alt=""
            className="w-20 h-20 rounded-full"
            loading="lazy"
          />
          <p className="text-2xl/6 font-extrabold text-primaryColor">
            Илон Маск
          </p>
          <div className="flex justify-center gap-8">
            <div className="flex flex-col gap-1 items-center">
              <p className="text-xs/3 font-extrabold">298</p>
              <p className="text-[6px]/1.5 text-tertiary">Подписчиков</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <p className="text-xs/3 font-extrabold">88</p>
              <p className="text-[6px]/1.5 text-tertiary">Смыслов</p>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <p className="text-xs/3 font-extrabold">2654</p>
              <p className="text-[6px]/1.5 text-tertiary">Подписок</p>
            </div>
          </div>
        </div>
        <p className="font-normal text-tertiary text-[10px]/2.5 text-center px-12">
          «Жизнь не обязана давать нам то, чего мы ждём. Надо брать то, что она
          даёт, и быть благодарным уже за то, что это так, а не хуже» (М.
          Митчелл, «Унесённые ветром»).
        </p>
        <p className="text-[8px]/[8px] font-bold bg-gradientText text-transparent bg-clip-text text-center py-2">
          см. ещё
        </p>
        {/* <h1 className="font-extrabold text-tertiary text-xl text-center">
        Смысл от 20.02.2025
      </h1> */}

        <div className="pl-3 mt-4">
          <ScrollableRow
            activeSection={activeSection}
            buttons={buttons}
            onClick={(val: number) => setActiveSection(val)}
          />
        </div>
        <div className="">
          <div className="px-3 pt-7 pb-20 overflow-y-auto">
            {activeSection === 0 && <PostsView />}
            {activeSection === 1 && <ResponseView />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
