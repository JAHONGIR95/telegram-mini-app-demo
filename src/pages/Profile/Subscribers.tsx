import Header from "@/components/Header";
import { useState } from "react";
// import { Button } from "@telegram-apps/telegram-ui";
import clsx from "clsx";
import Button from "@/components/buttons/Button";
import Users from "@/views/subscribers/Users";
import Books from "@/views/subscribers/Books";
import Connections from "@/views/subscribers/Connections";
import { useSafeAreaBottom } from "@/components/App";

const Subscribers = () => {
  const [activeSection, setActiveSection] = useState("users");
  const { safeAreaBottom } = useSafeAreaBottom();

  const buttons = [
    {
      label: "Пользователи",
      value: "users",
    },
    {
      label: "Книги",
      value: "books",
    },
    {
      label: "#Связи",
      value: "connections",
    },
  ];

  return (
    <div className="h-screen bg-accent flex flex-col">
      <Header className="shadow-[0px_5px_10px_-2px_#FFF0D8]">
        <h1 className="font-extrabold text-tertiary text-2xl text-center mb-4">
          Подписки
        </h1>
        <div className="flex justify-between gap-4 px-3">
          {buttons?.map((button, idx) => (
            <Button
              key={idx}
              onClick={() => setActiveSection(button.value)}
              variant={button.value === activeSection ? "primary" : "outline"}
              className={clsx(
                "flex-1",
                button.value === activeSection ? "!bg-primaryClicked" : ""
              )}
            >
              {button.label}
            </Button>
          ))}
        </div>
        <div className="divider before:bg-[#FFD5AE] after:bg-[#FFD5AE] mb-1 px-3"></div>
      </Header>

      <div className="px-3 pt-4 overflow-y-auto space-y-2.5" style={{ paddingBottom: safeAreaBottom + 80 }}>
        {activeSection === 'users' && <Users />}
        {activeSection === 'books' && <Books />}
        {activeSection === 'connections' && <Connections />}
      </div>
    </div>
  );
};

export default Subscribers;
