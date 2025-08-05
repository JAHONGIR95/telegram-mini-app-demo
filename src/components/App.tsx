// import { useMemo } from "react"
import { Navigate, Route, Routes, HashRouter } from "react-router-dom"
// import {
//   retrieveLaunchParams,
//   useSignal,
//   isMiniAppDark,
// } from "@telegram-apps/sdk-react"
// import { AppRoot } from "@telegram-apps/telegram-ui"
// import Home from "@/pages/HomePage"
import About from "@/pages/About"
// import Gallery from "@/pages/Gallery"
// import { routes } from "@/navigation/routes"
import HomePage from "@/pages/HomePage"
import HomeLayout from "./layouts/HomeLayout"
import Gallery from "@/pages/Gallery"
import NotificationsPage from "@/pages/Natification"
import NotificationDetails from "@/pages/Natification/NotificationDetails"

export function App() {
  // const lp = useMemo(() => retrieveLaunchParams(), [])
  // const isDark = useSignal(isMiniAppDark)

  return (
    // <AppRoot
    //   appearance={isDark ? "dark" : "light"}
    //   platform={["macos", "ios"].includes(lp.tgWebAppPlatform) ? "ios" : "base"}
    // >
    <HashRouter>
      <Routes>
        <Route element={<HomeLayout />} path="/">
            <Route index element={<HomePage />} />
            <Route path="/profile" element={<div>profile</div>} />
            <Route path="/search" element={<div>search</div>} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/notifications/:id" element={<NotificationDetails />} />

            <Route path="/bookmarks">
              <Route path="/bookmarks" element={<About />}>
                <Route path="books" element={<Gallery />} />
                <Route path="drafts" element={<About />} />
                <Route path="meanings" element={<Gallery />} />
              </Route>
              

              {/* <Route path="folder" element={<BookmarkContainer />} /> */}
            </Route>

            <Route path="/about" element={<About />} />
          </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
    // </AppRoot>
  )
}
