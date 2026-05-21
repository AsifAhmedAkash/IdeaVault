"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "../lib/auth-client";
import { FiLoader, FiMessageSquare, FiActivity } from "react-icons/fi";
import { Button } from "@heroui/react";

export default function MyInteractionsPage() {
    const router = useRouter();
    const sessionInfo = useSession();
    const user = sessionInfo?.data?.user;

    const [interactions, setInteractions] = useState([]);
    const [stats, setStats] = useState({ comments: 0, ideasBacked: 0, sectors: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchInteractions = async () => {
        if (!user) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch("http://localhost:5000/interactions");
            if (!res.ok) throw new Error("Failed to fetch interactions");
            const data = await res.json();
            
            // Filter user interactions
            const userInteractions = data.filter((item) => item.interactedPersonId === user.id);

            // Group by category/tag
            const groupsMap = {};
            const uniqueIdeaIds = new Set();
            const uniqueSectors = new Set();

            userInteractions.forEach((item) => {
                const category = item.category || "General";
                uniqueIdeaIds.add(item.ideaId);
                uniqueSectors.add(category);

                if (!groupsMap[category]) {
                    groupsMap[category] = {
                        group: category.toUpperCase(),
                        items: []
                    };
                }

                groupsMap[category].items.push({
                    type: "COMMENT",
                    time: new Date(item.time).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                    }),
                    title: item.title || "Untitled Idea",
                    text: item.text,
                    image: item.image,
                    likes: item.likes || 0,
                    replies: item.replies || 0
                });
            });

            setInteractions(Object.values(groupsMap));
            setStats({
                comments: userInteractions.length,
                ideasBacked: uniqueIdeaIds.size,
                sectors: Array.from(uniqueSectors)
            });
        } catch (err) {
            console.error(err);
            setError("Could not load your activity history.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchInteractions();
        }
    }, [user]);

    if (sessionInfo?.isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white">
                <FiLoader className="animate-spin text-4xl text-lime-700" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 py-20 px-6">
                <div className="max-w-md w-full text-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-md">
                    <p className="text-zinc-655 dark:text-zinc-400 mb-6">Please log in to view your activity ledger.</p>
                    <Button onClick={() => router.push("/login")} className="bg-lime-700 hover:bg-lime-650 text-white font-bold">
                        Log In
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <main className="max-w-6xl mx-auto px-6 md:px-12 py-20 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 min-h-screen">
            {/* HEADER */}
            <header className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between md:items-end gap-10 border-b border-zinc-200 dark:border-zinc-800 pb-8">
                <div>
                    <span className="text-xs uppercase tracking-widest font-extrabold text-lime-800 dark:text-lime-400">
                        Activity Journal
                    </span>
                    <h1 className="text-5xl font-black mt-2 tracking-tight">My Interactions</h1>
                    <p className="text-zinc-550 dark:text-zinc-400 mt-4 max-w-xl">
                        A chronological record of your contributions and community engagement.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-sm font-bold uppercase">{user.name}</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                            {user.email}
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {/* SIDEBAR */}
                <aside className="md:col-span-3">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl space-y-8 shadow-sm">
                        <div>
                            <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-4">
                                Engagement Stats
                            </h3>

                            <div className="space-y-5 text-sm">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-500 dark:text-zinc-400">Total Comments</span>
                                        <span className="font-extrabold">{stats.comments}</span>
                                    </div>
                                    <div className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-lime-500 transition-all duration-500" 
                                            style={{ width: `${Math.min(stats.comments * 5, 100)}%` }} 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-500 dark:text-zinc-400">Ideas Discussed</span>
                                        <span className="font-extrabold">{stats.ideasBacked}</span>
                                    </div>
                                    <div className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-lime-500 transition-all duration-500" 
                                            style={{ width: `${Math.min(stats.ideasBacked * 10, 100)}%` }} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {stats.sectors.length > 0 && (
                            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-850">
                                <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-3">
                                    Active Sectors
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {stats.sectors.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[10px] font-extrabold px-2.5 py-1 border border-zinc-200 dark:border-zinc-800 rounded-full bg-zinc-50 dark:bg-zinc-850 text-lime-800 dark:text-lime-400 tracking-wider"
                                        >
                                            {t.toUpperCase()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* MAIN FEED */}
                <section className="md:col-span-9 space-y-14">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <FiLoader className="animate-spin text-4xl text-lime-700" />
                            <p className="text-zinc-500">Loading interactions...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm">
                            <p className="text-red-650 dark:text-red-400 font-medium">{error}</p>
                        </div>
                    ) : interactions.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-12 shadow-sm">
                            <FiMessageSquare className="mx-auto text-4xl text-zinc-400 mb-4 opacity-50" />
                            <h3 className="text-xl font-bold mb-2">No interactions yet</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">
                                You have not posted any comments on any ideas yet. Explore ideas and share your thoughts!
                            </p>
                            <Button onClick={() => router.push("/ideas")} className="bg-lime-700 hover:bg-lime-655 text-white font-bold">
                                Browse Ideas
                            </Button>
                        </div>
                    ) : (
                        interactions.map((group, gi) => (
                            <div key={gi} className="space-y-6">
                                {/* GROUP TITLE */}
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xl font-extrabold text-lime-850 dark:text-lime-400 tracking-tight uppercase whitespace-nowrap">
                                        {group.group}
                                    </h2>
                                    <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800" />
                                </div>

                                {/* CARDS */}
                                <div className="space-y-6">
                                    {group.items.map((item, ii) => (
                                        <div
                                            key={ii}
                                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 rounded-2xl hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                                        >
                                            <div className="flex flex-col md:flex-row gap-6 justify-between">
                                                {/* TEXT */}
                                                <div className="flex-1 space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[10px] font-extrabold px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-zinc-650 dark:text-zinc-350 tracking-wider">
                                                            {item.type}
                                                        </span>
                                                        <span className="text-xs text-zinc-400 dark:text-zinc-500">
                                                            {item.time}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                                                        {item.title}
                                                    </h3>

                                                    <p className="border-l-2 border-lime-500 pl-4 italic text-zinc-600 dark:text-zinc-350 leading-relaxed text-sm">
                                                        "{item.text}"
                                                    </p>
                                                </div>

                                                {/* IMAGE */}
                                                {item.image && (
                                                    <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                                                        <img
                                                            src={item.image}
                                                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                                            alt={item.title}
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            {/* FOOTER */}
                                            <div className="mt-6 flex gap-6 text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-100 dark:border-zinc-850 pt-4">
                                                <span className="flex items-center gap-1.5">
                                                    ❤️ {item.likes} Likes
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    💬 {item.replies} Replies
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </section>
            </div>
        </main>
    );
}