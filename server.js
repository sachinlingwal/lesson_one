require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const { logger, logEvents } = require("./middleware/logger");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

connectDB();
app.use(logger);
app.use(express.json());
app.use(cookieParser());
// app.use(express.static("public");
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));
app.use("/users", require("./routes/userRoutes"));
app.use(cors(corsOptions));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});

mongoose.connection.on("error", () => {
  console.log(error);
  logEvents(`${error.no} : ${error.code}\t${error.syscall}\t${error.hostname}`);
});
