import jwt from "jsonwebtoken";
import User from "../models/user.js";

const Auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // const {token} = req.cookies;
    // console.log(req.headers.authorization,"data");
 
    const customAuth = token.length < 500;
    let decodedData;
    if (token && customAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET); 
      // console.log(decodedData._id, "decodedData");
      // req.userId = await User.findById(decodedData?._id);
      req.userId =decodedData?._id;
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const user = await User.findOne({ googleId }); // find user by googleId
      req.userId = user?._id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default Auth;
