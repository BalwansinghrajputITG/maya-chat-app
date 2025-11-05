import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

type db_url_type = string | undefined;

const DB_URL: db_url_type = process.env.DB_URL || undefined;
const dbConnect = async () => {
  try {
    if (!DB_URL) {
      throw new Error("db is url is not found");
    }

    await mongoose.connect(DB_URL);
    console.log("db connect");
  } catch (error) {
    //  app.locals.dbConnected  = false
    console.log("data base faild", error);
  }
};

export default dbConnect;
