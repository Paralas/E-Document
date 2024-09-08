import { useState, useEffect } from "react";
import axios from "axios";

const EditFile = ({ document, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(document);
  const [receive, setReceive] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchReceive = async () => {
      const response = await axios.get("http://localhost:3100/users/name");
      setReceive(response.data);
    };
    fetchReceive();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3100/document/update/${document.id}`,
        formData
      );
      onUpdate(formData);
      onClose();
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg">
        <div className="mb-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              ชื่อเรื่อง :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-gray-700 font-bold mb-2"
            >
              ผู้รับเอกสาร :
            </label>
            <select
              id="receiver"
              name="receiver"
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">-- เลือกผู้รับ --</option>
              {receive.map((receive) => (
                <option key={receive.id} value={receive.fullname}>
                  {receive.fullname}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <button type="submit" className="btn btn-success">
              บันทึก
            </button>
            <button className="btn btn-error ml-2" onClick={onClose}>
              ยกเลิก
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditFile;
