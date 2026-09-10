import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import Header from '@/components/landing/Header'

export default function Hero() {
    return (
        <main className='gradient-hero'>
            <Header />
            <section className="overflow-hidden pt-42">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center gap-6">
                        <h1 className="text-center text-5xl sm:text-6xl lg:text-7xl flex flex-col items-center gap-1 text-white">
                            <span className='font-bold'>Think Together,</span>
                            <span className='italic'>Write Together.</span>
                        </h1>
                        <p className='text-center max-w-3xl text-white text-xs sm:text-base'>
                            Atlas Notes is a collaborative note-taking app that allows you to work together with your team in real-time. Create, edit, and share notes seamlessly, making teamwork more efficient and productive.
                        </p>
                        <div className='flex items-center gap-2'>
                            <Link
                                href={"/dashboard"}
                                className={`${buttonVariants({ variant: "default", size:"lg" })} shadow-xl`}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>

                    <div className="relative -mx-2 mt-8 overflow-hidden rounded-3xl bg-black p-1.5 max-sm:-mr-56 sm:mt-12">
                        <div className="bg-background ring-foreground/6.5 before:mask-radial-at-top-left before:mask-radial-from-65% before:mask-radial-[100%_60%] before:ring-foreground before:border-foreground/10 relative rounded-2xl p-1 shadow-2xl shadow-black/55 ring before:absolute before:-inset-px before:z-10 before:size-56 before:rounded-tl-2xl before:border-l before:border-t">
                            <div className="bg-foreground/2 z-1 absolute inset-0 rounded-2xl"></div>
                            <Image
                                className="bg-background aspect-15/8 relative rounded-2xl"
                                src="/hero/heroDemo.avif"
                                alt="app screen"
                                width="2700"
                                height="1440"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
