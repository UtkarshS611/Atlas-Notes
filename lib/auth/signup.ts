import { createClient } from "@/lib/supabase/client";

export async function signUpWithEmail(email: string, password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/confirm`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
