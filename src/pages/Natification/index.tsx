import human from "/images/human.webp";
import NotificationCard from "@/components/notificationCard";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      img: human,
      username: "Vladislav",
      message: "Привет, как дела? Все хорошо?",
      date: "20.02.2025",
    },
    {
      id: 2,
      img: human,
      username: "Vladislav",
      message: "Привет, как дела? Все хорошо?",
      date: "20.02.2025",
    },
    {
      id: 3,
      img: human,
      username: "Vladislav",
      message: "Привет, как дела? Все хорошо?",
      date: "20.02.2025",
    },
    {
      id: 4,
      img: human,
      username: "Vladislav",
      message: "Привет, как дела? Все хорошо?",
      date: "20.02.2025",
    },
    {
      id: 5,
      img: human,
      username: "Vladislav",
      message: "Привет, как дела? Все хорошо?",
      date: "20.02.2025",
    },
    {
      id: 6,
      img: human,
      username: "Vladislav",
      message: "Привет, как дела? Все хорошо?",
      date: "20.02.2025",
    },
    {
      id: 7,
      img: human,
      username: "Vladislav",
      message: "Привет, как дела? Все хорошо?",
      date: "20.02.2025",
    },
    {
      id: 8,
      img: human,
      username: "Vladislav",
      message: "Привет, как дела? Все хорошо?",
      date: "20.02.2025",
    },
    {
      id: 9,
      img: human,
      username: "Vladislav",
      message: "Привет, как дела? Все хорошо?",
      date: "20.02.2025",
    },
    {
      id: 10,
      img: human,
      username: "Vladislav",
      message: "Привет, как дела? Все хорошо?",
      date: "20.02.2025",
    },
    {
      id: 11,
      img: human,
      username: "Vladislav",
      message: "Привет, как дела? Все хорошо?",
      date: "20.02.2025",
    },
    {
      id: 12,
      img: human,
      username: "Vladislav",
      message: "Привет, как дела? Все хорошо?",
      date: "20.02.2025",
    },
  ];

  return (
    <div className="h-screen bg-accent flex flex-col">
      <Header className="shadow-[0_15px_20px_-2px_#FFF0D8]">
        <h1 className="font-extrabold text-tertiary text-2xl text-center pb-3">
          Уведомления
        </h1>
      </Header>

      <div className=" px-3 pt-4 pb-25 overflow-y-auto  space-y-2">
        {notifications.map((notification) => (
          <NotificationCard data={notification} key={notification.id}>
            <Link to={`/notifications/${notification.id}`}>
              <div className="flex items-center gap-3 p-3 cursor-pointer">
                <img
                  src={notification.img}
                  className="w-10 h-10 rounded-full"
                />

                <p className="font-[400] text-[10px]">
                  {notification.username && (
                    <span className="text-[12px] font-bold  bg-gradientText bg-clip-text text-transparent">
                      {notification.username}
                    </span>
                  )}{" "}
                  {notification.message}
                </p>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-500">{notification.date}</p>
                  <p className="text-sm font-bold  bg-gradientText bg-clip-text text-transparent">
                    перейти
                  </p>
                </div>
              </div>
            </Link>
          </NotificationCard>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
