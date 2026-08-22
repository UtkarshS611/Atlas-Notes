import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().min(1, "Email is required*"),
    password: z.string().min(1, "Password is required*"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signUpSchema>;

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required*")
    .email("Enter a valid email address"),

  password: z.string().min(1, "Password is required*"),
});

export type SignInFormData = z.infer<typeof SignInSchema>;
