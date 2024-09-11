import mongoose from "mongoose";

export const MongoDb = () => {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((err) => {
      console.log("Error while connecting to mongodb", err);
    });
};
