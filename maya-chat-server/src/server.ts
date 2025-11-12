import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import initSocket from "./Sockets/socket";
import dbConnect from "./Configs/db";
import { APP_PORT } from "./Configs/env";
import { errorHandler } from "./middlewares/errolHandler.middleware";
import bodyParser from "body-parser";
import authRouter from "./Routes/auth.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const PORT = APP_PORT;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript + Express!");
});

app.use("/api/auth" , authRouter)

app.use(errorHandler);

initSocket(io);
dbConnect();

server.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
