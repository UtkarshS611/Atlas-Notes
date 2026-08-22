"use client"

import Link from 'next/link';

import { Button } from '../ui/button';

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

    const links = [
        { title: "About", href: "/about" },
        { title: "Features", href: "/features" },
        { title: "Demo", href: "/demo" }
    ]

    return (
        <header
            className='text-white bg-transparent w-full max-w-250 mx-auto z-99 px-4 md:px-0'
        >
            <nav className="flex items-center justify-between w-full relative">
                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
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
                        className="rounded-xl px-8 py-5 border-[1.5px] border-white bg-white/10 hover:bg-white/20 duration-200"
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

        </header>
    )
}

export default Header