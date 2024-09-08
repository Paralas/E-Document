import { useState, useEffect } from "react";
import axios from "axios";

const RegistorMember = () => {
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    department: "",
    position: "",
    phone: "",
    role: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await axios.get("http://localhost:3100/roles/name");
      setRoles(response.data);
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await axios.get(
        "http://localhost:3100/departments/name"
      );
      setDepartments(response.data);
    };
    fetchDepartments();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3100/auth/register",
        formData
      );
      console.log("Member data saved successfully:", response.data);
      setIsSuccess(true);
      setFormData({
        username: "",
        password: "",
        fullname: "",
        email: "",
        department: "",
        position: "",
        phone: "",
        role: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error saving member data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl mb-6">แบบฟอร์มการเพิ่มสมาชิก</h1>
      <form className="p-4 bg-white shadow-md rounded">
        <div className="mb-3">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2"
          >
            Username :
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password :
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="fullname"
            className="block text-gray-700 font-bold mb-2"
          >
            Full Name :
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="department"
            className="block text-gray-700 font-bold mb-2"
          >
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="department"
            className="block text-gray-700 font-bold mb-2"
          >
            Department :
          </label>
          <select
            id="department"
            name="department"
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">-- เลือก Department --</option>
            {departments.map((department) => (
              <option
                key={department.department_id}
                value={department.department_name}
              >
                {department.department_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="position"
            className="block text-gray-700 font-bold mb-2"
          >
            Position :
          </label>
          <input
            type="text"
            id="position"
            name="position"
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tel" className="block text-gray-700 font-bold mb-2">
            Phone number :
          </label>
          <input
            type="phone"
            id="phone"
            name="phone"
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="block text-gray-700 font-bold mb-2">
            Role :
          </label>
          <select
            id="role"
            name="role"
            onChange={handleChange}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">-- เลือก Role --</option>
            {roles.map((role) => (
              <option key={role.role_id} value={role.role_name}>
                {role.role_name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={isSubmitting} 
          onClick={handleSubmit}
          className="justify-center items-center w-1/5 btn btn-accent hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isSubmitting ? "กำลังบันทึก..." : "เพิ่มสมาชิก"}
        </button>

        {isSuccess && ( 
          <p className="text-green-500 text-base mt-2">บันทึกข้อมูลเสร็จสิ้น</p>
        )}
      </form>
    </>
  );
};

export default RegistorMember;
