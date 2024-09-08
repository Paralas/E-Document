const express = require("express");
const db = require("../config/database");

const router = express.Router();

//API to Get Recent User
router.get("/getRecentUserLogins", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT fullname, MAX(date) AS last_login FROM log_login WHERE date > NOW() - INTERVAL 30 MINUTE GROUP BY username"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching recent user logins:", error);
    res.status(500).json({ message: "Error fetching recent user logins" });
  }
});

module.exports = router;
