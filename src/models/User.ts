import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },

    phone: { type: String, trim: true },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    address: {
      firstName: { type: String, trim: true },
      lastName: { type: String, trim: true },
      email: { type: String, trim: true },
      phone: { type: String, trim: true },
      streetAddress: { type: String, trim: true },
      city: { type: String, trim: true },
      postalCode: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true, default: "India" },
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;