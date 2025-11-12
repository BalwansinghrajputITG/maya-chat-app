import { NextFunction, Request, Response } from "express";


export const registerUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, gender, password, userName } = req.body;
  if (!name || !email || !gender || !password || !userName) {
    res.status(400).json({
      message: "all filds required",
    });

    return;
  }
  next();
};

export const loginUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { password, userNameOrEmail } = req.body;

  if (!password || !userNameOrEmail) {
    res.status(400).json({
      message: "all filds required",
    });

    return;
  }
  next();
};
