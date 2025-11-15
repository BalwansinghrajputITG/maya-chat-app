import express from "express";
import {
  isValideUserNameCheck,
  loginUserController,
  registerUserController,
} from "../Controllers/auth.controller";
import {
  loginUserHandler,
  registerUserHandler,
  sessionhandler,
} from "../middlewares/auth.middleware";

const authRouter = express.Router();

authRouter.post("/user/regiseter", registerUserHandler, registerUserController);

authRouter.post(
  "/user/login",
  loginUserHandler,
  sessionhandler,
  loginUserController
);

authRouter.post("/user/isUserName", isValideUserNameCheck);

export default authRouter;
