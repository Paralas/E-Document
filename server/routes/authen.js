const db = require("../config/database");
const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const secretKey = "your-secret-key";

// Api For Register Account
router.post("/register", async (req, res) => {
  try {
    const {
      username,
      password,
      fullname,
      email,
      department,
      position,
      phone,
      role,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await db.execute(
      "INSERT INTO `users` (`username`, `password`, `nm_password`, `fullname`, `email`, `department`, `position`, `phone`, `role`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        username,
        hashedPassword,
        password,
        fullname,
        email,
        department,
        position,
        phone,
        role,
      ]
    );

    res.json({
      message: "Member registered successfully",
      memberId: result.insertId,
    });
  } catch (error) {
    console.error("Error registering member:", error);
    res.status(500).json({ message: "Error registering member" });
  }
});

// Api For Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const [user] = await db.execute("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid username" });
    }

    const userFromDB = user[0];
    const isMatch = await bcrypt.compare(password, userFromDB.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: userFromDB.id, role: userFromDB.role },
      secretKey,
      {
        expiresIn: "300m",
      }
    );
    const { password: _password, ...userData } = userFromDB;

    // Log user login
    const log_login_query =
      "INSERT INTO log_login (username, fullname, token, date) VALUES ( ?, ?, ?, NOW())";
    db.query(
      log_login_query,
      [userFromDB.username, userFromDB.fullname, token],
      (err, results) => {
        if (err) throw err;
        console.log("Logged user login: ", results);
      }
    );

    // Set token as cookie
    res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json({ message: "Login successful", userData, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Api For Logout
router.post("/logout", (req, res) => {
  res.clearCookie("accessToken", { httpOnly: true }); // Clear access token cookie
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
