"use client";

import { useState } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Send,
  MoreHorizontal,
  Bookmark,
  Link2,
  Code,
} from "lucide-react";
import Link from "next/link";
import Postheader from "./Postheader";
import Image from "next/image";

/* ================= TYPES ================= */

type ReplyType = {
  id: number;
  text: string;
  likes: number;
  liked: boolean;
};

type CommentType = {
  id: number;
  text: string;
  likes: number;
  liked: boolean;
  showReplyBox: boolean;
  replies: ReplyType[];
};

export default function Mahabharat() {

  /* ---------- POST STATE ---------- */

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(523);

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const [comments, setComments] = useState<CommentType[]>([]);


  // Send popup state
  const [showSendPopup, setShowSendPopup] = useState(false);

  /* ================= POST LIKE ================= */

  const handlePostLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  /* ================= ADD COMMENT ================= */

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;

    const newComment: CommentType = {
      id: Date.now(),
      text: commentInput,
      likes: 0,
      liked: false,
      showReplyBox: false,
      replies: [],
    };

    setComments((prev) => [...prev, newComment]);
    setCommentInput("");
    setShowCommentBox(false);
  };

  /* ================= COMMENT LIKE ================= */

  const handleCommentLike = (commentId: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked
              ? comment.likes - 1
              : comment.likes + 1,
          }
          : comment
      )
    );
  };

  /* ================= TOGGLE REPLY BOX ================= */

  const toggleReplyBox = (commentId: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, showReplyBox: !comment.showReplyBox }
          : comment
      )
    );
  };

  /* ================= ADD REPLY ================= */

  const handleReplySubmit = (commentId: number, replyText: string) => {
    if (!replyText.trim()) return;

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(),
                text: replyText,
                likes: 0,
                liked: false,
              },
            ],
            showReplyBox: false,
          }
          : comment
      )
    );
  };

  /* ================= REPLY LIKE ================= */

  const handleReplyLike = (commentId: number, replyId: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === replyId
                ? {
                  ...reply,
                  liked: !reply.liked,
                  likes: reply.liked
                    ? reply.likes - 1
                    : reply.likes + 1,
                }
                : reply
            ),
          }
          : comment
      )
    );
  };

  /* ================= REPLY COMPONENT ================= */

  const ReplyBox = ({
    onSubmit,
  }: {
    onSubmit: (text: string) => void;
  }) => {
    const [replyText, setReplyText] = useState("");

    return (
      <div className="mt-2 flex gap-2 mb-3">
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write a reply..."
          className="flex-1 border border-gray-400 rounded-lg px-3 py-1 text-sm"
        />
        <button
          onClick={() => {
            onSubmit(replyText);
            setReplyText("");
          }}
          className="bg-blue-600 text-white px-3 rounded-lg text-sm"
        >
          Post
        </button>
      </div>
    );
  };
  return (
    <div className="w-full lg:max-w-2xl  mt-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* HEADER */}
        <Postheader />
        {/* IMAGE */}
        <div className="mt-3 relative">
          <a href="#">
            <img
              src="/images/mahabharata.jpeg"
              className="w-full rounded-lg object-cover h-auto p-4 pb-0"
              alt="Harishchandra family illustration"
            />
          </a>
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <p className="text-base text-gray-900 leading-relaxed  mb-4 mt-2">
            Long ago, in a small village, famine had turned the earth into
            cracked clay and the air into dust. Wells lay dry, and the sound of
            cooking had vanished from homes
          </p>
          <Link
            href="/mahabharatapost"
            className="text-[15px] text-blue-600 font-medium inline-flex items-center gap-1 group"
          >
            <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[1px] after:bg-blue-600 after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-200">
              Read More
            </span>
          </Link>
        </div>

        {/* REACTIONS */}
        {/* REACTIONS */}
        <div className="px-4">

          {/* STATS */}
          <div className="flex justify-between text-sm text-gray-600 pb-3 border-b border-gray-200">
            <div>{likeCount} likes</div>
            <div>{comments.length} comments</div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-between mt-2 mb-2.5">

            {/* LIKE */}
            <button
              onClick={handlePostLike}
              className="inline-flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-md transition"
            >
              <ThumbsUp
                className={`w-[14px] h-[14px] lg:w-[18px] lg:h-[18px] ${liked ? "text-blue-600" : ""
                  }`}
              />
              <span className="text-sm lg:text-base">Like</span>
            </button>

            {/* COMMENT */}
            <button
              onClick={() => setShowCommentBox(!showCommentBox)}
              className="inline-flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-md transition"
            >
              <MessageCircle className="w-[14px] h-[14px] lg:w-[18px] lg:h-[18px]" />
              <span className="text-sm lg:text-base">Comment</span>
            </button>

            {/* SEND */}
            <button
              onClick={() => setShowSendPopup(true)}
              className="inline-flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-md transition"
            >
              <i className="fa-regular fa-paper-plane text-[14px] lg:text-[18px]"></i>
              <span className="text-sm lg:text-base">Send</span>
            </button>

          </div>





          {showSendPopup && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              <div className="bg-white w-96 rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Send to...</h2>
                  <button
                    onClick={() => setShowSendPopup(false)}
                    className="text-gray-500 hover:text-black text-xl"
                  >
                    ×
                  </button>
                </div>

                <input type="text" placeholder="Search people" className="border w-full p-2 rounded mt-3" />

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Image src="/images/vineet.jpg" width={40} height={40} className="w-10 h-10 rounded-full" alt="" />
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-xs text-gray-500">Software Engineer</p>
                    </div>
                    <button className="ml-auto px-3 py-1 text-sm border rounded hover:bg-gray-100">Send</button>
                  </div>

                  <div className="flex items-center gap-3">
                    <Image src="/images/vineet.jpg" width={40} height={40} className="w-10 h-10 rounded-full" alt="" />
                    <div>
                      <p className="font-medium">Sarah Parker</p>
                      <p className="text-xs text-gray-500">Designer</p>
                    </div>
                    <button className="ml-auto px-3 py-1 text-sm border rounded hover:bg-gray-100">Send</button>
                  </div>
                </div>

                {/* SOCIAL SHARE ICONS */}
                <div className="flex items-center justify-between gap-6 border-t pt-4 pb-2 text-gray-700 mt-7 px-2">

                  <a href="#" className="hover:opacity-75">
                    <i className="fa-solid fa-link text-xl"></i>
                  </a>

                  <a href="#" className="hover:opacity-75">
                    <i className="fa-brands fa-instagram text-xl"></i>
                  </a>

                  <a href="#" className="hover:opacity-75">
                    <i className="fa-brands fa-linkedin text-xl"></i>
                  </a>

                  <a href="#" className="hover:opacity-75">
                    <i className="fa-brands fa-x-twitter text-xl"></i>
                  </a>

                  <a href="#" className="hover:opacity-75">
                    <i className="fa-brands fa-facebook text-xl"></i>
                  </a>

                </div>


              </div>
            </div>
          )}

          {/* COMMENT INPUT */}
          {showCommentBox && (
            <div className="mt-4 flex gap-3">
              <img
                src="/images/vineet.jpg"
                className="w-9 h-9 rounded-full"
                alt="you"
              />
              <div className="flex-1">
                <textarea
                  rows={2}
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full p-2 border rounded-lg text-sm resize-none"
                />
                <div className="flex justify-end gap-2 mt-2 mb-3">
                  {/* Cancel Button */}
                  <button
                    onClick={() => {
                      setShowCommentBox(false);
                      setCommentInput("");
                    }}
                    className="px-4 py-1.5 rounded text-sm border border-gray-300 hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  {/* Post Button */}
                  <button
                    onClick={handleCommentSubmit}
                    disabled={!commentInput.trim()}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm disabled:bg-gray-300"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* COMMENTS LIST */}
          <div className="mb-2.5">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">

                <img
                  src="/images/vineet.jpg"
                  className="w-9 h-9 rounded-full"
                  alt="avatar"
                />

                <div className="flex-1">

                  <div className="bg-gray-100 p-3 rounded-lg text-sm">
                    {comment.text}
                  </div>

                  <div className="flex items-center gap-4 text-xs mt-2 text-gray-600 mb-3">
                    <button
                      onClick={() => handleCommentLike(comment.id)}
                      className={comment.liked ? "text-blue-600 font-medium" : ""}
                    >
                      Like ({comment.likes})
                    </button>

                    <button
                      onClick={() => toggleReplyBox(comment.id)}
                    >
                      Reply
                    </button>
                  </div>

                  {comment.showReplyBox && (
                    <ReplyBox
                      onSubmit={(text) =>
                        handleReplySubmit(comment.id, text)
                      }
                    />
                  )}

                  {/* REPLIES */}
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="flex gap-2 mt-3 ml-6"
                    >
                      <img
                        src="/images/vineet.jpg"
                        className="w-7 h-7 rounded-full"
                        alt="avatar"
                      />

                      <div className="flex-1">
                        <div className="bg-gray-100 p-2 rounded-lg text-sm">
                          {reply.text}
                        </div>

                        <div className="flex items-center gap-4 text-xs mt-2 text-gray-600 mb-3">
                          <button
                            onClick={() => handleCommentLike(comment.id)}
                            className={comment.liked ? "text-blue-600 font-medium" : ""}
                          >
                            Like ({comment.likes})
                          </button>

                          <button
                            onClick={() => toggleReplyBox(comment.id)}
                          >
                            Reply
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
