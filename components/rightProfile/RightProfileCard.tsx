"use client";

import Image from "next/image";

export default function RightProfileCard() {
  return (
    <div className=" rounded-lg w-90 bg-white">

      <div className="w-full h-auto relative">

        {/* IMAGE */}
        <Image
          src="/images/vineet.jpg" // <-- Change path if needed
          alt="Vineet Agarwala"
          width={320}
          height={252}
          className="w-full h-[252px] object-cover rounded-md"
        />

        {/* GREEN ONLINE DOT */}
        <div className="w-4 h-4 bg-green-500 rounded-full absolute bottom-[140px] right-9 border-2 border-white"></div>

        {/* BLUE NAME CARD */}
        <div className="bg-[#1e40af] text-2xl text-white text-center p-6">
          <h3 className="font-semibold">Vineet Agarwala</h3>
          <p className="text-[14px] pt-4">
            Techie. Storyteller. Founder.
          </p>
        </div>

      </div>
      
    </div>
  );
}
