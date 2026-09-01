import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Header from './Header'

export default function Hero() {
    return (
        <section className='px-6 py-4'>
            <Header />
            <div className="pt-24">
                <div className="mx-auto max-w-7xl px-6">
                    <Link
                        href="/"
                        className="text-sm mx-auto flex w-fit items-center gap-2 font-medium"
                    >
                        <span className="text-muted-foreground">Introducing Atlas Notes</span>
                        <ArrowRight className="size-3.5" />
                    </Link>

                    <div className="mx-auto mb-12 mt-8 flex max-w-3xl flex-col justify-center gap-4 text-center md:gap-6">
                        <h1 className="text-balance text-6xl font-medium tracking-tight md:text-7xl">
                            Write together. Think better.
                        </h1>
                        <p className='text-sm lg:text-base tracking-wide max-w-2xl mx-auto'>
                            Create, edit, and collaborate in real time. Atlas Notes keeps your ideas organized and your team on the same page.
                        </p>
                        <div>
                            <Link
                                href={"/dashboard"}
                                className={`${buttonVariants({ variant: "default" })} px-8 py-2`}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>

                    <div className="bg-muted relative overflow-hidden rounded-3xl px-4 pt-4 max-lg:-mx-4 md:px-6 md:pt-6 lg:px-8 lg:pt-8">
                        <div className="bg-background ring-foreground/6.5 before:mask-radial-at-top-left before:mask-radial-from-65% before:mask-radial-[100%_60%] before:ring-foreground before:border-foreground/10 relative z-10 rounded-t-2xl p-2 shadow-lg ring before:absolute before:-inset-px before:z-10 before:size-56 before:rounded-tl-2xl before:border-l before:border-t">
                            <Image
                                className="bg-background aspect-15/8 relative hidden rounded-t-2xl dark:block"
                                src="/hero/heroBgDesktop.avif"
                                alt="app screen"
                                width="2700"
                                height="1440"
                            />
                            <Image
                                className="z-2 border-border/25 aspect-15/8 relative rounded-t-2xl border dark:hidden"
                                src="/hero/heroBgDesktop.avif"
                                alt="app screen"
                                width="2700"
                                height="1440"
                            />
                        </div>

                        <Image
                            src="/hero/bg16.png"
                            alt="background image"
                            width={2215}
                            height={1477}
                            sizes="(max-width: 768px) 100vw, 1280px"
                            className="absolute inset-0 size-full rounded-3xl object-cover object-bottom"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}