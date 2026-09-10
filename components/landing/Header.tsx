"use client"

import Link from 'next/link';

import { Button, buttonVariants } from '../ui/button';

import {
    NavigationMenu,
} from "@/components/ui/navigation-menu";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { MenuIcon } from 'lucide-react';
import Logo from '@/components/landing/logo';

const Header = () => {

    return (
        <header
            className='w-full max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl mx-auto bg-black text-white p-2 rounded-b-2xl relative'
        >
            <div
                className='translate-x-full header-right'
            >
            </div>
            <div
                className='-translate-x-full header-left'
            >
            </div>
            <nav className="flex items-center justify-between w-full relative">
                <div className='flex justify-center items-center gap-10'>
                    <div className='flex items-center gap-2'>
                        <Logo />
                        <Link
                            href="/"
                            className="flex items-center gap-2"
                        >
                            <h2 className="text-xl font-semibold">
                                Atlas Notes
                            </h2>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href={"/dashboard"}
                        className={`${buttonVariants({ variant: "default", size: "lg" })} bg-white text-black! hover:bg-white hover:text-black`}
                    >
                        Get Started
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header