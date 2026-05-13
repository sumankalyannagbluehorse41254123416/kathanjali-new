"use client";

export default function PopularTags() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 md:w-full mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3">
        <i className="fa-solid fa-tag text-slate-500"></i>
        Popular Tags
      </h3>

      <div className="flex flex-wrap gap-3">
        <span className="border border-gray-400 hover:bg-blue-600  hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full transition-all duration-200 ease-in-out">
          Digital Health
        </span>
        <span className="border border-gray-400 hover:bg-blue-600  hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full transition-all duration-200 ease-in-out">
          AI in Medicine
        </span>
        <span className="border border-gray-400 hover:bg-blue-600  hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full transition-all duration-200 ease-in-out">
          Startup Strategy
        </span>
        <span className="border border-gray-400 hover:bg-blue-600  hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full transition-all duration-200 ease-in-out">
          Leadership
        </span>
        <span className="border border-gray-400 hover:bg-blue-600  hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full transition-all duration-200 ease-in-out">
          Innovation
        </span>
        <span className="border border-gray-400 hover:bg-blue-600  hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full transition-all duration-200 ease-in-out">
          Healthcare Policy
        </span>
        <span className="border border-gray-400 hover:bg-blue-600  hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full transition-all duration-200 ease-in-out">
          Medical Technology
        </span>
        <span className="border border-gray-400 hover:bg-blue-600  hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full transition-all duration-200 ease-in-out">
          Venture Capital
        </span>
        <span className="border border-gray-400 hover:bg-blue-600  hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full transition-all duration-200 ease-in-out">
          Biotech
        </span>
        <span className="border border-gray-400 hover:bg-blue-600  hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full transition-all duration-200 ease-in-out">
          Telemedicine
        </span>
        <span className="border border-gray-400 hover:bg-blue-600  hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full transition-all duration-200 ease-in-out">
          Health Tech
        </span>
        <span className="border border-gray-400 hover:bg-blue-600  hover:text-white text-black-500 text-sm font-medium px-3 py-1 rounded-full transition-all duration-200 ease-in-out">
          Medical AI
        </span>
      </div>
    </div>
  );
}
