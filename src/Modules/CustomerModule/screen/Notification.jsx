import React from "react";
import NotificationCard from "../../../components/NotificationCard";

const notifications = [
  {
    title: "New Feature Update",
    message:
      "We have launched a new feature to enhance your experience. Check it out now!",
  },
  {
    title: "Maintenance Notification",
    message:
      "Scheduled maintenance is planned for this weekend. Services may be interrupted.",
  },
  {
    title: "Welcome to Our Platform",
    message:
      "Thank you for joining! Explore our features to get the best out of your experience.",
  },
];

const Notifications = () => {
  return (
    <div className="min-h-screen bg-[#f5f5dc]">
      <div className="container mx-auto my-5 px-4">
        <h2 className="text-3xl font-semibold mb-4 underline text-left ml-56">
          Notifications
        </h2>
        <div className="mt-5 flex flex-col gap-4 items-center" id="notification-container">
          {notifications.map((notification, index) => (
            <NotificationCard
              key={index}
              title={notification.title}
              message={notification.message}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
