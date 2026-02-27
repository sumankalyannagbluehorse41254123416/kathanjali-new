"use client";

import { useState } from "react";

export default function AchievementsCard() {
  const [open, setOpen] = useState(true);

  return (
    <div className="card md:w-full h-auto bg-white border border-gray-300 rounded-lg  p-4 mt-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <i className="fa-solid fa-award text-yellow-500 text-xl pt-[6px]"></i>
          <h2 className="text-lg font-semibold">Achievements</h2>
        </div>

        
      </div>

      {/* ACHIEVEMENT LIST */}
      {open && (
        <>
          <div className="achievement-item bg-blue-50 rounded-lg shadow-sm mt-4">
            <p className="text-[12px] text-gray-800 px-2 py-2">
              Sun Certified Java Programmer (SCJP) and Oracle Certified Associate
              (OCA).
            </p>
          </div>

          <div className="achievement-item bg-blue-50 rounded-lg shadow-sm mt-4">
            <p className="text-[12px] text-gray-800 px-2 py-2">
              Proud to play a part in helping founders bring their dreams to
              life
            </p>
          </div>

          <div className="achievement-item bg-blue-50 rounded-lg shadow-sm mt-4">
            <p className="text-[12px] text-gray-800 px-2 py-2">
              Received the award for Fastest Growing AI-Enabled Web & Mobile App
              Company for BlueHorse Software at the Indian Business Awards 2025
            </p>
          </div>
        </>
      )}
    </div>
  );
}
