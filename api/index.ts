import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db";
import app from "../app";

let isConnected = false;

const handler = async (req: any, res: any) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return app(req, res);
};

export default handler;
