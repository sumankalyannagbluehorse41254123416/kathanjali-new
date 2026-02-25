"use client";

export default function Categories() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-sm mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium hover:text-blue-600">
            Healthcare Innovation
          </span>
          <span className="text-blue-800 text-sm font-bold w-8 h-8 border rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white">
            24
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium hover:text-blue-600">
            Entrepreneurship
          </span>
          <span className="text-blue-800 text-sm font-bold w-8 h-8 border rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white">
            18
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium hover:text-blue-600">
            Leadership
          </span>
          <span className="text-blue-800 text-sm font-bold w-8 h-8 border rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white">
            15
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium hover:text-blue-600">
            Technology
          </span>
          <span className="text-blue-800 text-sm font-bold w-8 h-8 border rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white">
            12
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium hover:text-blue-600">
            Venture Capital
          </span>
          <span className="text-blue-800 text-sm font-bold w-8 h-8 border rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white">
            8
          </span>
        </div>
      </div>
    </div>
  );
}
