"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";


export default function Diwalipost() {
  /* ----------------------------
      STATE MANAGEMENT
  -----------------------------*/

  // 3-dot menu state
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  // Comment box state
  const [showCommentBox, setShowCommentBox] = useState(false);

  // Send popup state
  const [showSendPopup, setShowSendPopup] = useState(false);

  // Like button
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(523);

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
                src="/images/diwalii.jpeg"
                alt="Harishchandra family illustration"
                width={1200}
                height={600}
                className="w-full rounded-lg object-cover h-auto"
              />
            </div>

            {/* ---------------- STORY CONTENT ---------------- */}
            <div className="px-4 pb-0">
              <h3 className="text-[32px] font-[600] mt-4">
                Why We Light Lamps - The Forgotten Tale of Narakasura
              </h3>

              <div
                className="bg-[#293138] text-white p-8 rounded-lg mt-4"
                style={{ fontFamily: "'Roboto Mono', monospace" }}
              >
                <p className="font-base mb-5">KathaAnjali is my personal archive of stories that hit deeper than advice.</p>
                <p className="font-base mb-5">Short, real, and rooted in Indian mythology, history, sport, and everyday life — each one is picked to make you pause, feel, or see differently</p>
                <p className="font-base mb-5">Some teach. Some heal. All stay.</p>
              </div>

              <p className="text-base text-gray-900 leading-relaxed  mb-4 mt-2">Every great hero’s journey
                rests on
                a thousand silent acts of service. We celebrate the triumphant names - Rama, Lakshmana,
                Sita, Hanuman, but what of the legions of invisible hearts that held it all together? In
                the epic of Ramayana, aside from the principal trio, there were warriors like Bharata,
                the river-boatman Kevat, the sage Shabari, the forest-guide Shabari and many more whose
                names rarely ring out. </p>

              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                But today we turn to one of the most powerful of the quiet contributors: Urmila.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                In the palace gardens of Mithila grew two sisters - Sita, serene as the river, and
                Urmila, quiet as the moon. When destiny called, Sita walked with Rama into history;
                Urmila walked into a different kind of legend - the one that hums under the stage,
                unseen by the audience.

              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                Sita was won by Rama, and Lakshmana was married to Urmila. Shortly thereafter, the great
                decree came: Rama would leave Ayodhya into exile for fourteen years. Lakshmana insisted
                on accompanying him for service to his brother, for loyalty to the path of dharma.
                Urmila asked to go with him, but he gently refused: “I must go where I can serve
                unbroken. If you come with me, I cannot guard my duty and guard you as husband and
                protector.” Accepting his words, Urmila stayed behind.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                As Rama and Sita and Lakshmana entered the forest, the goddess of Sleep (Nidra) appeared
                to Lakshmana. He asked her: “Let me not sleep for these fourteen years, so that I may
                guard my brother and sister-in-law unceasingly.”
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                The goddess agreed but only if someone would take on his share of sleep. Lakshmana asked
                about his wife. Nidra came to Urmila with the proposal. Without hesitation she replied:
                “Take my fourteen years of sleep; let him remain vigilant.” So began Urmila’s vigil in
                reverse: while Lakshmana stayed awake for fourteen years, Urmila lay in deep rest - a
                sleep born not of escape but of immense sacrifice.
              </p>

              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                In staying behind, in giving away her nights so another could stay awake, Urmila
                anchored the journey. When the battles were fought, the demons slain, the coronation
                proclaimed, the hero returned, part of the victory ring belonged to the silent sentinel.
                Some traditions say the boon she granted him made possible the slaying of the mighty
                Meghnad (Indrajit), for only one who had not slept for fourteen years could defeat him.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                At the moment of reunion, Lakshmana turned to Urmila, the one who had sacrificed so
                much, and praised her more than any other. For when the spotlight came, it was built on
                her foundation.
              </p>
              <p className="text-base text-gray-900 leading-relaxed mb-2 font-[700]">
                Reflective Takeaway
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                In business, in teams, in life - the loud applause goes to “the hero,” the founder, the
                public-face.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                But around them stand countless Urmilas: the person who stayed back while others moved,
                the partner who surrendered comfort so another could serve, the person who worked when
                no one noticed.
              </p>
              <p className="text-base text-gray-900 leading-relaxed  mb-4">
                Let us honour these unseen forces. Let us ask ourselves: Who is my Urmila? And am I
                willing to be Urmila? Because great stories aren’t just written by those in light - they
                are built by those in shadow.
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
            <div className="px-4 py-3">

              <div className="flex justify-between text-xs text-gray-600 border-b border-gray-200 pb-3">
                <div>{likeCount}</div>
                <div>0 comments • 89 reposts</div>
              </div>

              <div className="flex justify-between items-center mt-1">
                {/* LIKE BUTTON */}
                <button
                  onClick={toggleLike}
                  className="flex-1 flex items-center justify-center gap-2 mt-4 hover:bg-gray-50 p-1"
                >
                  <i className={`fa-regular fa-thumbs-up ${liked ? "text-blue-600" : ""}`}></i>
                  <span className="text-sm">{liked ? "Liked" : "Like"}</span>
                </button>

                {/* COMMENT BUTTON */}
                <button
                  onClick={() => setShowCommentBox(!showCommentBox)}
                  className="flex-1 flex items-center justify-center gap-2 mt-4 hover:bg-gray-50 p-1"
                >
                  <i className="fa-regular fa-comment"></i>
                  <span className="text-sm">Comment</span>
                </button>

                {/* SEND BUTTON */}
                <button
                  onClick={() => setShowSendPopup(true)}
                  className="flex-1 flex items-center justify-center gap-2 mt-4 hover:bg-gray-50 p-1"
                >
                  <i className="fa-regular fa-paper-plane"></i>
                  <span className="text-sm">Send</span>
                </button>
              </div>

              {/* ---------------- SEND POPUP ---------------- */}
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

              {/* ---------------- COMMENT BOX ---------------- */}
              {showCommentBox && (
                <div className="mt-3">
                  <div className="flex items-start gap-3">
                    <Image
                      src="/images/vineet.jpg"
                      alt="you"
                      className="w-9 h-9 rounded-full mt-1"
                      width={36}
                      height={36}
                    />

                    <div className="flex-1">
                      <textarea
                        className="w-full p-3 border rounded-lg text-sm focus:ring-blue-500 focus:outline-none resize-none"
                        rows={3}
                        placeholder="Write a comment..."
                      ></textarea>

                      <div className="flex justify-end gap-2 mt-2 mb-3">
                        <button
                          onClick={() => setShowCommentBox(false)}
                          className="px-3 py-1.5 rounded border text-sm hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button className="px-3 py-1.5 rounded bg-blue-600  text-white text-sm">
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
