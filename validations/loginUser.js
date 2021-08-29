import { Validation } from "./main.js";
import User from "../models/users.js";
import bcrypt from "bcryptjs";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const fields = {
      email: new Validation(email).isEmpty().isEmail(),
      password: new Validation(password).isEmpty().isLonger({value: 3}),
    };

    let isErrors = false;
    Object.keys(fields).forEach((key) => {
      if (fields[key]?.msg) {
        isErrors = true;
      }
    });
    if (isErrors) {
      return res.json({ validationErros: fields });
    }

    const user = await User.find({ email });
    if (!Object.keys(user).length) {
      return res.json({
        validationErros: {
          email: { msg: "User with this email is not exists!", value: email },
        },
      });
    }

    const isValidPass = bcrypt.compareSync(password, user.password);
    if (!isValidPass) {
      return res.json({
        validationErros: {
          password: {
            msg: "Password is wrong, try another one!",
            value: password,
          },
        },
      });
    }

    req.user = user;
    next();
  } catch (error) {
    const errMsg = `Login validation error: ${error.message}`;
    return res.json({
      validationErros: {
        email: errMsg,
        password: errMsg,
      },
    });
  }
};

export default login;
