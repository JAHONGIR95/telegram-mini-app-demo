// import { useMemo } from "react"
import { Navigate, Route, Routes, HashRouter } from "react-router-dom";
// import {
//   retrieveLaunchParams,
//   useSignal,
//   isMiniAppDark,
// } from "@telegram-apps/sdk-react"
// import { AppRoot } from "@telegram-apps/telegram-ui"
// import Home from "@/pages/HomePage"
import About from "@/pages/About";
// import Gallery from "@/pages/Gallery"
// import { routes } from "@/navigation/routes"
import HomePage from "@/pages/HomePage";
import HomeLayout from "./layouts/HomeLayout";
import Gallery from "@/pages/Gallery";
import NotificationsPage from "@/pages/Natification";
import NotificationDetails from "@/pages/Natification/NotificationDetails";
import ProfilePage from "@/pages/Profile";
import Bookmarks from "@/pages/Bookmarks";
import GuestProfile from "@/pages/GuestProfile";
import Subscribers from "@/pages/Profile/Subscribers";
import Subscriptions from "@/pages/Profile/Subscriptions";
import { viewport } from "@telegram-apps/sdk-react";
import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import Folder from "@/pages/Bookmarks/folder";
import Search from "@/pages/Search";
import ConnectionDetails from "@/pages/Search/ConnectionDetails";
import Settings from "@/pages/Profile/Settings";
import BookOverview from "@/pages/Book/BookOverview";

export function App() {
  // const lp = useMemo(() => retrieveLaunchParams(), [])
  // const isDark = useSignal(isMiniAppDark)

  useEffect(() => {
    if (viewport.requestFullscreen.isAvailable() && !viewport.isFullscreen()) {
      viewport.requestFullscreen();
    }
    WebApp.expand(); // to'liq ekranga kengaytiradi
    WebApp.enableClosingConfirmation(); // foydalanuvchi chiqib ketganda so'raydi
    WebApp.setHeaderColor("#ffffff");
    WebApp.setBottomBarColor
  }, []);

  return (
    // <AppRoot
    //   appearance={isDark ? "dark" : "light"}
    //   platform={["macos", "ios"].includes(lp.tgWebAppPlatform) ? "ios" : "base"}
    // >
    <HashRouter>
      <Routes>
        <Route element={<HomeLayout />} path="/">
          <Route index element={<HomePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/notifications/:id" element={<NotificationDetails />} />
          <Route path="/guest-profile/:id" element={<GuestProfile />} />

          <Route path="/search">
            <Route index element={<Search />} />
            <Route path="connection-details" element={<ConnectionDetails />} />
          </Route>

          <Route path="/profile">
            <Route index element={<ProfilePage />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/bookmarks">
            <Route index element={<Bookmarks />} />
            <Route path="meanings" element={<Gallery />} />
            <Route path="folder" element={<Folder />} />
          </Route>

          <Route path="/about" element={<About />} />
        </Route>
          <Route path="/book-overview/:id" element={<BookOverview />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
    // </AppRoot>
  );
}
