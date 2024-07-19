import mongoose, { Document, Schema } from "mongoose";
import { FullUserInfo } from "../types/user";

export interface UserType extends FullUserInfo, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserTypeWithId extends UserType {
  _id: string;
}

const UserSchema: Schema = new Schema<UserType>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    avatar: { type: String, trim: true },
    points: { type: Number, default: 0, min: 0 },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      required: true,
      default: "USER",
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserType>("User", UserSchema);
