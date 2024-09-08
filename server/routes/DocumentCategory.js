const express = require("express");
const db = require("../config/database");

const router = express.Router();

//API To Get All categories
router.get("/", async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM documents_categories"
    );
    res.json(rows);
  } catch (error) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//Api To Get Name Of categories
router.get("/name", async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT category_name_th FROM documents_categories"
    );
    res.json(rows);
  } catch (error) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//Api to get categories by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM documents_categories WHERE category_id = ?",
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
