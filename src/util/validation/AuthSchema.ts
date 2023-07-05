import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(25),
});

export type SignInType = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(5),
    username: z.string().min(5).max(25),
    password: z.string().min(5).max(25),
    confirmPassword: z.string().min(5).max(25),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpType = z.infer<typeof SignUpSchema>;
