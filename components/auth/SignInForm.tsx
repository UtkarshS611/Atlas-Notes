"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Eye, EyeOff } from "lucide-react"

import {
    SignInSchema,
    type SignInFormData,
    signInWithEmail
} from "@/lib/supabase/auth";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SignInForm() {
    const router = useRouter();

    const [serverError, setServerError] = useState<string | null>(null);
    const [typePassword, setTypePassword] = useState<"password" | "text">("password");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const togglePasswordVisibility = () => {
        setTypePassword((prev) => (prev === "password" ? "text" : "password"));
    }

    const onSubmit = async (values: SignInFormData) => {
        try {
            setServerError(null);

            await signInWithEmail(values.email, values.password);

            router.push("/dashboard");
            router.refresh();
        } catch (error) {
            setServerError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );
        }
    };

    return (
        <div className="bg-background w-full max-w-md rounded-2xl px-4 py-6 shadow-2xl border border-input">
            <div className="text-center flex flex-col justify-center items-center gap-1">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={40}
                    height={40}
                />
                <h2 className="text-4xl font-medium">Welcome Back</h2>
                <p className="text-sm">Enter your details to get started</p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-12 space-y-4"
            >
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                        Password
                    </label>
                    <div className="relative">

                        <input
                            type={typePassword}
                            placeholder="Password"
                            {...register("password")}
                            className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                        />
                        {typePassword === "password" ?
                            <Eye
                                onClick={togglePasswordVisibility}
                                size={18}
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                            />
                            :
                            <EyeOff
                                onClick={togglePasswordVisibility}
                                size={18}
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                            />
                        }
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>

                {serverError && (
                    <p>{serverError}</p>
                )}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </Button>
            </form>

            <p className="mt-6 text-center text-sm">
                Don't have an account?{' '}
                <Link
                    href="/auth/sign-up"
                    className="text-blue-500 font-medium hover:underline"
                >
                    Sign Up
                </Link>
            </p>
        </div>
    );
}