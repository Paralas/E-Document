import Layout from "../../layouts/UserLayout";
import { useState, useEffect } from "react";
import axios from "axios";

const Uploadpage = () => {
  const [fullname, setFullname] = useState("");
  const [categorys, setCategorys] = useState([]);
  const [types, setTypes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    file: null,
    type: "",
    category: "",
    date: "",
    uploader: "",
    detail: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission state
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await axios.get(
        "http://localhost:3100/documentTypes/name"
      );
      setTypes(response.data);
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await axios.get(
        "http://localhost:3100/documentTypes/name"
      );
      setTypes(response.data);
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchCategorys = async () => {
      const response = await axios.get(
        "http://localhost:3100/documentCategorys/name"
      );
      setCategorys(response.data);
    };
    fetchCategorys();

    const userData = localStorage.getItem("userData");
    if (userData) {
      const { fullname } = JSON.parse(userData);
      setFullname(fullname);
    }
  }, []);

  const handleChange = (event) => {
    if (event.target.name === "file") {
      setFormData({ ...formData, [event.target.name]: event.target.files[0] });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataWithUploader = new FormData();
      formDataWithUploader.append("file", formData.file);
      formDataWithUploader.append("name", formData.name);
      formDataWithUploader.append("type", formData.type);
      formDataWithUploader.append("category", formData.category);
      formDataWithUploader.append("date", formData.date);
      formDataWithUploader.append("uploader", fullname);
      formDataWithUploader.append("detail", formData.detail);
      const response = await axios.post(
        "http://localhost:3100/document/upload",
        formDataWithUploader,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Member data saved successfully:", response.data);
      setIsSuccess(true);
      setFormData({
        name: "",
        file: null,
        type: "",
        category: "",
        date: "",
        uploader: "",
        detail: "",
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
      <Layout>
        <h1 className="text-center text-2xl">แบบฟอร์มการอัปโหลดเอกสาร</h1>
        <form className="p-4">
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
              htmlFor="file"
              className="block text-gray-700 font-bold mb-2"
            >
              เลือกไฟล์งาน :
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".jpg, .jpeg, .png, .pdf"
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="blocktext-gray-700 font-bold mb-2">
              ประเภทของเอกสาร :
            </label>
            <select
              id="type"
              name="type"
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">-- เลือกประเภทเอกสาร --</option>
              {types.map((type) => (
                <option key={type.type_id} value={type.type_name_th}>
                  {type.type_name_th}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-bold mb-2"
            >
              หมวดหมู่ของเอกสาร :
            </label>
            <select
              id="category"
              name="category"
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">-- เลือกหมวดหมู่เอกสาร --</option>
              {categorys.map((category) => (
                <option
                  key={category.category_id}
                  value={category.category_name_th}
                >
                  {category.category_name_th}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-gray-700 font-bold mb-2"
            >
              วันที่ลงเอกสาร :
            </label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="uploader"
              className="block text-gray-700 font-bold mb-2"
            >
              ผู้ลงเอกสาร :
            </label>
            <input
              type="text"
              id="uploader"
              name="uploader"
              value={fullname}
              readOnly
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="detail"
              className="block text-gray-700 font-bold mb-2"
            >
              รายละเอียดเพิ่มเติม:
            </label>
            <textarea
              id="detail"
              name="detail"
              onChange={handleChange}
              autoComplete="off"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="justify-center items-center w-1/5 btn btn-accent hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isSubmitting ? "กำลังอัปโหลด..." : "อัปโหลดไฟล์"}
          </button>
          {isSuccess && (
            <p className="text-green-500 text-base mt-2">
              บันทึกข้อมูลเสร็จสิ้น
            </p>
          )}
        </form>
      </Layout>
    </>
  );
};

export default Uploadpage;
