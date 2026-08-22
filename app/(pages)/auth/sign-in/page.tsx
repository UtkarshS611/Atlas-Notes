import { SignInForm } from "@/components/auth/SignInForm";

export default function LoginPage() {
    return (
        <section className="h-screen grid place-items-center auth">
            <SignInForm />
        </section>
    );
}