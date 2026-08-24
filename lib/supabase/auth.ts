import { createClient } from "@/lib/supabase/client";

import { z } from "zod";

export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signUpWithEmail(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export const SignInSchema = z.object({
  email: z.string().min(1, "Email is required*"),
  password: z.string().min(1, "Password is required*"),
});

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
export type SignInFormData = z.infer<typeof SignInSchema>;