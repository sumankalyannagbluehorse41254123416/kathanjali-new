"use client";

import { useState } from "react";
import { FaUser } from "react-icons/fa";
import EmailPopup from "./EmailPopup";

export default function MobileProfileWrapper({
  children,
  profileContent,
}: {
  children: React.ReactNode;
  profileContent: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [emailPopupOpen, setEmailPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ When login success
  function handleLogin() {
    setIsLoggedIn(true);
    setEmailPopupOpen(false);
  }

  // ✅ Logout
  function handleLogout() {
    setIsLoggedIn(false);
  }

  return (
    <>
      {/* MOBILE HEADER */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-40">
        <span className="font-bold text-xl text-blue-900">
          KathaAnjali
        </span>

        <div className="flex gap-2">
          {/* LOGIN / LOGOUT */}
          {!isLoggedIn ? (
            <button
              onClick={() => setEmailPopupOpen(true)}
              className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 z-10"
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

          {/* PROFILE BUTTON */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <FaUser />
            Profile
          </button>
        </div>
      </header>

      {/* EMAIL POPUP */}
      <EmailPopup
        open={emailPopupOpen}
        setOpen={setEmailPopupOpen}
        onLoginSuccess={handleLogin}
      />

      <div className="flex h-screen overflow-y-auto">
        {/* MAIN CONTENT */}
        <main className="w-full lg:ml-[179px] lg:mr-[380px] p-4 lg:p-10">
          {children}
        </main>

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block fixed right-0 top-0 h-screen  border-l border-gray-200 bg-white overflow-y-auto p-5 custom-scrollbar overflow-x-hidden">
          {profileContent}
        </aside>

        {/* MOBILE DRAWER */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isDrawerOpen ? "visible" : "invisible"
            }`}
        >
          {/* BACKDROP */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0"
              }`}
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* SIDE PANEL */}
          <div
            className={`absolute right-0 top-0 h-full w-[85%] max-w-[390px] bg-white shadow-2xl transition-transform duration-300 ease-in-out transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white z-10">
              <h2 className="font-bold text-lg">Profile Insights</h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto h-auto p-5 h-screen">
              {profileContent}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}