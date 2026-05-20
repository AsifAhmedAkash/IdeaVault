import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#fafaf3] text-[#1a1c18] relative overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 opacity-10 grayscale">
                <img
                    src="your-image-url.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#fafaf3] via-transparent to-[#fafaf3]" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-3xl">

                <p className="uppercase tracking-widest text-xs opacity-60 mb-8">
                    Altravo Platform
                </p>

                <h1 className="text-[120px] md:text-[200px] font-bold opacity-10 leading-none">
                    404
                </h1>

                <h2 className="text-2xl md:text-4xl font-semibold mt-6">
                    This path has not been pioneered yet.
                </h2>

                <p className="text-gray-600 mt-4 max-w-xl mx-auto">
                    The page you’re looking for doesn’t exist or has been moved.
                </p>

                {/* Actions */}
                <div className="flex gap-4 justify-center mt-10">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-black text-white rounded-lg"
                    >
                        Return Home
                    </Link>

                </div>

            </div>

            {/* Footer (clean) */}
            <div className="absolute bottom-6 text-xs opacity-50">
                © 2025 ALTRAVO
            </div>
        </main>
    );
}