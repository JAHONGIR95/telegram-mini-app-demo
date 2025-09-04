import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { viewport } from "@telegram-apps/sdk-react";
import HomeIcon from "../icons/HomeIcon";
import SearchIcon from "../icons/SearchIcon";
import BookmarksIcon from "../icons/BookmarksIcon";
import UserIcon from "../icons/UserIcon";
import { Page } from "../Page";

interface ITab {
  id: string;
  text: string;
  Icon(props: { isActive: boolean }): React.ReactElement;
}

const tabs: Array<ITab> = [
  {
    id: "",
    text: "Домой",
    Icon: (props: { isActive: boolean }) => (
      <HomeIcon active={props.isActive} />
    ),
  },
  {
    id: "search",
    text: "Поиск",
    Icon: (props: { isActive: boolean }) => (
      <SearchIcon active={props.isActive} />
    ),
  },
  {
    id: "bookmarks",
    text: "Закладки",
    Icon: (props: { isActive: boolean }) => (
      <BookmarksIcon active={props.isActive} />
    ),
  },
  {
    id: "profile",
    text: "Профиль",
    Icon: (props: { isActive: boolean }) => (
      <UserIcon active={props.isActive} />
    ),
  },
];

const HomeLayout = () => {
  const location = useLocation();

  // const [currentTab, setCurrentTab] = useState(tabs[0].id);
  const getActiveTab = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    return tabs.find((tab) => pathSegments.includes(tab.id))?.id || tabs[0].id;
  };
  const currentTab = getActiveTab();

  // const safeArea = viewport.safeAreaInsets();

  // const safeAreaTop = safeArea?.top || 0
  // const safeAreaBottom = safeArea?.bottom || 0;

  const [safeAreaBottom, setSafeAreaBottom] = useState(0);

  useEffect(() => {
    const safeArea = viewport.safeAreaInsets();
    const safeAreaBottom = safeArea?.bottom || 0;
    setSafeAreaBottom(safeAreaBottom);
  }, [viewport.safeAreaInsets()]);

  return (
    <Page back={true}>
      <div className="">
        <div className={``}>
          <Outlet />
          {/* Safe area uchun fon */}
          <div
            style={{
              height: safeAreaBottom,
              backgroundColor: "#000", // bu yerda fon rangini o'zgartirasiz
              opacity: 0.5,
              color: "#000",
            }}
            className="fixed left-0 right-0 bottom-0"
          />

          <div
            style={{ bottom: safeAreaBottom }}
            // className={`fixed left-0 right-0 flex justify-around items-center h-[80px] bg-white rounded-t-4xl shadow-[0_-1px_30px_2px_#a0a0a09d]`}
            className={`fixed left-0 right-0 flex justify-around items-center h-[60px] bg-white rounded-t-4xl shadow-[0_-20px_20px_-20px_#a0a0a09d]`}
          >
            {tabs.map(({ id, Icon }) => (
              <Link
                to={`/${id}`}
                key={id}
                className={`flex flex-col items-center justify-center h-full w-full`}
              >
                <Icon isActive={id === currentTab} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default HomeLayout;
