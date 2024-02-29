import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const Signup = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name: `${firstname} ${lastname}`,
      email,
      password: hashPassword,
    });
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{
      expiresIn: "1h",
    });
    res
      .status(201)
      .json({ message: "User Signed Up Successfully", token,result : user });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ message: "User Signed In Successfully", token, result : user }); 
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const GoogleSignIn = async (req, res, next) => {
  const { name, email, googleId, token } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      const result = { _id: user._id.toString(), email, name, googleId };
      return res.status(200).cookie("token", token, { expiresIn: "2h" , httpOnly: true}).json({ result, token });
    }
    user = await User.create({
      email,
      name,
      googleId,
    });
    await User.save();

    res.status(200).cookie("token", token, { expiresIn: "2h" , httpOnly: true}).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
