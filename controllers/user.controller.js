import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const secret = "khabibvskamzat";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(422).json({ message: "User already exists" });
      // we put return keyword here because we don't want to run futher code here
    }
    const hashPassword = await bcrypt.hash(password, 12);
    // hashing the password that user gives us
    const result = await UserModel.create({
      // adding firstname and lastname that come from client side and merge it in name
      name: `${firstName} ${lastName}`,
      email: email,
      password: hashPassword,
    });

    const token = jwt.sign({ email: result.email, id: result.id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result:result, token:token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser)
      return res
        .status(422)
        .json({ message: "Pls Signup And Create Your Account Then Login" });

    const isPassword = await bcrypt.compare(password, oldUser.password);

    if (!isPassword)
      return res.status(422).json({ message: "Password is not correct" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: oldUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
