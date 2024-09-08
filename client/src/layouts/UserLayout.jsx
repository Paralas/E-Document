import "./Layouts.css";
import Navbar from "../components/Navigator/user/Header";
import Sidebar from "../components/Navigator/user/Sidebar";

function UserLayout({ children }) {
  return (
    <>
      <section className="layout">
        <div className="header">
          <Navbar />
        </div>
        <div className="leftSide">
          <Sidebar />
        </div>
        <div className="body">{children}</div>
      </section>
    </>
  );
}

export default UserLayout;
