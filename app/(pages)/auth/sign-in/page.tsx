import { SignInForm } from "@/components/auth/SignInForm";

export default function LoginPage() {
    return (
        <section className="h-screen flex items-center justify-between p-2">
            <div className="duration-200 hidden lg:flex flex-col items-start justify-end h-full max-w-lg xl:max-w-xl w-full auth rounded-2xl px-8 py-14 text-white space-y-2">
                <h2 className="text-2xl">
                    "The best way to predict the future is to create it."
                </h2>
                <p className="text-sm">
                    - Abraham Lincoln
                </p>
            </div>
            <div className="flex-1 grid place-items-center h-full">
                <SignInForm />
            </div>
        </section>
    );
}