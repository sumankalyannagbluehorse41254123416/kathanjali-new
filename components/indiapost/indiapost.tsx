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

export default function Indiapost() {
 
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
  // 3-dot menu state
  const [openMenu, setOpenMenu] = useState<boolean>(false);


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
                  <p className="text-xs text-gray-500 flex items-center">
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
            <div className="mt-3 relative">
              <Image
                src="/images/india.jpeg"
                alt="Harishchandra family illustration"
                width={1200}
                height={600}
                className="w-full rounded-lg object-cover h-auto"
              />
            </div>

            {/* ---------------- STORY CONTENT ---------------- */}
            <div className="px-4 pb-0">
              <h3 className="text-[32px] font-[600] mt-4">
                The Battle That Stood at India’s Doorstep
              </h3>

              <div
                className="bg-[#293138] text-white p-8 rounded-lg mt-4"
                style={{ fontFamily: "'Roboto Mono', monospace" }}
              >
                <p className="font-base mb-5">KathaAnjali is my personal archive of stories that hit deeper than advice.</p>
                <p className="font-base mb-5">Short, real, and rooted in Indian mythology, history, sport, and everyday life — each one is picked to make you pause, feel, or see differently</p>
                <p className="font-base mb-5">Some teach. Some heal. All stay.</p>
              </div>

             <p className="text-base text-gray-900 leading-relaxed  mb-4 mt-2 font-[600]">
                        The Untold Chapter of Kohima, 1944
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        It was April 1944
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        The hills of Kohima, draped in early monsoon mist, were calm — until the earth began to shake
                        with artillery fire.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        No one imagined that this remote ridge in Nagaland would soon become the stage for one of the
                        most decisive — and tragic — battles ever fought on Indian soil.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">The world remembers it as the Battle of
                        Kohima</p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        But for India, it was much more — a heartbreaking moment when Indians fought Indians, each
                        believing they were serving the motherland.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600]">
                        The Call of Freedom
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600]">
                        In the dense jungles of Burma, Netaji Subhas Chandra Bose had raised a new army — the Azad Hind
                        Fauj (Indian National Army).
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        Supported by Japan, they marched under one cry:
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4 ">
                        <i>“Dilli Chalo!”</i> — “Let's march to Delhi”
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        Netaji’s belief was simple yet fierce — freedom would never be given; it had to be taken.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        And the war in the East, he believed, was India’s moment to strike.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600]">
                        So when Japan launched Operation U-Go in 1944, the INA joined the campaign, crossing Burma with
                        the dream of raising the tricolour in Delhi.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        Their path to India ran through Imphal and Kohima — two small towns guarding the route to Assam
                        and Bengal.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        To them, Kohima was not just a ridge — it was the gateway home.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600]">
                        The Hills of Kohima
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        On the other side stood the British Indian Army, defending Kohima — ironically, with thousands
                        of Indian soldiers in its ranks too.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        Men from Punjab, Bihar, Assam, and Nepal — all fighting under a foreign flag, believing they
                        were protecting their soil from invasion.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        That was the tragic beauty of Kohima:
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4 italic">
                        “Brothers born under the same sky, now divided by two destinies.”
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        By early April, Japanese and INA forces surrounded the ridge.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        The defenders — just a few thousand — were cut off.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        No food. No water. No reinforcements.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        For days, they survived on whatever little they had — old biscuits, muddy rainwater, and faith.


                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        The battle raged in impossible conditions.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        The lines were so close that at one point, they fought across a tennis court, using its white
                        lines as the front.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        Every inch of ground was contested; every night echoed with the cries of the wounded.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600] italic">
                        Hunger and Heroism — The Legend of Badluram
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        Amid that siege, the Assam Regiment became a symbol of endurance.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        And from their story was born a song that still lives on in army camps today —
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4 italic">
                        “Badluram Ka Badan Zameen Ke Neeche Hai…”
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        Badluram was a soldier of the 1st Assam Regiment — brave, ordinary, and now immortal.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600]">
                        He was killed in an earlier battle, but his quartermaster, Subedar Kandarpa Rajbongshi, never
                        struck his name off the ration rolls.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        So when the siege began and supplies were cut off, the unit unknowingly had one extra soldier’s
                        ration — month after month.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        That food — meant for a man long gone — helped the living survive when the world above rained
                        death
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        In those desperate nights, someone turned that dark irony into a song:
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4 italic">
                        “Badluram ka badan zameen ke neeche hai,
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        Par humko uska ration milta hai.”
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        (“Badluram’s body lies beneath the earth,
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        But we still get his ration.”)
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        What began as gallows humour became a regimental anthem — a reminder that even in death, a
                        soldier can feed life.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        To this day, the Assam Regiment sings it with pride — every time they march, every time they
                        remember Kohima.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600]">
                        The Cost and the Crossroads
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        By June 1944, the siege ended.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        The Japanese and INA forces, starving and exhausted, retreated through the monsoon-soaked
                        jungles of Burma.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        Thousands died — of hunger, disease, and exhaustion.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        The dream of “Dilli Chalo” was halted at the doorstep of India.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        But history cannot measure courage by outcome alone.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        The men who fought under Netaji’s flag did not fail — they planted the seed of rebellion that
                        would soon shake the British Empire.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        When the INA Trials began the next year in Delhi, millions rose in protest — for the first time,
                        the entire nation’s heart beat as one.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600]">
                        The Whisper of Kohima
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        Today, at the Kohima War Cemetery, white gravestones line the old tennis court.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        Among them stands an epitaph that has become immortal:
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        “When you go home, tell them of us and say,
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        For your tomorrow, we gave our today.”
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        But if you listen closely, perhaps the hills still hum that other tune —
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        of Badluram and his ration,
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        of hunger and humour,
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        of courage and comradeship that transcended flags.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600] italic">
                        Reflection
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        The Battle of Kohima was not about victory or defeat.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        It was about conviction — the kind that made one man march to Delhi with a dream,
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        and another hold the line believing he was protecting home.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        Both were Indians.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        Both were patriots.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        And both gave their today — for our tomorrow.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4 italic">
                        Because history is not about who won — it’s about who believed.
                    </p>
                    <p className="text-base text-gray-900 leading-relaxed  mb-4">
                        For me, Kohima isn’t just a war story — it’s a mirror of conviction, sacrifice, and the price of
                        belief. Because sometimes, the bravest thing you can do is stand firm in what you believe is
                        right… even when history can’t decide who truly won.

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
        <div className="p-4">

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
      </div>
    </div>
  );
}
