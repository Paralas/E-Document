import { useState, useEffect } from "react";
import axios from "axios";

const MemberHistory = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:3100/document/");
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);
  return (
    <>
      {documents.map((doc) => (
        <div className="bg-base-300 p-6 mx-1 my-2" key={doc.id}>
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">
                ผู้ใช้งาน : {doc.uploader}
              </h2>
              <p className="text-xl text-black">ส่งเอกสารไปหาผู้รับ : {doc.receiver}</p>
              <p className="text-xl text-black">เวลา : {doc.formatted_date}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MemberHistory;
