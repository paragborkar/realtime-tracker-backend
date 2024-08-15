const { createServer } = require("http");
const { Server } = require("socket.io");
const app = require("./app");

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    io.emit("user-disconnect", socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
