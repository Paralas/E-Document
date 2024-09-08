import Layout from "../../layouts/AdminLayout";
import React, { useState, useEffect } from "react";
import ConfirmationDialog from "../../components/Dialogbox/Confirm";
import axios from "axios";
import EditFile from "./EditFile";

const FileManage = () => {
  const [documentList, setDocumentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedId, setDeletedId] = useState("");
  const [editingDocument, setEditingDocument] = useState(null);

  useEffect(() => {
    const fetchDocumentList = async () => {
      try {
        const response = await axios.get("http://localhost:3100/document/");
        setDocumentList(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchDocumentList();
  }, []);

  const handleEditClick = (document) => {
    setEditingDocument(document);
  };

  const handleEditClose = () => {
    setEditingDocument(null);
  };

  const handleEditUpdate = (updatedDocument) => {
    setDocumentList(
      documentList.map((document) =>
        document.id === updatedDocument.id ? updatedDocument : document
      )
    );
  };

  const viewDocument = (filename) => {
    window.open(`http://localhost:3100/document/files/${filename}`, "_blank");
  };

  const deletedocument = async (id) => {
    try {
      await axios.delete(`http://localhost:3100/document/delete/${id}`);
      setDeletedId(id);
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = documentList.filter(
    (document) =>
      document.document_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.uploader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.document_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.document_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      document.receiver.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Layout>
        <div className="overflow-x-auto h-dvh w-dvh">
          <div className="items-center mb-2">
            <input
              type="text"
              placeholder="Search by title, sender, receiver or filename"
              className="block w-96 m-2 border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table className="table table-pin-rows table-md">
            <thead>
              <tr>
                <td>ลำดับที่</td>
                <td>ชื่อเรื่อง</td>
                <td>ชื่อไฟล์</td>
                <td>ประเภท</td>
                <td>หมวดหมู่</td>
                <td>วันที่ส่ง</td>
                <td>ผู้ส่ง</td>
                <td>ผู้รับ</td>
                <td>สถานะ</td>
                <td>ไฟล์เอกสาร</td>
                <td>แก้ไข</td>
                <td>ลบ</td>
              </tr>
            </thead>
            <tbody>
              {filtered.map((document, index) => (
                <React.Fragment key={document.id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{document.document_name}</td>
                    <td>{document.file}</td>
                    <td>{document.document_type}</td>
                    <td>{document.document_category}</td>
                    <td>{document.formatted_date}</td>
                    <td>{document.uploader}</td>
                    <td>{document.receiver}</td>
                    <td>{document.status_text}</td>
                    <td>
                      <button
                        className="btn btn-primary hover:underline"
                        onClick={() => viewDocument(document.file)}
                      >
                        ดูเอกสาร
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEditClick(document)}
                      >
                        แก้ไข
                      </button>
                    </td>
                    <td>
                      <ConfirmationDialog
                        message="ยืนยันที่จะลบหรือไม่"
                        onConfirm={() => deletedocument(document.id)}
                        onCancel={() => console.log("Canceled")}
                      />
                    </td>
                  </tr>
                  {editingDocument && editingDocument.id === document.id && (
                    <tr key={`edit-${document.id}`}>
                      <td colSpan="11">
                        <EditFile
                          document={editingDocument}
                          onClose={handleEditClose}
                          onUpdate={handleEditUpdate}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {deletedId && (
                <tr>
                  <td colSpan="11">Doucument {deletedId} has been deleted</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default FileManage;
