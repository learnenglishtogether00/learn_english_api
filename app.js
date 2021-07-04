// import dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import dotenv from "dotenv";

import mainRoutes from "./server/routes/main.js";
import AuthMiddleware from "./server/middleware/AuthMiddleware.js";

const PORT = 5035;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "27017";
const DB_NAME = process.env.DB_NAME || "learn_english";

// set up dependencies
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

// set up mongoose
mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database");
  });

// app.use(AuthMiddleware);
app.use("/api/", mainRoutes);

app.listen(PORT, (request, respond) => {
  console.log(`Our server is live on ${PORT}`);
});
