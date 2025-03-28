const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const cors = require("cors");

require("dotenv").config();

const port = 3001;
const app = express();
const MONGO_URL = process.env.MONGO_URL;

app.use(express.static("../frontend/dist")); // данная строчка позволяет запустить фронтенд часть на том же порту, даже если приложение с фронта не запущено. Этот способ лучше подходит для продакшена. Но для разработки этот способ не подходит, так как билд затрачивает больше времени

app.use(
  cors({
    origin: ["http://localhost:5173", "http://103.74.93.28:3006"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.originalUrl);
  next();
});

app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "frontend", "build", "index.html"));
});

mongoose.connect(MONGO_URL).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
