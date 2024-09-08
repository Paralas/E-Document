const express = require("express");
const db = require("../config/database");

const router = express.Router();

// API To get all user
router.get("/", async (req, res) => {
  try {
    const [rows, fields] = await db.execute("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// API To get name of user
router.get("/name", async (req, res) => {
  try {
    const [rows, fields] = await db.execute("SELECT fullname FROM users");
    res.json(rows);
  } catch (error) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// API To get user by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT * FROM users WHERE id = ?",
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

// API To delete user by ID
router.delete("/:id", async (req, res) => {
  try {
    await db.execute("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// API To Update User by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      username,
      nm_password,
      fullname,
      email,
      department,
      position,
      phone,
      role,
    } = req.body;

    await db.execute(
      "UPDATE users SET username = ?, nm_password = ?, fullname = ?, email = ?, department = ?, position = ?, phone = ?, role = ? WHERE id = ?",
      [
        username,
        nm_password,
        fullname,
        email,
        department,
        position,
        phone,
        role,
        id,
      ]
    );

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
