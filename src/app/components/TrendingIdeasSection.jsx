"use client";

import { Button, Chip } from "@heroui/react";
import {
    FaArrowRight,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";

const trendingIdeas = [
    {
        id: 1,
        category: "AgriTech",
        title: "Vertical Yield Networks",
        description:
            "An automated decentralized vertical farming network designed to minimize water usage while maximizing urban space efficiency.",
        image:
            "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1974&auto=format&fit=crop",
    },
    {
        id: 2,
        category: "Clean Energy",
        title: "Modular Microgrids",
        description:
            "Plug-and-play renewable energy modules enabling rural communities to build self-sustaining power networks.",
        image:
            "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        category: "AI Software",
        title: "Ethical AI Guardian",
        description:
            "An open-source auditing protocol that ensures transparency and accountability in AI decision systems.",
        image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 4,
        category: "Logistics",
        title: "Loop Textiles Hub",
        description:
            "A reverse-logistics platform connecting fashion brands with textile recyclers to reduce global waste.",
        image:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1887&auto=format&fit=crop",
    },
    {
        id: 5,
        category: "Future Work",
        title: "Flow State Sync",
        description:
            "A collaborative productivity platform that adapts task visibility based on team focus and workflow.",
        image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    },
    {
        id: 6,
        category: "LegalTech",
        title: "Smart Contract Oracle",
        description:
            "Bringing verified judicial outcomes into blockchain smart contracts through trusted legal data systems.",
        image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop",
    },
];

export default function TrendingIdeasSection() {
    return (
        <section className="bg-[#f8f8f3] py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                {/* Header */}
                <div className="mb-16">
                    <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.25em] text-lime-700">
                        • Trending Ideas
                    </span>

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <h2 className="text-4xl font-black leading-tight text-[#18240a] md:text-5xl lg:text-6xl">
                                Discover the next generation of{" "}
                                <span className="text-lime-700">
                                    grounded innovation.
                                </span>
                            </h2>
                        </div>

                        <div className="max-w-md">
                            <p className="text-base leading-relaxed text-[#4a4d44] md:text-lg">
                                Every startup idea on IdeaVault is crafted to solve
                                real-world challenges through innovation, scalability,
                                and community-driven collaboration.
                            </p>
                        </div>
                    </div>
                </div>
                {/* main  */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {trendingIdeas.map((idea) => (
                        <div
                            key={idea.id}
                            className="group overflow-hidden rounded-3xl border border-black/5 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            {/* Image */}
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={idea.image}
                                    alt={idea.title}
                                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                                {/* Category */}
                                <div className="absolute left-5 top-5">
                                    <Chip
                                        radius="sm"
                                        className="border border-lime-300/30 bg-lime-300/90 px-3 text-xs font-bold uppercase tracking-wider text-black backdrop-blur-md"
                                    >
                                        {idea.category}
                                    </Chip>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 flex-col p-8">
                                <h3 className="mb-4 text-2xl font-bold text-[#18240a]">
                                    {idea.title}
                                </h3>

                                <p className="mb-8 flex-grow leading-relaxed text-[#5b5d57]">
                                    {idea.description}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between border-t border-black/5 pt-6">
                                    <div>
                                        <p className="text-sm font-medium text-[#7b7e77]">
                                            Trending Startup
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-lime-700">
                                            Community Favorite
                                        </p>
                                    </div>

                                    <Button
                                        radius="sm"
                                        className="bg-[#18240a] px-5 text-white transition-all duration-300 group-hover:bg-lime-600"
                                        endContent={<FaArrowRight />}
                                    >
                                        Details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}