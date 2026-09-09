"use client";

import Link from "next/link";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";

export default function ForgotPasswordForm() {
    const supabase = createClient();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        const { error } = await supabase.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: `${window.location.origin}/auth/update-password`,
            }
        );

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        setMessage(
            "You will receive a password reset link."
        );

        setLoading(false);
    };

    return (
        <main className="flex min-h-screen items-center justify-center px-4 overflow-hidden">
            <div className="w-full max-w-md">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Forgot your password?
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your email and we'll send you a
                        link to reset your password.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="you@example.com"
                            className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 truncate">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="text-sm text-green-600 truncate">
                            {message}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
                    >
                        {loading
                            ? "Sending..."
                            : "Send reset link"}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <Link
                        href="/auth/sign-in"
                        className="text-sm underline"
                    >
                        Back to login
                    </Link>
                </div>
            </div>
        </main>
    );
}