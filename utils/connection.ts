/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

const { DATABASE_URL } = process.env;

const connection = async () => {
  const conn = await mongoose.connect(`${DATABASE_URL}`).catch((err) => console.error(err));

  const Schema = new mongoose.Schema({

  });

  const model = null;

  return { conn, model };
};

export default connection;
