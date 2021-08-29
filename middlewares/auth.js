import jwt from "jsonwebtoken"
import { config } from "dotenv";
config()

const {JWT_SECRET} = process.env

const auth = async (req, res, next) => {
  try {
    const token = req.headers?.token
    if(!token){
      return res.status(403).json('Access is denied!')
    }

    const {userId} = await jwt.verify(token, JWT_SECRET)
    if(!userId){
      return res.status(403).json('Access is denied!')
    }

    req.userId = userId
    next()
  } catch (error) {
    return res.status(400).json(`Auth middleware error: ${error.message}`)
  }
}

export default auth