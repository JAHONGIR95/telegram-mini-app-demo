// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   showBackButton,
//   hideBackButton,
//   onBackButtonClick,
//   onMainButtonClick,
// } from "@telegram-apps/sdk-react";

// /**
//  * Telegram WebApp ichida Back va Close tugmalarini boshqaradi
//  * window.history.state.idx orqali
//  */
// export function useTelegramBackClose() {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const isClose = pathname.split('/').filter(Boolean).length === 0

//   useEffect(() => {
//     // const idx = window.history?.state?.idx ?? 0;
//     const mainButton = window.Telegram?.WebApp?.MainButton || null;

//     console.log(isClose);
//     if (!isClose) {
//       // Back tugmasi
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
//       // Close tugmasi
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
//   }, [navigate, window.history?.state?.idx]);
// }

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  showBackButton,
  hideBackButton,
  onBackButtonClick,
  onMainButtonClick,
} from "@telegram-apps/sdk-react";

/**
 * Telegram WebApp ichida Back va Main (Close) tugmalarini boshqaradi.
 * window.history.length qiymati orqali Back yoki Close tugmasi ko'rsatiladi.
 * Bu usul URL path bo'ylab harakatlanishda yanada ishonchli ishlaydi.
 */
export function useTelegramBackClose() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const isRootPath = pathname === '/';
    const mainButton = window.Telegram?.WebApp?.MainButton;

    const backButtonHandler = () => {
      // Bir bosqich orqaga qaytish
      navigate(-1);
    };

    const mainButtonHandler = () => {
      // Ilova oynasini yopish
      window.Telegram?.WebApp?.close();
    };

    if (isRootPath) {
      // Agar asosiy sahifada bo'lsa (URL '/')
      
      // Back tugmasini yashirish
      hideBackButton();

      // MainButton (Close tugmasi) uchun sozlamalar
      mainButton?.setText("Close");
      mainButton?.show();
      
      // MainButton bosilganda bajariladigan funksiyani biriktirish
      const offMain = onMainButtonClick(mainButtonHandler);

      return () => {
        // Asosiy sahifadan ketilganda MainButton uchun sozlamalarni tozalash
        mainButton?.hide();
        offMain();
      };

    } else {
      // Agar asosiy sahifada bo'lmasa (URL '/' emas)

      // MainButtonni yashirish
      mainButton?.hide();

      // Back tugmasini ko'rsatish
      showBackButton();

      // Back tugmasi bosilganda bajariladigan funksiyani biriktirish
      const offBack = onBackButtonClick(backButtonHandler);

      return () => {
        // Boshqa sahifaga o'tilganda Back tugmasi uchun sozlamalarni tozalash
        hideBackButton();
        offBack();
      };
    }
    
  }, [navigate, pathname]);
}