import mongoose from "mongoose"
import {config} from "dotenv"
config()

const {MONGO_URI} = process.env

class MongoDB {
  constructor(){
    if(typeof MongoDB.instance === "object") {
      return MongoDB.instance
    }
    return this
  }
  async connect(){
    await mongoose.connect(
      MONGO_URI,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => console.log("MongoDB started successfully!")
    );
  }
}

export default MongoDB