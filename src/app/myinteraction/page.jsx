import React from "react";

const interactions = [
    {
        group: "Today",
        items: [
            {
                type: "NEW COMMENT",
                time: "10:42 AM",
                title: "Vertical Mycelium Architecture: Scalable Solutions",
                text: `"The structural integrity of mycelium composites for load-bearing walls is fascinating. Have you considered humidity regulation in tropical climates?"`,
                image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAeXzYFQkpglr_g5mTCDvZytbJZDn2m6HXllNIhb03oW5F5_EVu8mnMN1kVGlnpyHmMU5vvEmcnIUbvFq-v4yYff02ia0jhY-nTSs74SrwCfYMH8w2HRNB1w63fa6aUT0-UvuACTuN3wnGVp8JBqYPePt0DnSUStx8NJgD4OBPDr7k_DqK1RNQC9AH9N45RrOw_sy8ty2BGpjcKY0b4ZXKakuDeZKbY4NwFqRYtppPYTw8vAiZzQGvu3OCgvn2YgDyNGBt2r2n1uS4",
                likes: "12 Likes",
                replies: "3 Replies",
                icon: "thumb_up",
            },
        ],
    },
    {
        group: "Yesterday",
        items: [
            {
                type: "SHARED THOUGHT",
                time: "04:15 PM",
                title: "Decentralized Power Grids for Semi-Arid Regions",
                text: `"The integration of localized storage is key. Without battery alternatives, costs may rise after year three."`,
                image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuCvbey_X-DFtYUijBSd9pK9OMbTHeAV1MELjTt5TV2baPOrHsKICk3IF692PtH-CBGd-6XCrIVLk-BsrFzhANFAt3d8-v0HW2z2yZxY28B2u8BB8gL6kX1DHZe9GRw-Cq-jWA261MOTG3bfm5TxAFZt8fEfnbdadhkx4zXPV4q3smwI3-DPpnGqzyP81KpE5GWOt9AGBxGnLZ2-K_T7bGpo6-JaPEIPross7mA_ZO-eQOr0TSz6f8gEcIu3dx_OT5Kyw13kA9U2sX4",
                likes: "8 Likes",
                replies: "1 Reply",
                icon: "reply",
            },
            {
                type: "QUESTION POSED",
                time: "09:30 AM",
                title: "Regenerative Ocean Farming: Kelp & Carbon",
                text: `"How are you measuring carbon sequestration compared to natural kelp forests?"`,
                image:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAWMCGhBVCXwtpst1I507o8oSqSn-q_ZENN1RGpie60CyykWQNeA5JhZ5JjBJqJSUuTi7FXX-TQDCG7litfCnSgM0SPaQiGHqcKcxpq_VSbeCJ5DVNtvuZMng5Z0rMHyyp1Qg3PsVIKstyEnYmVpnyWTnVAJk1mvsXbfguDB7ibFmbjhb4UnOdhk5o7NJpzaKrFc4K6o-Cl6uyenX5SAwlHLigyADEnO5dMzP0Fts5Q_n7jMqyYPbWhkNb3FniL6lVx7FlN_dQgs9k",
                likes: "Featured Insight",
                replies: "",
                icon: "favorite",
                featured: true,
            },
        ],
    },
];

export default function MyInteractionsPage() {
    return (
        <main className="max-w-6xl mx-auto px-6 md:px-12 py-20 bg-[#fafaf3] text-[#1a1c18]">

            {/* HEADER */}
            <header className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between gap-10">
                <div>
                    <span className="text-xs uppercase tracking-widest text-[#4c6700]">
                        Activity Journal
                    </span>
                    <h1 className="text-5xl font-bold mt-2">My Interactions</h1>
                    <p className="text-[#45483f] mt-4 max-w-xl">
                        A chronological record of your contributions and engagement.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-sm font-semibold">ELARA VANCE</div>
                        <div className="text-xs text-[#45483f]">
                            Contributor Level 4
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

                {/* SIDEBAR */}
                <aside className="md:col-span-3">
                    <div className="bg-white border border-[#e3e3dc] p-6 rounded-lg space-y-8">

                        <div>
                            <h3 className="text-xs uppercase tracking-widest text-[#75786e] mb-4">
                                Engagement Stats
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Comments</span>
                                    <span className="font-bold">128</span>
                                </div>
                                <div className="h-1 bg-[#e3e3dc]">
                                    <div className="h-full w-[70%] bg-[#4c6700]" />
                                </div>

                                <div className="flex justify-between">
                                    <span>Ideas Backed</span>
                                    <span className="font-bold">14</span>
                                </div>
                                <div className="h-1 bg-[#e3e3dc]">
                                    <div className="h-full w-[35%] bg-[#4c6700]" />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-[#e3e3dc]">
                            <h3 className="text-xs uppercase tracking-widest text-[#75786e] mb-3">
                                Active Sectors
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {["Agritech", "Fintech", "Sustainability"].map((t) => (
                                    <span
                                        key={t}
                                        className="text-xs px-3 py-1 border border-[#c5c8bc] rounded-full bg-[#f4f4ed] text-[#4c6700]"
                                    >
                                        {t.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* MAIN FEED */}
                <section className="md:col-span-9 space-y-14">

                    {interactions.map((group, gi) => (
                        <div key={gi} className="space-y-6">

                            {/* GROUP TITLE */}
                            <div className="flex items-center gap-4">
                                <h2 className="text-2xl font-semibold text-[#18240a] whitespace-nowrap">
                                    {group.group}
                                </h2>
                                <div className="h-px w-full bg-[#e3e3dc]" />
                            </div>

                            {/* CARDS */}
                            {group.items.map((item, ii) => (
                                <div
                                    key={ii}
                                    className="bg-white border border-[#e3e3dc] p-8 rounded-lg hover:-translate-y-1 transition-all hover:shadow-lg cursor-pointer"
                                >

                                    <div className="flex flex-col md:flex-row gap-6 justify-between">

                                        {/* TEXT */}
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs px-2 py-0.5 bg-[#e3e3dc] rounded uppercase">
                                                    {item.type}
                                                </span>
                                                <span className="text-xs text-[#75786e]">
                                                    {item.time}
                                                </span>
                                            </div>

                                            <h3 className="text-xl font-semibold text-[#18240a]">
                                                {item.title}
                                            </h3>

                                            <p className="border-l-2 border-[#c5c8bc] pl-4 italic text-[#45483f]">
                                                {item.text}
                                            </p>
                                        </div>

                                        {/* IMAGE */}
                                        {item.image && (
                                            <div className="w-28 h-28 flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    className="w-full h-full object-cover rounded grayscale hover:grayscale-0 transition-all"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* FOOTER */}
                                    <div className="mt-6 flex gap-6 text-sm text-[#45483f]">
                                        {item.likes && (
                                            <span className="flex items-center gap-2">
                                                ❤️ {item.likes}
                                            </span>
                                        )}
                                        {item.replies && (
                                            <span className="flex items-center gap-2">
                                                💬 {item.replies}
                                            </span>
                                        )}
                                    </div>

                                </div>
                            ))}

                        </div>
                    ))}

                </section>
            </div>
        </main>
    );
}