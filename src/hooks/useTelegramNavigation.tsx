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

// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   showBackButton,
//   hideBackButton,
//   onBackButtonClick,
//   onMainButtonClick,
// } from "@telegram-apps/sdk-react";

// /**
//  * Telegram WebApp ichida Back va Main (Close) tugmalarini boshqaradi.
//  * window.history.length qiymati orqali Back yoki Close tugmasi ko'rsatiladi.
//  * Bu usul URL path bo'ylab harakatlanishda yanada ishonchli ishlaydi.
//  */
// export function useTelegramBackClose() {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   useEffect(() => {
//     const isRootPath = pathname === '/';
//     const mainButton = window.Telegram?.WebApp?.MainButton;

//     const backButtonHandler = () => {
//       // Bir bosqich orqaga qaytish
//       navigate(-1);
//     };

//     const mainButtonHandler = () => {
//       // Ilova oynasini yopish
//       window.Telegram?.WebApp?.close();
//     };

//     if (isRootPath) {
//       // Agar asosiy sahifada bo'lsa (URL '/')
      
//       // Back tugmasini yashirish
//       hideBackButton();

//       // MainButton (Close tugmasi) uchun sozlamalar
//       mainButton?.setText("Close");
//       mainButton?.show();
      
//       // MainButton bosilganda bajariladigan funksiyani biriktirish
//       const offMain = onMainButtonClick(mainButtonHandler);

//       return () => {
//         // Asosiy sahifadan ketilganda MainButton uchun sozlamalarni tozalash
//         mainButton?.hide();
//         offMain();
//       };

//     } else {
//       // Agar asosiy sahifada bo'lmasa (URL '/' emas)

//       // MainButtonni yashirish
//       mainButton?.hide();

//       // Back tugmasini ko'rsatish
//       showBackButton();

//       // Back tugmasi bosilganda bajariladigan funksiyani biriktirish
//       const offBack = onBackButtonClick(backButtonHandler);

//       return () => {
//         // Boshqa sahifaga o'tilganda Back tugmasi uchun sozlamalarni tozalash
//         hideBackButton();
//         offBack();
//       };
//     }
    
//   }, [navigate, pathname]);
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
 * URL path bo'ylab harakatlanishni aniqlash orqali tugmalar holatini boshqaradi.
 * Bu usul yanada ishonchli va barqaror animatsiyani ta'minlaydi.
 */
export function useTelegramBackClose() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const isRootPath = pathname === '/'; // Asosiy sahifa ekanligini tekshirish
    const mainButton = window.Telegram?.WebApp?.MainButton;

    // Back tugmasi bosilganda bajariladigan funksiya
    const backButtonHandler = () => {
      navigate(-1); // Bir bosqich orqaga qaytish
    };

    // MainButton (Close tugmasi) bosilganda bajariladigan funksiya
    const mainButtonHandler = () => {
      window.Telegram?.WebApp?.close(); // Ilova oynasini yopish
    };

    if (isRootPath) {
      // Agar asosiy sahifada bo'lsa:
      
      // 1. Back tugmasini yashirish
      hideBackButton();

      // 2. MainButton (Close tugmasi) ko'rsatish va sozlash
      mainButton?.setText("Close"); // Tugma matnini "Close" qilish
      mainButton?.show();          // Tugmani ko'rsatish

      // MainButton uchun hodisa tinglovchisini biriktirish
      const offMain = onMainButtonClick(mainButtonHandler);

      // Tozalash funksiyasi: Komponent o'chirilganda yoki dep. o'zgarganda ishlaydi
      return () => {
        mainButton?.hide();      // MainButtonni yashirish
        offMain();               // Hodisa tinglovchisini olib tashlash
      };

    } else {
      // Agar asosiy sahifada bo'lmasa (boshqa sahifada):

      // 1. MainButtonni yashirish
      mainButton?.hide();

      // 2. Back tugmasini ko'rsatish
      showBackButton();

      // Back tugmasi uchun hodisa tinglovchisini biriktirish
      const offBack = onBackButtonClick(backButtonHandler);

      // Tozalash funksiyasi: Komponent o'chirilganda yoki dep. o'zgarganda ishlaydi
      return () => {
        hideBackButton();      // Back tugmasini yashirish
        offBack();             // Hodisa tinglovchisini olib tashlash
      };
    }
    
    // useEffect faqat navigate yoki pathname o'zgargandagina qayta ishga tushadi.
    // window.history.state.idx olib tashlangani sababli, ortiqcha ishga tushishlar va miltillash yo'qoladi.
  }, [navigate, pathname]);
}