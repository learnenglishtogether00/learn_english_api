import bcrypt from "bcrypt";

import User from "../models/user.js";
import { successRes, errRes, notifyRes } from "../../utils/server.js";
import jwtHelper from "../../helper/jwt.helper.js";

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "access-token-example";

const createUser = (req, res) => {
  const { username, nickname, password } = req.body;
  const user = new User({
    username,
    nickname,
    password,
  });

  return user
    .save()
    .then((newUser) => {
      return successRes({
        res,
        msg: "New user created successfully",
        data: newUser,
      });
    })
    .catch((err) => {
      return errRes({ res, err });
    });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return notifyRes({ res, msg: "Nhập username, password!" });
  }

  const currentUser = await User.findOne({ username });
  if (!currentUser) {
    return notifyRes({ res, msg: "Tài khoản không tồn tại" });
  }

  bcrypt.compare(password, currentUser.password).then(async function (isValid) {
    if (!isValid) {
      return notifyRes({ res, msg: "Sai mật khẩu" });
    }

    const accessToken = await jwtHelper.generateToken(
      {
        id: currentUser.id,
        name: currentUser.name,
      },
      accessTokenSecret,
      accessTokenLife
    );

    return successRes({
      res,
      msg: "Đăng nhập thành công",
      data: {
        token: accessToken,
      },
    });
  });
};

export { createUser, login };
