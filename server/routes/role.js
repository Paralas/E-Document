const express = require("express");
const db = require("../config/database");

const router = express.Router();

// API To get all Role
router.get("/", async (req, res) => {
  try {
    const [rows, fields] = await db.execute("SELECT * FROM roles");
    res.json(rows);
  } catch (error) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// API To get name of role
router.get("/name", async (req, res) => {
  try {
    const [rows, fields] = await db.execute("SELECT role_name FROM roles");
    res.json(rows);
  } catch (error) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// API To get Role by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM roles WHERE role_id = ?",
      [req.params.id]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
