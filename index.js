const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// middlewares
app.use(express.json());
app.use(cors());

// socket io part
io.on("connection", (socket) => {
  console.log("connected");
  console.log(socket.id,"Has joined");
  socket.on("/test", (data) => {
    console.log("data: ",data);
  });
});

server.listen(port,() => {
  console.log("server started");
});
