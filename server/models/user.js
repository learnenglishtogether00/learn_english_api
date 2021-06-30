import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4(),
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  const SALT_ROUND = 10;

  const salt = bcrypt.genSaltSync(SALT_ROUND);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;

  next();
});

export default mongoose.model("User", userSchema);
