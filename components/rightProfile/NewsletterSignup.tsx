"use client";

export default function NewsletterSignup() {
    return (
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg mt-8">
            <div className="text-center space-y-3">

                <div className="flex items-center justify-center space-x-2">
                    <svg
                        className="h-4 w-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>

                    <h3 className="font-semibold text-slate-800">Stay Updated</h3>
                </div>

                <p className="text-sm text-slate-600">
                    Get the latest insights on healthcare innovation and leadership.
                </p>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                    Subscribe to Newsletter
                </button>
            </div>
        </div>
    );
}
