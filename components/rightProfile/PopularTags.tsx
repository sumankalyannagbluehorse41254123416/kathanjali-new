"use client";

export default function PopularTags() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-md mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3">
        <i className="fa-solid fa-tag text-slate-500"></i>
        Popular Tags
      </h3>

      <div className="flex flex-wrap gap-4">
        <span className="border hover:bg-blue-600 hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full">
          Digital Health
        </span>
        <span className="border hover:bg-blue-600 hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full">
          AI in Medicine
        </span>
        <span className="border hover:bg-blue-600 hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full">
          Startup Strategy
        </span>
        <span className="border hover:bg-blue-600 hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full">
          Leadership
        </span>
        <span className="border hover:bg-blue-600 hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full">
          Innovation
        </span>
        <span className="border hover:bg-blue-600 hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full">
          Healthcare Policy
        </span>
        <span className="border hover:bg-blue-600 hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full">
          Medical Technology
        </span>
        <span className="border hover:bg-blue-600 hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full">
          Venture Capital
        </span>
        <span className="border hover:bg-blue-600 hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full">
          Biotech
        </span>
        <span className="border hover:bg-blue-600 hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full">
          Telemedicine
        </span>
        <span className="border hover:bg-blue-600 hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full">
          Health Tech
        </span>
        <span className="border hover:bg-blue-600 hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full">
          Medical AI
        </span>
      </div>
    </div>
  );
}
