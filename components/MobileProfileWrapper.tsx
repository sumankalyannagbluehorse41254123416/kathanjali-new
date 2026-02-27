"use client";

import { useState } from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import EmailPopup from "./EmailPopup";

export default function MobileProfileWrapper({
  children,
  profileContent,
}: {
  children: React.ReactNode;
  profileContent: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [emailPopupOpen, setEmailPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Login Success
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
      {/* ================= MOBILE HEADER ================= */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-40">
        <span className="font-bold text-xl text-blue-900">
          KathaAnjali
        </span>

        <div className="flex gap-2">
          {/* LOGIN / LOGOUT */}
          {!isLoggedIn ? (
            <button
              onClick={() => setIsPopupOpen(true)}
              className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FaUser />
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-red-500 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
            >
              <FaUser />
              Logout
            </button>
          )}

          {/* PROFILE BUTTON */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-3 py-2 text-base bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <FaUser />
            Profile
          </button>
        </div>
      </header>

      {/* ================= FIRST LOGIN POPUP ================= */}
      {!isLoggedIn && isPopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/40 px-4">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 relative">

            <h2 className="text-lg font-semibold text-center mb-3">
              Sign in to continue
            </h2>

            <p className="text-sm text-gray-600 text-center mb-6">
              Like, comment, and bookmark posts
            </p>

            <button
              onClick={() => {
                setIsPopupOpen(false);
                setEmailPopupOpen(true);
              }}
              className="w-full flex items-center gap-3 bg-blue-600 text-white py-2.5 rounded-lg justify-center hover:bg-blue-700 transition"
            >
              <FaEnvelope />
              Continue with Email
            </button>

            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* ================= EMAIL POPUP ================= */}
      <EmailPopup
        open={emailPopupOpen}
        setOpen={setEmailPopupOpen}
        onLoginSuccess={handleLogin}
      />

      {/* ================= MAIN LAYOUT ================= */}
      <div className="flex h-screen ">

        {/* MAIN CONTENT */}
        <main className="w-full xl:ml-[179px] lg:mr-[380px]  p-4 lg:p-10">
          {children}
        </main>

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block fixed right-0 top-0 h-screen w-[380px] border-l border-gray-200 bg-white overflow-y-auto p-5">
          {profileContent}
        </aside>

        {/* ================= MOBILE DRAWER ================= */}
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
            className={`absolute right-0  top-0 h-full w-[85%] max-w-[390px] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white">
              <h2 className="font-bold text-lg">Profile Insights</h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto h-full p-5">
              {profileContent}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}