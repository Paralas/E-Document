import { TiThMenu } from "react-icons/ti";
import LOGO from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Header = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const { role } = JSON.parse(localStorage.getItem("userData"));

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3100/auth/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      setIsLoggedOut(true);
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <>
      <div className="navbar bg-base-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <TiThMenu />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard">หน้าแรก</Link>
              </li>
              <li>
                <Link to="/filemanage">จัดการเอกสาร</Link>
                <ul className="p-2">
                  <li>
                    <Link to="/uploadfile">อัปโหลดเอกสาร</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/member">รายชื่อสมาชิก</Link>
                <ul className="p-2">
                  <li>
                    <Link to="/register">เพิ่มสมาชิก</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/historymanage">ประวัติเอกสาร</Link>
              </li>
            </ul>
          </div>
          <img className="mx-2 size-14" src={LOGO} alt="logo" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <a className="text-xl font-semibold">
            ระบบบริหารจัดการ สารบรรณอิเล็กทรอนิกส์ มหาวิทยาลัยราชพฤกษ์
          </a>
        </div>
        <div className="navbar-end">
          <a className="mx-2">ประเภทผู้ใช้งาน : {role} </a>

          <a
            className="btn btn-outline btn-error"
            onClick={handleLogout}
            disabled={isLoggedOut}
          >
            {isLoggedOut ? "Logged Out" : "ออกจากระบบ"}
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
