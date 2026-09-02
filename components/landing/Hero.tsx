import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import Header from "@/components/landing/Header";
import HeroAnimation from "@/components/landing/HeroAnimation";

export default function Hero() {
    return (
        <section
            className="relative min-h-screen w-full flex flex-col items-center justify-end lg:justify-center "
        >
            <Header />
            <HeroAnimation />

            {/* Hero content */}
            <div className="lg:text-center space-y-4 p-8 w-full lg:w-fit">
                <h1 className="font-semibold text-4xl lg:text-5xl">
                    Think Together, Write Together.
                </h1>
                <p className="text-sm max-w-md lg:max-w-lg lg:mx-auto text-gray-500 font-medium">
                    A collaborative workspace where your ideas come to life, your team stays aligned, and every thought has a place.
                </p>
                <div className="flex items-center lg:justify-center gap-2">
                    <Link
                        href={"/dashboard"}
                        className={`${buttonVariants({ variant: "default" })} cursor-pointer `}
                    >
                        Get Started
                    </Link>
                    <Link
                        href={"/dashboard"}
                        className={`${buttonVariants({ variant: "secondary" })} cursor-pointer `}
                    >
                        View Demo
                    </Link>
                </div>
            </div>
        </section>
    );
}