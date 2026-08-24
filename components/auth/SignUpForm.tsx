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

            <div className="mt-6 space-y-3 border-t pt-6">
                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4"
                        viewBox="0 0 256 262"
                    >
                        <path
                            fill="#4285f4"
                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                        ></path>
                        <path
                            fill="#34a853"
                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                        ></path>
                        <path
                            fill="#fbbc05"
                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                        ></path>
                        <path
                            fill="#eb4335"
                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                        ></path>
                    </svg>
                    <span>Google</span>
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4"
                        viewBox="0 0 256 256"
                    >
                        <path
                            fill="currentColor"
                            d="M128 0C57.317 0 0 57.317 0 128c0 56.554 36.676 104.535 87.535 121.46c6.397 1.185 8.746-2.777 8.746-6.158c0-3.052-.117-13.135-.174-23.83c-35.61 7.742-43.124-15.103-43.124-15.103c-5.823-14.795-14.213-18.73-14.213-18.73c-11.613-7.944.876-7.78.876-7.78c12.853.902 19.621 13.19 19.621 13.19c11.417 19.568 29.945 13.911 37.249 10.64c1.149-8.272 4.466-13.92 8.127-17.116c-28.431-3.236-58.318-14.212-58.318-63.258c0-13.975 5-25.394 13.188-34.358c-1.329-3.224-5.71-16.242 1.24-33.874c0 0 10.749-3.44 35.21 13.121c10.21-2.836 21.16-4.258 32.038-4.307c10.878.049 21.837 1.47 32.066 4.307c24.431-16.56 35.165-13.12 35.165-13.12c6.967 17.63 2.584 30.65 1.255 33.873c8.207 8.964 13.173 20.383 13.173 34.358c0 49.163-29.944 59.988-58.447 63.157c4.591 3.972 8.682 11.762 8.682 23.704c0 17.126-.148 30.91-.148 35.126c0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128C256 57.317 198.683 0 128 0"
                        />
                    </svg>
                    <span>GitHub</span>
                </Button>
            </div>

            <p className="text-muted-foreground mt-6 text-center text-sm">
                Already have an account?{' '}
                <Link
                    href="/auth/sign-in"
                    className="text-primary font-medium hover:underline"
                >
                    Sign in
                </Link>
            </p>
        </div>
    )
}