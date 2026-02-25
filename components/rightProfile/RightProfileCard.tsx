"use client";

import Image from "next/image";

export default function RightProfileCard() {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-sm overflow-hidden">

      {/* IMAGE SECTION */}
      <div className="relative w-full">
        <Image
          src="/images/vineet.jpg"
          alt="Vineet Agarwala"
          width={400}
          height={300}
          className="w-full h-[252px] object-cover"
        />

        {/* GREEN ONLINE DOT (optional) */}
        <div className="w-4 h-4 bg-green-500 rounded-full absolute bottom-4 right-6 border-2 border-white hidden"></div>
      </div>

      {/* BLUE NAME SECTION */}
      <div className="bg-[#1e40af] text-white flex flex-col items-center justify-center text-center px-6 py-6">
        
        <h3 className="text-2xl font-semibold">
          Vineet Agarwala
        </h3>

        <p className="text-[14px] mt-2">
          Techie. Storyteller. Founder.
        </p>

      </div>

    </div>
  );
}