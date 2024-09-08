import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";

//public route
import Login from "./pages/login/Login";
import Notfound from "./pages/notfound/error";

//user routes
import Home from "./pages/user/Homepage";
import Receive from "./pages/user/Receivepage";
import Upload from "./pages/user/Uploadpage";
import Delivery from "./pages/user/Deliverypage";
import Archive from "./pages/user/Archivepage";
import History from "./pages/user/Historypage";

//admin routes
import Dashboard from "./pages/admin/Dashboard";
import Register from "./pages/admin/MemberRegister";
import Member from "./pages/admin/MemberManage";
import Editmember from "./pages/admin/EditMember"
import Filemanage from "./pages/admin/FileManage";
import Uploadfile from "./pages/admin/Upload";
import Historymanage from "./pages/admin/History";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<Notfound />} />
          <Route path="/" element={<Login />} />
          {/* User Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/history" element={<History />} />

          {/* Admin Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/member" element={<Member />} />
          <Route path="/edit-member/:id" element={<Editmember />} />
          <Route path="/filemanage" element={<Filemanage />} />
          <Route path="/uploadfile" element={<Uploadfile />} />
          <Route path="/historymanage" element={<Historymanage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
