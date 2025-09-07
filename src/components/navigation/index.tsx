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

const BottomNavigation: React.FC<BottomNavigationProps> = ({ tabs, safeAreaBottom = 0 }) => {
  const location = useLocation();

  const getActiveTab = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    return tabs.find((tab) => pathSegments.includes(tab.id))?.id || tabs[0].id;
  };
  const currentTab = getActiveTab();

  const isKeyboardOpen = useKeyboardOpen();

  // Klaviatura ochilganda panelni yashiramiz
  if (isKeyboardOpen) return null;

  return (
    <div
    className="absolute left-0 right-0 bg-white rounded-t-4xl shadow-[0_-20px_20px_-20px_#a0a0a09d] z-50"
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
