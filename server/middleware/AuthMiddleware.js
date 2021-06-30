import jwtHelper from "../../helper/jwt.helper.js";
import { notifyRes } from "../../utils/server.js";

const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "access-token-example";

const isAuth = async (req, res, next) => {
  const headerToken = req.headers["authorization"];

  if (!headerToken) {
    return notifyRes({ res, msg: "No token provided." });
  }

  try {
    const decoded = await jwtHelper.verifyToken(headerToken, accessTokenSecret);

    req.jwtDecoded = decoded;
    next();
  } catch (error) {
    return notifyRes({ res, msg: "Unauthorized." });
  }
};

export default isAuth;
