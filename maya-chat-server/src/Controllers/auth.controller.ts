import { NextFunction, Request, Response } from "express";
import {
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
    const { token, isUser } = await loginUserService(req.body);

    res.cookie("token", token);

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
