import WebApp from "@twa-dev/sdk";
import React from "react";


interface Props {
  url: string;
  text?: string;
}

const TelegramShareButton: React.FC<Props> = ({ url, text = "" }) => {
  const handleShare = () => {
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    // Agar Telegram Mini App bo'lsa
    if (WebApp && WebApp.openLink) {
      WebApp.openLink(shareUrl);
    } else {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <button onClick={handleShare} className="py-2 px-4 bg-blue-500 text-white rounded">
      Share
    </button>
  );
};

export default TelegramShareButton;
