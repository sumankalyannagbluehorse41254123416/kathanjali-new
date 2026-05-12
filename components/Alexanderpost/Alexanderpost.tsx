"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ThumbsUp,
  MessageCircle,
  Send,
  MoreHorizontal,
  Bookmark,
  Link2,
  Code,
} from "lucide-react";

interface ReplyBoxProps {
  onSubmit: (text: string) => void;
}

function ReplyBox({ onSubmit }: ReplyBoxProps) {
  const [replyInput, setReplyInput] = useState<string>("");

  const handleSubmit = () => {
    if (replyInput.trim()) {
      onSubmit(replyInput);
      setReplyInput("");
    }
  };

  return (
    <div className="mt-3 flex gap-2">
      <img
        src="/images/vineet.jpg"
        className="w-7 h-7 rounded-full"
        alt="you"
      />
      <div className="flex-1">
        <textarea
          rows={2}
          value={replyInput}
          onChange={(e) => setReplyInput(e.target.value)}
          placeholder="Write a reply..."
          className="w-full p-2 border rounded-lg text-sm resize-none"
        />
        <div className="flex justify-end gap-2 mt-2 mb-3">
          <button
            onClick={() => setReplyInput("")}
            className="px-3 py-1 rounded text-xs border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!replyInput.trim()}
            className="bg-blue-600  text-white px-3 py-1 rounded text-xs disabled:bg-gray-300"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}

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


interface User {
    name: string;
    role: string;
}

const usersToSend: User[] = [
    { name: "John Doe", role: "Software Engineer" },
    { name: "Sarah Parker", role: "Designer" },
];

export default function Alexanderpost() {
    // 3-dot menu state
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);
    const [liked, setLiked] = useState<boolean>(false);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [commentInput, setCommentInput] = useState<string>("");
    const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
    const [showSendPopup, setShowSendPopup] = useState<boolean>(false);

    /* ----------------------------
        OUTSIDE CLICK FOR MENU
    -----------------------------*/
    const menuRef = useRef<HTMLDivElement | null>(null);
    const menuBtnRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                menuBtnRef.current &&
                !menuBtnRef.current.contains(e.target as Node)
            ) {
                setOpenMenu(false);
            }
        }

        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    const handlePostLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    const handleCommentSubmit = () => {
        if (commentInput.trim()) {
            const newComment: CommentType = {
                id: comments.length + 1,
                text: commentInput,
                likes: 0,
                liked: false,
                showReplyBox: false,
                replies: [],
            };
            setComments([...comments, newComment]);
            setCommentInput("");
        }
    };

    const handleCommentLike = (commentId: number) => {
        setComments(
            comments.map((comment) =>
                comment.id === commentId
                    ? {
                        ...comment,
                        liked: !comment.liked,
                        likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
                    }
                    : comment
            )
        );
    };

    const toggleReplyBox = (commentId: number) => {
        setComments(
            comments.map((comment) =>
                comment.id === commentId
                    ? { ...comment, showReplyBox: !comment.showReplyBox }
                    : comment
            )
        );
    };

    const handleReplySubmit = (commentId: number, text: string) => {
        setComments(
            comments.map((comment) =>
                comment.id === commentId
                    ? {
                        ...comment,
                        replies: [
                            ...comment.replies,
                            {
                                id: comment.replies.length + 1,
                                text,
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

    return (
        <div className="max-w-3xl mx-auto ml-0">
            <div className="flex items-center justify-between">
                <div className="max-w-2xl mx-auto mb-4 post-card">
                    <div className="bg-white rounded-lg">

                        {/* ---------------- PROFILE SECTION ---------------- */}
                        <div className="p-3">
                            <div className="flex items-start space-x-3">

                                <Image
                                    src="/images/vineet.jpg"
                                    alt="Vineet Agrawal"
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 rounded-full"
                                />

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm truncate">
                                        Vineet Agrawal
                                    </h3>
                                    <p className="text-xs text-gray-600 truncate">
                                        Healthcare Innovation Leader • 1st
                                    </p>
                                    <p className="text-xs md:text-sm text-gray-500 flex items-center">
                                        1/14/2025 • 4 min read
                                    </p>
                                </div>

                                {/* ---------------- 3 DOT MENU ---------------- */}
                                <div className="relative">
                                    <button
                                        ref={menuBtnRef}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenu(!openMenu);
                                        }}
                                        className="p-1 rounded hover:bg-gray-100"
                                    >
                                        <svg
                                            className="w-5 h-5 text-gray-700"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="19" cy="12" r="1"></circle>
                                            <circle cx="5" cy="12" r="1"></circle>
                                        </svg>
                                    </button>

                                    {/* MENU BOX */}
                                    <div
                                        ref={menuRef}
                                        className={`absolute top-8 right-0 bg-white w-52 shadow-lg border border-gray-200 rounded-lg p-2 z-50 ${openMenu ? "block" : "hidden"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fa-regular fa-bookmark"></i>
                                            Save
                                        </div>
                                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fa-solid fa-link"></i>
                                            Copy link to post
                                        </div>
                                        <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
                                            <i className="fa-solid fa-code"></i>
                                            Embed this post
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ---------------- MAIN IMAGE ---------------- */}
                        <div className="mt-0.5 relative">
                            <Image
                                src="/images/alexander.jpeg"
                                alt="Harishchandra family illustration"
                                width={1200}
                                height={600}
                                className="w-full rounded-lg object-cover h-auto"
                            />
                        </div>

                        {/* ---------------- STORY CONTENT ---------------- */}
                        <div className="px-4 pb-0">
                            <h3 className="text-[32px] font-[600] mt-4">
                                When Alexander the great met his match
                            </h3>

                            <div
                                className="bg-[#293138] text-white p-8 rounded-lg mt-4"
                                style={{ fontFamily: "'Roboto Mono', monospace" }}
                            >
                                <p className="font-base mb-5">KathaAnjali is my personal archive of stories that hit deeper than advice.</p>
                                <p className="font-base mb-5">Short, real, and rooted in Indian mythology, history, sport, and everyday life — each one is picked to make you pause, feel, or see differently</p>
                                <p className="font-base mb-5">Some teach. Some heal. All stay.</p>
                            </div>


                            <p className="text-base text-gray-900 leading-relaxed  mb-4 mt-2">
                                After crossing rivers, razing empires, and renaming cities after himself, Alexander of Macedon arrived in Corinth, crowned not by war, but by praise.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Philosophers, poets, and orators all came to honor the young king. All except one.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Diogenes.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                A man who lived without possessions.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Who rejected wealth, power, and convention.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Who called himself “a citizen of the world,” yet lived in an old wine barrel under the open sky.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                When Alexander heard about this eccentric sage who refused even the idea of kingship, he didn’t send for him.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                He went to him.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Diogenes was seated in the sun, surrounded by dogs, birds, and barefoot children. He wears no robe.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Alexander approached with his entourage, stood tall over the ragged man, and said:
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4 italic">
                                “I am Alexander, the great king.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Without moving, Diogenes looked up, obviously everyone knew Alexander the Great, he replied:
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4 italic">
                                “And I am Diogenes… the dog.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Alexander raised an eyebrow.<i> “Why are you called a dog?”</i>
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Diogenes answered without pause:
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4 italic">
                                “I fawn on those who give me anything.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4 italic">
                                I bark at those who refuse.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4 italic">
                                And I bite scoundrels.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                The king blinked. His soldiers shifted, unsure whether to laugh or to step forward. But Alexander, amused, smiled.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4 italic">
                                “I admire your wisdom. If there’s anything I can do for you, ask it.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Diogenes paused. He raised his hand slowly and said:
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4 italic">
                                “Yes. There is one thing you can do.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Alexander leaned in.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4 italic">
                                “Please… move a little to the side. You’re blocking my sunlight.”


                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                The king blinked.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                His guards held their breath.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Then—Alexander laughed. A full, genuine laugh.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                He turned to his men and said:
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4 italic">
                                “If I were not Alexander, I would have wished to be Diogenes.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                And with that, he stepped aside.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Letting the sunlight fall once again on the man who needed nothing.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                In that moment, the conqueror of empires met the conqueror of desire. Alexander ruled lands. Diogenes ruled himself.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                <strong> It’s easy to chase what shines in the world—titles, trophies, territories. But sometimes, the real victory is in needing less, not more.</strong>
                            </p>

                            {/* ---------------- BOTTOM BOX ---------------- */}
                            <div
                                className="bg-[#293138] text-white p-8 rounded-lg mt-4"
                                style={{ fontFamily: "'Roboto Mono', monospace" }}
                            >
                                <p className="font-base mb-5">If this story stirred something in you — drop a note.</p>
                                <p className="font-base mb-5">Need your encouragement...</p>
                                <p className="font-base mb-5">If you have a story, share it…</p>
                            </div>

                            {/* TAGS */}
                            <div className="flex flex-wrap gap-2 mb-4 mt-4">
                                <span className="text-base text-blue-600">#KathaNjali</span>
                                <span className="text-base text-blue-600">#Tech</span>
                                <span className="text-base text-blue-600">#VentureCapital</span>
                                <span className="text-base text-blue-600">#RemoteMonitoring</span>
                                <span className="text-base text-blue-600">#AI</span>
                            </div>
                        </div>

                        {/* ---------------- REACTIONS ROW ---------------- */}
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
      className={`w-[14px] h-[14px] lg:w-[18px] lg:h-[18px] ${
        liked ? "text-blue-600" : ""
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
                    className="text-gray-600 hover:text-black text-2xl"
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
                      <p className="text-xs md:text-sm text-gray-500">Software Engineer</p>
                    </div>
                    <button className="ml-auto px-3 py-1 text-sm border rounded hover:bg-gray-100">Send</button>
                  </div>

                  <div className="flex items-center gap-3">
                    <Image src="/images/vineet.jpg" width={40} height={40} className="w-10 h-10 rounded-full" alt="" />
                    <div>
                      <p className="font-medium">Sarah Parker</p>
                      <p className="text-xs md:text-sm text-gray-500">Designer</p>
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
                    className="bg-blue-600  text-white px-4 py-1.5 rounded text-sm disabled:bg-gray-300"
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
            </div>
        </div>
    );
}
