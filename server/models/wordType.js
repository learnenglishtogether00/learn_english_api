import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

mongoose.Promise = global.Promise;

const wordTypeSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4(),
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("WordType", wordTypeSchema);
