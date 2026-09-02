import Image from "next/image";

interface ImageGlassCardProps {
    backgroundImage: string;
    mainImage: string;
    className?: string;
}

export default function ImageGlassCard({
    backgroundImage,
    mainImage,
    className = "",
}: ImageGlassCardProps) {
    return (
        <div className={`${className}`}>
            <Image
                src={backgroundImage}
                alt=""
                fill
                priority
                className="object-cover h-full w-full blur-[10px] rounded-[35px]"
            />
            <div
                className="z-99 h-full max-h-2/3 w-full max-w-1/2 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 overflow-hidden rounded-2xl"
            >
                <div
                    className="absolute top-0 left-0 w-full h-full bg-black/10"
                />
                <Image
                    src={mainImage}
                    alt=""
                    width={200}
                    height={200}
                    className="object-cover h-full w-full"
                    priority
                />
            </div>
        </div>
    );
}