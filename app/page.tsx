import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <section className="min-h-screen bg-[url('/hero/heroSmall.png')] md:bg-[url('/hero/heroMedium.png')] lg:bg-[url('/hero/heroLarge.png')] bg-center bg-no-repeat bg-cover flex flex-col items-center relative space-y-5 py-60">
      <div className="bg-linear-to-b from-transparent from-75% to-white absolute top-0 h-full w-full z-1" />
      <div className="text-center flex flex-col gap-5 items-center z-2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Write Together, Without Limits
        </h1>
        <p className="text-lg">
          From quick notes to detailed documents, collaborate live with powerful editing, seamless sharing, and instant synchronization.
        </p>
        <Button
          className='px-10 py-5.5 rounded-xl'
          size="lg"
        >
          Get Started
        </Button>
      </div>
      <Image
        height={500}
        width={500}
        src="/hero/heroTest.jpg"
        alt="Hero Image"
        className="absolute bottom-0 translate-y-1/3 rounded-4xl h-3/4 w-2/3 z-2"
      />
    </section>
  )
}