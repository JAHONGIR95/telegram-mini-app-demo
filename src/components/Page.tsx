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

import { useNavigate } from "react-router-dom";
import {
  hideBackButton,
  onBackButtonClick,
  onMainButtonClick,
  showBackButton,
} from "@telegram-apps/sdk-react";
import { type PropsWithChildren, useEffect } from "react";

export function Page({
  children,
  back = true,
}: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   */
  back?: boolean;
}>) {
  const navigate = useNavigate();

  useEffect(() => {
    if (back) {
      if (window.history.length > 1) {
        showBackButton();
        return onBackButtonClick(() => {
          navigate(-1);
        });
      } else {
        window.Telegram?.WebApp?.MainButton?.setText("Close");
        return onMainButtonClick(() => {
          window.Telegram?.WebApp?.close();
        });
      }
    }
    hideBackButton();
  }, [back]);

  return <>{children}</>;
}
