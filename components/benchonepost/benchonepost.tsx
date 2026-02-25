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


export default function Benchonepost() {
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
      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write a reply..."
          className="flex-1 border rounded-lg px-3 py-1 text-sm"
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
        <div className="max-w-3xl mx-autom ml-0">
            <div className="flex items-center justify-between">
                <div className="max-w-2xl  mb-4 post-card">
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
                                src="/images/bench_1.jpeg"
                                alt="Harishchandra family illustration"
                                width={1200}
                                height={600}
                                className="w-full rounded-lg object-cover h-auto"
                            />
                        </div>

                        {/* ---------------- STORY CONTENT ---------------- */}
                        <div className="px-3 pb-3">
                            <h3 className="text-[32px] font-[600] mt-4">
                                Part 1: The Bench by the Lake (John’s Story)
                            </h3>

                            <div
                                className="bg-[#293138] text-white p-8 rounded-lg mt-4"
                                style={{ fontFamily: "'Roboto Mono', monospace" }}
                            >
                                <p className="font-base mb-5">KathaAnjali is my personal archive of stories that hit deeper than advice.</p>
                                <p className="font-base mb-5">Short, real, and rooted in Indian mythology, history, sport, and everyday life — each one is picked to make you pause, feel, or see differently</p>
                                <p className="font-base mb-5">Some teach. Some heal. All stay.</p>
                            </div>

                            <p className="text-base text-gray-900 leading-relaxed  mb-4 mt-4">
                                My name is John Fernandes. I’m 72. And I’ve lost count of how long I’ve been alive without
                                really living.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                These days, I don’t carry much—neither in my hands nor in my heart. There isn’t much to look
                                forward to. I eat, I sleep, I sit, I irritate people. That’s what a purposeless life does to a
                                man—it sharpens his bitterness and dulls everything else.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                This morning felt like most others, only heavier. Like I was done waiting for things to change.
                                So I walked out—no plan, no destination. Just a whisper inside that said, “Enough.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                The lake isn’t far. It’s the greenest part of our old town—one of the few places untouched by
                                noise and glass. Saritha and I used to visit often. Especially on Sundays, when she was still
                                strong. Before the chemo. Before everything became about tubes and tablets and slow heartbreak.
                                She loved that lake. Said it reminded her of God’s patience.
                            </p>

                            <p className="text-base   text-gray-900 leading-relaxed  mb-4">
                                There are a few benches lined up under tall eucalyptus trees. That smell… it still brings back
                                her laughter. On the far side, a couple sat close, the girl resting her head on the boy’s
                                shoulder. Near the cricket pitch, a young father was showing his son how to hold a bat. Another
                                elderly couple sat holding hands across the water—still together.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                And then there was me—alone on the middle bench.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Someone called out from behind.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                “Uncle, can I sit here?”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                A boy, probably ten, in a white and blue checked T-shirt and shorts.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                A bright yellow plastic tiffin clutched in one hand, and a red Spider-Man water bottle swinging
                                from the other.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                He looked around, then walked up.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                I nodded.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                He plopped beside me, legs dangling, shoes muddy. He fidgeted with his tiffin box for a moment, then said, “I’m hungry. Are you?”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                I was about to decline. But before I knew it, I nodded again.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                He opened his box like he was unveiling treasure—two neatly wrapped chapatis and a small portion of golden fried potato bhaji. The smell hit me first. Then his gesture—he tore one chapati in half and handed it to me, no hesitation.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                I took it.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                He poured water from his bottle. “Have some, Uncle,” he said.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                I drank. Why? I don’t know. But everything about this felt… right. Like I was no longer steering the moment—just floating with it.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                He introduced himself. “My name is Anirudh. But everyone calls me Ani,” he said, smiling.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                He did most of the talking—about school, his mummy, his best friend who cried last week because he lost a pencil.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                I think I laughed a couple of times.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                I honestly can’t remember the last time I did that.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                There was a lightness to him—nothing forced, nothing pretentious. Just presence. Honest and whole.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                We finished the food. I helped him pack the tiffin. He stood up and said, “I should go now. Mummy will shout if I’m late.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                He took a few steps away.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Suddenly, I felt a strange sadness creep in—like something warm had been pulled from me too soon. I wished—quietly, desperately—that he’d turn around.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                And he did.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                About ten steps away, he stopped. Turned. Looked right at me.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                And smiled.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                I couldn’t help it—a wide, foolish grin spread across my face.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Then—he ran back.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                He hugged me. Tight. Like he’d known me forever.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                I froze. And then I melted.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Tears in my eyes?
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">

                                I don’t remember the last time anyone hugged me.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                He said nothing more. Just waved and ran off again.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                But I didn’t feel alone anymore.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                The lake shimmered brighter. The birds sounded happier. Even the air seemed to hum.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                I walked home—lighter than I had been in years. Maybe I was humming. Maybe even dancing a little? Who knows.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                At the door, I rang the bell. My son opened it, eyes wide. He saw something had changed and asked,
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                “Appa, where were you? You look… good.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                I didn’t answer immediately.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                He asked, “Coffee?”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                I nodded.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                While he was pouring coffee, I muttered—almost to myself,
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                “I feel better today.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                I paused. Smiled.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                My son was watching me curiously.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Then I added softly,
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                “I met God today…”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Another pause.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                “…He was much younger than I expected.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                ⸻
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Meanwhile…
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                In a small apartment across town, a boy with muddy shoes and a yellow tiffin box walked into the kitchen.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                “Mummy!” he called, excited.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                “You’re late again, Ani!” she said.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                He sat down with a big smile on his face, ignoring her scolding.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                His mother noticed something different about him.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                “Where were you?” she asked again. “Did you find something?”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">

                                “Yes. I met Krishna today.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                “You know what, Mummy? He was much older than I thought.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Then he added proudly,
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                “And he had the best smile in the world.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Click to Read Part-2
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
          <div className="flex justify-between text-xs text-gray-600 pb-3 border-b border-gray-200">
            <div>{likeCount} likes</div>
            <div>{comments.length} comments</div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-between mt-2 mb-2.5">

  {/* LIKE */}
  <button
    onClick={handlePostLike}
    className="inline-flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-md transition text-[18px]"
  >
    <ThumbsUp
      size={18}
      className={liked ? "text-blue-600" : ""}
    />
    <span>Like</span>
  </button>

  {/* COMMENT */}
  <button
    onClick={() => setShowCommentBox(!showCommentBox)}
    className="inline-flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-md transition text-[18px]"
  >
    <MessageCircle size={18} />
    <span>Comment</span>
  </button>

  {/* SEND */}
  <button
    onClick={() => setShowSendPopup(true)}
    className="inline-flex items-center gap-2 hover:bg-gray-50 px-3 py-2 rounded-md transition text-[18px]"
  >
    <i className="fa-regular fa-paper-plane text-[18px]"></i>
    <span>Send</span>
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
                <div className="flex items-center justify-center gap-6 border-t pt-4 pb-2 text-gray-700 mt-7">

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
                <div className="flex justify-end gap-2 mt-2">
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

                  <div className="flex items-center gap-4 text-xs mt-1 text-gray-600">
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

                        <div className="flex items-center gap-4 text-xs mt-1 text-gray-600">
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
