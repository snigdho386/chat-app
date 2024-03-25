const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("../backend/routes/userRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); // to accept json data

app.get("/", (req, res) => {
  res.send("API is running !");
});

app.use("/api/user", userRoutes);

app.get("/api/chat", (req, res) => {
  res.send(chats);
});
app.get("api/chat/:id", (req, res) => {
  const chatId = req.params.id;
  const chat = chats.find((c) => c.id == chatId);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started in Port ${PORT} `);
});

// console.log(chats);
