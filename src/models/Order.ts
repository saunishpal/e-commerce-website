import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },

    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        slug: { type: String },
        image: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],

    shippingAddress: {
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      streetAddress: { type: String },
      city: { type: String },
      postalCode: { type: String },
      state: { type: String },
      paymentMethod: { type: String },
    },

    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    total: { type: Number, required: true },

    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", OrderSchema);

export default Order;