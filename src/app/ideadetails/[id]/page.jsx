"use client";

import { useEffect } from "react";
import {
    FiArrowLeft,
    FiBookmark,
    FiShare2,
    FiThumbsUp,
    FiSend,
    FiCheck,
} from "react-icons/fi";

const colors = {
    bg: "#fafaf3",
    text: "#1a1c18",
    muted: "#45483f",
    border: "#c5c8bc",
    primary: "#18240a",
    accent: "#4c6700",
    greenSoft: "#c5ee68",
};

export default function IdeaDetailsPage() {
    useEffect(() => {
        const nav = document.querySelector("nav");

        const onScroll = () => {
            if (window.scrollY > 20) {
                nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
                nav.style.borderBottom = `1px solid ${colors.border}`;
            } else {
                nav.style.boxShadow = "none";
                nav.style.borderBottom = "none";
            }
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div style={{ backgroundColor: colors.bg, color: colors.text }}>


            {/* MAIN */}
            <main className="max-w-6xl mx-auto px-6 md:px-16 pb-32">
                {/* HERO */}
                <header className="relative h-[60vh] md:h-[70vh] rounded-xl overflow-hidden mb-12">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPJL9aUep79foKvBYWEzwZpxln0pxst5Pnu2K4an6Fng0o9exjgqqB-u39pdSDtTiA9Btng8P8wAc_8pCGF3LwSDJBwC3y5LAkKP3JaKec_9zseeGQgIcv1upnGMsBFxEJTD_JgxBVz04ooqWJFPHHybLoGhokTFCChLjXJ_M7TJd_WrhZJEjRpCLrGvb61sXBqeKGNp7DMJuHcmb-E_0yxW1k8hODq9iVMbkRJ0S_kWw6I02-4DLZGUvVfKmFQObR0gfa2mE_xOU"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 p-8 md:p-12">
                        <span
                            className="px-3 py-1 text-xs rounded-full"
                            style={{
                                backgroundColor: colors.greenSoft,
                                color: colors.primary,
                            }}
                        >
                            SUSTAINABILITY
                        </span>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mt-4">
                            EcoMesh Logistics
                        </h1>

                        <p className="text-white/80 max-w-2xl mt-3">
                            Decentralized solar-powered drone networks for last-mile delivery
                            in rural terrain.
                        </p>
                    </div>
                </header>

                {/* GRID */}
                <div className="grid lg:grid-cols-12 gap-10">
                    {/* LEFT */}
                    <div className="lg:col-span-8 space-y-16">
                        {/* PROBLEM + SOLUTION */}
                        <section>
                            <h2 className="text-sm uppercase tracking-widest mb-6 text-gray-600">
                                Narrative & Context
                            </h2>

                            <h3 className="text-2xl font-semibold mb-3">Problem</h3>
                            <p style={{ color: colors.muted }} className="mb-8 leading-relaxed">
                                Rural areas lack infrastructure, blocking delivery of essential
                                goods and services.
                            </p>

                            <h3 className="text-2xl font-semibold mb-3">Solution</h3>
                            <p style={{ color: colors.muted }} className="leading-relaxed">
                                EcoMesh uses decentralized solar drones and smart routing to
                                deliver goods efficiently without traditional roads.
                            </p>
                        </section>

                        {/* COMMUNITY */}
                        <section>
                            <h2 className="text-sm uppercase tracking-widest mb-6 text-gray-600">
                                Community Dialogue
                            </h2>

                            <div className="border p-4">
                                <textarea
                                    placeholder="Join the discussion..."
                                    className="w-full outline-none"
                                />
                                <button
                                    className="mt-3 flex items-center gap-2 px-4 py-2 text-white"
                                    style={{ backgroundColor: colors.primary }}
                                >
                                    <FiSend /> Post Comment
                                </button>
                            </div>

                            {/* sample comment */}
                            <div className="flex gap-4 mt-10">
                                <div className="w-10 h-10 bg-gray-300 rounded-full" />

                                <div>
                                    <div className="flex justify-between">
                                        <strong>Marcus Thorne</strong>
                                        <span className="text-xs text-gray-500">2h ago</span>
                                    </div>

                                    <p className="text-sm text-gray-600 mt-2">
                                        How do you stabilize drones in high wind zones?
                                    </p>

                                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                        <button className="flex items-center gap-1">
                                            <FiThumbsUp /> 24
                                        </button>
                                        <button>Reply</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="border p-6">
                            <h3 className="text-xs uppercase tracking-widest mb-6">
                                Strategic Info
                            </h3>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span>Budget</span>
                                    <strong>$850k</strong>
                                </div>

                                <div className="flex justify-between">
                                    <span>Complexity</span>
                                    <span className="px-2 py-1 border text-xs">HIGH</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Timeline</span>
                                    <span>18 months</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {["#agritech", "#iot", "#logistics", "#sustainability"].map(
                                (t) => (
                                    <span
                                        key={t}
                                        className="px-3 py-1 text-xs border"
                                        style={{
                                            borderColor: colors.border,
                                            color: colors.accent,
                                        }}
                                    >
                                        {t}
                                    </span>
                                )
                            )}
                        </div>

                        <button
                            className="w-full py-3 text-white"
                            style={{ backgroundColor: colors.primary }}
                        >
                            Back Proposal
                        </button>

                        <button className="w-full py-3 border" style={{ color: colors.primary }}>
                            Contact Strategist
                        </button>
                    </aside>
                </div>
            </main>
        </div>
    );
}