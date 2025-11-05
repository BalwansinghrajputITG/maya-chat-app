import { Server } from "socket.io";

const initSocket = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("message", (msg) => {
      io.emit("message", msg);
    });

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};

export default initSocket;
