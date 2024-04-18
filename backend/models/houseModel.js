import mongoose from "mongoose";

const houseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    img: {
      type: Array,
      default: [],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const House = mongoose.model("House", houseSchema);
