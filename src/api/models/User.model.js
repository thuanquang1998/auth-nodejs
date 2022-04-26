import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { testConnection } from "../helpers/connections_multi_mongodb.js";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    lowsercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// middleware before save
UserSchema.pre("save", async function (next) {
  try {
    console.log("Called before save::: ", this.username, this.password);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isCheckedPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {}
};

export const UserModel = testConnection.model("user", UserSchema);
