"use client";

import { useEffect } from "react";
import {
    FiArrowRight,
    FiDollarSign,
    FiShield,
    FiActivity,
    FiHeart,
    FiBriefcase,
    FiCpu,
} from "react-icons/fi";

const ideas = [
    {
        title: "EcoMesh Logistics",
        desc: "A decentralized delivery network utilizing solar-powered drones to bridge the last-mile gap in rural landscapes.",
        tag: "SUSTAINABILITY",
        icon: <FiDollarSign />,
        stat: "Targeting $850k",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ_NUaOdOOtyPvEVPm0tdA7HXYnbQxKCT-KKkEQ098GzVl1jXgLO0MPKzFk6fGJ_ZGS9NgLGV1THqv29EU_d1eAdvk7-Chwd15AW10XcwUmQG3mynY0euQsMqhjtwcEOs4b8vjlz5Sr4G-VkkFYnl49xojJFYN17EAEQcyvChGyM533c3faZlITb5ySVwm3uUt58wTjTuLFQ5IHDf_hxzhLOyUIp4eLQXkmxMuaKqx943w-kRxR2YKLvE3e92pYDvhTHomNtSVfvE",
    },
    {
        title: "CogniSync AI",
        desc: "Real-time language translation for emotional nuance in high-stakes negotiations.",
        tag: "AI-DRIVEN",
        icon: <FiCpu />,
        stat: "Pre-Seed Ready",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLDNV7fBBSNYisRlznbfCm3PMef_6yaWAbE435YBMmwsLOW2uXah1FxviDAU7RqJ0y0QeG2R0mIfMN2_r7Q05fKeHPKTKwhOLEBozWYa6I_7wrUfdi1gu971cgCmnOe-AeNLbmkl-kIuu-iJgd8TC2okQ9TByFBwLm-IVi7JVzZMvBX4ygpjJHEN559JrtbQtJ6uBMVbhhl9X6M7rKcS_Q1T8F9knEFxTBjPMg5X5Dl03KGCJN9APPMjVidCwFl00RPh0E4vlN0LA",
    },
    {
        title: "Vanguard Protocol",
        desc: "Quantum-resistant encryption layers for enterprise infrastructure protection.",
        tag: "SECURITY",
        icon: <FiShield />,
        stat: "Budget $1.2M",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4cZD50UuwQx22L4h4CtjfaRoCCdl1CPdp0_8AJK27AgoQggDoTB9PD5IC2hO3grsw7Uq4fpMDB7vwcFDwfZ9kRl_hR82oMeeZA6iWSaGDg7f564n1MJVpfNt-OQKi3thXhwrg6f0Kz7MQeHQ0d83l03TIlzUIQv28EIgS414OiaflCSi2kP8wfA0FH6HetAoDR7e3YTOEIVRmOsvXzfL8TkQhZ3jqVlfmxBR_9Zej9SP298Es_cpuuY7oNGUJd52hzgoGyVWb_JE",
    },
    {
        title: "Lumina Health",
        desc: "Predictive wellness monitoring using non-invasive biometric sensors.",
        tag: "HEALTH-TECH",
        icon: <FiHeart />,
        stat: "Series A Ready",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDbnyt85zrXTK-44H0h1W8ovulCkN4hIn0keY2RZaITL_1Rp2oW2Y6SmoC-10P_dlYgbXZTX0YvU-ftIWDbpG6ESdfrsu9c5-llK_LvO7ynWaYBf8ALhH4e_trST35yIT1S6bTyQoesTZX0M2a2fR-zswKYd6hmj7Fqpifa65C9yzpcBuGF_xR0t0StHP8ZbAOTD1yknbTUb3KWQ7TOaNXQzCRw1yLiUCGtkTDqfY4WwozJljtDMaDOo-ctJnyPCRLnkxhwuILSXM",
    },
    {
        title: "Aequitas Ledger",
        desc: "Smart-contract escrow system for global IP licensing and royalties.",
        tag: "FINTECH",
        icon: <FiBriefcase />,
        stat: "Budget $450k",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDchn50KAUMFRMvCUafHZHCE4DjhDga3GtXpdAne4AWwpP7DnFQgdcvUZAnwDpJdyKRB6F-4uEhQkt7DYowzR_v1yQKVw3XKyM0qupL_HHryzkKh2mgCl6YFBbk6LWb5URYMbh21mC43xmmV9R4NgHbLns0xtqYSg0ook_UwdjZKTWUstekqkbuTSdx51RIPG36yChzRYnS1f1fb4EJVd0xjC5Tbr9-qFcsyZdefSGvJp4ExVjhOLwfXhgB8iuZLmVY7FrJt7H_2Ps",
    },
    {
        title: "Kinetic Fabric",
        desc: "Soft-robotics exoskeletons for warehouse worker assistance.",
        tag: "ROBOTICS",
        icon: <FiActivity />,
        stat: "Targeting $2.1M",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwJ3FL6sZBbX-RY1RGSj0O4b_q8QqPAHgaKKO8-w8pBNqw9dduDuZLRBO1BgscRQrqwji0hIJA92GpkZQUQuCBNeBBPDN6qcCKD6vutwXS3DHH2xP3zaC1B4CwlfldiO3pRMDe9fPPrzn1ihhE-v25ugbw_E4e0wCOhc7nyGGhoFi9kMtkgHflQ0VbWKgRdC6SdzdFGuEVmjuHB2l_YCW0gSRnhBZefzmElWdC_qdTR8FpEvqFvMtv-hSDylYOfB4GQFj6DS5Fvp0",
    },
];

const colors = {
    pageBg: "#fafaf3",
    text: "#1a1c18",
    muted: "#45483f",
    cardBorder: "#c5c8bc",
    green: "#18240a",
    greenSoft: "#2d3a1e",
    tagBg: "#c8f16b",
};

export default function IdeasPage() {
    useEffect(() => {
        const cards = document.querySelectorAll(".idea-card");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = "translateY(0)";
                    }, i * 80);
                }
            });
        });

        cards.forEach((c) => {
            c.style.opacity = 0;
            c.style.transform = "translateY(20px)";
            c.style.transition = "all 0.6s ease";
            observer.observe(c);
        });
    }, []);

    return (
        <main
            style={{ backgroundColor: colors.pageBg, color: colors.text }}
            className="min-h-screen px-6 md:px-16 py-20 max-w-7xl mx-auto"
        >
            {/* HEADER */}
            <header className="text-center md:text-left mb-16">
                <div
                    style={{
                        backgroundColor: colors.tagBg,
                        color: colors.green,
                    }}
                    className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-5"
                >
                    THE GALLERY
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    Explore Innovation
                </h1>

                <p style={{ color: colors.muted }} className="max-w-2xl text-lg">
                    A curated selection of high-potential ventures bridging organic
                    growth and strategic capital investment.
                </p>
            </header>

            {/* GRID */}
            <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ideas.map((item, i) => (
                    <article
                        key={i}
                        className="idea-card group rounded-lg overflow-hidden flex flex-col"
                        style={{
                            backgroundColor: "white",
                            border: `1px solid ${colors.cardBorder}`,
                        }}
                    >
                        {/* IMAGE */}
                        <div className="h-64 overflow-hidden relative">
                            <img
                                src={item.img}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
                            />

                            <div className="absolute top-4 left-4">
                                <span
                                    style={{
                                        backgroundColor: "rgba(0,0,0,0.75)",
                                        color: "white",
                                    }}
                                    className="px-3 py-1 text-xs rounded-full"
                                >
                                    {item.tag}
                                </span>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

                            <p style={{ color: colors.muted }} className="flex-grow mb-6">
                                {item.desc}
                            </p>

                            <div
                                className="flex items-center justify-between pt-4"
                                style={{ borderTop: `1px solid ${colors.cardBorder}` }}
                            >
                                <div className="flex items-center gap-2">
                                    <span style={{ color: colors.green }}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm">{item.stat}</span>
                                </div>

                                <button
                                    style={{ color: colors.greenSoft }}
                                    className="flex items-center gap-2 text-sm font-semibold group"
                                >
                                    VIEW
                                    <FiArrowRight className="group-hover:translate-x-1 transition" />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            {/* LOAD MORE */}
            <div className="flex justify-center mt-16">
                <button
                    style={{
                        border: `1px solid ${colors.green}`,
                        color: colors.green,
                    }}
                    className="px-10 py-3 rounded-full hover:text-white hover:bg-black transition"
                >
                    LOAD MORE INNOVATIONS
                </button>
            </div>
        </main>
    );
}