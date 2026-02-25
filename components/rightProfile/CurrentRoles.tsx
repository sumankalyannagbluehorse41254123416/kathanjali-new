"use client";

export default function CurrentRoles() {
  return (
    <div className="w-90 h-auto border border-gray-300 rounded-lg p-6 shadow-sm mt-8 bg-white">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Current Roles</h2>

      <ul className="space-y-2">

        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 shrink-0"></span>
          <span className="text-gray-700">
            CEO & Co-founder, BlueHorse Software Self-employed
          </span>
        </li>

        <li className="flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-3 shrink-0"></span>
          <span className="text-gray-700">
            PeopleSoft Project Manager of ICICI Prudential
          </span>
        </li>

        <li className="flex items-center">
          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 shrink-0"></span>
          <span className="text-gray-700">
            PeopleSoft Technical Lead of Aditya Birla Group
          </span>
        </li>

        <li className="flex items-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 shrink-0"></span>
          <span className="text-gray-700">
            Sr. Software Developer of CMSS
          </span>
        </li>

      </ul>
    </div>
  );
}
