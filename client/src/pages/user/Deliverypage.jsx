import Layout from "../../layouts/UserLayout";
import { useState, useEffect } from "react";
import axios from "axios";
import SenderCard from "../../components/Card/user/SendCard";

const Deliverypage = () => {
  const [fullname, setFullname] = useState("");
  const [receive, setReceive] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [types, setTypes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    file: null,
    type: "",
    category: "",
    date: "",
    uploader: "",
    receiver: "",
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
    const fetchReceive = async () => {
      const response = await axios.get("http://localhost:3100/users/name");
      setReceive(response.data);
    };
    fetchReceive();
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
      formDataWithUploader.append("receiver", formData.receiver);
      formDataWithUploader.append("detail", formData.detail);
      const response = await axios.post(
        "http://localhost:3100/document/send",
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
        receiver: "",
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
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6">
            <div className=" bg-white dark:bg-neutral-100 h-dvh ">
              <table className="min-w-full text-left text-xs whitespace-nowrap">
                <thead className="uppercase tracking-wider sticky top-0 bg-white dark:bg-neutral-100 ">
                  <tr>
                    <th className="px-6 py-4 border-x text-xl">
                      <h1 className="text-center text-2xl">
                        แบบฟอร์มการอัปโหลดเอกสาร
                      </h1>
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
                          <label
                            htmlFor="type"
                            className="blocktext-gray-700 font-bold mb-2"
                          >
                            ประเภทของเอกสาร :
                          </label>
                          <select
                            id="type"
                            name="type"
                            onChange={handleChange}
                            className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="">-- เลือกประเภทเอกสาร --</option>
                            {types.map((type) => (
                              <option
                                key={type.type_id}
                                value={type.type_name_th}
                              >
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
                            วันที่ส่งเอกสาร :
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
                            ผู้ส่งเอกสาร :
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
                          {isSubmitting ? "กำลังส่งไฟล์..." : "ส่งไฟล์"}
                        </button>
                        {isSuccess && (
                          <p className="text-green-500 text-base mt-2">
                            บันทึกข้อมูลเสร็จสิ้น
                          </p>
                        )}
                      </form>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="overflow-x-auto bg-white dark:bg-neutral-100 h-dvh overflow-y-scroll">
              <table className="min-w-full text-left text-xs whitespace-nowrap">
                <thead className="uppercase tracking-wider sticky top-0 bg-white dark:bg-neutral-100 ">
                  <tr>
                    <th className="px-6 py-4  text-xl">
                      <h1 className="text-center text-2xl">
                        เอกสารที่ได้จัดส่ง
                      </h1>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b">
                    <SenderCard />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Deliverypage;
