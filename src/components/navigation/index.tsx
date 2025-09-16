// import { useTelegramKeyboardOpen } from "@/hooks/useKeyboardOpen";
// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// interface Tab {
//   id: string;
//   Icon: React.ComponentType<{ isActive: boolean }>;
// }

// interface BottomNavigationProps {
//   tabs: Tab[];
//   safeAreaBottom?: number;
// }

// const BottomNavigation: React.FC<BottomNavigationProps> = ({
//   tabs,
//   safeAreaBottom = 0,
// }) => {
//   const location = useLocation();

//   const getActiveTab = () => {
//     const pathSegments = location.pathname.split("/").filter(Boolean);
//     return tabs.find((tab) => pathSegments.includes(tab.id))?.id || tabs[0].id;
//   };

//   const currentTab = getActiveTab()

//   const isKeyboardOpen = useTelegramKeyboardOpen();

//   // Klaviatura ochilganda panelni yashiramiz
//   if (isKeyboardOpen) return null;
//   console.log(isKeyboardOpen);

//   return (
//     <div
//       className="absolute left-0 right-0 bg-white rounded-t-4xl shadow-[0_-20px_20px_-20px_#a0a0a09d] z-1"
//       style={{ bottom: safeAreaBottom }}
//     >
//       <div className="flex justify-around items-center h-[60px]">
//         {tabs.map(({ id, Icon }) => (
//           <Link
//             to={`/${id}`}
//             key={id}
//             className="flex flex-col items-center justify-center h-full w-full"
//           >
//             <Icon isActive={id === currentTab} />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BottomNavigation;

import { useKeyboardOpen } from "@/hooks/useKeyboardOpen";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface Tab {
  id: string;
  Icon: React.ComponentType<{ isActive: boolean }>;
}

interface BottomNavigationProps {
  tabs: Tab[];
  safeAreaBottom?: number;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  tabs,
  safeAreaBottom = 0,
}) => {
  const location = useLocation();
  const isKeyboardOpen = useKeyboardOpen();

  const getActiveTab = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    return tabs.find((tab) => pathSegments.includes(tab.id))?.id || tabs[0].id;
  };

  const currentTab = getActiveTab();

  // Klaviatura ochilganda panelni yashiramiz
  if (isKeyboardOpen) return null;

  return (
    <div
      className="fixed left-0 right-0 bg-white rounded-t-4xl shadow-[0_-20px_20px_-20px_#a0a0a09d] z-50 transition-all duration-300"
      style={{ bottom: safeAreaBottom }}
    >
      <div className="flex justify-around items-center h-[60px]">
        {tabs.map(({ id, Icon }) => (
          <Link
            to={`/${id}`}
            key={id}
            className="flex flex-col items-center justify-center h-full w-full"
          >
            <Icon isActive={id === currentTab} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;


// import { useKeyboardOpen } from "@/hooks/useKeyboardOpen";
// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// interface Tab {
//   id: string;
//   Icon: React.ComponentType<{ isActive: boolean }>;
// }

// interface BottomNavigationProps {
//   tabs: Tab[];
//   safeAreaBottom?: number;
// }

// const BottomNavigation: React.FC<BottomNavigationProps> = ({ tabs, safeAreaBottom = 0 }) => {
//   const location = useLocation();
//   const isKeyboardOpen = useKeyboardOpen();

//   // Aktiv tabni aniq topish
//   const getActiveTab = () => {
//     const currentPath = location.pathname;
//     // "/search" yoki "/search/..." hammasini search tabga moslaydi
//     return (
//       tabs.find((tab) =>
//         tab.id === ""
//           ? currentPath === "/" // home uchun aniq tekshiruv
//           : currentPath === `/${tab.id}` || currentPath.startsWith(`/${tab.id}/`)
//       )?.id || tabs[0].id
//     );
//   };

//   const currentTab = getActiveTab();

//   // Klaviatura ochilganda panelni yashiramiz
//   if (isKeyboardOpen) return null;

//   return (
//     <div
//       className="absolute left-0 right-0 bg-white rounded-t-4xl shadow-[0_-20px_20px_-20px_#a0a0a09d] z-1"
//       style={{ bottom: safeAreaBottom }}
//     >
//       <div className="flex justify-around items-center h-[60px]">
//         {tabs.map(({ id, Icon }) => (
//           <Link
//             to={`/${id}`}
//             key={id}
//             className="flex flex-col items-center justify-center h-full w-full"
//           >
//             <Icon isActive={id === currentTab} />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BottomNavigation;
