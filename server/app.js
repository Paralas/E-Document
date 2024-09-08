const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3100;

const db = require("./config/database");
const Roles = require("./routes/role");
const Department = require("./routes/department");
const DocumentCategory = require("./routes/documentCategory");
const DocumentType = require("./routes/documentType");
const User = require("./routes/user");
const Auth = require("./routes/authen");
const Document = require("./routes/document");
const Log = require("./routes/logLogin");
const notification = require("./routes/notification");

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/roles", Roles);
app.use("/auth", Auth);
app.use("/users", User);
app.use("/departments", Department);
app.use("/documentCategorys", DocumentCategory);
app.use("/documentTypes", DocumentType);
app.use("/document", Document);
app.use("/log", Log);
app.use("/notify", notification);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
