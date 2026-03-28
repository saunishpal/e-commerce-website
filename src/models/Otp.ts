import { Schema, model, models } from "mongoose";

const OtpSchema = new Schema(
  {
    email: { type: String, required: true, index: true },
    code: { type: String, required: true },
    purpose: {
      type: String,
      enum: ["email-verification"],
      default: "email-verification",
    },
    expiresAt: { type: Date, required: true, index: true },
  },
  { timestamps: true }
);

// TTL index: MongoDB automatically deletes expired OTP docs
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = models.Otp || model("Otp", OtpSchema);

export default Otp;