import React from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon";
import SearchIcon from "../icons/SearchIcon";
import BookmarksIcon from "../icons/BookmarksIcon";
import UserIcon from "../icons/UserIcon";
import { Page } from "../Page";
import { useSafeAreaBottom } from "../App";
import BottomNavigation from "../navigation";

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
  // const location = useLocation();
  const { safeAreaBottom } = useSafeAreaBottom();

  // const getActiveTab = () => {
  //   const pathSegments = location.pathname.split("/").filter(Boolean);
  //   return tabs.find((tab) => pathSegments.includes(tab.id))?.id || tabs[0].id;
  // };
  // const currentTab = getActiveTab();

  return (
    // <Page back={true}>
    //   <div className="relative h-50" style={{ paddingBottom: safeAreaBottom }}>
    //     <Outlet />

    //     <div
    //       style={{ bottom: safeAreaBottom }}
    //       className={`fixed left-0 right-0 flex justify-around items-center h-[60px] bg-white rounded-t-4xl shadow-[0_-20px_20px_-20px_#a0a0a09d]`}
    //     >
    //       {tabs.map(({ id, Icon }) => (
    //         <Link
    //           to={`/${id}`}
    //           key={id}
    //           className={`flex flex-col items-center justify-center h-full w-full`}
    //         >
    //           <Icon isActive={id === currentTab} />
    //         </Link>
    //       ))}
    //     </div>
    //     <div
    //       style={{
    //         height: safeAreaBottom,
    //         backgroundColor: "#000", // safe area fon rangi
    //       }}
    //       className="fixed left-0 right-0 bottom-0"
    //     />
    //   </div>
    // </Page>

    <Page back={true}>
      <div className="relative flex flex-col min-h-screen" style={{ paddingBottom: safeAreaBottom }}>
        {/* Scroll area */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>

        {/* Bottom navigation */}
        <BottomNavigation tabs={tabs} safeAreaBottom={safeAreaBottom} />
        <div
          style={{
            height: safeAreaBottom,
            backgroundColor: "#000", // safe area fon rangi
          }}
          className="fixed left-0 right-0 bottom-0"
        />
      </div>
    </Page>
  );
};

export default HomeLayout;
