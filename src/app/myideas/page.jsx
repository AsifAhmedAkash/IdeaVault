import React from "react";

const ideas = [
    {
        title: "Verdant Systems",
        date: "Mar 2025",
        tag: "AgriTech",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDdPyRdPsfQHo-g1IW2XZ0aVI9l7pG14R2T6dbU8Kdca7jGdJ9c9Kz5BvrBzXSVuOpwDdgntxhTw6Vf9ipvlbH3maxDM2C4D9DlkDjv1KP7UjhKnZ1mIkpc01SXq99tEg3kRAP_44mhp5ZWTX66GvcAnLqhuNe2UhQ5S9uvfRfhuniXzainKKgaKK9nIaJHOP6Lz5qNNWv4WVrFsZu1NaF66uXnxZMQiHoyaDNZjedVoe07f_cLNBwQgF1SvWWMDwI7uwowFjypnGM",
        desc: "Scalable vertical farming solutions designed for urban industrial hubs, utilizing recycled greywater and AI-optimized nutrient delivery.",
    },
    {
        title: "Lichen Capital",
        date: "Feb 2025",
        tag: "FinTech",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDdPyRdPsfQHo-g1IW2XZ0aVI9l7pG14R2T6dbU8Kdca7jGdJ9c9Kz5BvrBzXSVuOpwDdgntxhTw6Vf9ipvlbH3maxDM2C4D9DlkDjv1KP7UjhKnZ1mIkpc01SXq99tEg3kRAP_44mhp5ZWTX66GvcAnLqhuNe2UhQ5S9uvfRfhuniXzainKKgaKK9nIaJHOP6Lz5qNNWv4WVrFsZu1NaF66uXnxZMQiHoyaDNZjedVoe07f_cLNBwQgF1SvWWMDwI7uwowFjypnGM",
        desc: "Micro-investment platform for slow-growth biological assets focusing on stability and regenerative yield systems.",
    },
    {
        title: "Aeon Turbine",
        date: "Jan 2025",
        tag: "CleanEnergy",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDD3vXnX8Mibsxkp8eDzED-oJ3cUkOc-XLcSRflNNBDDYSkXFbsX437K9cdPuR-6UMgnQaRWjusXxBJIlrlgNmaiEdi-oYQzAp1LmLuETJin5h2SVeIVEUWnk6TiPsq65YKnD7pwZqfg9kmk9e5O50U59QMnMCzefCoFPY4XVWQsqimMCl7HkZVf2oZayRZF1WG2CSRHkTLd2W0wLdJP2CGWlLGqOFHGw_nGqXATAKQXNVZTY7os26Wl81nfMADfuYBbQd_jwptrzo",
        desc: "Low-profile wind harvesting for dense urban rooftops with silent modular integration.",
    },
    {
        title: "Substrate AI",
        date: "Jan 2025",
        tag: "Bio-Computing",
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDD3vXnX8Mibsxkp8eDzED-oJ3cUkOc-XLcSRflNNBDDYSkXFbsX437K9cdPuR-6UMgnQaRWjusXxBJIlrlgNmaiEdi-oYQzAp1LmLuETJin5h2SVeIVEUWnk6TiPsq65YKnD7pwZqfg9kmk9e5O50U59QMnMCzefCoFPY4XVWQsqimMCl7HkZVf2oZayRZF1WG2CSRHkTLd2W0wLdJP2CGWlLGqOFHGw_nGqXATAKQXNVZTY7os26Wl81nfMADfuYBbQd_jwptrzo",
        desc: "Biological computing-based neural optimization achieving major GPU efficiency reduction.",
    },
];

export default function MyIdeasPage() {
    return (
        <main className="max-w-6xl mx-auto px-6 md:px-12 py-20 bg-[#fafaf3] text-[#1a1c18]">

            {/* HEADER */}
            <header className="mb-16">
                <span className="text-xs tracking-widest uppercase text-[#4c6700]">
                    Innovation Ledger
                </span>
                <h1 className="text-5xl font-bold mt-2">My Ideas</h1>
                <p className="text-lg text-[#45483f] mt-4 max-w-2xl">
                    A curated collection of your intellectual ventures.
                </p>
            </header>

            {/* GRID */}
            <div className="flex flex-col gap-10">

                {ideas.map((idea, index) => {
                    const isReversed = index % 2 === 1;

                    return (
                        <div
                            key={index}
                            className={`group flex flex-col md:flex-row ${isReversed ? "md:flex-row-reverse" : ""
                                } bg-white border border-[#e3e3dc] overflow-hidden hover:shadow-lg transition-all`}
                        >

                            {/* IMAGE */}
                            <div className="w-full md:w-1/3 relative min-h-[280px]">
                                <img
                                    src={idea.image}
                                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-[#c5ee68] text-[#1b1c18] px-3 py-1 text-xs rounded-full">
                                        {idea.tag}
                                    </span>
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-2xl font-semibold text-[#18240a]">
                                                {idea.title}
                                            </h3>
                                            <span className="text-xs text-[#45483f]">{idea.date}</span>
                                        </div>

                                        <div className="flex gap-2">
                                            <button className="p-2 hover:bg-[#eeeee7] rounded">
                                                ✏️
                                            </button>
                                            <button className="p-2 hover:bg-red-100 rounded text-red-600">
                                                🗑️
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-[#45483f] leading-relaxed">
                                        {idea.desc}
                                    </p>
                                </div>

                                {/* FOOTER */}
                                <div className="mt-8 flex justify-between text-xs text-[#4c6700]">
                                    <span>Active Idea</span>
                                    <span>High Engagement</span>
                                </div>
                            </div>

                        </div>
                    );
                })}

            </div>
        </main>
    );
}