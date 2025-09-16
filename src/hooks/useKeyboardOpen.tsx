import { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram?: any;
  }
}

export function useTelegramKeyboardOpen(threshold = 150) {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    const handleViewportChange = () => {
      const heightDiff = tg.viewportStableHeight - tg.viewportHeight;
      setIsKeyboardOpen(heightDiff > threshold);
    };

    // Dastlab bir marta tekshirib olish
    handleViewportChange();

    tg.onEvent("viewportChanged", handleViewportChange);
    return () => tg.offEvent("viewportChanged", handleViewportChange);
  }, [threshold]);

  return isKeyboardOpen;
}
