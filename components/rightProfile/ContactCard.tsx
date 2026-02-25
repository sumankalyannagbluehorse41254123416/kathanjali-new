"use client";

export default function ContactCard() {
  const email = "vineet.agarwala@bluehorse.in";
  const address = encodeURIComponent(
    "2nd floor (Zest Express), B8 72101 Aurabinda Nagar, Midnapore - 721101"
  );
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;

  return (
    <div className="w-90 h-auto mt-8">
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact</h2>

        {/* Email */}
        <div className="flex items-center mb-3">
          <i className="fa-regular fa-envelope h-4 w-4"></i>
          <a
            href={`mailto:${email}`}
            className="text-gray-700 ml-2 hover:underline"
          >
            {email}
          </a>
        </div>

        {/* Address */}
        <div className="flex items-start mb-6">
          <svg
            className="w-5 h-5 text-gray-800 mr-3 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:underline"
          >
            2nd floor (Zest Express), B8 72101 Aurabinda Nagar, Midnapore - 721101
          </a>
        </div>
      </div>
    </div>
  );
}
