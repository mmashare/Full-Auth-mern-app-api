// is you want to use import {} from "" then you have to put this key value in package.json ("type": "module") write this inside of "main" key . then you can use this import state in express.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/user.js";

const port = 5000;

const app = express();

app.use(morgan("start"));
app.use(express.json({ limit: "30mb", extended: true })); // ye only json data lega and json data dega.
app.use(express.urlencoded({ limit: "30mb", extended: true })); // ye only un request koo accept karega jinke header me contennt-type:application/json hoga.
app.use(cors());

app.use("/user", router);
// http://localhost:5000/user/signup

const MONGOD_ULR =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

mongoose
  .connect(MONGOD_ULR)
  .then(() => {
    app.listen(port, () => {
      console.log("::::::yes app is running:::::: ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
