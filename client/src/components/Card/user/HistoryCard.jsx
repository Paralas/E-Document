import { useState, useEffect } from "react";
import axios from "axios";

const HistoryCard = () => {
  const [historyData, sethistoryData] = useState(null);
  const { fullname } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchhistoryData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3100/notify/history?uploader=${fullname}`
        );
        sethistoryData(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchhistoryData();
  }, [fullname]);
  return (
    <>
      {historyData &&
        historyData.map((history) => (
          <div
            key={history.id}
            className="block rounded-none bg-white  dark:bg-neutral-600 text-left mx-2 mb-1"
          >
            <div className="p-6">
              <h5 className="title mb-2 text-xl font-bold tracking-wide text-neutral-800 dark:text-neutral-50">
                ประเภทเอกสาร : {history.document_type}
              </h5>
              <p className="detail mb-2 text-base text-neutral-500 dark:text-neutral-300">
                ชื่อเอกสาร : {history.document_name}
              </p>
              <p className="detail mb-2 text-base text-neutral-500 dark:text-neutral-300">
                ส่งไปยัง : {history.receiver}
              </p>
              <p className="detail mb-2 text-base text-neutral-500 dark:text-neutral-300">
                ชื่อผู้ส่ง : {history.uploader}
              </p>
              <p className="detail mb-2 text-base text-neutral-500 dark:text-neutral-300">
                วันที่ : {history.date}
              </p>
            </div>
          </div>
        ))}
    </>
  );
};

export default HistoryCard;
