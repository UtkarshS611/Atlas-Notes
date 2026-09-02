import { Separator } from "@/components/ui/separator"
import ImageGlassCard from "./ImageGlassCard"

export default function Features() {

    const features = [
        {
            featNo: "01",
            featTitle: "Private Editing Space",
            featDesc:
                "Write, organize, and refine your ideas in a private workspace designed to keep your thoughts focused and secure.",
            featBgImage: "/hero/animations/animationBgFive.avif",
            featMainImage: "/hero/cardTop.png"
        },
        {
            featNo: "02",
            featTitle: "Multi User Collaboration",
            featDesc:
                "Work together on the same document with your team, making it easy to share ideas, edit, and create in one place.",
            featBgImage: "/hero/animations/animationBgFour.avif",
            featMainImage: "/hero/cardTop.png"
        },
        {
            featNo: "03",
            featTitle: "Real Time Updates",
            featDesc:
                "See changes as they happen with real-time synchronization, keeping everyone on the same page without refreshing.",
            featBgImage: "/hero/animations/animationBgThree.avif",
            featMainImage: "/hero/cardTop.png"
        }
    ]

    return (
        <section className="px-8 lg:px-32 xl:px-64 py-32 sm:py-24">
            <div className="mb-10">
                <h2 className="font-semibold text-2xl">
                    Features
                </h2>
            </div>
            {features.map((feat, index) => (
                <div key={index} className="space-y-4 pb-16">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <p className="text-[10px]">
                            {feat.featNo}
                        </p>
                        <Separator />
                    </div>
                    <div className="grid place-items-center grid-cols-1 md:grid-cols-3 w-full md:gap-0 gap-10">
                        <p className="text-sm">
                            {feat.featDesc}
                        </p>
                        <div className="relative">
                            <ImageGlassCard
                                className="h-72 w-64 md:h-82 md:w-72"
                                backgroundImage={feat.featBgImage}
                                mainImage={feat.featMainImage}
                            />
                        </div>
                        <h3 className="w-full text-start md:text-end font-semibold">
                            {feat.featTitle}
                        </h3>
                    </div>
                </div>
            ))}
        </section>
    )
}