import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: false,
    }
  }
);

export const User = mongoose.model('User', userSchema);
