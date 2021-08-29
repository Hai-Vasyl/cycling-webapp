import mongoose from "mongoose"
import {userRoles} from "../configs/main.js"

const {Schema, model} = mongoose

const schema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  ava: {type: String, default: ""},
  role: {type: String, enum: [userRoles.user, userRoles.admin], default: userRoles.user},
  color: {type: String, required: true},
  password: {type: String, required: true},
  date: {type: Date, default: new Date()}
})

export default model("User", schema)