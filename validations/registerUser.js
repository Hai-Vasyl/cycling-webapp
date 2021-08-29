import { Validation } from "./main.js";
import User from "../models/users.js";

const register = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const fields = {
      firstname: new Validation(firstname).isEmpty(),
      lastname: new Validation(lastname).isEmpty(),
      email: new Validation(email).isEmpty().isEmail(),
      password: new Validation(password).isEmpty().isLonger({value: 3}),
    };

    let isErrors = false;
    Object.keys(fields).forEach((key) => {
      if (fields[key].msg) {
        isErrors = true;
      }
    });
    if (isErrors) {
      return res.json({ validationErros: fields });
    }

    const user = await User.findOne({ email });
    if (!!user) {
      return res.json({
        validationErros: {
          email: {
            msg: "User with this email is already exists!",
            value: email,
          },
        },
      });
    }
    next();
  } catch (error) {
    const errMsg = `Register validation error: ${error.message}`;
    return res.json({
      validationErros: {
        firstname: errMsg,
        lastname: errMsg,
        email: errMsg,
        password: errMsg,
      },
    });
  }
};

export default register;
