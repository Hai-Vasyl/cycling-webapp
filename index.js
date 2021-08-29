import express from "express";
import path from "path";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import users from "./routes/users.js";
import MongoDB from "./utils/connectMongoDB.js"
config();

const { PORT = 5000, MONGO_URI, NODE_ENV } = process.env;
const isDev = NODE_ENV === "development";

(async () => {
  try {
    const app = express();

    app.use(cors());
    app.use(express.urlencoded({extended: true})); 
    app.use(express.json());   

    await new MongoDB().connect()

    // await mongoose.connect(
    //   MONGO_URI,
    //   {
    //     useCreateIndex: true,
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useFindAndModify: false,
    //   },
    //   () => console.log("MongoDB started successfully!")
    // );

    app.use("/users", users);

    app.use(express.static(path.resolve("client")));
    app.get("*", function (req, res) {
      res.sendFile(path.resolve("client", "index.html"));
    });

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (error) {
    console.error(`Server error: ${error.message}`);
  }
})();

