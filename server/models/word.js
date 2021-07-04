import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

mongoose.Promise = global.Promise;

const wordSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4(),
    required: true,
  },
  word: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
  },
  wordTypeIds: {
    type: Array,
  },
  vnWords: {
    type: Array,
  },
  related: {
    type: Array,
    default: [],
  },
});

export default mongoose.model("Word", wordSchema);
