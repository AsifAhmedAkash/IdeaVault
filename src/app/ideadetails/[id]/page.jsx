"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "../../lib/auth-client";
import {
    FiArrowLeft,
    FiSend,
    FiLoader,
    FiMessageSquare
} from "react-icons/fi";
import { Button, Textarea } from "@heroui/react";

export default function IdeaDetailsPage() {
    const { id } = useParams();
    const sessionInfo = useSession();
    const user = sessionInfo?.data?.user;

    const [idea, setIdea] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [commentText, setCommentText] = useState("");
    const [posting, setPosting] = useState(false);

    const fetchIdeaDetails = async () => {
        setLoading(true);
        setError("");
        try {
            // Fetch idea details
            const ideaRes = await fetch(`http://localhost:5000/ideas/${id}`);
            if (!ideaRes.ok) throw new Error("Idea not found");
            const ideaData = await ideaRes.json();
            setIdea(ideaData);

            // Fetch comments
            const commentsRes = await fetch("http://localhost:5000/interactions");
            if (commentsRes.ok) {
                const commentsData = await commentsRes.json();
                const filtered = commentsData.filter(c => c.ideaId === id);
                setComments(filtered);
            }
        } catch (err) {
            console.error(err);
            setError("Could not load idea details. Ensure the server is running on port 5000.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchIdeaDetails();
        }
    }, [id]);

    const handlePostComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim() || !user) return;

        setPosting(true);
        try {
            const res = await fetch("http://localhost:5000/interactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ideaId: id,
                    interactedPersonId: user.id,
                    interactedPersonName: user.name,
                    interactedPersonImage: user.image,
                    text: commentText,
                    time: new Date().toISOString(),
                    title: idea.title,
                    image: idea.image,
                    category: idea.category || idea.tag || "General",
                    likes: 0,
                    replies: 0
                })
            });

            if (!res.ok) throw new Error("Failed to post comment");
            
            setCommentText("");
            // Refetch details & comments
            await fetchIdeaDetails();
        } catch (err) {
            console.error(err);
            alert("Error posting comment. Please try again.");
        } finally {
            setPosting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white">
                <div className="flex flex-col items-center space-y-4">
                    <FiLoader className="animate-spin text-4xl text-lime-700" />
                    <p className="text-zinc-500">Loading details...</p>
                </div>
            </div>
        );
    }

    if (error || !idea) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white py-12 px-6">
                <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center shadow-md">
                    <p className="text-red-600 dark:text-red-400 font-medium mb-4">{error || "Idea not found"}</p>
                    <Link href="/ideas" className="inline-block px-6 py-2 bg-lime-700 hover:bg-lime-600 text-white rounded-full font-semibold transition">
                        Back to Ideas
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300 min-h-screen">
            {/* BACK BUTTON */}
            <div className="max-w-6xl mx-auto px-6 md:px-16 pt-8 mb-4">
                <Link href="/ideas" className="flex items-center gap-2 text-sm font-semibold text-lime-800 dark:text-lime-400 hover:underline">
                    <FiArrowLeft /> Back to Ideas
                </Link>
            </div>

            {/* MAIN */}
            <main className="max-w-6xl mx-auto px-6 md:px-16 pb-32">
                {/* HERO */}
                <header className="relative h-[55vh] md:h-[65vh] rounded-2xl overflow-hidden mb-12 shadow-lg">
                    <img
                        src={idea.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"}
                        className="w-full h-full object-cover grayscale brightness-90 dark:brightness-75 hover:grayscale-0 transition duration-700"
                        alt={idea.title}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 p-8 md:p-12">
                        <span className="px-3 py-1 text-xs font-extrabold rounded-full bg-lime-400 text-zinc-950 uppercase tracking-wider">
                            {idea.category || idea.tag || "General"}
                        </span>

                        <h1 className="text-4xl md:text-6xl font-black text-white mt-4 tracking-tight leading-none">
                            {idea.title}
                        </h1>

                        <p className="text-white/90 max-w-3xl mt-4 text-base md:text-lg leading-relaxed font-medium">
                            {idea.desc || idea.description}
                        </p>
                    </div>
                </header>

                {/* GRID */}
                <div className="grid lg:grid-cols-12 gap-10">
                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* PROBLEM + SOLUTION */}
                        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
                            <h2 className="text-xs uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-500 mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                                Narrative & Context
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Problem Statement</h3>
                                    <p className="text-zinc-600 dark:text-zinc-350 leading-relaxed">
                                        {idea.problem || "No problem statement defined."}
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Proposed Solution</h3>
                                    <p className="text-zinc-600 dark:text-zinc-350 leading-relaxed">
                                        {idea.solution || "No solution details defined."}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* ROADMAP + TARGET AUDIENCE */}
                        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
                            <h2 className="text-xs uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-500 mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                                Execution & Market
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Technical Roadmap</h3>
                                    <p className="text-zinc-600 dark:text-zinc-350 leading-relaxed whitespace-pre-line">
                                        {idea.roadmap || "No roadmap defined."}
                                    </p>
                                </div>

                                <div className="pt-4">
                                    <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Target Audience</h3>
                                    <p className="text-zinc-600 dark:text-zinc-350 leading-relaxed">
                                        {idea.audience || "No target audience defined."}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* COMMUNITY DISCUSSION */}
                        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm space-y-8">
                            <h2 className="text-xs uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                                Community Dialogue ({comments.length})
                            </h2>

                            {/* COMMENT FORM */}
                            {user ? (
                                <form onSubmit={handlePostComment} className="space-y-3">
                                    <Textarea
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="Add to the discussion or ask a question..."
                                        rows={3}
                                        required
                                        className="w-full"
                                    />
                                    <Button
                                        type="submit"
                                        disabled={posting || !commentText.trim()}
                                        className="bg-lime-700 hover:bg-lime-600 text-white font-semibold flex items-center gap-2"
                                    >
                                        <FiSend /> {posting ? "Posting..." : "Post Comment"}
                                    </Button>
                                </form>
                            ) : (
                                <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center">
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                        Please <Link href="/login" className="text-lime-700 dark:text-lime-400 font-bold hover:underline">login</Link> to join the community dialogue.
                                    </p>
                                </div>
                            )}

                            {/* COMMENTS LIST */}
                            <div className="space-y-6 pt-4">
                                {comments.length === 0 ? (
                                    <div className="text-center py-8 text-zinc-400 dark:text-zinc-500">
                                        <FiMessageSquare className="mx-auto text-3xl mb-2 opacity-55" />
                                        <p className="text-sm">No comments yet. Start the conversation!</p>
                                    </div>
                                ) : (
                                    comments.map((comment) => (
                                        <div key={comment._id} className="flex gap-4 border-b border-zinc-100 dark:border-zinc-800/50 pb-6 last:border-0 last:pb-0">
                                            <div className="w-10 h-10 rounded-full bg-lime-700 text-white flex items-center justify-center font-bold text-sm overflow-hidden flex-shrink-0">
                                                {comment.interactedPersonImage ? (
                                                    <img src={comment.interactedPersonImage} alt={comment.interactedPersonName} className="w-full h-full object-cover" />
                                                ) : (
                                                    comment.interactedPersonName?.slice(0, 2).toUpperCase() || "US"
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex justify-between items-baseline">
                                                    <strong className="text-zinc-950 dark:text-white font-semibold text-sm">
                                                        {comment.interactedPersonName || "Anonymous Contributor"}
                                                    </strong>
                                                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                                                        {new Date(comment.time).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric"
                                                        })}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-zinc-600 dark:text-zinc-350 mt-2 leading-relaxed whitespace-pre-wrap">
                                                    {comment.text}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <aside className="lg:col-span-4 space-y-6">
                        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
                            <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-500 mb-6">
                                Strategic Info
                            </h3>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800/50">
                                    <span className="text-zinc-500 dark:text-zinc-400">Funding Target</span>
                                    <strong className="text-zinc-900 dark:text-white text-base">
                                        {idea.targetAmount ? `$${Number(idea.targetAmount).toLocaleString()}` : "Open"}
                                    </strong>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800/50">
                                    <span className="text-zinc-500 dark:text-zinc-400">Creation Date</span>
                                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                                        {idea.date || "Unknown"}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-zinc-500 dark:text-zinc-400">Category</span>
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-lime-100 dark:bg-lime-900/30 text-lime-900 dark:text-lime-400">
                                        {(idea.category || idea.tag || "General").toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => alert("Funding integration is not implemented in this demo.")}
                                className="w-full py-3 bg-lime-700 hover:bg-lime-600 text-white font-bold rounded-xl shadow transition duration-300 cursor-pointer"
                            >
                                Back Proposal
                            </button>

                            <button 
                                onClick={() => alert("Messaging setup is not implemented in this demo.")}
                                className="w-full py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-bold rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition duration-300 cursor-pointer"
                            >
                                Contact Strategist
                            </button>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}