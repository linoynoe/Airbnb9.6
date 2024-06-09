import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://mybroadband.co.za/news/wp-content/uploads/2017/04/Twitter-profile-picture-595x400.jpg",
    },
    familySize: {
      type: Number,
      required: true,
      min: 0,
    },
    preferredArea: {
      type: String,
      required: true,
    },
    rooms: {
      type: Number,
      required: true,
      min: 0,
    },
    children: {
      type: Number,
      required: true,
      min: 0,
    },
    adults: {
      type: Number,
      required: true,
      min: 0,
    },
    babies: {
      type: Number,
      required: true,
      min: 0,
    },
    pet: {
      type: Boolean,
      required: true,
    },
    profileType: {
      type: String,
      default: "evacuee",
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
