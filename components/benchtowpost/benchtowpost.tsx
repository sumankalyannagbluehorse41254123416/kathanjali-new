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


export default function Benchtowpost() {
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
                                src="/images/bench.jpeg"
                                alt="Harishchandra family illustration"
                                width={1200}
                                height={600}
                                className="w-full rounded-lg object-cover h-auto"
                            />
                        </div>

                        {/* ---------------- STORY CONTENT ---------------- */}
                        <div className="px-4 pb-0">
                            <h3 className="text-[32px] font-[600] mt-4">
                                Part 2: The Bench by the Lake (Ani’s Story)
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
                                Haven’t read Part 1 yet? Check out The Bench by the Lake (John’s Story) - Part 1 to see how it
                                all began — and to truly understand both sides of the story
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                My name is Anirudh.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                But you can call me Ani. I like that better. Feels faster. Cooler.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                I love Krishna. And sometimes, I go looking for him.


                            </p>

                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                Today, I decided to look again
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                I told Mummy to pack lunch for me.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                “I’m going to the park,” I said.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                She gave me two chapatis with aloo bhaji in my yellow plastic tiffin.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">
                                I filled my red Spider-Man bottle and told her I’d sit by the lake for a bit.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“Don’t talk to strangers,” she said.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I nodded.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">The walk was long, almost half an hour.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">The lake was quiet.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">The trees smelled nice.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I saw two old aunties walking slowly, a few
                                stray dogs following me for a while.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I kept watching from the corner of my eye
                                until they went the other way.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Some boys were throwing pebbles into the
                                water.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">One uncle was teaching his son how to bat.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">There were lots of empty benches around the
                                lake.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I was about to sit on one, but… I don’t
                                like dogs.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">So I looked for a bench where someone was
                                already sitting.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">And then I saw an old man, alone, on the
                                corner bench.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Still. Serious.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Like he was thinking about a very big maths
                                problem.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">His skin was fair.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">He had long white hair, and a rough, messy
                                beard—like when Papa forgets to shave for three days.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">A little wild, sticking out in places.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">But he didn’t look scary.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Just… tired.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Or maybe far away in his mind.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I walked up slowly.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“Uncle, can I sit here?”</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">He didn’t speak, just nodded once.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I climbed onto the bench.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">My legs dangled above the ground.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I opened my tiffin. I was starving.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I put aloo bhaji on a chapati and rolled it
                                up.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Just as I was about to take the first bite,
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I saw him watching me.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Hungry eyes.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“I’m hungry. Are you?” I asked.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">He looked at me for a moment and nodded.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">So I gave him half my chapati roll.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Then I opened my bottle.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“Have some, Uncle,” I said.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">He took a sip… and then he smiled.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I started talking.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I told him about my friend who cried in
                                className because he lost his pencil.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">About how Mummy makes the best bhaji in the
                                world.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">And how one time, I gave half my lunch to a
                                puppy, and it followed me till the gate.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">He didn’t talk much.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">But then, suddenly - he laughed.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">A small one.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Like something inside him had woken up
                                after a long nap.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I liked that laugh.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">So I told him more stories.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">And he kept smiling.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">When we finished eating, I packed my
                                tiffin.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“I have to go now, or Mummy will be angry,”
                                I said.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I walked about ten steps.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Then I felt something and turned back.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">And I saw it</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">The brightest smile I’ve ever seen.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Like he wasn’t just smiling with his mouth,
                                but with his whole face.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Like a drawing where the sun has a face,
                                and it’s smiling too.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">It made me feel… warm.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I ran back.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I hugged him. Tight.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Like I hug Papa when I get a special gift.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">He didn’t speak.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">But he hugged me back.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">His arms felt gentle.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">A little shaky.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I think he had tears in his eyes.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Then I ran home, before Mummy shouted
                                again.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">⸻</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">When I got back, she scolded me like
                                always.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“You’re late again, Ani!”</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I didn’t answer.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I was still smiling.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Lost in the park.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">She stared at me, still holding my arms.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Then she asked softly,</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“What happened? Did you find something?”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">I nodded.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“Yes. I met Krishna today.”</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">She blinked.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“Where?”</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“He was much older than I thought,” I said.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“And he had the best smile in the world.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">⸻</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">In another part of town, the old man was
                                walking home.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Light on his feet.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Maybe even humming.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">When he reached, he rang the bell.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">His son opened the door, surprised.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“Appa, where were you? You look… good.”</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">John didn’t answer right away.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">He just nodded and sat down.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">As his son poured him a cup of coffee,</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">John finally said,</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“I feel better today.”</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">He smiled.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Then, after a long pause, added softly:</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“I met God today…”</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">Another pause.</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4">“…He was much younger than I expected.”</p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-4"><strong>If this story stirred something in
                                you — read Part 1 and drop a note.</strong></p>
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
