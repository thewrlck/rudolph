import mongoose from "mongoose";

export const connect = async (
  username: string,
  password: string,
  database: string,
  host = "localhost",
  port = "27017"
) => {
  return await mongoose.connect(
    `mongodb://${username}:${password}@${host}:${port}`,
    {
      dbName: database,
    }
  );
};
