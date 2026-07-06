import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="relative text-white bg-[url('/hero/heroMobile.webp')] md:bg-[url('/hero/heroDesktop.webp')] bg-center bg-no-repeat bg-cover pb-30 min-h-[max(850px,min(calc(100svh-200px),124.14vw))] flex items-center">
        <div className="absolute inset-0 top-0 left-0 h-full w-full bg-linear-to-b from-transparent from-85% to-background z-0" />
        <div className="relative z-99 mx-auto w-full max-w-250">
          <div className="text-center space-y-6 mx-auto w-full max-w-200">
            <h1 className="font-bold text-4xl lg:text-5xl xl:text-6xl lg:leading-16">
              Write Together, Without Limits
            </h1>
            <p className="font-medium">
              Create, edit, and collaborate in real time with your team. Every change syncs instantly, so everyone stays on the same page.
            </p>
            <Button className="px-8 py-5 rounded-xl">
              Get started
            </Button>
          </div>
        </div>
      </section>

      {/* Demo image section  */}
      <section className="px-4 relative z-99 pb-20 -mt-[calc(clamp(144px,22svh,208px)+clamp(6px,.85vw,10px)+64px)]">
        <div className="mx-auto max-w-290">
          <div className="relative overflow-hidden border-none rounded-3xl shadow-2xl">
            <Image
            src="/hero/heroTest.jpg"
            alt="demo image for Atlas Notes"
            height={1200}
            width={2400}
            className="h-auto w-full block"
            />
          </div>
        </div>
      </section>
    </>
  )
}