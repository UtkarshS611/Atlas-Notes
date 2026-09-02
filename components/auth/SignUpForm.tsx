"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"


import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { Eye, EyeOff } from "lucide-react"


import {
    signUpSchema,
    type SignupFormData,
    signUpWithEmail
} from "@/lib/supabase/auth"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function SignUpForm() {

    const [serverError, setServerError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [typePassword, setTypePassword] = useState<"password" | "text">("password");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const togglePasswordVisibility = () => {
        setTypePassword((prev) => (prev === "password" ? "text" : "password"));
    }

    const onSubmit = async (values: SignupFormData) => {
        try {
            setServerError(null);
            setSuccess(false);

            toast.loading("Creating account...", {
                id: "signup",
            });


            await signUpWithEmail(values.email, values.password);

            setSuccess(true);

            toast.success("Account created successfully!", {
                id: "signup",
            });

            router.push("/dashboard");
        } catch (error) {

            toast.error("Failed to create account", {
                id: "signup",
            });

            setServerError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        }
    };

    useEffect(() => {
        if (success) {
            router.push("/dashboard");
        }
    }, [success, router])

    return (
        <div className="bg-background w-full max-w-md rounded-2xl px-4 py-6 shadow-xl border border-input">
            <div className="text-center flex flex-col justify-center items-center gap-1">
                <div className="h-12 w-12 bg-blue-400 rounded-full aspect-square my-5"></div>
                <h2 className="text-4xl font-medium">Create Account</h2>
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
                        required
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
                            required
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

                <div className="space-y-2">
                    <label
                        htmlFor="confirmPassword"
                        className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                    >
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            required
                            type={typePassword}
                            placeholder="Confirm Password"
                            {...register("confirmPassword")}
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

                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                    )}
                </div>

                {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {"Create account"}
                </Button>
            </form>
            <p className="mt-6 text-center text-sm">
                Already have an account?{' '}
                <Link
                    href="/auth/sign-in"
                    className="text-blue-500 font-medium hover:underline"
                >
                    Sign in
                </Link>
            </p>
        </div>
    )
}