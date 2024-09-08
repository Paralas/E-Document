import Layout from "../../layouts/AdminLayout";
import ConfirmationDialog from "../../components/Dialogbox/Confirm";
import React, { useState, useEffect } from "react";
import EditMember from "./EditMember";
import axios from "axios";

function MemberManage() {
  const [memberList, setMemberList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedId, setDeletedId] = useState("");
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    const fetchMemberList = async () => {
      const response = await axios.get("http://localhost:3100/users");
      setMemberList(response.data);
    };
    fetchMemberList();
  }, []);

  const deleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:3100/users/${id}`);
      setDeletedId(id);
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (member) => {
    setEditingMember(member);
  };

  const handleEditClose = () => {
    setEditingMember(null);
  };

  const handleEditUpdate = (updatedMember) => {
    setMemberList(
      memberList.map((member) =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
  };

  const filteredMembers = memberList.filter(
    (member) =>
      member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="overflow-x-auto h-dvh w-dvh">
        <div className="items-center mb-2">
          <input
            type="text"
            placeholder="Search by username, fullname, department or email"
            className="block w-96 m-2 border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="table table-pin-rows table-md">
          <thead className="font-bold">
            <tr className="bg-base-200 font-black">
              <th>ลำดับที่</th>
              <th>ชื่อผู้ใช้งาน</th>
              <th>รหัสผ่าน</th>
              <th>ชื่อ-นามสกุล</th>
              <th>อีเมลล์</th>
              <th>แผนก/หน่วยงาน</th>
              <th>ตำแหน่ง</th>
              <th>เบอร์โทรศัพท์</th>
              <th>ระดับผู้ใช้งาน</th>
              <th>แก้ไข</th>
              <th>ลบ</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <React.Fragment key={member.id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{member.username}</td>
                  <td>{member.nm_password}</td>
                  <td>{member.fullname}</td>
                  <td>{member.email}</td>
                  <td>{member.department}</td>
                  <td>{member.position}</td>
                  <td>{member.phone}</td>
                  <td>{member.role}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(member)}
                    >
                      แก้ไข
                    </button>
                  </td>
                  <td>
                    <ConfirmationDialog
                      message="ยืนยันที่จะลบหรือไม่"
                      onConfirm={() => deleteMember(member.id)}
                      onCancel={() => console.log("Canceled")}
                    />
                  </td>
                </tr>
                {editingMember && editingMember.id === member.id && (
                  <tr key={`edit-${member.id}`}>
                    <td colSpan="11">
                      <EditMember
                        member={editingMember}
                        onClose={handleEditClose}
                        onUpdate={handleEditUpdate}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {deletedId && (
              <tr>
                <td colSpan="11">User with id {deletedId} has been deleted</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default MemberManage;
