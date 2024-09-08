import "./Layouts.css";
import Navbar from "../components/Navigator/admin/Header";
import Sidebar from "../components/Navigator/admin/Sidebar";

function AdminLayout({ children }) {
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

export default AdminLayout;
