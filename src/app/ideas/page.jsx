"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowRight, FiLoader } from "react-icons/fi";

const DEFAULT_SEEDS = [
    {
        title: "EcoMesh Logistics",
        desc: "A decentralized delivery network utilizing solar-powered drones to bridge the last-mile gap in rural landscapes.",
        tag: "Sustainability",
        category: "Sustainability",
        stat: "Targeting $850k",
        targetAmount: "850000",
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=600&auto=format&fit=crop",
        problem: "Rural regions lack reliable road infrastructure, preventing delivery of vital medical supplies and basic goods.",
        solution: "A network of solar drones and automated charging pads that coordinate to deliver cargo without reliance on roads.",
        roadmap: "Q1: Test drone hover in high winds. Q2: Partner with local clinics. Q3: Launch pilot route in mountain villages.",
        audience: "Rural healthcare providers, local NGOs, and regional logistics networks.",
        personId: "6651a9c2f4b8e2a7b9d3c1e3",
        date: "May 2026"
    },
    {
        title: "CogniSync AI",
        desc: "Real-time language translation for emotional nuance in high-stakes negotiations.",
        tag: "AI",
        category: "AI",
        stat: "Pre-Seed Ready",
        targetAmount: "300000",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop",
        problem: "Automated translators miss subtle emotional undertones and politeness levels, causing misunderstandings in business.",
        solution: "An advanced LLM layer that tracks vocal tone, micro-expressions, and cultural idioms in real-time.",
        roadmap: "Q1: Train model on bilingual negotiation transcripts. Q2: Release beta browser extension. Q3: Launch enterprise pilot.",
        audience: "International law firms, merger & acquisition teams, and global sales departments.",
        personId: "6651a9c2f4b8e2a7b9d3c1e3",
        date: "May 2026"
    },
    {
        title: "Vanguard Protocol",
        desc: "Quantum-resistant encryption layers for enterprise infrastructure protection.",
        tag: "FinTech",
        category: "FinTech",
        stat: "Budget $1.2M",
        targetAmount: "1200000",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop",
        problem: "Standard RSA encryption will become obsolete as public quantum computers emerge, threatening critical systems.",
        solution: "A plug-and-play SDK offering lattice-based cryptographic algorithms that secure systems against future quantum threats.",
        roadmap: "Q1: Benchmarking library latency. Q2: Secure government agency beta testing. Q3: Launch general availability SaaS.",
        audience: "Banking institutions, infrastructure providers, and government agencies.",
        personId: "6651a9c2f4b8e2a7b9d3c1e3",
        date: "May 2026"
    }
];

export default function IdeasPage() {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchIdeas = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("http://localhost:5000/ideas");
            if (!res.ok) throw new Error("Failed to fetch ideas");
            const data = await res.json();

            if (data.length === 0) {
                // Database is empty. Seed database with defaults.
                console.log("Database empty. Auto-seeding default ideas...");
                for (const seed of DEFAULT_SEEDS) {
                    await fetch("http://localhost:5000/ideas", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(seed)
                    });
                }
                // Refetch after seeding
                const reRes = await fetch("http://localhost:5000/ideas");
                const reData = await reRes.json();
                setIdeas(reData);
            } else {
                setIdeas(data);
            }
        } catch (err) {
            console.error(err);
            setError("Could not retrieve ideas. Ensure the server is running on port 5000.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIdeas();
    }, []);

    useEffect(() => {
        if (ideas.length > 0) {
            const cards = document.querySelectorAll(".idea-card");
            cards.forEach((c) => {
                c.style.opacity = 1;
                c.style.transform = "translateY(0)";
            });
        }
    }, [ideas]);

    return (
        <main className="min-h-screen px-6 md:px-16 py-20 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
            {/* HEADER */}
            <header className="text-center md:text-left mb-16">
                <div className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-5 bg-lime-300 dark:bg-lime-900/50 text-lime-900 dark:text-lime-300">
                    THE GALLERY
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                    Explore Innovation
                </h1>

                <p className="max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
                    A curated selection of high-potential ventures bridging organic
                    growth and strategic capital investment.
                </p>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <FiLoader className="animate-spin text-4xl text-lime-700" />
                    <p className="text-zinc-500">Loading ideas from database...</p>
                </div>
            ) : error ? (
                <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
                    <p className="text-red-600 dark:text-red-400 font-medium mb-4">{error}</p>
                    <button 
                        onClick={fetchIdeas}
                        className="px-6 py-2 bg-lime-700 hover:bg-lime-600 text-white rounded-full font-semibold transition"
                    >
                        Try Again
                    </button>
                </div>
            ) : (
                /* GRID */
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ideas.map((item) => (
                        <Link key={item._id} href={`/ideadetails/${item._id}`}>
                            <article
                                className="idea-card group rounded-lg overflow-hidden flex flex-col cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all duration-300 h-full"
                                style={{
                                    opacity: 0,
                                    transform: "translateY(20px)",
                                    transition: "all 0.6s ease"
                                }}
                            >
                                {/* IMAGE */}
                                <div className="h-64 overflow-hidden relative">
                                    <img
                                        src={item.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"}
                                        alt={item.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
                                    />

                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 text-xs rounded-full bg-black/75 text-white font-bold">
                                            {item.category || item.tag || "GENERAL"}
                                        </span>
                                    </div>
                                </div>

                                {/* CONTENT */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-lime-700 dark:group-hover:text-lime-400 transition">
                                        {item.title}
                                    </h3>

                                    <p className="flex-grow mb-6 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3">
                                        {item.desc || item.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                        <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                                            {item.targetAmount ? `Targeting $${Number(item.targetAmount).toLocaleString()}` : (item.stat || "Budget Open")}
                                        </div>

                                        <button className="flex items-center gap-2 text-xs font-bold text-lime-800 dark:text-lime-400 group-hover:translate-x-1 transition duration-300">
                                            VIEW DETAILS
                                            <FiArrowRight />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </section>
            )}
        </main>
    );
}