import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  showBackButton,
  hideBackButton,
  onBackButtonClick,
  onMainButtonClick,
} from "@telegram-apps/sdk-react";

/**
 * Telegram WebApp ichida Back va Close tugmalarini boshqaradi
 * window.history.state.idx orqali
 */
export function useTelegramBackClose() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isClose = pathname.split('/').filter(Boolean).length === 0

  useEffect(() => {
    // const idx = window.history?.state?.idx ?? 0;
    const mainButton = window.Telegram?.WebApp?.MainButton || null;

    console.log(isClose);
    if (!isClose) {
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
  }, [navigate, isClose]);
}
