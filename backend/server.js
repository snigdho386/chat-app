const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("../backend/routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const messageRoutes = require("./routes/messageRoutes");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); // to accept json data

//--------------------DEPLOYMENT---------------------------
// console.log(process.env.NODE_ENV);
console.log("::::: ", __dirname);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../frontend/build")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running !");
  });
}

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.get("/api/chat", (req, res) => {
  res.send(chats);
});
app.get("/api/chat/:id", (req, res) => {
  const chatId = req.params.id;
  const chat = chats.find((c) => c.id == chatId);
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server started in Port ${PORT} `);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("User ID :: ", userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room :: ", room);
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.on("typing", (room) => {
    return socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => {
    return socket.in(room).emit("stop typing");
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
// console.log(chats);
