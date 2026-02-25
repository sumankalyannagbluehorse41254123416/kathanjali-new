"use client";
import Link from "next/link";

export default function SocialMediaCard() {
  return (
    <div className="bg-white rounded-lg p-6 w-90 border border-gray-200 mt-8">
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-gray-800">Connect</h2>
      </div>

      {/* Buttons Grid */}

<div className="grid grid-cols-2 gap-4">

  <Link
    href="https://www.linkedin.com/in/vineetagarwala"
    target="_blank"
    className="flex items-center rounded-lg border border-gray-300 hover:bg-blue-100 transition-colors px-4 py-2 gap-2"
  >
    <div className="text-blue-600">
      <i className="fa-brands fa-linkedin-in"></i>
    </div>
    <span className="text-sm font-medium text-gray-700">LinkedIn</span>
  </Link>

  <Link
    href="https://x.com/vineetagarwala"
    target="_blank"
    className="flex items-center rounded-lg border border-gray-300 hover:bg-blue-100 transition-colors px-4 py-2 gap-2"
  >
    <div className="text-blue-600">
      <i className="fa-brands fa-twitter"></i>
    </div>
    <span className="text-sm font-medium text-gray-700">Twitter</span>
  </Link>

  <Link
    href="https://instagram.com"
    target="_blank"
    className="flex items-center rounded-lg border border-gray-300 hover:bg-blue-100 transition-colors px-4 py-2 gap-2"
  >
    <div>
      <i className="fa-brands fa-instagram text-pink-500"></i>
    </div>
    <span className="text-sm font-medium text-gray-700">Instagram</span>
  </Link>

  <Link
    href="https://youtube.com"
    target="_blank"
    className="flex items-center rounded-lg border border-gray-300 hover:bg-blue-100 transition-colors px-4 py-2 gap-2"
  >
    <div>
      <i className="fa-brands fa-youtube text-red-700"></i>
    </div>
    <span className="text-sm font-medium text-gray-700">YouTube</span>
  </Link>

</div>
    </div>
  );
}
