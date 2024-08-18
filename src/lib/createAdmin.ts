import dbConnect from "./dbConnect";
import bcrypt from "bcryptjs";
import UserModel from "../models/User";

export async function createAdmin() {
  dbConnect();
  const password = process.env.ADMIN_PASSWORD || "1234578";
  const hashedPassword = await bcrypt.hash(password, 10);
  const users = await UserModel.find({ role: "Admin" });
  if (users.length === 0) {
    const newUser = new UserModel({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      verifyCode: "000000",
      verifyCodeExpiry: new Date(),
      isVerified: true,
      role: "Admin",
    });

    await newUser.save();
    console.log("new user created");
  } else {
    console.log("user already exists");
  }
}

createAdmin();
