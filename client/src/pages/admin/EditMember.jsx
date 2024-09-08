import { useState } from "react";
import axios from "axios";

const EditMember = ({ member, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(member);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3100/users/update/${member.id}`,
        formData
      );
      onUpdate(formData);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* <Layout> */}
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fullname" className="block text-gray-700 font-bold">
            Fullname
          </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="department" className="block text-gray-700 font-bold">
            Department
          </label>
          <input
            type="text"
            name="department"
            id="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="position" className="block text-gray-700 font-bold">
            Position
          </label>
          <input
            type="text"
            name="position"
            id="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex items-center">
          <button type="submit" className="btn btn-success">
            บันทึก
          </button>
          <button className="btn btn-error ml-2" onClick={onClose}>
            ยกเลิก
          </button>
        </div>
      </form>
      {/* </Layout> */}
    </>
  );
};

export default EditMember;
