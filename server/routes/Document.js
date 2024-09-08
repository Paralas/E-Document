const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const db = require("../config/database");

const router = express.Router();

// Section To Store File Upload To Destination
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/Document");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + String(file.originalname).normalize("NFC"));
  },
});
const upload = multer({ storage: storage });

// Api to Upload Filename To Database
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { name, type, category, uploader, detail } = req.body;

    const file = req.file.filename;

    const [result] = await db.execute(
      "INSERT INTO documents (document_name, file, document_type, document_category, date, uploader, detail) VALUES (?, ?, ?, ?, NOW(), ?, ?)",
      [name, file, type, category, uploader, detail]
    );

    res.json({
      message: "Upload successfully",
      memberId: result.insertId,
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ message: "Error uploading document" });
  }
});

// Api To Get Document With Format Status
router.get("/", async (req, res) => {
  try {
    const [rows, fields] = await db.execute(
      "SELECT *,CASE WHEN status = '' THEN 'ยังไม่อ่าน' ELSE 'อ่านแล้ว' END AS status_text, DATE_FORMAT(date, '%d-%m-%Y %H:%i') AS formatted_date FROM documents;"
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Error fetching documents" });
  }
});

// Api To Upload Docement Data To Database With receiver
router.post("/send", upload.single("file"), async (req, res) => {
  try {
    const { name, type, category, uploader, receiver, detail } = req.body;

    const file = req.file.filename;

    const [result] = await db.execute(
      "INSERT INTO documents (document_name, file, document_type, document_category, date, uploader, receiver, detail) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?)",
      [name, file, type, category, uploader, receiver, detail]
    );

    res.json({
      message: "Upload successfully",
      memberId: result.insertId,
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    res.status(500).json({ message: "Error uploading document" });
  }
});

// Api To get Document Data With File Upload In Database
router.get("/files/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(
    __dirname,
    "../../client/public/Document",
    filename
  );

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

// Api To Delete Document by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const [document] = await db.execute(
      "SELECT file FROM documents WHERE id = ?",
      [req.params.id]
    );

    if (document.length === 0) {
      return res.status(404).json({ message: "Document not found" });
    }

    const filePath = path.join(
      __dirname,
      "../client/public/Document",
      document[0].file
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    await db.execute("DELETE FROM documents WHERE id = ?", [req.params.id]);

    res.json({ message: "Document and file deleted successfully" });
  } catch (error) {
    console.error("Error deleting document and file:", error);
    res.status(500).json({ message: "Error deleting document and file" });
  }
});

// Api To Edit Document By ID
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, receiver } = req.body;
    await db.execute(
      "UPDATE documents SET document_name = ?, receiver = ? WHERE id = ?",
      [name, receiver, id]
    );
    res.status(200).json({ message: "Document updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Api To Get Document Data with Date Format Use in Receiver Card
router.get("/recard", async (req, res) => {
  try {
    const receiver = req.query.receiver;
    const [rows, fields] = await db.execute(
      "SELECT *, DATE_FORMAT(date, '%d-%m-%Y %H:%i') AS formatted_date FROM documents WHERE receiver = ?",
      [receiver]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Error fetching documents" });
  }
});

// Api To Get Document Data with Date Format Use in Sender Card
router.get("/sendcard", async (req, res) => {
  try {
    const receiver = req.query.receiver;
    const [rows, fields] = await db.execute(
      "SELECT *,CASE WHEN status = '' THEN 'ยังไม่อ่าน' ELSE 'อ่านแล้ว' END AS status_text, DATE_FORMAT(date, '%d-%m-%Y %H:%i') AS formatted_date FROM documents WHERE uploader = ?",
      [receiver]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Error fetching documents" });
  }
});

// Api To update Status document by ID
router.put("/:id", async (req, res) => {
  try {
    const documentId = req.params.id;
    const { status } = req.body;

    await db.execute("UPDATE documents SET status = ? WHERE id = ?", [
      status,
      documentId,
    ]);

    res.status(200).json({ message: "Document status updated successfully" });
  } catch (error) {
    console.error("Error updating document status:", error);
    res.status(500).json({ message: "Error updating document status" });
  }
});

// API to get All Document with date Format
router.get("/select", async (req, res) => {
  try {
    const uploader = req.query.uploader;
    const [rows, fields] = await db.execute(
      "SELECT *,CASE WHEN status = '' THEN 'ยังไม่อ่าน' ELSE 'อ่านแล้ว' END AS status_text,DATE_FORMAT(date, '%d-%m-%Y %H:%i') AS date FROM `documents` WHERE uploader = ?",
      [uploader]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ message: "Error fetching documents" });
  }
});

module.exports = router;
