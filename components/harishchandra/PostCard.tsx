"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";


export default function PostCard() {
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
                    className={`absolute top-8 right-0 bg-white w-52 shadow-lg border border-gray-200 rounded-lg p-2 z-50 ${
                      openMenu ? "block" : "hidden"
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
                src="/images/harishchandra.jpeg"
                alt="Harishchandra family illustration"
                width={1200}
                height={600}
                className="w-full rounded-lg object-cover h-auto"
              />
            </div>

            {/* ---------------- STORY CONTENT ---------------- */}
            <div className="px-3 pb-3">
              <h3 className="text-[32px] font-[600] mt-4">
                Harishchandra - The Greater the Truth, The Harder the Test
              </h3>

              <div
                className="bg-[#293138] text-white p-8 rounded-lg mt-4"
                style={{ fontFamily: "'Roboto Mono', monospace" }}
              >
                <p className="font-base mb-5">KathaAnjali is my personal archive of stories that hit deeper than advice.</p>
                <p className="font-base mb-5">Short, real, and rooted in Indian mythology, history, sport, and everyday life — each one is picked to make you pause, feel, or see differently</p>
                 <p className="font-base mb-5">Some teach. Some heal. All stay.</p>
              </div>

               <p className="text-base leading-relaxed text-black mb-5 mt-4">
                            In the age of heroes - the Treta Yuga - when lineages like
                            the Suryavansh were crowned with duty, there was a king named
                            Harishchandra. People spoke his name like a promise:
                            where he ruled, truth lived. This is the story of how that
                            promise was tested, how a king gave away his kingdom without flinching, and how the price of
                            that promise
                            brought him to a place of smoke, sorrow and finally, glory.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            Harishchandra wore his truth like a second skin. Born in the Suryavansh, his court shone
                            with justice, an his people slept without fear. When sages came to his palace, he rose and
                            gave as a king must give.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            Once, while hunting in the forest, Harishchandra paused at a cry. He left his bow. At that
                            moment the great sage Vishvamitra appeared - a man who had practiced severe penances and had
                            extraordinary power.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            Vishvamitra tested kings. He stood before Harishchandra and asked for a gift. The king,
                            steady and simple, said, “Ask what you will. If it is mine to give, it is yours.”
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            When the sage asked for the kingdom itself - the land, the treasures, the army - the king
                            did not tremble. He answered:
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            “Take it. A king keeps his word. What is mine, I give.”
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            He gave away crown and treasury, elephants and chariots - everything, calmly, as a man gives
                            a last cup of water to a guest. There was no argument, only the weight of a promise kept.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            Vishvamitra then told him: “If you have given the earth to me, you must leave this realm. It
                            is not yours any longer. You, your wife and your son - go away; go live elsewhere.”
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            So Harishchandra, Shaivya (his queen, also called Taramati), and their young son Rohitashva
                            set out — leaving the city that had been their home, walking barefoot, the dust of the road
                            like a new crown.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5"> They walked toward Benares - the sacred
                            city where Shiva is worshipped; a place that stands near the burning-grounds and where the
                            tests of the heart are often faced. The people of the city cried after them, but the king
                            did not turn back. He had given his word</p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            Days passed. The king had kept his promise but the sage reappeared and demanded also the fee
                            for a royal sacrifice — the Rājasūya. Harishchandra had nothing left to pay. He begged for
                            time. Vishvamitra gave none.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            In the market of choices, the king sold what he could. With a voice that did not shake, he
                            said to his wife, “This is the way of duty. This is what we promised.” She answered in a
                            whisper that was a blade and a balm both: “Keep your truth. Truth is the highest virtue.”
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            A brahman came forward and bought Shaivya. The queen, whose hands had once held royal cups,
                            was led away to serve. Seeing this, the little boy clung to his mother. The queen begged the
                            buyer, “Please take my son too, so I am not alone.” The buyer - hardened by his own life -
                            weighed money and compassion and chose the money. The child was taken.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">Harishchandra watched his son carried
                            away. His chest broke. He fainted and woke with a shame that burned hotter than any sun. But
                            still, his mouth said only the words he had promised to speak. </p>
                        <p className="text-base leading-relaxed text-black mb-5"> The coins from selling his wife and son
                            did not satisfy Vishvamitra. There was still debt to be paid. The king made the final,
                            unthinkable choice: he sold himself.</p>
                        <p className="text-base leading-relaxed text-black mb-5"> A Chandala - a low-caste man who lived
                            by the margins - bought him and took him to the burning-ground. Harishchandra, who had sat
                            upon thrones and received honours, now wore ragged clothes. He carried a staff. He smelled
                            of ash and smoke. He became the keeper of a place many fear to visit.</p>
                        <p className="text-base leading-relaxed text-black mb-5">He worked there day and night. His hair
                            grew matted; the ash painted his skin white in stripes. He learned to lift bodies with the
                            same steadiness he once used to lift a sceptre. He learned the faces of grief so well that
                            he could tell hope from despair by the way someone folded a cloth. </p>
                        <p className="text-base leading-relaxed text-black mb-5"> At the burning-ground, he saw everything
                            human in its rawest form. He watched mothers who could not afford to claim their children’s
                            bodies,and relatives who could not cry because hunger had closed their mouths.He kept the
                            books of the dead - who had come, who had paid, who had been turned away.</p>
                        <p className="text-base leading-relaxed text-black mb-5">One Afternoon int the Burning ground</p>
                        <ul className="list-disc pl-6 text-gray-800 leading-relaxed mb-4">
                            <li className='mb-2'>The sky hangs low with smoke, not wind.</li>
                            <li className='mb-2'>The ground was hard with ash; footmarks sink then vanish.</li>
                            <li className='mb-2'>Stacks of wood stood like dark teeth; skulls and bones lay half-buried
                                between logs.</li>
                            <li className='mb-2'>A chorus of cries - not one voice, but many: wails, whispers, sudden
                                choking sobs.</li>
                            <li className='mb-2'>Jackals and crows argue over leftovers; the air was heavy with the smell of
                                burning flesh, wet earth, and cold incense.</li>
                            <li className='mb-2'>Men and women move with a mechanical pain, laying out the dead, placing
                                cloths, closing eyes, turning their faces to the final flame.</li>
                        </ul>
                        <p className="text-base leading-relaxed text-black mb-5">
                            There stood Harishchandra - hands that once blessed and sealed now counting coins for last
                            rites, holding blankets taken from corpses, moving swiftly to the sound of a grieving shout.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">A mother appeared - ragged, wild-eyed -
                            carrying a small body.A child bitten by a snake. She fell at the gate and cried, “My son -
                            give him the last rites. Here is what I have.”</p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            Harishchandra, bound by his duty to collect the fee, said, in the official voice he now
                            wore, “There is a charge for cremation. Please pay.”
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            She answered with a keening sound that broke the air. “I have nothing. I have sold
                            everything I had. Please for the love of the gods help me.”
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            He looked at the child and then at the woman. In the pallor and small hands, he saw his own
                            son. He did not know it at first- the years had changed faces. The queen - his Shaivya
                            -stood there too, beaten and dragged.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            When recognition came, it arrived like a blade.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            They were each other’s last anchors in the world.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            They spoke with voices cut in half by grief.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            Shaivya: “Is this the law that you follow, my lord? Is this what your righteousness has made
                            of us?”
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            Harishchandra, with ash on his face and the smoke burning in his lungs, answered softly,
                            “Duty is a dangerous thing when it asks for all of you. But I will not break my promise.”
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            She cried, “You sold me as a slave. You sold our boy. How can a man be both husband and
                            judge?”
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            He folded his hands. “I will do what duty asks.”
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            There was a moment then - small, terrible - when both of them thought: this is too much.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            The queen made a mother’s final choice: she laid the child upon the pyre.The king, hollowed
                            by loss, raised the torch - prepared to join the flame.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            They were ready to end the pain together.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            At the instant the fire would take them, the world changed. Light poured down. Voices - not
                            human but divine - spoke the secret of the test. The child rose from the ashes. The queen’s
                            face cleared. The king’s chest loosened for the first time in months.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5"> The gods appeared — Indra, Dharma,
                            Vishwamitra, and many others.</p>
                        <p className="text-base leading-relaxed text-black mb-5"> They told Harishchandra that his whole
                            life had been a test of truth and patience.</p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            Because he had stayed true even through the worst suffering, the gods restored what he had
                            lost.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            Vishwamitra’s anger melted into admiration.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            Indra offered Harishchandra a place in heaven.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            But the king refused. “How can I go alone?” he said. “My people - the ones who cried when I
                            left - they too have suffered. I will not go without them.”
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            The gods smiled. “So be it.”
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            Harishchandra, his queen, his son, and all his loyal subjects rose to the heavens together -
                            bathed in light, honoured for the truth they had stood by.
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5 font-bold">
                            Thus ends the story of King Harishchandra, who sold his kingdom, his family, and his
                            freedom, who became a servant at the burning ground yet never sold his truth
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            He proved that truth may demand everything you love,
                        </p>
                        <p className="text-base leading-relaxed text-black mb-5">
                            but in the end, it returns everything you’ve lost - purified, eternal, whole.
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

                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => setShowCommentBox(false)}
                          className="px-3 py-1.5 rounded border text-sm hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm">
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
