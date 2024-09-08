import userIcon from "../../../assets/icon.png";
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
            <img src={userIcon} className="mt-8 m-2 w-20 " />
            <p className="mx-4 font-bold">User : { fullname }</p>
            <Link
              to="/home"
              className="btn btn-outline btn-primary bg-indigo-50 w-60 mt-8 text-lg font-bold"
            >
              หน้าแรก
            </Link>
            <Link
              to="/upload"
              className="btn btn-outline btn-primary bg-indigo-50 w-60 mt-4 text-lg font-bold"
            >
              อัปโหลดเอกสาร
            </Link>
            <Link
              to="/delivery"
              className="btn btn-outline btn-primary bg-indigo-50 w-60 mt-4 text-lg font-bold"
            >
              จัดส่งเอกสาร
            </Link>
            <Link
              to="/receive"
              className="btn btn-outline btn-primary bg-indigo-50 w-60 mt-4 text-lg font-bold"
            >
              สถานะของเอกสาร
            </Link>
            <Link
              to="/archive"
              className="btn btn-outline btn-primary bg-indigo-50 w-60 mt-4 text-lg font-bold"
            >
              คลังเอกสาร
            </Link>
            <Link
              to="/history"
              className="btn btn-outline btn-primary bg-indigo-50 w-60 mt-4 text-lg font-bold"
            >
              ประวัติเอกสาร
            </Link>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar