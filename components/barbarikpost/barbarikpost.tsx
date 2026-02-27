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


export default function Barbarikpost() {
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
                                src="/images/barbarik.jpeg"
                                alt="Harishchandra family illustration"
                                width={1200}
                                height={600}
                                className="w-full rounded-lg object-cover h-auto"
                            />
                        </div>

                        {/* ---------------- STORY CONTENT ---------------- */}
                        <div className="px-3 pb-3">
                            <h3 className="text-[32px] font-[600] mt-4">
                                Haare-ka-Sahara: The Story of Barbarik
                            </h3>

                            <div
                                className="bg-[#293138] text-white p-8 rounded-lg mt-4"
                                style={{ fontFamily: "'Roboto Mono', monospace" }}
                            >
                                <p className="font-base mb-5">KathaAnjali is my personal archive of stories that hit deeper than advice.</p>
                                <p className="font-base mb-5">Short, real, and rooted in Indian mythology, history, sport, and everyday life — each one is picked to make you pause, feel, or see differently</p>
                                <p className="font-base mb-5">Some teach. Some heal. All stay.</p>
                            </div>


                            <p className="text-base text-gray-900 leading-relaxed  mb-3 mt-4">
                                Long before Kurukshetra thundered with conches and chariots, there lived a mighty
                                rakshasa-prince named <strong> Ghatotkacha, son of Bhima and Hidimbi.</strong> In the far east,
                                he married <strong> Maurvi
                                    (Ahilavati), the famed daughter of the asura Mura.</strong> Their child arrived like a
                                streak of
                                dawn—broad-chested, bright-eyed, crowned with bristling hair. Seeing those wild locks,
                                Ghatotkacha named him <strong> Barbarik.</strong>
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Barbarik grew up on two things—valour and values. His mother trained him in the arts of war and
                                taught him the limits of power.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                After a long tapasya to Agni Deva, Barbarik earned an invincible bow. Later, Lord Shiva blessed
                                him with three unfailing arrows. Those arrows worked like a vow:
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                • one would mark what must be protected,
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                • one would mark what must be destroyed, and
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                • the third would finish the task and return.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                People began to whisper a name that would follow him forever—Teen-Baan-Dhari, the bearer of
                                three arrows.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                When the news of the Mahabharata war spread, the young hero sought his mother’s permission to
                                fight. As the war was between relatives, both sides were dear—so he asked, “Which side should I
                                join?” His mother gave him a single, stern rule: “Stand with the weaker side.” Barbarik obeyed.
                                In time he would be lovingly called haare-ka-sahara—shelter of the defeated.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                On his way to Kurukshetra, Krishna came to test Barbarik, disguised as an old Brahmin. Under a
                                peepal tree they spoke of war and justice.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3 italic">
                                “You are too young for a fearsome war,” the Brahmin said. “And you carry only three arrows?”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Barbarik calmly explained what his arrows could do.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                “How quickly can you end the war?” the Brahmin asked.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Barbarik smiled: “One muhurta—a moment.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                (The same question had been asked of other warriors: Bhishma said 20 days, Dronacharya 25, Karna 24, and Arjuna 28. Yet Barbarik said—one moment.)
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Almost in disbelief, the Brahmin asked for a demonstration. He told Barbarik to strike every leaf on the peepal tree—secretly hiding one leaf under his foot.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Barbarik released the first arrow; it marked every leaf in a blink with a white sign. The second arrow shot forth and began piercing the marked leaves one by one. Then it circled the Brahmin’s foot and hovered there.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                “Please lift your foot,” said Barbarik. The Brahmin moved—and the arrow instantly struck the hidden leaf. The Brahmin noticed it was already marked.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Krishna understood: even if he tried to hide someone, Barbarik’s arrows would still find and strike.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Then came the true question:
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                “Whose side will you take?”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                “The weaker,” Barbarik answered without thinking, proudly. At that moment it was the Pandavas—Bhima was his grandfather too.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                The Brahmin shook his head and gently laid out the paradox:
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                “If you join the weaker, they will become stronger. Your vow will force you to switch sides again and again—till both armies are destroyed and only you remain.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Barbarik understood. His promise—born of compassion—could burn the world.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Barbarik was torn. “What should I do?” he asked.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                The Brahmin requested daan: “Give me your head.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Barbarik looked up and saw through the disguise—it was Krishna. Krishna revealed his true form and said, “Before a dharma-yuddha begins, the greatest sacrifice must be offered.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Without a second thought, Barbarik bowed. “If this saves Dharma, take it.” He had one wish: “Let me watch the greatest war.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Krishna blessed him. The head was bathed in amrit and placed high on a hill overlooking Kurukshetra—and from there Barbarik saw everything.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Eighteen days later, when the dust settled, the Pandavas argued about who deserved the credit. Bhima thundered, Arjuna reasoned, Yudhishthira praised Krishna. Hearing the debate, Krishna said, “Ask the one who saw it all.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                They went to Barbarik’s head on the hill.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Barbarik said softly. “On the battlefield I saw only two powers at work. A divine Sudarshan chakra, spinning ceaselessly, cutting down all who stood against Dharma. And beside it, Goddess Mahakali, her vast tongue spread across the field, consuming the fallen sinners as her sacrifice.” Flowers fell; the brothers bowed. The witness said the victory belonged to Krishna.
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Before they departed, Krishna granted a boon:
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                “In the age to come, people will call you Shyam—after my name—and they will remember you first when they feel defeated. You will be <strong>Haare-ka-Sahara</strong>.”
                            </p>
                            <p className="text-base text-gray-900 leading-relaxed  mb-3">
                                Time rolled on. Legends say Barbarik’s head was later found at Khatu in Rajasthan. A local ruler, Roop Singh Chauhan, dreamed of the buried head and built a shrine where it was found. <strong> That shrine became today’s Khatu Shyamji Temple, where millions still line up and whisper a simple prayer: “When I feel small, stand with me.” </strong> </p>


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
