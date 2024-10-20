import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ["PENDING", "APPROVED"],
    },
    cipherAddress: {
      type: String,
    },
    cipherPrivateKey: {
      type: String,
    },
  },
  { timestamps: true }
);

export default models.User || model("User", userSchema);
