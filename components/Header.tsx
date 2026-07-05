"use client"

import Link from 'next/link';
import Image from 'next/image';


import { motion, useScroll, useSpring, useTransform } from "motion/react"


import { Button } from './ui/button';

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

const Header = () => {

    const { scrollYProgress } = useScroll();

    const width = useTransform(
        scrollYProgress,
        [0, 0.01],
        ["65vw", "60vw"]
    );

    const smoothWidth = useSpring(width, {
        stiffness: 120,
        damping: 22,
        mass: 0.8,
    });

    const background = useTransform(
        scrollYProgress,
        [0, 0.01],
        [
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.75)"
        ]
    );

    const blur = useTransform(
        scrollYProgress,
        [0, 0.01],
        ["blur(0px)", "blur(5px)"]
    );

    const border = useTransform(
        scrollYProgress,
        [0, 0.01],
        [
            "1.5px solid rgba(255,255,255,0)",
            "1.5px solid rgba(255,255,255,0.65)"
        ]
    );

    const shadow = useTransform(
        scrollYProgress,
        [0, 0.02],
        [
            "0 0 0 rgba(0,0,0,0)",
            "0 8px 24px rgba(15,23,42,0.06)",
        ]
    );

    const links = [
        { title: "About", href: "/about" },
        { title: "Features", href: "/features" },
        { title: "Demo", href: "/demo" }
    ]

    return (
        <motion.header
            style={{
                width: smoothWidth,
                backgroundColor: background,
                backdropFilter: blur,
                border,
                boxShadow: shadow,
            }}
            className='fixed py-3 px-3 top-4 left-1/2 -translate-x-1/2 max-w-7xl w-full z-99 flex items-center justify-between rounded-2xl'
        >
            <nav className="flex items-center justify-between w-full relative">
                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    {/* <Image
                        src="/logo.jpeg"
                        alt="Noir & Blanc Designs Logo"
                        width={45}
                        height={45}
                    /> */}
                    <span className="text-xl lg:text-2xl font-semibold">
                        Atlas
                    </span>
                </Link>
                <NavigationMenu className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 text-md">
                    {links.map((item, index) => (
                        <Link key={index} href={item.href} className='text-sm font-medium'>
                            {item.title}
                        </Link>
                    ))}
                </NavigationMenu>
                <div className="hidden items-center gap-4 lg:flex">
                    <Button
                        className="rounded-xl"
                        size="lg"
                    >
                        Get Started
                    </Button>
                </div>
                <Sheet>
                    <SheetTrigger className="lg:hidden">
                        <MenuIcon className="h-4 w-4 text-primary" />
                    </SheetTrigger>
                    <SheetContent side="top" className="max-h-screen overflow-auto z-999">
                        <SheetHeader>
                            <SheetTitle>
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 font-title text-2xl"
                                >
                                    Atlas
                                </Link>
                            </SheetTitle>
                        </SheetHeader>
                        <div className="flex flex-col p-4 font-title">
                            <div className="flex flex-col items-start gap-6">
                                {links.map((link, index) => (
                                    <Link key={index} href={link.href}>
                                        {link.title}
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-6 flex flex-col gap-4">
                                <Button
                                className="rounded-xl"
                                    size="lg"
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>

        </motion.header>
    )
}

export default Header