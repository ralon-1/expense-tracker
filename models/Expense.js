import mongoose, { mongo } from "mongoose";
const expenseschema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["Cash", "UPI", "Card", "Bank Transfer", "Other"],
      default: "UPI",
    },

    date: {
      type: Date,
      default: Date.now,
    },

    note: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Expense',expenseschema);