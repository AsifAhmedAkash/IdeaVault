"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";

const slides = [
    {
        id: 1,
        tag: "Growth Ecosystem",
        title: "Grounded Ideas, High Stakes Growth.",
        description:
            "IdeaVault connects visionary founders with a thriving innovation community.",
        image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
        primaryBtn: "Explore Ideas",
        secondaryBtn: "View Portfolio",
    },
    {
        id: 2,
        tag: "Future Innovation",
        title: "Build Smarter. Launch Faster.",
        description:
            "Discover innovative startup ideas and collaborate with creators.",
        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
        primaryBtn: "Discover Trends",
        secondaryBtn: "Join Community",
    },
    {
        id: 3,
        tag: "Creative Collaboration",
        title: "Where Startup Ideas Become Reality.",
        description:
            "From AI to sustainable tech, build impactful ventures.",
        image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
        primaryBtn: "Share Idea",
        secondaryBtn: "Explore",
    },
];

const AUTO_SLIDE = 5000;

export default function BannerSliderComponent() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, AUTO_SLIDE);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">

            {/* SLIDER TRACK */}
            <div
                className="flex h-full w-full transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${index * 100}%)`,
                }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="min-w-full h-full relative flex items-center"
                    >
                        {/* BACKGROUND */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                            }}
                        />

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-black/60" />

                        {/* CONTENT */}
                        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 text-white">
                            <span className="text-xs tracking-[0.2em] text-lime-300 uppercase">
                                {slide.tag}
                            </span>

                            <h1 className="text-4xl md:text-6xl font-bold mt-4">
                                {slide.title}
                            </h1>

                            <p className="mt-6 max-w-xl text-gray-200 border-l-4 border-lime-400 pl-4">
                                {slide.description}
                            </p>

                            <div className="flex gap-4 mt-8 flex-wrap">
                                <Button className="bg-lime-400 text-black font-semibold">
                                    {slide.primaryBtn}
                                    <FaArrowRight className="ml-2" />
                                </Button>

                                <Button variant="bordered" className="text-white border-white/40">
                                    {slide.secondaryBtn}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-10 right-8 flex flex-col gap-3 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-3 h-3 rounded-full transition-all ${index === i
                            ? "bg-lime-400 scale-125"
                            : "bg-white/40"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}