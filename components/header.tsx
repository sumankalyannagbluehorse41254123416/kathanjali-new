// "use client";

// import { useState } from "react";
// import { FaUser, FaEnvelope } from "react-icons/fa";
// import EmailPopup from "./EmailPopup";

// export default function LoginHeader() {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [emailPopupOpen, setEmailPopupOpen] = useState(false);

//   const [isLoggedIn, setIsLoggedIn] = useState(false); // ✔ login state

//   // When email login is successful → call this from EmailPopup
//   function handleLogin() {
//     setIsLoggedIn(true);
//     setEmailPopupOpen(false);
//   }

//   // Logout
//   function handleLogout() {
//     setIsLoggedIn(false);
//   }

//   return (
//     <div className="flex items-start justify-between max-w-2xl md:pt-15">

//       {/* LEFT TITLE */}
//       <div>
//         <h1 className="text-[24px] lg:text-4xl font-bold text-gray-900">
//           KathaAnjali
//         </h1>

//         <p className="text-gray-600 mt-1 text-sm lg:text-base">
//           Expert perspectives on healthcare innovation and leadership
//         </p>
//       </div>

//       {/* LOGIN / LOGOUT BUTTON */}
//       {!isLoggedIn ? (
//         <button
//           onClick={() => setIsPopupOpen(true)}
//           className="mt-1 hidden lg:flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 z-10 transition-all duration-200 ease-in-out"
//         >
//           <FaUser />
//           Login
//         </button>
//       ) : (
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 border border-red-500 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 z-10"
//         >
//           <FaUser />
//           Logout
//         </button>
//       )}

//       {/* FIRST POPUP */}
//       {!isLoggedIn && isPopupOpen && (
//         <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/40 animate-[fadeIn_0.3s_ease-out]">
//           <div className="bg-white w-96 rounded-lg shadow-lg p-5 relative animate-[popup_0.3s_ease-out]">
//             <h2 className="text-lg font-semibold text-center mb-4">
//               Sign in to continue
//             </h2>

//             <p className="text-sm text-gray-600 text-center mb-5">
//               Like, comment, and bookmark posts
//             </p>

//             {/* OPEN EMAIL POPUP */}
//             <button
//               onClick={() => {
//                 setIsPopupOpen(false);
//                 setEmailPopupOpen(true);
//               }}
//               className="w-full flex items-center gap-3 bg-[#1e40af]  text-white py-2 rounded-lg justify-center hover:bg-blue-700 transition-all duration-200 ease-in-out"
//             >
//               <FaEnvelope />
//               Continue with Email
//             </button>

//             <p className="text-center text-sm text-blue-600 mt-4 cursor-pointer hover:underline">
//               Other sign-in options
//             </p>

//             <button
//               onClick={() => setIsPopupOpen(false)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
//             >
//               ×
//             </button>
//           </div>
//         </div>
//       )}

//       {/* EMAIL POPUP (Pass login function) */}
//       <EmailPopup
//         open={emailPopupOpen}
//         setOpen={setEmailPopupOpen}
//         onLoginSuccess={handleLogin}
//       />
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import EmailPopup from "./EmailPopup";

export default function LoginHeader() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [emailPopupOpen, setEmailPopupOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // OPEN POPUP
  useEffect(() => {
    if (isPopupOpen) {
      setShowPopup(true);
    }
  }, [isPopupOpen]);

  // CLOSE WITH ANIMATION
  function closePopup() {
    setShowPopup(false);

    setTimeout(() => {
      setIsPopupOpen(false);
    }, 300);
  }

  function handleLogin() {
    setIsLoggedIn(true);
    setEmailPopupOpen(false);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <div className="flex items-start justify-between max-w-2xl md:pt-15">

      <div>
        <h1 className="text-[24px] lg:text-4xl font-bold text-gray-900">
          KathaAnjali
        </h1>

        <p className="text-gray-600 mt-1 text-sm lg:text-base">
          Expert perspectives on healthcare innovation and leadership
        </p>
      </div>

      {!isLoggedIn ? (
        <button
          onClick={() => setIsPopupOpen(true)}
          className="mt-1 hidden lg:flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 z-10 transition-all duration-200 ease-in-out"
        >
          <FaUser />
          Login
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 border border-red-500 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 z-10"
        >
          <FaUser />
          Logout
        </button>
      )}

      {/* POPUP */}
      {isPopupOpen && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 bg-black/40 transition-opacity duration-300 ${
            showPopup ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`bg-white w-96 rounded-lg shadow-lg p-5 relative transition-all duration-300 ease-out ${
              showPopup
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }`}
          >
            <h2 className="text-lg font-semibold text-center mb-4">
              Sign in to continue
            </h2>

            <p className="text-sm text-gray-600 text-center mb-5">
              Like, comment, and bookmark posts
            </p>

            <button
              onClick={() => {
                closePopup();
                setTimeout(() => {
                  setEmailPopupOpen(true);
                }, 300);
              }}
              className="w-full flex items-center gap-3 bg-[#1e40af] text-white py-2 rounded-lg justify-center hover:bg-blue-700 transition-all duration-200 ease-in-out"
            >
              <FaEnvelope />
              Continue with Email
            </button>

            <p className="text-center text-sm text-blue-600 mt-4 cursor-pointer hover:underline">
              Other sign-in options
            </p>

            <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <EmailPopup
        open={emailPopupOpen}
        setOpen={setEmailPopupOpen}
        onLoginSuccess={handleLogin}
      />
    </div>
  );
}