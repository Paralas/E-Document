import { useState, useEffect } from "react";
import axios from "axios";

const NotifyCard = () => {
  const [notificationData, setNotificationData] = useState(null);
  const { fullname } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchNotificationData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3100/notify?receiver=${fullname}`
        );
        setNotificationData(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchNotificationData();
  }, [fullname]);

  return (
    <>
      {notificationData && notificationData.map((notify) => (
        <div
          className="block rounded-none bg-white  dark:bg-neutral-600 text-left mx-2 mb-1"
          key={notify.id}
        >
          <div className="p-6">
            <h5 className="title mb-2 text-xl font-bold tracking-wide text-neutral-800 dark:text-neutral-50">
              เรื่อง : {notify.document_name}
            </h5>
            <p className="detail mb-2 text-base text-neutral-500 dark:text-neutral-300">
              จาก : {notify.uploader}
            </p>
            <p className="detail mb-2 text-base text-neutral-500 dark:text-neutral-300">
              วันที่ : {notify.date}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default NotifyCard;
