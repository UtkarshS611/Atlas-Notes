import { SignInForm } from "@/components/auth/SignInForm";

export default function LoginPage() {
    return (
        <section className="h-screen flex items-center justify-between p-2">
            <div className="duration-200 hidden lg:flex flex-col items-start justify-end h-full max-w-lg xl:max-w-xl w-full auth rounded-2xl px-8 py-14 text-white space-y-2">
                <h2 className="text-xl">
                    "Write, organize, and collaborate on your notes in real time — beautifully simple, effortlessly connected."
                </h2>
                <p className="text-sm">
                    - With Atlas Notes🤍
                </p>
            </div>
            <div className="flex-1 grid place-items-center h-full">
                <SignInForm />
            </div>
        </section>
    );
}