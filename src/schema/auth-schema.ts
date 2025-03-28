import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(1, "Please enter the username"),
  password: z.string().min(1, "Please enter the password"),
});

export const signUpSchema = z
  .object({
    username: z.string().min(1, "Please enter the username"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
