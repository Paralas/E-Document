const express = require("express");
const db = require("../config/database");

const router = express.Router();

// API to get all types
router.get("/", async (req, res) => {
  try {
    const [rows, fields] = await db.execute("SELECT * FROM documents_types");
    res.json(rows);
  } catch (error) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// API To get type name
router.get("/name", async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT type_name_th FROM documents_types"
    );
    res.json(rows);
  } catch (error) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// APi to get Type by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM documents_types WHERE type_id = ?",
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
