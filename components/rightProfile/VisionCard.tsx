"use client";

export default function VisionCard() {
  return (
    <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mt-8 md:w-full">
      <div className="flex gap-2">
        <i className="fa-solid fa-bullseye text-blue-600 text-lg pt-[7px]"></i>

        <div>
          <span className="text-[18px] font-medium text-gray-700">Vision</span>

          <p className="text-gray-700 text-sm leading-relaxed">
            "My vision is to add value to internet<br />
            ventures and transform them using<br />
            technology. Quality, Consistency, and<br />
            Innovation are the 3 pillars<br />
            of my work ethic."
          </p>
        </div>
      </div>
    </div>
  );
}
