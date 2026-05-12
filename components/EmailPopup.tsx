"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface EmailPopupProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onLoginSuccess?: () => void;
}

export default function EmailPopup({ open, setOpen, onLoginSuccess }: EmailPopupProps) {
  const [isLogin, setIsLogin] = useState(true); // 🔥 true → Login, false → Signup

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-lg p-8 relative shadow-xl">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* ICON */}
        <div className="w-full flex justify-center mb-6 text-4xl"></div>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? "Login to your account" : "Create a new account"}
        </h2>

        {/* SIGNUP ONLY: Name field */}
        {!isLogin && (
          <>
            <label className="text-sm text-gray-700">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 mb-5"
            />
          </>
        )}

        {/* EMAIL */}
        <label className="text-sm text-gray-700">Your Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 mb-5"
        />

        {/* PASSWORD */}
        <label className="text-sm text-gray-700">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 mb-5"
        />

        {/* MAIN BUTTON */}
        <button 
          onClick={() => {
            onLoginSuccess?.();
            setOpen(false);
          }}
          className="w-full bg-black text-white py-2 rounded-full text-lg hover:bg-gray-900"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        {/* SWITCH BETWEEN LOGIN / SIGNUP */}
        <p className="text-center text-sm mt-4">
          {isLogin ? "No account?" : "Already have an account?"}{" "}
          <span
            className="text-black underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Log in"}
          </span>
        </p>

        {/* FOOTER */}
        {!isLogin && (
          <p className="text-xs md:text-sm text-gray-500 text-center mt-6">
            By clicking “Create account”, you accept our Terms of Service and Privacy Policy.
          </p>
        )}
      </div>
    </div>
  );
}

