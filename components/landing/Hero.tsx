import Header from "@/components/landing/Header";
import Link from "next/link";
import { buttonVariants } from "../ui/button";


export default function Hero() {
    return (
        <section className="p-1 text-white">
            <div className="hero rounded-4xl py-6 px-4">
                <Header />
                <div className="text-center py-32 lg:py-56 space-y-4 lg:space-y-3">
                    <h1 className="font-semibold text-5xl xl:text-7xl">
                        Write Together. Think Better
                    </h1>
                    <p className="text-muted text-sm md:text-base">
                        Create, edit, and collaborate in real time. Atlas Notes keeps your ideas organized and your team on the same page.
                    </p>
                    <Link
                        href={"/"}
                        className={`${buttonVariants({ variant: "default", size: "lg" })} font-medium! rounded-2xl! px-12 py-6`}
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </section>
    )
}