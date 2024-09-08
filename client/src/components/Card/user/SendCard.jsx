import { useState, useEffect } from "react";
import axios from "axios";

const SendCard = () => {
  const [documents, setDocuments] = useState([]);
  const { fullname } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3100/document/sendcard?receiver=${fullname}`
        );
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [fullname]);

  const viewDocument = (filename) => {
    window.open(`http://localhost:3100/document/files/${filename}`, "_blank");
  };

  return (
    <>
      {documents &&
        documents.map((doc) => (
          <div className="bg-base-300 p-6 mx-1 my-2" key={doc.id}>
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">
                  เรื่อง : {doc.document_name}
                </h2>
                <p className="text-xl text-black">
                  ประเภท : {doc.document_type}
                </p>
                <p className="text-xl text-black">
                  หมวดหมู่ : {doc.document_category}
                </p>
                <p className="text-xl text-black">
                  วันที่ : {doc.formatted_date}
                </p>
                <p className="text-xl text-black">ผู้รับ : {doc.receiver}</p>
                <p className="text-xl text-black">รายละเอียด : {doc.detail}</p>
              </div>
              <div className="flex flex-col">
                <button
                  className="btn btn-outline btn-warning mb-1"
                  onClick={() => viewDocument(doc.file)}
                >
                  ตรวจสอบเอกสาร
                </button>
                {doc.receiver ? (
                  <button className="btn btn-outline btn-primary mb-1">
                    {doc.status_text}
                  </button>
                ) : (
                  <button className="btn btn-outline btn-secondary mb-1" disabled>
                    ยังไม่ได้อ่าน
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default SendCard;
