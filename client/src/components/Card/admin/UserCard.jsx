import { useState, useEffect } from "react";
import axios from "axios";

const UserCard = () => {
  const [recentLogins, setRecentLogins] = useState([]);

  useEffect(() => {
    const fetchRecentLogins = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3100/log/getRecentUserLogins"
        );
        setRecentLogins(response.data);
      } catch (error) {
        console.error("Error fetching recent user logins:", error);
      }
    };

    fetchRecentLogins();
  }, []);

  return (
    <>
      <div className="bg-base-300 p-6 mx-1 my-2">
        <div className="flex justify-between">
          <div>
            <ul>
              {recentLogins.map((login, index) => (
                <li key={index}>
                  <h2 className="text-xl font-bold mb-2">
                    บันทึกการเข้าใช้งาน : {login.fullname}
                  </h2>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
