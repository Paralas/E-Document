import LOGO from "../../assets/logo.png";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3100/auth/login", {
        username,
        password,
      });

      localStorage.setItem("accessToken", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.userData));

      const role = response.data.userData.role;
      if (role === "user") {
        navigate("/home");
      } else if (role === "admin" || role === "tester") {
        navigate("/dashboard");
      } else {
        console.error("Unrecognized role:", role);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-base-300">
        <div className="container md:w-1/3 mx-auto shadow-md rounded-lg bg-white p-8">
          <img src={LOGO} alt="RPU" className="mx-auto w-24" />
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-lg font-bold leading-6 text-gray-900 mb-2"
              >
                ชื่อผู้ใช้งาน :
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
                required
                className="input input-bordered input-accent w-full focus:ring focus:ring-indigo-500 focus:border-indigo-500 text-black bg-stone-100"
              />
            </div>

            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-lg font-bold leading-6 text-gray-900 mb-2"
              >
                รหัสผ่าน :
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                required
                className="input input-bordered input-accent w-full focus:ring focus:ring-indigo-500 focus:border-indigo-500 text-black bg-stone-100"
              />
              <button
                type="button"
                className="absolute text-gray-500 right-0 p-4 rounded-r-md focus:outline-none focus:ring-indigo-500 "
                onClick={handleShowPassword}
              >
                {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="text-red-600">
              หากต้องพบปัญหาในการใช้งานระบบ กรุณาติดต่อฝ่าย.....
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full rounded-md py-2 px-4 hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
