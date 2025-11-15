import { NextFunction, Request, Response } from "express";
import {
  isValideUserName,
  loginUserService,
  registerUserService,
} from "../Services/auth.services";

export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, newUser } = await registerUserService(req.body);

    res.cookie("token", token);

    return res.status(201).json({
      succese: true,
      message: "user Created Succesefully",
      user: {
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender,
        userName: newUser.userName,
      },
    });
  } catch (error: any) {
    console.log(error);
    next(error.message);
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.session);
    const { token, isUser } = await loginUserService(req.body);

    (req.session as any).isLoggedIn = true;
    (req.session as any).userId = isUser._id;
    (req.session as any).token = token;
    req.session.save();

    return res.status(201).json({
      succese: true,
      message: "user login Succesefully",
      user: {
        name: isUser.name,
        email: isUser.email,
        gender: isUser.gender,
        userName: isUser.userName,
      },
    });
  } catch (error: any) {
    console.log(error);
    next(error.message);
  }
};

export const isValideUserNameCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const { message } = await isValideUserName(req.body);
    res.status(200).json({
      message: message,
      succese: true,
    });
  } catch (error: any) {
    console.log(error);
    next(error.message);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out" });
    });
  } catch (error: any) {
    console.log(error);
    next(error.message);
  }
};
