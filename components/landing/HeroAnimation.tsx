"use client";

import { motion } from "motion/react";

import ImageGlassCard from "./ImageGlassCard";

function DesktopHeroAnimation() {
    return (
        <div className="absolute inset-0">
            {/* Card 1 — top 5/20, left 5/20 */}
            <motion.div
                className="absolute top-5/20 left-4/20 xl:left-5/20"
                initial={{
                    opacity: 0,
                    x: "25vw",
                    y: "25vh",
                }}
                animate={{
                    opacity: [0, 0, 1],
                    x: 0,
                    y: 0,
                }}
                transition={{
                    delay: 1,
                    duration: 0.2,
                    ease: [0.33, 1, 0.68, 1],
                    times: [0, 0.9, 1],
                }}
            >
                <motion.div
                    animate={{
                        x: [0, 1.5, -1, 2, -0.5, 0],
                        y: [0, -2, 1, -1.5, 2, 0],
                        rotate: [0, 0.15, -0.1, 0.2, -0.15, 0],
                    }}
                    transition={{
                        delay: 1.2,
                        duration: 8.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <ImageGlassCard
                        className="h-72 w-72 -translate-x-1/2 -translate-y-1/2"
                        backgroundImage="/hero/animations/animationBgOne.avif"
                        mainImage="/hero/cardTop.png"
                    />
                </motion.div>
            </motion.div>

            {/* Card 2 — top 1/6, left 1/2 */}
            <motion.div
                className="absolute top-2/10 left-1/2"
                initial={{
                    opacity: 0,
                    x: "0vw",
                    y: "33.333vh",
                }}
                animate={{
                    opacity: [0, 0, 1],
                    x: 0,
                    y: 0,
                }}
                transition={{
                    delay: 1,
                    duration: 0.2,
                    ease: [0.33, 1, 0.68, 1],
                    times: [0, 0.9, 1],
                }}
            >
                <motion.div
                    animate={{
                        x: [0, -1, 2, -1.5, 0.5, 0],
                        y: [0, 2, -1, 1.5, -2, 0],
                        rotate: [0, -0.12, 0.18, -0.08, 0.12, 0],
                    }}
                    transition={{
                        delay: 1.2,
                        duration: 7.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <ImageGlassCard
                        className="h-72 w-72 -translate-x-1/2 -translate-y-1/2"
                        backgroundImage="/hero/animations/animationBgTwo.avif"
                        mainImage="/hero/cardTop.png"
                    />
                </motion.div>
            </motion.div>

            {/* Card 3 — top 5/20, left 15/20 */}
            <motion.div
                className="absolute top-5/20 left-16/20 xl:left-15/20"
                initial={{
                    opacity: 0,
                    x: "-25vw",
                    y: "25vh",
                }}
                animate={{
                    opacity: [0, 0, 1],
                    x: 0,
                    y: 0,
                }}
                transition={{
                    delay: 1,
                    duration: 0.2,
                    ease: [0.33, 1, 0.68, 1],
                    times: [0, 0.9, 1],
                }}
            >
                <motion.div
                    animate={{
                        x: [0, 2, -1, 1.5, -2, 0],
                        y: [0, -1, 2, -2, 1, 0],
                        rotate: [0, 0.2, -0.12, 0.08, -0.18, 0],
                    }}
                    transition={{
                        delay: 1.2,
                        duration: 9.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <ImageGlassCard
                        className="h-72 w-72 -translate-x-1/2 -translate-y-1/2"
                        backgroundImage="/hero/animations/animationBgFive.avif"
                        mainImage="/hero/cardTop.png"
                    />
                </motion.div>
            </motion.div>

            {/* Card 4 — top 3/4, left 1/5 */}
            <motion.div
                className="absolute top-3/4 left-1/5"
                initial={{
                    opacity: 0,
                    x: "30vw",
                    y: "-25vh",
                }}
                animate={{
                    opacity: [0, 0, 1],
                    x: 0,
                    y: 0,
                }}
                transition={{
                    delay: 1,
                    duration: 0.2,
                    ease: [0.33, 1, 0.68, 1],
                    times: [0, 0.9, 1],
                }}
            >
                <motion.div
                    animate={{
                        x: [0, -1.5, 1, -2, 0.5, 0],
                        y: [0, 2, -1.5, 1, -2, 0],
                        rotate: [0, -0.18, 0.1, -0.08, 0.16, 0],
                    }}
                    transition={{
                        delay: 1.2,
                        duration: 7.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <ImageGlassCard
                        className="h-72 w-72 -translate-x-1/2 -translate-y-1/2"
                        backgroundImage="/hero/animations/animationBgSix.avif"
                        mainImage="/hero/cardTop.png"
                    />
                </motion.div>
            </motion.div>

            {/* Card 5 — top 5/6, left 1/2 */}
            <motion.div
                className="absolute top-5/6 left-1/2"
                initial={{
                    opacity: 0,
                    x: "0vw",
                    y: "-33.333vh",
                }}
                animate={{
                    opacity: [0, 0, 1],
                    x: 0,
                    y: 0,
                }}
                transition={{
                    delay: 1,
                    duration: 0.2,
                    ease: [0.33, 1, 0.68, 1],
                    times: [0, 0.9, 1],
                }}
            >
                <motion.div
                    animate={{
                        x: [0, 1, -2, 1.5, -0.5, 0],
                        y: [0, -2, 1, 2, -1.5, 0],
                        rotate: [0, 0.1, -0.2, 0.12, -0.08, 0],
                    }}
                    transition={{
                        delay: 1.2,
                        duration: 8.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <ImageGlassCard
                        className="h-72 w-72 -translate-x-1/2 -translate-y-1/2"
                        backgroundImage="/hero/animations/animationBgFour.avif"
                        mainImage="/hero/cardTop.png"
                    />
                </motion.div>
            </motion.div>

            {/* Card 6 — top 3/4, left 4/5 */}
            <motion.div
                className="absolute top-3/4 left-4/5"
                initial={{
                    opacity: 0,
                    x: "-30vw",
                    y: "-25vh",
                }}
                animate={{
                    opacity: [0, 0, 1],
                    x: 0,
                    y: 0,
                }}
                transition={{
                    delay: 1,
                    duration: 0.2,
                    ease: [0.33, 1, 0.68, 1],
                    times: [0, 0.9, 1],
                }}
            >
                <motion.div
                    animate={{
                        x: [0, -2, 1.5, -1, 2, 0],
                        y: [0, 1.5, -2, 1, -1, 0],
                        rotate: [0, -0.15, 0.1, -0.2, 0.08, 0],
                    }}
                    transition={{
                        delay: 1.2,
                        duration: 9.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <ImageGlassCard
                        className="h-72 w-72 -translate-x-1/2 -translate-y-1/2"
                        backgroundImage="/hero/animations/animationBgSeven.avif"
                        mainImage="/hero/cardTop.png"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}

function MobileHeroAnimation() {
    return (
        <div className="absolute inset-0 lg:overflow-hidden mb-52 md:mb-44 mt-20 mx-5 md:mx-0">
            {/* Card 1 */}
            <motion.div
                className="absolute top-2/10 left-4/20 xl:left-5/20"
                animate={{
                    x: [0, 1.5, -1, 2, -0.5, 0],
                    y: [0, -2, 1, -1.5, 2, 0],
                    rotate: [0, 0.15, -0.1, 0.2, -0.15, 0],
                }}
                transition={{
                    duration: 8.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <ImageGlassCard
                    className="h-36 w-36 -translate-x-1/2 -translate-y-1/2"
                    backgroundImage="/hero/animations/animationBgFour.avif"
                    mainImage="/hero/cardTop.png"
                />
            </motion.div>

            {/* Card 2 */}
            <motion.div
                className="absolute top-5/20 left-full sm:left-14/20"
                animate={{
                    x: [0, -1, 2, -1.5, 0.5, 0],
                    y: [0, 2, -1, 1.5, -2, 0],
                    rotate: [0, -0.12, 0.18, -0.08, 0.12, 0],
                }}
                transition={{
                    duration: 7.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <ImageGlassCard
                    className="h-44 w-44 -translate-x-1/2 -translate-y-1/2"
                    backgroundImage="/hero/animations/animationBgOne.avif"
                    mainImage="/hero/cardTop.png"
                />
            </motion.div>

            {/* Card 3 */}
            <motion.div
                className="absolute top-15/20 left-12/20 sm:left-16/20"
                animate={{
                    x: [0, 2, -1, 1.5, -2, 0],
                    y: [0, -1, 2, -2, 1, 0],
                    rotate: [0, 0.2, -0.12, 0.08, -0.18, 0],
                }}
                transition={{
                    duration: 9.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <ImageGlassCard
                    className="h-56 w-56 -translate-x-1/2 -translate-y-1/2"
                    backgroundImage="/hero/animations/animationBgSix.avif"
                    mainImage="/hero/cardTop.png"
                />
            </motion.div>

            {/* Card 4 */}
            <motion.div
                className="absolute top-7/10 left-1/5 hidden sm:block"
                animate={{
                    x: [0, -1.5, 1, -2, 0.5, 0],
                    y: [0, 2, -1.5, 1, -2, 0],
                    rotate: [0, -0.18, 0.1, -0.08, 0.16, 0],
                }}
                transition={{
                    duration: 7.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <ImageGlassCard
                    className="h-72 w-72 -translate-x-1/2 -translate-y-1/2"
                    backgroundImage="/hero/animations/animationBgFive.avif"
                    mainImage="/hero/cardTop.png"
                />
            </motion.div>
        </div>
    );
}

export default function HeroAnimation() {
    return (
        <div className="absolute inset-0 overflow-hidden lg:overflow-visible -z-10">
            <div className="hidden lg:block">
                <DesktopHeroAnimation />
            </div>

            <div className="lg:hidden">
                <MobileHeroAnimation />
            </div>
        </div>
    );
}