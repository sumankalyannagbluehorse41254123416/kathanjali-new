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



export default function Khudirampost() {

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
                                src="/images/khudiram.jpeg"
                                alt="Harishchandra family illustration"
                                width={1200}
                                height={600}
                                className="w-full rounded-lg object-cover h-auto"
                            />
                        </div>

                        {/* ---------------- STORY CONTENT ---------------- */}
                        <div className="px-3 pb-3">
                            <h3 className="text-[32px] font-[600] mt-4">
                                Khudiram Bose – The Smiling Martyr of Midnapore
                            </h3>

                            <div
                                className="bg-[#293138] text-white p-8 rounded-lg mt-4"
                                style={{ fontFamily: "'Roboto Mono', monospace" }}
                            >
                                <p className="font-base mb-5">KathaAnjali is my personal archive of stories that hit deeper than advice.</p>
                                <p className="font-base mb-5">Short, real, and rooted in Indian mythology, history, sport, and everyday life — each one is picked to make you pause, feel, or see differently</p>
                                <p className="font-base mb-5">Some teach. Some heal. All stay.</p>
                            </div>


                            <p className="text-base text-gray-700 mb-4 mt-4">In the heart of Midnapore, among fields
                                where
                                the soil is red and the air smells of freedom, a boy was born in 1889, Khudiram Bose. He was
                                just another village child, barefoot and bright-eyed, until destiny called him to a place in
                                history.

                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Orphaned young, Khudiram’s childhood could have been a story of loss. But his eldest sister
                                Aparupa raised him with care, sending him first to Hamilton High School in Tamluk, and later to
                                Midnapore Collegiate School. It was here that Khudiram’s spirit met the fire of revolution. The
                                Swadeshi movement had reached Midnapore, and the boy listened wide-eyed to leaders like
                                Aurobindo Ghosh and Sister Nivedita, who came to inspire students.

                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600]">
                                The Seeds of Rebellion
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Khudiram was not a child who could stay quiet. He distributed leaflets calling for Swaraj,
                                joined processions shouting “Bande Mataram!”, and trained secretly with members of the Anushilan
                                Samiti.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                By the time he was 17, his resolve was stronger than most men double his age. While other boys
                                worried about examinations, Khudiram carried bombs and dreams of freedom.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600]">
                                Kingsford – The Tyrant Magistrate
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                The focus of his fury was Magistrate Douglas Kingsford of Muzaffarpur. Kingsford was feared
                                across Bengal. He handed down cruel punishments to nationalists, sentenced youth to long prison
                                terms for simply shouting slogans, and ordered public floggings to break the spirit of Swadeshi
                                workers. His name was whispered with anger in tea shops, schools, and households
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                To Khudiram, Kingsford became the very face of British cruelty. And he believed that striking
                                him down would send a message to all of India: the youth will not bow.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600]">
                                The Night of the Bomb
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                On 30 April 1908, Khudiram and his comrade Prafulla Chaki waited outside the European Club in
                                Muzaffarpur. Disguised as schoolboys, they stood by the roadside, clutching bombs wrapped in
                                cloth. Their hearts pounded, not with fear, but with fire.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                At last, a carriage rolled by. Believing Kingsford sat inside, Khudiram hurled the bomb with the
                                unflinching hand of a 17-year-old patriot. The explosion tore through the night. But fate played
                                its cruel trick — the carriage carried not Kingsford, but two Englishwomen. They died, while
                                Kingsford escaped.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                The empire branded it a crime. But in every corner of Bengal, whispers spread: “A boy from
                                Midnapore dared to strike!”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600]">
                                Capture and Trial
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Khudiram fled for miles, dusty, hungry, barefoot. At a small tea stall, constables grew
                                suspicious of the tired youth with fire still in his eyes. He was arrested with maps, weapons,
                                and his courage intact.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                At trial, he stood calm. The judges thundered, the lawyers argued, but the boy listened
                                silently, sometimes smiling faintly. The sentence was inevitable — death by hanging.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600]">
                                The Eve of the Noose
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                On the night of 10 August 1908, Muzaffarpur jail fell silent. While the world slept, Khudiram
                                lay peacefully on his cot, as though it were just another evening. The jailers whispered, amazed
                                at his composure. At dawn, he bathed, prayed quietly, and asked for water.


                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Then came the moment. With steady steps, Khudiram walked to the hanging platform. His head was
                                held high, his face radiant, and on his lips — a smile. The rope was tightened, the crowd
                                outside sobbed, yet Khudiram remained calm.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">At just 18 years old, he embraced death as if it were destiny.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">The Song of Immortality</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Bengal could not contain its grief. But grief turned into song. Poet Prafulla Chandra Roy penned a ballad that swept through villages and cities alike:</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“একবার বিদায় দে মা ঘুরে আসি,</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">হাসি হাসি পরব ফাঁসি, দেখবে ভারতবাসী…”</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">(“Bid me farewell once, Mother, I shall return.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Smiling, I will embrace the noose, and all of India shall witness it.”)</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">This song became more than music — it was Khudiram’s spirit turned into melody. Farmers sang it in fields, students hummed it in classNamerooms, and mothers wept as they rocked their children to sleep with its lines. It became a hymn of sacrifice, a war cry of youth, a mother’s eternal farewell.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4 font-[600]">The Legend Lives On</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Khudiram Bose did not live to see 19, yet his death lit a torch for millions. His courage made others rise, his sacrifice strengthened the Swadeshi movement, and his smile at the noose became the face of youthful rebellion.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">In Midnapore, people still say: He was not just a boy. He was a spark that became a flame.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">A flame that burned in 1908, and still burns in the heart of a free India.</p>


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
