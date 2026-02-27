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

export default function Mahabharatapost() {
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

  /* ----------------------------
      LIKE HANDLER
  -----------------------------*/
  const toggleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
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
                src="/images/mahabharata.jpeg"
                alt="Harishchandra family illustration"
                width={1200}
                height={600}
                className="w-full rounded-lg object-cover h-auto"
              />
            </div>

            {/* ---------------- STORY CONTENT ---------------- */}
            <div className="px-3 pb-3">
              <h3 className="text-[32px] font-[600] mt-4">
                The Golden Mongoose of Mahabharata
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
                Long ago, in a small village, famine had turned the earth into cracked clay and the air into
                dust. Wells lay dry, and the sound of cooking had vanished from homes.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                In a humble hut lived an old Brahmin, his wife, their son, and daughter-in-law. For days, they
                had eaten nothing. At last, the Brahmin returned one evening with a handful of barley flour—the
                only grain he could find after hours of searching. His wife ground it, shaped it into four small
                rotis, one for each of them. The aroma was faint but heavenly to their empty stomachs.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                Just as they were about to eat, a knock came at the door.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                Outside stood a frail, dusty traveller. His eyes pleaded before his lips moved: “I am hungry. I
                have not eaten in days. Please give me something to eat.”
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                The Brahmin bowed and said, <i>“Atithi Devo Bhava”</i> — the guest is like God. He placed his
                own roti
                into the traveller’s hands. The man ate quickly but still looked hungry.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                Without hesitation, the wife brought her share. Her husband was reluctant, but she said: <i>“I
                  could never eat while my husband was starving—and before our guest was full.”</i>
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                The traveller ate again, but his hunger did not fade.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                Then the son stepped forward. “It is the duty of a son to fulfill the wishes of his parents,” he
                said, and gladly gave away his portion. Still, the guest’s hunger remained.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                At last, the daughter-in-law, her eyes gentle yet firm, offered her piece - <i>“I have always eaten after serving my elders. Today shall be no different.”</i>
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                With all four rotis gone, the guest’s face softened. He blessed them and walked away into the fading light. The family, though starving, felt a deep joy—they had upheld the highest duty of hospitality, even at the cost of their lives.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600]">
                The Witness
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                In the corner of that hut, a mongoose had been watching. It was astonished at such sacrifice. That night, as everyone went to bed with empty stomachs, the mongoose searched for crumbs in the hall. As it rolled over the few grains of barley that had fallen, half of its body turned golden, shining like the sun.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                The mongoose realized it had witnessed the greatest sacrifice ever made. Yet only half its body had changed. It roamed the world for years afterward, hoping to find another act as pure, so the rest of its body would turn golden.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600]">
                The Great Yagna
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                Many years later, after the great Kurukshetra war, Yudhishthira was crowned King of Hastinapur. Though victorious, he carried the heavy burden of sin—for he had fought and slain his own kin. Seeking to cleanse himself and to bring prosperity to his subjects, he resolved to perform the Ashwamedha Yagna.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                The sacrifice was conducted on a scale the world had never seen. Kings, sages, and nobles from distant lands arrived. Mountains of grain, rivers of ghee, heaps of gold—nothing was spared. Thousands were fed and gifted. The yajna became renowned as the grandest of ages.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                The mongoose heard of this. “Surely this will match the sacrifice of that poor Brahmin family,” it thought. It came to the yajna, rolled in the sacred ground… but nothing changed.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                It stood before Yudhishthira and declared: “O King, your yagna is vast, but it does not equal the sacrifice of a poor Brahmin family during a famine. They gave not from abundance, but from emptiness. They gave their very life’s food—knowing they would go hungry, perhaps die. That is the measure of true sacrifice. That is the essence of yagna.”
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                Yudhishthira was humbled. The assembled sages fell silent.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4 italic">
                <strong> And the mongoose, still half-golden, walked away—continuing its search for another heart as selfless as that famine-stricken Brahmin family.</strong>
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
              <div className="flex justify-between text-xs text-gray-600 pb-3 border-b border-gray-200">
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
