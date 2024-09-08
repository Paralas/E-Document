import { useState, useEffect } from "react";
import axios from "axios";

const ReceiveCard = () => {
  const [documents, setDocuments] = useState([]);
  const { fullname } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/document/recard?receiver=${fullname}`);
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

  const confirmRequest = async (documentId) => {
    try {
      const response = await axios.put(`http://localhost:3100/document/${documentId}`, { status: "อ่านแล้ว" });
      if (response.status === 200) {
        setDocuments(prevDocuments =>
          prevDocuments.map(doc =>
            doc.id === documentId ? { ...doc, status: "อ่านแล้ว" } : doc
          )
        );
      } else {
        console.error("Failed to update document status:", response);
      }
    } catch (error) {
      console.error("Error updating document status:", error);
    }
  };

  return (
    <>
    {documents && documents.map((doc) => (
      <div className="bg-base-300 p-6 mx-1 my-2" key={doc.id}>
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">เรื่อง : {doc.document_name}</h2>
            <p className="text-xl text-black">ประเภท : {doc.document_type}</p>
            <p className="text-xl text-black">หมวดหมู่ : {doc.document_category}</p>
            <p className="text-xl text-black">วันที่ : {doc.formatted_date}</p>
            <p className="text-xl text-black">ผู้ส่ง : {doc.uploader}</p>
            <p className="text-xl text-black">รายละเอียด : {doc.detail}</p>
          </div>
          <div className="flex flex-col">
            <button className="btn btn-outline btn-warning mb-1"
            onClick={() => viewDocument(doc.file)}
            >
              ตรวจสอบเอกสาร
            </button>
            {doc.status === "อ่านแล้ว" ? (
                <button className="btn btn-outline btn-success mb-10">อ่านแล้ว</button>
              ) : (
                <button className="btn btn-outline btn-success mb-1"
                  onClick={() => confirmRequest(doc.id)}
                >
                  ยืนยันคำร้อง
                </button>
              )}
          </div>
        </div>
      </div>
      ))}
    </>
  );
}

export default ReceiveCard;
