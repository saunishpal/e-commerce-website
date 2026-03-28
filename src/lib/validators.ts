import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian phone number"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(8, "Password must be at most 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,8}$/,
      "Password must include uppercase, lowercase, and number"
    ),

  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  streetAddress: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
});