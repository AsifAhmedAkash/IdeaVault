"use client";

import { useEffect, useState } from "react";
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
} from "react-icons/fi";

const colors = {
    bg: "#fafaf3",
    text: "#1a1c18",
    muted: "#45483f",
    border: "#c5c8bc",
    primary: "#18240a",
    accent: "#4c6700",
    light: "#d8e8c0",
};

export default function AddIdeaPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const sections = document.querySelectorAll("section");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = "translateY(0)";
                }
            });
        });

        sections.forEach((s) => {
            s.style.opacity = 0;
            s.style.transform = "translateY(20px)";
            s.style.transition = "all 0.6s ease";
            observer.observe(s);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);

            setTimeout(() => {
                alert("Innovation successfully queued for review.");
                window.location.reload();
            }, 1200);
        }, 2000);
    };

    return (
        <div
            style={{ backgroundColor: colors.bg, color: colors.text }}
            className="min-h-screen px-6 md:px-16 py-20 flex justify-center"
        >
            <div className="w-full max-w-3xl">
                {/* BACK */}
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 mb-10"
                    style={{ color: colors.muted }}
                >
                    <FiArrowLeft />
                    <span className="text-xs uppercase tracking-widest">
                        Return to Hub
                    </span>
                </button>

                {/* HEADER */}
                <header className="mb-14">
                    <p
                        className="text-xs uppercase tracking-widest mb-3"
                        style={{ color: colors.accent }}
                    >
                        Innovation Submission
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Seed Your Next Big Idea.
                    </h1>

                    <p style={{ color: colors.muted }} className="max-w-xl">
                        Provide the fundamental details of your innovation.
                    </p>
                </header>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-14">
                    {/* SECTION 1 */}
                    <section>
                        <h2 className="text-xl font-semibold mb-6">01 Core Identity</h2>

                        <div className="space-y-6">
                            <input
                                placeholder="Idea Title"
                                className="w-full p-4 border outline-none"
                                style={{ borderColor: colors.border }}
                                required
                            />

                            <div className="grid md:grid-cols-2 gap-6">
                                <select
                                    className="p-4 border"
                                    style={{ borderColor: colors.border }}
                                >
                                    <option>Select Category</option>
                                    <option>AI</option>
                                    <option>Health</option>
                                    <option>FinTech</option>
                                </select>

                                <input
                                    placeholder="Tags (optional)"
                                    className="p-4 border"
                                    style={{ borderColor: colors.border }}
                                />
                            </div>

                            <textarea
                                rows={2}
                                placeholder="Elevator Pitch"
                                className="w-full p-4 border"
                                style={{ borderColor: colors.border }}
                            />
                        </div>
                    </section>

                    {/* SECTION 2 */}
                    <section>
                        <h2 className="text-xl font-semibold mb-6">
                            02 Narrative & Context
                        </h2>

                        <div className="space-y-6">
                            <textarea
                                rows={3}
                                placeholder="Problem Statement"
                                className="w-full p-4 border"
                                style={{ borderColor: colors.border }}
                            />

                            <textarea
                                rows={3}
                                placeholder="Proposed Solution"
                                className="w-full p-4 border"
                                style={{ borderColor: colors.border }}
                            />

                            {/* rich editor mock */}
                            <div className="border" style={{ borderColor: colors.border }}>
                                <div className="flex gap-2 p-2 border-b">
                                    <FiBold />
                                    <FiItalic />
                                    <FiList />
                                    <FiLink />
                                </div>
                                <textarea
                                    rows={6}
                                    placeholder="Technical roadmap..."
                                    className="w-full p-4 outline-none"
                                />
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3 */}
                    <section>
                        <h2 className="text-xl font-semibold mb-6">
                            03 Strategic Logistics
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <input
                                placeholder="Target Audience"
                                className="p-4 border"
                                style={{ borderColor: colors.border }}
                            />

                            <input
                                type="number"
                                placeholder="Budget ($)"
                                className="p-4 border"
                                style={{ borderColor: colors.border }}
                            />

                            <div className="md:col-span-2 flex gap-4">
                                <input
                                    placeholder="Image URL"
                                    className="flex-1 p-4 border"
                                    style={{ borderColor: colors.border }}
                                />
                                <div
                                    className="w-14 h-14 flex items-center justify-center border"
                                    style={{ borderColor: colors.border }}
                                >
                                    <FiImage />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SUBMIT */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t">
                        <p style={{ color: colors.muted }} className="text-sm max-w-sm">
                            By submitting, you agree to Altravo innovation standards.
                        </p>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-10 py-4 flex items-center gap-2 font-semibold"
                            style={{
                                backgroundColor: colors.primary,
                                color: "white",
                            }}
                        >
                            {loading ? (
                                <>
                                    <FiLoader className="animate-spin" /> Processing...
                                </>
                            ) : success ? (
                                <>
                                    <FiCheckCircle /> Submitted
                                </>
                            ) : (
                                <>
                                    Submit Idea <FiArrowRight />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}