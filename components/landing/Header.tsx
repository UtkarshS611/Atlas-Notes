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
import Image from 'next/image';

const Header = () => {

    const links = [
        { title: "About", href: "/about" },
        { title: "Demo", href: "/demo" }
    ]

    return (
        <header
            className='w-full px-8 lg:px-32 xl:px-64 absolute top-0 py-4'
        >
            <nav className="flex items-center justify-between w-full relative">
                <div className='flex justify-center items-center gap-10'>
                    <div className='flex items-center gap-1'>
                        <Image
                            src={"logo.svg"}
                            alt="Atlas Logo"
                            width={32}
                            height={32}
                        />
                        <Link
                            href="/"
                            className="flex items-center gap-2"
                        >
                            <h2 className="text-xl lg:text-2xl font-semibold">
                                Atlas Notes
                            </h2>
                        </Link>
                    </div>
                    <NavigationMenu className="hidden lg:flex items-center gap-6 text-md mt-1">
                        {links.map((item, index) => (
                            <Link key={index} href={item.href} className='text-sm font-medium'>
                                {item.title}
                            </Link>
                        ))}
                    </NavigationMenu>
                </div>
                <div className="hidden items-center gap-4 lg:flex">
                    <Button>
                        Get Started
                    </Button>
                </div>
                <Sheet>
                    <SheetTrigger className="lg:hidden">
                        <MenuIcon className="h-4 w-4 text-black" />
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