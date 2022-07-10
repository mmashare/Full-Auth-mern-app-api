import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
    // pasword is not required becasue when we use google sign in option,then it don't give us the option to record password in db of users
  },
  googleID: {
    type: String,
    required: false,
    // same same reason for googleID
  },
});

export default mongoose.model("User", userSchema);
// "User" is collection name not database name so be carefull.
