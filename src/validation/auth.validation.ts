import z from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Provide a valid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});
