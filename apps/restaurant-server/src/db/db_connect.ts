import mongoose from "mongoose";

export const db_connect = async () => {
  const options = {
    dbName: "restaurant_db",
  };
  try {
    const req = await mongoose.connect(process.env.MONGOOSE_URI || "", options);
    console.log(`Database Connected at ${req.connection.host}`);
  } catch (error) {
    console.log("Database Not Connected ...", error);
  }
};
