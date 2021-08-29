import User from "../models/users.js";
import genColor from "../helpers/genColor.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {config} from "dotenv"
config()

const {JWT_SECRET} = process.env

export const registerUser = async (req, res) => {
  try {
    const {firstname, lastname, email, password, role} = req.body

    let passHashed = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const user = new User({
      firstname, lastname, email, password: passHashed, color: genColor(), role
    })

    const _user = await user.save()
    const userId = _user._id

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.status(201).json({userId, token})
  } catch (error) {
    res.json(error.message)
  }
}

export const loginUser = async (req, res) => {
  try {
    const userId = req.user._id

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.status(200).json({userId, token})
  } catch (error) {
    res.json(error.message)
  }
}

export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    res.json(user)
  } catch (error) {
    res.status(400).json(`Getting user data error: ${error.message}`)
  }
} 