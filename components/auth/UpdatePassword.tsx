"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff } from "lucide-react"

import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";


export default function UpdatePasswordForm() {

    const supabase = createClient();
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [typePassword, setTypePassword] = useState<"password" | "text">("password");

    const togglePasswordVisibility = () => {
        setTypePassword((prev) => (prev === "password" ? "text" : "password"));
    }

    useEffect(() => {
        const { data: { subscription },
        } = supabase.auth.onAuthStateChange((event) => {
            if (event === "PASSWORD_RECOVERY") {
                setReady(true);
            }
        }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase]);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session },
            } = await supabase.auth.getSession();

            if (session) {
                setReady(true);
            }
        };

        checkSession();
    }, [supabase]);

    const handleSubmit = async (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        const { error } =
            await supabase.auth.updateUser({
                password,
            });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        setMessage("Password updated successfully.");
        setTimeout(() => {
            router.push("/auth/sign-in");
        }, 1000);

        setLoading(false);
    };

    if (!ready) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Verifying reset link...
                </p>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Set a new password
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your new password below.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                        >
                            New password
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                type={typePassword}
                                required
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                            />
                            {typePassword === "password" ?
                                <Eye
                                    onClick={togglePasswordVisibility}
                                    size={18}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                                />
                                :
                                <EyeOff
                                    onClick={togglePasswordVisibility}
                                    size={18}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                                />
                            }
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="confirmPassword"
                            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                        >
                            Confirm password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={typePassword}
                                required
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                            />
                            {typePassword === "password" ?
                                <Eye
                                    onClick={togglePasswordVisibility}
                                    size={18}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                                />
                                :
                                <EyeOff
                                    onClick={togglePasswordVisibility}
                                    size={18}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                                />
                            }
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="text-sm text-green-600">
                            {message}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
                    >
                        {loading
                            ? "Updating..."
                            : "Update password"}
                    </Button>
                </form>
            </div>
        </main>
    );
}