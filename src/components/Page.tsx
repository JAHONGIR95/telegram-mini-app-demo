// import { useNavigate } from 'react-router-dom';
// import { hideBackButton, onBackButtonClick, showBackButton } from '@telegram-apps/sdk-react';
// import { type PropsWithChildren, useEffect } from 'react';

// export function Page({ children, back = true }: PropsWithChildren<{
//   /**
//    * True if it is allowed to go back from this page.
//    */
//   back?: boolean
// }>) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (back) {
//       showBackButton();
//       return onBackButtonClick(() => {
//         navigate(-1);
//       });
//     }
//     hideBackButton();
//   }, [back]);

//   return <>{children}</>;
// }

// import { useNavigate } from "react-router-dom";
// import {
//   hideBackButton,
//   onBackButtonClick,
//   onMainButtonClick,
//   showBackButton,
// } from "@telegram-apps/sdk-react";
// import { type PropsWithChildren, useEffect } from "react";

// export function Page({
//   children,
//   back = true,
// }: PropsWithChildren<{
//   /**
//    * True if it is allowed to go back from this page.
//    */
//   back?: boolean;
// }>) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (back) {
//       if (window.history.length > 1) {
//         showBackButton();
//         return onBackButtonClick(() => {
//           navigate(-1);
//         });
//       } else {
//         window.Telegram?.WebApp?.MainButton?.setText("Close");
//         return onMainButtonClick(() => {
//           window.Telegram?.WebApp?.close();
//         });
//       }
//     }
//     hideBackButton();
//   }, [back]);

//   return <>{children}</>;
// }

// import { useNavigate } from "react-router-dom";
// import {
//   hideBackButton,
//   onBackButtonClick,
//   onMainButtonClick,
//   showBackButton,
//   showMainButton,
//   hideMainButton,
// } from "@telegram-apps/sdk-react";
// import { type PropsWithChildren, useEffect } from "react";

// export function Page({
//   children,
//   back = true,
// }: PropsWithChildren<{
//   back?: boolean;
// }>) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (back) {
//       if (window.history.length > 1) {
//         // Back tugmasini ko‘rsatamiz
//         showBackButton();
//         hideMainButton();
//         return onBackButtonClick(() => {
//           navigate(-1);
//         });
//       } else {
//         // Close tugmasi uchun MainButton dan foydalanamiz
//         hideBackButton();
//         window.Telegram?.WebApp?.MainButton?.setText("Close");
//         showMainButton();
//         return onMainButtonClick(() => {
//           window.Telegram?.WebApp?.close();
//         });
//       }
//     } else {
//       hideBackButton();
//       hideMainButton();
//     }
//   }, [back, navigate]);

//   return <>{children}</>;
// }

import { useNavigate } from "react-router-dom";
import {
  hideBackButton,
  onBackButtonClick,
  onMainButtonClick,
  showBackButton,
  // don't import showMainButton — it doesn't exist
  // import mainButton if your sdk exports it; otherwise we fallback to window.Telegram
  // import { mainButton } from "@telegram-apps/sdk-react";
} from "@telegram-apps/sdk-react";
import { type PropsWithChildren, useEffect, useState } from "react";

export function Page({
  children,
  back = true,
}: PropsWithChildren<{ back?: boolean }>) {
  const navigate = useNavigate();
  const [canGoBack, setCanGoBack] = useState<boolean>(() => {
    // boshlang'ich tekshiruv (SPAda har doim ishonchli emas, lekin yetadi)
    return window.history.length > 1;
  });

  // agar history dinamik o'zgarsa (popstate), qayta tekshirish uchun listener
  useEffect(() => {
    const onPop = () => setCanGoBack(window.history.length > 1);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    // Helper: mainButton obyektini olish (SDK eksport qilsa uni import qilish yaxshi)
    const telegramMainButton =
      // @ts-ignore
      (typeof (globalThis as any).mainButton !== "undefined" && (globalThis as any).mainButton) ||
      // @ts-ignore
      (typeof (globalThis as any).Telegram !== "undefined" &&
        (globalThis as any).Telegram?.WebApp?.MainButton) ||
      null;

    if (!back) {
      // Back ruxsat etilmagan — ikkala tugmani yashiramiz
      try {
        hideBackButton();
      } catch {}
      try {
        telegramMainButton?.hide?.();
      } catch {}
      return;
    }

    // back=true
    if (window.history.length > 1) {
      // history mavjud -> Back tugmasi
      try {
        showBackButton();
      } catch {}
      // yashiramiz main buttonni (agar ko'rsatilgan bo'lsa)
      try {
        telegramMainButton?.hide?.();
      } catch {}

      const off = onBackButtonClick(() => {
        navigate(-1);
      });

      return () => {
        // tozalash
        try {
          hideBackButton();
        } catch {}
        if (typeof off === "function") off();
      };
    } else {
      // history yo'q -> Close (MainButton) ko'rsatamiz
      try {
        hideBackButton();
      } catch {}

      try {
        telegramMainButton?.setText?.("Close");
        telegramMainButton?.show?.();
      } catch {
        // fallback: beparvo
      }

      const offMain = onMainButtonClick(() => {
        try {
          window.Telegram?.WebApp?.close();
        } catch {
          // fallback: nothing
        }
      });

      return () => {
        // tozalash
        if (typeof offMain === "function") offMain();
        try {
          telegramMainButton?.hide?.();
        } catch {}
      };
    }
  }, [back, navigate, canGoBack]);

  return <>{children}</>;
}
