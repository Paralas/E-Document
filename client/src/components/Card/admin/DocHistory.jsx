import { useState, useEffect } from "react";
import axios from "axios";

const DocHistory = () => {
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
        <div
          key={doc.id}
          className="block rounded-none bg-white  dark:bg-neutral-600 text-left mx-2 mb-1"
        >
          <div className="p-6">
            <h5 className="title mb-2 text-xl font-bold tracking-wide text-neutral-800 dark:text-neutral-50">
              ประเภทเอกสาร : {doc.document_type}
            </h5>
            <p className="detail mb-2 text-base text-neutral-500 dark:text-neutral-300">
              ชื่อเอกสาร : {doc.document_name}
            </p>
            <p className="detail mb-2 text-base text-neutral-500 dark:text-neutral-300">
              ชื่อผู้ส่ง : {doc.uploader}
            </p>
            <p className="detail mb-2 text-base text-neutral-500 dark:text-neutral-300">
              ส่งไปยัง : {doc.receiver}
            </p>

            <p className="detail mb-2 text-base text-neutral-500 dark:text-neutral-300">
              วันที่ : {doc.formatted_date}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default DocHistory;
