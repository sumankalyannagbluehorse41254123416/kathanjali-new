// components/PostHeader.tsx
"use client";

import { MoreHorizontal, Bookmark, Link2, Code } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface PostHeaderProps {
  userName?: string;
  userRole?: string;
  date?: string;
  readTime?: string;
  userImage?: string;
}

export default function PostHeader({
  userName = "Vineet Agrawal",
  userRole = "Healthcare Innovation Leader • 1st",
  date = "1/14/2025",
  readTime = "2 min read",
  userImage = "/images/vineet.jpg"
}: PostHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Handle click outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showMenu &&
        menuRef.current &&
        menuButtonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="p-4 flex items-start gap-3 relative">
      <img
        src={userImage}
        className="w-12 h-12 rounded-full"
        alt="avatar"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900">
          {userName}
        </h3>
        <p className="text-xs text-gray-500">
          {userRole}
        </p>
        <p className="text-xs text-gray-500">{date} • {readTime}</p>
      </div>

      {/* Menu Button */}
      <div className="relative">
        <button
          ref={menuButtonRef}
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <MoreHorizontal className="text-gray-700" />
        </button>
        {showMenu && (
          <div 
            ref={menuRef}
            className="absolute top-8 right-0 bg-white w-52 shadow-lg border border-gray-200 rounded-lg p-2 z-50"
          >
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
              <Bookmark />
              Save
            </div>
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
              <Link2 />
              Copy link to post
            </div>
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
              <Code />
              Embed this post
            </div>
          </div>
        )}
      </div>
    </div>
  );
}