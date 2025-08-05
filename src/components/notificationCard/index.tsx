import React from "react";

const NotificationCard = ({
  children,
}: {
  children: React.ReactNode;
  data: Record<string, unknown>;
}) => {
  return (
    <div className="shadow-[0px_4px_16px_0px_#FC8F285E] bg-white rounded-[44px]">
      {children}
    </div>
  );
};

export default NotificationCard;
