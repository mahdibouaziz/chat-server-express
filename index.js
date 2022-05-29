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


// a client is an object,
// the key is an id of the doctor/patient 
// the content is the socket object
let clients = {};


// socket io part
io.on("connection", (socket) => {
  console.log("connected");
  console.log(socket.id,"Has joined");
  socket.on("signin", (id) => {
    console.log("id: ",id);
    clients[id]=socket;
    // console.log(clients);
  });

  socket.on("message", (data) => {
    console.log("Data ",data);
    let targetId=data.targetId;  
    if (clients[targetId])
  {
    console.log('entred');
    clients[targetId].emit("message",data);
  }
    
  });


});

server.listen(port,() => {
  console.log("server started");
});
