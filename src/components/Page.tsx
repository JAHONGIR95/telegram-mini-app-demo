import { useNavigate } from 'react-router-dom';
import { hideBackButton, onBackButtonClick, showBackButton } from '@telegram-apps/sdk-react';
import { type PropsWithChildren, useEffect } from 'react';

export function Page({ children, back = true }: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   */
  back?: boolean
}>) {
  const navigate = useNavigate();

  useEffect(() => {
    if (back) {
      showBackButton();
      return onBackButtonClick(() => {
        navigate(-1);
      });
    }
    hideBackButton();
  }, [back]);

  return <>{children}</>;
}

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

// import { useEffect, useState } from "react";
// import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
// import {
//   hideBackButton,
//   onBackButtonClick,
//   onMainButtonClick,
//   showBackButton,
// } from "@telegram-apps/sdk-react";

// export function Page({
//   children,
//   back = true,
// }: {
//   children: React.ReactNode;
//   back?: boolean;
// }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const navType = useNavigationType();

//   // O'zimiz stack yuritamiz
//   const [stack, setStack] = useState<string[]>([location.pathname]);

//   useEffect(() => {
//     // PUSH -> yangi sahifa stackga qo'shiladi
//     // POP -> orqaga qaytildi -> stackdan o'chiramiz
//     setStack((prev) => {
//       if (navType === "PUSH") {
//         return [...prev, location.pathname];
//       } else if (navType === "POP") {
//         return prev.slice(0, -1);
//       } else {
//         return prev; // REPLACE -> stack o'zgarmaydi
//       }
//     });
//   }, [location.pathname, navType]);

//   useEffect(() => {
//     const mainButton =
//       window.Telegram?.WebApp?.MainButton || null;

//     if (!back) {
//       hideBackButton();
//       mainButton?.hide?.();
//       return;
//     }

//     if (stack.length > 1) {
//       // Stackda sahifalar bor -> Back tugmasi
//       showBackButton();
//       mainButton?.hide?.();

//       const off = onBackButtonClick(() => {
//         navigate(-1);
//       });
//       return () => {
//         hideBackButton();
//         off?.();
//       };
//     } else {
//       // Stack bo'sh -> Close tugmasi
//       hideBackButton();
//       mainButton?.setText?.("Close");
//       mainButton?.show?.();

//       const offMain = onMainButtonClick(() => {
//         window.Telegram?.WebApp?.close();
//       });
//       return () => {
//         mainButton?.hide?.();
//         offMain?.();
//       };
//     }
//   }, [back, stack]);

//   return <>{children}</>;
// }

