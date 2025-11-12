import dotenv from "dotenv";
dotenv.config();

type db_url_type = string | undefined;

export const SALT_ROUND: number = Number(process.env.SALT_ROUND) || 10;

export const APP_PORT = process.env.PORT || 5000;

export const DB_URL: db_url_type = process.env.DB_URL || undefined;
