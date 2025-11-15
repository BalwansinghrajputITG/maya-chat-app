import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import initSocket from "./Sockets/socket";
import dbConnect from "./Configs/db";
import { APP_PORT, DB_URL, SESSION_SECRET } from "./Configs/env";
import { errorHandler } from "./middlewares/errolHandler.middleware";
import authRouter from "./Routes/auth.routes";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

console.log(DB_URL);

app.use(
  session({
    secret: SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
      mongoUrl: DB_URL,
      collectionName: "sessions",
    }),
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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello TypeScript + Express!");
});

app.use("/api/auth", authRouter);

app.use(errorHandler);

initSocket(io);
dbConnect();

server.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
