import Icon from "../../../assets/icon.png";
import { Link } from "react-router-dom";

function Sidebar() {
  const { fullname } = JSON.parse(localStorage.getItem("userData"));
  return (
    <>
      <div className="drawer w-full max-w-max md:drawer-open bg-base-300 ">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle bg-base-300"
        />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 pt-6 w-70 min-h-full bg-base-300 text-base-content items-center ">
            <img src={Icon} className="mt-8 m-2 w-20 " />
            <p className="mx-4 font-bold">User : { fullname } </p>
            <Link
              to="/dashboard"
              className="btn btn-outline btn-primary bg-indigo-50 w-60 mt-8 text-lg font-bold"
            >
              หน้าแรก
            </Link>
            <Link
              to="/uploadfile"
              className="btn btn-outline btn-primary bg-indigo-50 w-60 mt-4 text-lg font-bold"
            >
              อัปโหลดเอกสาร
            </Link>
            <Link
              to="/filemanage"
              className="btn btn-outline btn-primary bg-indigo-50 w-60 mt-4 text-lg font-bold"
            >
              จัดการเอกสาร
            </Link>
            <Link
              to="/member"
              className="btn btn-outline btn-primary bg-indigo-50 w-60 mt-4 text-lg font-bold"
            >
              รายชื่อสมาชิก
            </Link>
            <Link
              to="/register"
              className="btn btn-outline btn-primary bg-indigo-50 w-60 mt-4 text-lg font-bold"
            >
              เพิ่มสมาชิก
            </Link>
            <Link
              to="/historymanage"
              className="btn btn-outline btn-primary bg-indigo-50 w-60 mt-4 text-lg font-bold"
            >
              ประวัติ
            </Link>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar