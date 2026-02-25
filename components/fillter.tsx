"use client";

import { useState } from "react";

export default function CategoryPills() {
  const categories = [
    "All",
    "Healthcare Innovation",
    "Leadership",
    "Technology",
    "Entrepreneurship",
  ];

  const [active, setActive] = useState("All");

  return (
    <div className="flex gap-2 mt-6 max-w-2xl flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-3 py-1 rounded-lg font-semibold transition
            ${
              active === cat
                ? "bg-gray-900 text-white"
                : "border border-gray-300"
            }
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
