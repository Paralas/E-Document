const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "correspondence",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("ไม่สามารถเชื่อมต่อฐานข้อมูลได้เนื่องจาก:", err);
    return;
  }
  console.log("เชื่อมต่อฐานข้อมูลสำเร็จ!");
  connection.release(); // Release the connection
});

module.exports = pool.promise();
