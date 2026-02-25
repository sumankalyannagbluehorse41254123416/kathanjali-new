"use client";

import { useState } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Send
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PostHeader from "./Postheader";

interface SectionData {
  image?: string;
  shortDescription?: string;
  title?: string;
}

export default function Diwali({ section }: { section: SectionData }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(523);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [showSendPopup, setShowSendPopup] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;
    setComments([...comments, commentInput]);
    setCommentInput("");
  };

  return (
    <div className="max-w-2xl mt-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">

        {/* HEADER */}
        <PostHeader />

        {/* IMAGE FROM section.image */}
        <div className="mt-3 relative p-4">
          <Image
            src={section?.image || "/images/default.jpg"}
            alt="Diwali Image"
            width={1000}
            height={600}
            className="w-full rounded-lg object-cover h-auto"
          />
        </div>

        {/* CONTENT */}
        <div className="p-4">

          {/* 1st paragraph → section.shortDescription */}
          <p className="text-base text-gray-900 leading-relaxed mb-2">
            {section?.shortDescription || ""}
          </p>

          {/* 2nd paragraph → section.title */}
          <p className="text-base text-gray-900 leading-relaxed mb-2">
            {section?.title || ""}
          </p>

          <Link
            href="/diwalipost"
            className="text-[15px] text-blue-600 font-medium inline-flex items-center gap-1 group"
          >
            <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[1px] after:bg-blue-600 after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-200">
              Read More
            </span>
          </Link>
        </div>

        {/* REACTIONS */}
        <div className="p-4">

          {/* TOP STATS */}
          <div className="flex justify-between text-xs text-gray-600 pb-3 border-b border-gray-200">
            <div>{likeCount}</div>
            <div>
              <span>{comments.length}</span> comments • 89 reposts
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-between items-center mt-1">
            <button
              onClick={handleLike}
              className="flex-1 flex items-center justify-center gap-2 mt-4 hover:bg-gray-50 p-1"
            >
              <ThumbsUp className={`text-sm ${liked ? "text-blue-600" : ""}`} />
              <span className="text-sm">Like</span>
            </button>

            <button
              onClick={() => setShowCommentBox(!showCommentBox)}
              className="flex-1 flex items-center justify-center gap-2 mt-4 hover:bg-gray-50 p-1"
            >
              <MessageCircle />
              <span className="text-sm">Comment</span>
            </button>

            <button
              onClick={() => setShowSendPopup(true)}
              className="flex-1 flex items-center justify-center gap-2 mt-4 hover:bg-gray-50 p-1"
            >
              <Send />
              <span className="text-sm">Send</span>
            </button>
          </div>

          {/* COMMENT BOX */}
          {showCommentBox && (
            <div className="mt-3">
              <div className="flex items-start gap-3">

                <Image
                  src="/images/vineet.jpg"
                  alt="you"
                  width={40}
                  height={40}
                  className="w-9 h-9 rounded-full mt-1"
                />

                <div className="flex-1">
                  <textarea
                    className="w-full p-3 border rounded-lg text-sm focus:ring-blue-500 focus:outline-none resize-none"
                    rows={3}
                    placeholder="Write a comment..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setShowCommentBox(false)}
                      className="px-3 py-1.5 rounded border text-sm hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCommentSubmit}
                      className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm disabled:bg-gray-300 disabled:text-gray-600"
                      disabled={!commentInput.trim()}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COMMENTS LIST */}
          <div className="mt-4 space-y-3">
            {comments.map((comment, i) => (
              <div key={i} className="flex items-start gap-3">
                <Image
                  src="/images/vineet.jpg"
                  width={40}
                  height={40}
                  className="w-9 h-9 rounded-full mt-1"
                  alt="avatar"
                />
                <div>
                  <p className="text-sm">{comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
