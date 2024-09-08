const express = require("express");
const db = require("../config/database");

const router = express.Router();

// API to get All Activity From User By cookie state
router.get("/", async (req, res) => {
  try {
    const receiver = req.query.receiver;
    const [rows, fields] = await db.execute(
      "SELECT *,DATE_FORMAT(date, '%d-%m-%Y %H:%i') AS date FROM `documents` WHERE receiver = ?",
      [receiver]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ message: "Error fetching documents" });
  }
});

// API to get History By user from cookie state
router.get("/history", async (req, res) => {
  try {
    const uploader = req.query.uploader;
    const [rows, fields] = await db.execute(
      "SELECT *,DATE_FORMAT(date, '%d-%m-%Y %H:%i') AS date FROM `documents` WHERE uploader = ?",
      [uploader]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ message: "Error fetching documents" });
  }
});

module.exports = router;
