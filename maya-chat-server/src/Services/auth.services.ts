import { hasPassword, virifyPassword } from "../lib/password";
import User from "../Models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface registerTypes {
  name?: string;
  userName: string;
  password: string;
  gender?: string;
  email: string;
}

interface loginTypes {
  userNameOrEmail: string;
  password: string;
}

const jwtToke: string = process.env.JWT || "default-secret-key";

export const registerUserService = async (userData: registerTypes) => {
  const { name, userName, password, gender, email } = userData;

  const isUser = await User.findOne({
    $or: [
      { userName: new RegExp(`^${userName}$`, "i") },
      { email: new RegExp(`^${email}$`, "i") },
    ],
  });

  if (isUser) {
    throw new Error("user is allready exists");
  }

  const encryptPassword = await hasPassword(password);

  const newUser = await User.create({
    name,
    userName,
    password: encryptPassword,
    gender,
    email,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
    },
    jwtToke
  );

  return { newUser, token };
};

export const loginUserService = async (userData: loginTypes) => {
  const { userNameOrEmail, password } = userData;

  const isUser = await User.findOne({
    $or: [
      { userName: new RegExp(`^${userNameOrEmail}$`, "i") },
      { email: new RegExp(`^${userNameOrEmail}$`, "i") },
    ],
  });

  if (!isUser) {
    throw new Error("user is not exists please register");
  }

  if (!isUser.password) {
    throw new Error("User password is missing.");
  }

  const isValidePasword = await virifyPassword(password, isUser.password);

  if (!isValidePasword) {
    throw new Error("Password is invalid");
  }

  const token = jwt.sign(
    {
      id: isUser._id,
    },
    jwtToke
  );

  return { token, isUser };
};
