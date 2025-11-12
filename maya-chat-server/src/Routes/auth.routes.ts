import express from "express";
import { loginUserController, registerUserController } from "../Controllers/auth.controller";
import { loginUserHandler, registerUserHandler } from "../middlewares/auth.middleware";

const authRouter = express.Router();

authRouter.post("/user/regiseter", registerUserHandler, registerUserController);
authRouter.post("/user/login", loginUserHandler , loginUserController);

export default authRouter;
