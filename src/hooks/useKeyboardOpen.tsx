import { useEffect, useState } from "react";

export function useKeyboardOpen(threshold = 150) {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    const viewport = window.visualViewport;

    const checkKeyboard = () => {
      let heightDiff = 0;

      if (tg?.viewportHeight && tg?.viewportStableHeight) {
        // Telegram WebApp orqali
        heightDiff = tg.viewportStableHeight - tg.viewportHeight;
      } else if (viewport) {
        // visualViewport orqali
        heightDiff = window.innerHeight - viewport.height;
      }

      setIsKeyboardOpen(heightDiff > threshold);
    };

    // Boshlanishida tekshiramiz
    checkKeyboard();

    // Telegram event
    if (tg) {
      tg.onEvent("viewportChanged", checkKeyboard);
    }

    // visualViewport event
    if (viewport) {
      viewport.addEventListener("resize", checkKeyboard);
    }

    return () => {
      if (tg) tg.offEvent("viewportChanged", checkKeyboard);
      if (viewport) viewport.removeEventListener("resize", checkKeyboard);
    };
  }, [threshold]);

  return isKeyboardOpen;
}
