"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "../../lib/auth-client";
import {
    FiArrowLeft,
    FiArrowRight,
    FiBold,
    FiItalic,
    FiList,
    FiLink,
    FiImage,
    FiLoader,
    FiCheckCircle,
    FiTrash2
} from "react-icons/fi";
import { Button, Input, Textarea } from "@heroui/react";

export default function UpdateIdeaPage() {
    const { id } = useParams();
    const router = useRouter();
    const sessionInfo = useSession();
    const user = sessionInfo?.data?.user;

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("AI");
    const [desc, setDesc] = useState("");
    const [problem, setProblem] = useState("");
    const [solution, setSolution] = useState("");
    const [roadmap, setRoadmap] = useState("");
    const [audience, setAudience] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [image, setImage] = useState("");
    const [personId, setPersonId] = useState("");
    const [creationDate, setCreationDate] = useState("");

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchIdea = async () => {
            try {
                const res = await fetch(`http://localhost:5000/ideas/${id}`);
                if (!res.ok) throw new Error("Failed to load idea details");
                const data = await res.json();
                
                setTitle(data.title || "");
                setCategory(data.category || data.tag || "AI");
                setDesc(data.desc || data.description || "");
                setProblem(data.problem || "");
                setSolution(data.solution || "");
                setRoadmap(data.roadmap || "");
                setAudience(data.audience || "");
                setTargetAmount(data.targetAmount || "");
                setImage(data.image || "");
                setPersonId(data.personId || "");
                setCreationDate(data.date || "");
            } catch (err) {
                console.error(err);
                setError("Could not retrieve idea details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchIdea();
        }
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");

        if (!user) {
            setError("You must be logged in to update this idea.");
            return;
        }

        if (user.id !== personId) {
            setError("You do not have permission to update this idea.");
            return;
        }

        setUpdating(true);

        try {
            // MongoDB update uses PATCH /ideas/:id
            const res = await fetch(`http://localhost:5000/ideas/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    tag: category,
                    targetAmount,
                    image,
                    desc,
                    problem,
                    solution,
                    roadmap,
                    audience,
                    category
                })
            });

            if (!res.ok) throw new Error("Failed to update idea on server.");

            setSuccess(true);
            setTimeout(() => {
                router.push("/myideas");
            }, 1200);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to update idea. Please try again.");
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${title}"?`);
        if (!confirmDelete) return;

        setDeleting(true);
        setError("");

        try {
            const res = await fetch(`http://localhost:5000/ideas/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error("Failed to delete idea from server.");

            alert("Idea successfully deleted.");
            router.push("/myideas");
        } catch (err) {
            console.error(err);
            setError("Failed to delete idea. Please try again.");
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white">
                <div className="flex flex-col items-center space-y-4">
                    <FiLoader className="animate-spin text-4xl text-lime-700" />
                    <p className="text-zinc-550">Loading details...</p>
                </div>
            </div>
        );
    }

    if (error && !title) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white py-12 px-6">
                <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center shadow-md">
                    <p className="text-red-650 dark:text-red-405 font-medium mb-4">{error}</p>
                    <Button onClick={() => router.push("/myideas")} className="bg-lime-700 hover:bg-lime-650 text-white font-bold">
                        Back to My Ideas
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-6 md:px-16 py-20 flex justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
            <div className="w-full max-w-3xl">
                {/* BACK */}
                <button
                    onClick={() => router.push("/myideas")}
                    className="flex items-center gap-2 mb-10 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition cursor-pointer"
                >
                    <FiArrowLeft />
                    <span className="text-xs uppercase tracking-widest font-semibold">
                        Return to Ledger
                    </span>
                </button>

                {/* HEADER */}
                <header className="mb-14 flex flex-col sm:flex-row justify-between sm:items-start gap-6">
                    <div>
                        <p className="text-xs uppercase tracking-widest mb-3 font-bold text-lime-800 dark:text-lime-400">
                            Innovation Revision
                        </p>

                        <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
                            Refine Your Idea.
                        </h1>

                        <p className="text-zinc-500 dark:text-zinc-400">
                            Modify or delete your submission fields.
                        </p>
                    </div>

                    <Button 
                        disabled={deleting}
                        onClick={handleDelete}
                        className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-650 dark:text-red-400 font-bold flex items-center gap-2"
                    >
                        {deleting ? <FiLoader className="animate-spin" /> : <FiTrash2 />} Delete Idea
                    </Button>
                </header>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-950/30 text-red-750 dark:text-red-400 border border-red-200 dark:border-red-900 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                {/* FORM */}
                <form onSubmit={handleUpdate} className="space-y-14">
                    {/* SECTION 1 */}
                    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold mb-6 border-b border-zinc-100 dark:border-zinc-850 pb-3">01 Core Identity</h2>

                        <div className="space-y-6">
                            <Input
                                placeholder="Idea Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full"
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="p-3 border border-zinc-250 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-150 focus:outline-none"
                                >
                                    <option value="AI">AI</option>
                                    <option value="Health">Health</option>
                                    <option value="FinTech">FinTech</option>
                                    <option value="Sustainability">Sustainability</option>
                                </select>
                            </div>

                            <Textarea
                                rows={2}
                                placeholder="Elevator Pitch (Short Description)"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                required
                                className="w-full"
                            />
                        </div>
                    </section>

                    {/* SECTION 2 */}
                    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold mb-6 border-b border-zinc-100 dark:border-zinc-850 pb-3">
                            02 Narrative & Context
                        </h2>

                        <div className="space-y-6">
                            <Textarea
                                rows={3}
                                placeholder="Problem Statement"
                                value={problem}
                                onChange={(e) => setProblem(e.target.value)}
                                required
                                className="w-full"
                            />

                            <Textarea
                                rows={3}
                                placeholder="Proposed Solution"
                                value={solution}
                                onChange={(e) => setSolution(e.target.value)}
                                required
                                className="w-full"
                            />

                            {/* rich editor mock */}
                            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                                <div className="flex gap-4 p-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850 text-zinc-500">
                                    <FiBold className="cursor-pointer" />
                                    <FiItalic className="cursor-pointer" />
                                    <FiList className="cursor-pointer" />
                                    <FiLink className="cursor-pointer" />
                                </div>
                                <textarea
                                    rows={6}
                                    placeholder="Technical roadmap..."
                                    value={roadmap}
                                    onChange={(e) => setRoadmap(e.target.value)}
                                    required
                                    className="w-full p-4 outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3 */}
                    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold mb-6 border-b border-zinc-100 dark:border-zinc-850 pb-3">
                            03 Strategic Logistics
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Input
                                placeholder="Target Audience"
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                                required
                                className="w-full"
                            />

                            <Input
                                type="number"
                                placeholder="Budget / Funding Target ($)"
                                value={targetAmount}
                                onChange={(e) => setTargetAmount(e.target.value)}
                                required
                                className="w-full"
                            />

                            <div className="md:col-span-2 flex gap-4 items-center">
                                <Input
                                    placeholder="Image URL"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="flex-1"
                                />
                                <div className="w-14 h-14 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-400">
                                    <FiImage size={20} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SUBMIT */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-zinc-250 dark:border-zinc-800">
                        <p className="text-sm max-w-sm text-zinc-500 dark:text-zinc-400">
                            Updates are applied immediately across the IdeaVault gallery.
                        </p>

                        <button
                            type="submit"
                            disabled={updating}
                            className="px-10 py-4 flex items-center gap-2 font-bold rounded-xl text-white bg-lime-700 hover:bg-lime-600 transition cursor-pointer"
                        >
                            {updating ? (
                                <>
                                    <FiLoader className="animate-spin" /> Updating...
                                </>
                            ) : success ? (
                                <>
                                    <FiCheckCircle /> Updated
                                </>
                            ) : (
                                <>
                                    Save Changes <FiArrowRight />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
