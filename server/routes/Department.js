const express = require("express");
const db = require("../config/database");

const router = express.Router();

// Api Get All Department
router.get("/", async (req, res) => {
  try {
    const [rows, fields] = await db.execute("SELECT * FROM departments");
    res.json(rows);
  } catch (error) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Api Get Department Name
router.get("/name", async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT department_name FROM departments"
    );
    res.json(rows);
  } catch (error) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Api Get Depaetment By ID
router.get("/:id", async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM departments WHERE department_id = ?",
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
