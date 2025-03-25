import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(1, "Please enter the username"),
  password: z.string().min(1, "Please enter the password"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
