import { useEffect, useState } from "react";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import {
  showBackButton,
  hideBackButton,
  onBackButtonClick,
  onMainButtonClick,
} from "@telegram-apps/sdk-react";

export function useTelegramNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const navType = useNavigationType();

  const [stack, setStack] = useState<string[]>([location.pathname]);

  // Stackni boshqarish
  useEffect(() => {
    setStack((prev) => {
      if (navType === "PUSH") return [...prev, location.pathname];
      if (navType === "POP") return prev.slice(0, -1);
      return prev; // REPLACE -> stack o'zgarmaydi
    });
  }, [location.pathname, navType]);

  // Back / Close tugmalarini boshqarish
  useEffect(() => {
    const mainButton = window.Telegram?.WebApp?.MainButton || null;

    if (stack.length > 1) {
      // Back tugmasi
      showBackButton();
      mainButton?.hide?.();

      const off = onBackButtonClick(() => {
        navigate(-1);
      });

      return () => {
        hideBackButton();
        off?.();
      };
    } else {
      // Close tugmasi
      hideBackButton();
      mainButton?.setText?.("Close");
      mainButton?.show?.();

      const offMain = onMainButtonClick(() => {
        window.Telegram?.WebApp?.close();
      });

      return () => {
        mainButton?.hide?.();
        offMain?.();
      };
    }
  }, [stack, navigate]);
}
