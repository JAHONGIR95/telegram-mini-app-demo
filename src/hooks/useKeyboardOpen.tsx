import { useEffect, useState } from "react";

export function useKeyboardOpen(threshold = 150) {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    let initialHeight = window.innerHeight;

    const checkKeyboard = () => {
      const heightDiff = initialHeight - window.innerHeight;
      setIsKeyboardOpen(heightDiff > threshold);
    };

    // Telegram WebApp eventlari
    const tg = (window as any).Telegram?.WebApp;
    if (tg && tg.onEvent) {
      tg.onEvent("viewportChanged", () => {
        const isExpanded = tg.viewportStableHeight < initialHeight - threshold;
        setIsKeyboardOpen(isExpanded);
      });
    }

    // Fallback: visualViewport yoki resize orqali
    const viewport = window.visualViewport;
    if (viewport) {
      viewport.addEventListener("resize", checkKeyboard);
    } else {
      window.addEventListener("resize", checkKeyboard);
    }

    return () => {
      if (viewport) {
        viewport.removeEventListener("resize", checkKeyboard);
      } else {
        window.removeEventListener("resize", checkKeyboard);
      }
      if (tg && tg.offEvent) {
        tg.offEvent("viewportChanged", checkKeyboard);
      }
    };
  }, [threshold]);

  return isKeyboardOpen;
}
