// ─────────────────────────────────────────────────────────────
//  Message.jsx  –  Real-time Chat  (Socket.io + REST)
//  Matches CampusConnect design system exactly
// ─────────────────────────────────────────────────────────────
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

// ── Backend URL (apna port change karo agar alag ho) ──────────
const BASE_URL   = "http://localhost:5000";
const SOCKET_URL = "http://localhost:5000";

// ── Fonts & CSS (Dashboard se match) ─────────────────────────
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');`;

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0a0c10;--bg2:#0f1218;--bg3:#151a22;
  --glass:rgba(255,255,255,0.035);--glass-border:rgba(255,255,255,0.07);
  --gold:#c9a84c;--gold2:#e8c97a;--gold-dim:rgba(201,168,76,0.15);
  --text:#e8e6e1;--text2:#8a8880;--text3:#5a5856;
  --accent:#3d6fff;--accent2:#6b8fff;--red:#e05555;--green:#4ecb71;
  --nav-h:64px;--sidebar-w:320px;--radius:16px;--radius-sm:10px;
  --shadow:0 8px 32px rgba(0,0,0,0.4);--shadow-lg:0 20px 60px rgba(0,0,0,0.6);
  --nav-bg:rgba(10,12,16,0.88);
}
html[data-theme="light"]{
  --bg:#f0f2f7;--bg2:#ffffff;--bg3:#f5f7fc;
  --glass:rgba(0,0,0,0.03);--glass-border:rgba(0,0,0,0.09);
  --gold:#a0782a;--gold2:#c9900a;--gold-dim:rgba(160,120,42,0.1);
  --text:#1a1c21;--text2:#5a5e6b;--text3:#9499a8;
  --accent:#2a55e8;--accent2:#4a75f8;--red:#d94040;--green:#2ea84a;
  --shadow:0 4px 20px rgba(0,0,0,0.1);--shadow-lg:0 16px 48px rgba(0,0,0,0.16);
  --nav-bg:rgba(255,255,255,0.92);
}
html,body,#root{height:100%;font-family:'DM Sans',sans-serif}
body{color:var(--text);background:var(--bg);overflow:hidden}

/* ── NAVBAR ── */
.msg-navbar{position:fixed;top:0;left:0;right:0;z-index:100;height:var(--nav-h);display:flex;align-items:center;background:var(--nav-bg);backdrop-filter:blur(24px);border-bottom:1px solid var(--glass-border);padding:0 16px;gap:12px}
.nav-brand{display:flex;align-items:center;gap:10px;cursor:pointer;text-decoration:none}
.nav-brand-icon{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--gold),var(--accent));display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#fff;box-shadow:0 0 16px rgba(201,168,76,.25)}
.nav-brand-text{font-family:'DM Serif Display',serif;font-size:18px;background:linear-gradient(90deg,var(--gold2),var(--text));-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:.02em}
.nav-spacer{flex:1}
.nav-back-btn{display:flex;align-items:center;gap:8px;padding:8px 14px;border-radius:10px;border:1px solid var(--glass-border);background:var(--glass);color:var(--text2);font-size:13px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
.nav-back-btn:hover{color:var(--text);background:var(--bg3);border-color:rgba(201,168,76,.3)}
.theme-btn{width:40px;height:40px;border-radius:12px;border:1px solid var(--glass-border);background:var(--glass);color:var(--gold2);font-size:17px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s}
.theme-btn:hover{background:var(--gold-dim);transform:rotate(18deg)}

/* ── MESSAGES LAYOUT ── */
.msg-layout{display:flex;height:100vh;padding-top:var(--nav-h)}

/* ── LEFT: CONVERSATIONS LIST ── */
.conv-sidebar{width:var(--sidebar-w);flex-shrink:0;border-right:1px solid var(--glass-border);display:flex;flex-direction:column;background:var(--bg2);overflow:hidden}
.conv-header{padding:18px 16px 12px;border-bottom:1px solid var(--glass-border);flex-shrink:0}
.conv-title{font-family:'DM Serif Display',serif;font-size:20px;color:var(--text);margin-bottom:12px}
.conv-search{position:relative}
.conv-search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text3);pointer-events:none}
.conv-search-input{width:100%;background:var(--bg3);border:1px solid var(--glass-border);border-radius:40px;padding:9px 14px 9px 36px;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;outline:none;transition:all .2s}
.conv-search-input::placeholder{color:var(--text3)}
.conv-search-input:focus{border-color:rgba(201,168,76,.4);box-shadow:0 0 0 3px rgba(201,168,76,.08)}
.conv-list{flex:1;overflow-y:auto;padding:6px 0}
.conv-list::-webkit-scrollbar{width:3px}
.conv-list::-webkit-scrollbar-thumb{background:var(--glass-border);border-radius:4px}

/* ── CONVERSATION ITEM ── */
.conv-item{display:flex;align-items:center;gap:12px;padding:12px 16px;cursor:pointer;transition:all .18s;border-left:3px solid transparent;position:relative}
.conv-item:hover{background:var(--glass)}
.conv-item.active{background:var(--gold-dim);border-left-color:var(--gold)}
.conv-item.active .conv-name{color:var(--gold2)}
.conv-avatar-wrap{position:relative;flex-shrink:0}
.conv-avatar{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:600;color:#fff;overflow:hidden;flex-shrink:0}
.conv-avatar img{width:100%;height:100%;object-fit:cover}
.conv-online-dot{position:absolute;bottom:2px;right:2px;width:11px;height:11px;border-radius:50%;background:var(--green);border:2px solid var(--bg2)}
.conv-online-dot.offline{background:var(--text3)}
.conv-info{flex:1;min-width:0}
.conv-name-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:3px}
.conv-name{font-size:14px;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.conv-time{font-size:11px;color:var(--text3);flex-shrink:0;margin-left:6px}
.conv-preview{font-size:12px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:4px}
.conv-preview.you{color:var(--text2)}
.conv-unread-badge{min-width:18px;height:18px;border-radius:9px;background:var(--gold);color:#000;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 5px;flex-shrink:0;margin-left:auto}
.conv-typing-preview{color:var(--green);font-style:italic}

/* ── NEW CONVERSATION BUTTON ── */
.new-chat-btn{display:flex;align-items:center;gap:8px;margin:8px 12px 4px;padding:10px 14px;border-radius:12px;border:1px dashed rgba(201,168,76,.3);background:transparent;color:var(--gold2);font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;width:calc(100% - 24px);justify-content:center}
.new-chat-btn:hover{background:var(--gold-dim);border-style:solid}

/* ── RIGHT: CHAT WINDOW ── */
.chat-window{flex:1;display:flex;flex-direction:column;overflow:hidden;background:var(--bg)}
.chat-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:var(--text3)}
.chat-empty-icon{width:72px;height:72px;border-radius:50%;background:var(--gold-dim);border:1px solid rgba(201,168,76,.2);display:flex;align-items:center;justify-content:center;font-size:32px}

/* ── CHAT HEADER ── */
.chat-header{display:flex;align-items:center;gap:14px;padding:14px 20px;border-bottom:1px solid var(--glass-border);background:var(--bg2);flex-shrink:0}
.chat-header-info{flex:1;min-width:0}
.chat-header-name{font-size:15px;font-weight:600;color:var(--text)}
.chat-header-status{font-size:12px;color:var(--text3);margin-top:1px;display:flex;align-items:center;gap:5px}
.chat-header-status.online{color:var(--green)}
.chat-header-dot{width:6px;height:6px;border-radius:50%;background:currentColor;flex-shrink:0}
.chat-header-actions{display:flex;gap:6px}
.chat-icon-btn{width:38px;height:38px;border-radius:10px;border:1px solid var(--glass-border);background:var(--glass);color:var(--text2);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;flex-shrink:0}
.chat-icon-btn:hover{color:var(--text);background:var(--bg3);border-color:rgba(201,168,76,.3)}

/* ── MESSAGES AREA ── */
.messages-area{flex:1;overflow-y:auto;padding:20px 20px 8px;display:flex;flex-direction:column;gap:6px;scroll-behavior:smooth}
.messages-area::-webkit-scrollbar{width:4px}
.messages-area::-webkit-scrollbar-thumb{background:var(--glass-border);border-radius:4px}

/* ── DATE DIVIDER ── */
.date-divider{display:flex;align-items:center;gap:12px;margin:12px 0 8px;flex-shrink:0}
.date-divider-line{flex:1;height:1px;background:var(--glass-border)}
.date-divider-text{font-size:11px;color:var(--text3);white-space:nowrap;padding:0 4px}

/* ── MESSAGE BUBBLE ── */
.msg-row{display:flex;align-items:flex-end;gap:8px;animation:msgIn .2s ease both}
@keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.msg-row.mine{flex-direction:row-reverse}
.msg-row.mine .msg-avatar{display:none}
.msg-bubble-wrap{display:flex;flex-direction:column;gap:3px;max-width:68%}
.msg-row.mine .msg-bubble-wrap{align-items:flex-end}
.msg-bubble{padding:10px 14px;border-radius:18px;font-size:14px;line-height:1.55;word-break:break-word;position:relative}
.msg-row:not(.mine) .msg-bubble{background:var(--bg2);border:1px solid var(--glass-border);color:var(--text);border-bottom-left-radius:4px}
.msg-row.mine .msg-bubble{background:linear-gradient(135deg,var(--gold),#9a6e20);color:#fff;border-bottom-right-radius:4px;box-shadow:0 4px 14px rgba(201,168,76,.2)}
.msg-image{max-width:240px;border-radius:14px;overflow:hidden;cursor:pointer}
.msg-image img{width:100%;display:block;transition:opacity .2s}
.msg-image img:hover{opacity:.9}
.msg-meta{display:flex;align-items:center;gap:6px;padding:0 4px}
.msg-row.mine .msg-meta{flex-direction:row-reverse}
.msg-time{font-size:11px;color:var(--text3)}
.msg-status{font-size:11px;color:var(--text3)}
.msg-status.read{color:var(--gold)}

/* ── TYPING INDICATOR ── */
.typing-indicator{display:flex;align-items:center;gap:10px;padding:6px 0;animation:msgIn .2s ease}
.typing-bubble{background:var(--bg2);border:1px solid var(--glass-border);border-radius:18px;border-bottom-left-radius:4px;padding:12px 16px;display:flex;gap:5px;align-items:center}
.typing-dot{width:7px;height:7px;border-radius:50%;background:var(--text3);animation:typingBounce 1.2s infinite}
.typing-dot:nth-child(2){animation-delay:.2s}
.typing-dot:nth-child(3){animation-delay:.4s}
@keyframes typingBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}

/* ── INPUT BAR ── */
.chat-input-bar{padding:12px 16px;border-top:1px solid var(--glass-border);background:var(--bg2);flex-shrink:0}
.chat-input-wrap{display:flex;align-items:flex-end;gap:10px;background:var(--bg3);border:1px solid var(--glass-border);border-radius:20px;padding:6px 6px 6px 16px;transition:all .2s}
.chat-input-wrap:focus-within{border-color:rgba(201,168,76,.4);box-shadow:0 0 0 3px rgba(201,168,76,.07)}
.chat-textarea{flex:1;background:transparent;border:none;outline:none;color:var(--text);font-size:14px;font-family:'DM Sans',sans-serif;resize:none;max-height:120px;min-height:24px;line-height:1.5;padding:4px 0;overflow-y:auto}
.chat-textarea::placeholder{color:var(--text3)}
.chat-input-actions{display:flex;align-items:center;gap:4px;flex-shrink:0}
.chat-attach-btn{width:34px;height:34px;border-radius:9px;border:none;background:transparent;color:var(--text3);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}
.chat-attach-btn:hover{color:var(--gold2);background:var(--gold-dim)}
.chat-send-btn{width:38px;height:38px;border-radius:12px;border:none;background:linear-gradient(135deg,var(--gold),#9a6e20);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;flex-shrink:0;box-shadow:0 4px 12px rgba(201,168,76,.3)}
.chat-send-btn:hover{transform:scale(1.07);box-shadow:0 6px 18px rgba(201,168,76,.45)}
.chat-send-btn:disabled{opacity:.35;cursor:not-allowed;transform:none}
.file-input-hidden{display:none}

/* ── NEW CHAT MODAL ── */
.modal-overlay{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;animation:fadein .2s ease}
@keyframes fadein{from{opacity:0}to{opacity:1}}
.modal{background:var(--bg2);border:1px solid var(--glass-border);border-radius:20px;width:100%;max-width:440px;box-shadow:var(--shadow-lg);animation:scaleIn .22s ease;overflow:hidden}
@keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
.modal-header{display:flex;align-items:center;justify-content:space-between;padding:20px 22px 16px;border-bottom:1px solid var(--glass-border)}
.modal-title{font-family:'DM Serif Display',serif;font-size:19px;color:var(--text)}
.modal-close{width:34px;height:34px;border-radius:10px;background:var(--glass);border:1px solid var(--glass-border);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
.modal-close:hover{background:rgba(224,85,85,.1);color:var(--red)}
.modal-body{padding:16px 22px 22px}
.modal-input{width:100%;background:var(--bg3);border:1px solid var(--glass-border);border-radius:12px;padding:12px 16px;color:var(--text);font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:all .2s;margin-bottom:14px}
.modal-input::placeholder{color:var(--text3)}
.modal-input:focus{border-color:rgba(201,168,76,.35);box-shadow:0 0 0 3px rgba(201,168,76,.07)}
.modal-user-list{display:flex;flex-direction:column;gap:6px;max-height:260px;overflow-y:auto}
.modal-user-item{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;border:1px solid var(--glass-border);cursor:pointer;transition:all .18s}
.modal-user-item:hover{background:var(--glass);border-color:rgba(201,168,76,.25)}
.modal-user-item.selected{background:var(--gold-dim);border-color:rgba(201,168,76,.35)}
.modal-user-name{font-size:14px;font-weight:500;color:var(--text)}
.modal-user-sub{font-size:12px;color:var(--text3)}
.modal-footer{padding:0 22px 20px}
.modal-start-btn{width:100%;padding:12px;border-radius:12px;background:linear-gradient(135deg,var(--gold),#9a6e20);border:none;color:#fff;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .2s;box-shadow:0 4px 14px rgba(201,168,76,.28)}
.modal-start-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(201,168,76,.42)}
.modal-start-btn:disabled{opacity:.35;cursor:not-allowed;transform:none}

/* ── CONNECTION STATUS BANNER ── */
.conn-banner{padding:6px 16px;background:rgba(224,85,85,.12);border-bottom:1px solid rgba(224,85,85,.2);font-size:12px;color:var(--red);display:flex;align-items:center;gap:8px;animation:fadein .3s ease}
.conn-banner.connecting{background:rgba(201,168,76,.1);border-color:rgba(201,168,76,.2);color:var(--gold2)}
.conn-banner.connected{background:rgba(78,203,113,.1);border-color:rgba(78,203,113,.2);color:var(--green)}

/* ── IMAGE LIGHTBOX ── */
.lightbox{position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.92);display:flex;align-items:center;justify-content:center;animation:fadein .2s ease;cursor:zoom-out}
.lightbox img{max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 24px 80px rgba(0,0,0,.8)}

/* ── SCROLLBAR ── */
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--glass-border);border-radius:4px}

/* ── RESPONSIVE ── */
@media(max-width:768px){
  .conv-sidebar{width:100%;position:fixed;left:0;right:0;top:var(--nav-h);bottom:0;z-index:50;transform:translateX(0);transition:transform .28s cubic-bezier(.34,1,.64,1)}
  .conv-sidebar.hidden{transform:translateX(-100%)}
  .chat-window{width:100%}
  .msg-layout{position:relative}
}
`;

// ── Gradients for avatars ────────────────────────────────────
const GRADIENTS = [
  "linear-gradient(135deg,#6b8fff,#3d6fff)",
  "linear-gradient(135deg,#c9a84c,#e8c97a)",
  "linear-gradient(135deg,#ff6b6b,#ff8e53)",
  "linear-gradient(135deg,#4ecb71,#2ecc71)",
  "linear-gradient(135deg,#a855f7,#6b8fff)",
  "linear-gradient(135deg,#f093fb,#f5576c)",
  "linear-gradient(135deg,#4facfe,#00f2fe)",
];

// ── Sample users (backend se replace ho jayenge) ─────────────
const SAMPLE_USERS = [
  { _id: "u1", name: "Priya Sharma",  branch: "ECE · 2nd Year", avatar: "https://i.pravatar.cc/150?img=47" },
  { _id: "u2", name: "Rahul Verma",   branch: "ME · 3rd Year",  avatar: "https://i.pravatar.cc/150?img=12" },
  { _id: "u3", name: "Ananya Singh",  branch: "IT · 2nd Year",  avatar: "https://i.pravatar.cc/150?img=44" },
  { _id: "u4", name: "Arjun Mehta",   branch: "CS · 4th Year",  avatar: "https://i.pravatar.cc/150?img=15" },
  { _id: "u5", name: "Karan Joshi",   branch: "ECE · 1st Year", avatar: "https://i.pravatar.cc/150?img=8"  },
];

// ── Helper: Avatar Component ─────────────────────────────────
function Avatar({ name = "", src, size = 44, style = {} }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2);
  const idx      = name.charCodeAt(0) % GRADIENTS.length;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: GRADIENTS[idx],
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.32, fontWeight: 600, color: "#fff",
      overflow: "hidden", flexShrink: 0, ...style,
    }}>
      {src && (
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => { e.target.style.display = "none"; }} />
      )}
      {!src && <span>{initials}</span>}
    </div>
  );
}

// ── Helper: format time ──────────────────────────────────────
function fmtTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

function fmtMsgTime(ts) {
  if (!ts) return "";
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function groupByDate(messages) {
  const groups = [];
  let lastDate = null;
  messages.forEach(m => {
    const d = new Date(m.createdAt || m.timestamp);
    const label = isNaN(d) ? "" : d.toDateString() === new Date().toDateString()
      ? "Today" : d.toDateString() === new Date(Date.now() - 86400000).toDateString()
      ? "Yesterday" : d.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" });
    if (label !== lastDate) { groups.push({ type: "divider", label }); lastDate = label; }
    groups.push({ type: "msg", ...m });
  });
  return groups;
}

// ════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ════════════════════════════════════════════════════════════
export default function Message() {
  const navigate = useNavigate();

  // ── Current logged-in user (localStorage / context se lo) ──
  const currentUser = {
    _id:    localStorage.getItem("userId")   || "me",
    name:   localStorage.getItem("userName") || "Sourav Kumar",
    branch: localStorage.getItem("userBranch") || "CSE · 3rd Year",
    avatar: localStorage.getItem("profileImage") || "",
  };

  // ── State ────────────────────────────────────────────────
  const [socket,        setSocket]        = useState(null);
  const [connStatus,    setConnStatus]    = useState("connecting"); // connecting | connected | disconnected
  const [conversations, setConversations] = useState([]);
  const [activeConv,    setActiveConv]    = useState(null);
  const [messages,      setMessages]      = useState([]);
  const [inputText,     setInputText]     = useState("");
  const [typingUsers,   setTypingUsers]   = useState({});  // convId -> bool
  const [onlineUsers,   setOnlineUsers]   = useState(new Set());
  const [searchQuery,   setSearchQuery]   = useState("");
  const [showNewChat,   setShowNewChat]   = useState(false);
  const [newChatSearch, setNewChatSearch] = useState("");
  const [selectedUser,  setSelectedUser]  = useState(null);
  const [allUsers,      setAllUsers]      = useState(SAMPLE_USERS);
  const [lightboxSrc,   setLightboxSrc]   = useState(null);
  const [theme,         setTheme]         = useState("dark");
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  const messagesEndRef  = useRef(null);
  const typingTimerRef  = useRef(null);
  const fileInputRef    = useRef(null);
  const textareaRef     = useRef(null);
  const isTypingRef     = useRef(false);

  // ── THEME ────────────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem("cc-theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("cc-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  // ── SOCKET CONNECTION ────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("token");
    const s = io(SOCKET_URL, {
      auth:              { token: token || "demo" },
      transports:        ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay:    1500,
    });

    s.on("connect",            () => setConnStatus("connected"));
    s.on("disconnect",         () => setConnStatus("disconnected"));
    s.on("connect_error",      () => setConnStatus("disconnected"));
    s.on("reconnect_attempt",  () => setConnStatus("connecting"));

    // Real-time: receive message
    s.on("receive_message", msg => {
      setMessages(prev => {
        // Avoid duplicate if we already have it (optimistic update)
        if (prev.find(m => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
      // Update conversation preview
      setConversations(prev => prev.map(c =>
        c._id === msg.conversationId
          ? { ...c, lastMessage: msg, unread: c._id === activeConvRef.current?._id ? 0 : (c.unread || 0) + 1 }
          : c
      ));
    });

    // Typing indicators
    s.on("typing_start", ({ convId, userId, userName }) => {
      if (userId === currentUser._id) return;
      setTypingUsers(prev => ({ ...prev, [convId]: userName }));
    });
    s.on("typing_stop", ({ convId }) => {
      setTypingUsers(prev => { const n = { ...prev }; delete n[convId]; return n; });
    });

    // Online presence
    s.on("online_users", userIds => setOnlineUsers(new Set(userIds)));
    s.on("user_online",  ({ userId }) => setOnlineUsers(prev => new Set([...prev, userId])));
    s.on("user_offline", ({ userId }) => setOnlineUsers(prev => { const n = new Set(prev); n.delete(userId); return n; }));

    // Message read receipts
    s.on("messages_read", ({ convId, userId }) => {
      setMessages(prev => prev.map(m =>
        m.conversationId === convId && m.senderId !== userId
          ? { ...m, readBy: [...(m.readBy || []), userId] }
          : m
      ));
    });

    setSocket(s);
    return () => s.disconnect();
  }, []); // eslint-disable-line

  // ── Ref to track active conversation inside socket callbacks ─
  const activeConvRef = useRef(activeConv);
  useEffect(() => { activeConvRef.current = activeConv; }, [activeConv]);

  // ── LOAD CONVERSATIONS from backend ─────────────────────
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/conversations`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setConversations(data); })
      .catch(() => {
        // Demo mode: load sample conversations if backend not ready
        setConversations(SAMPLE_USERS.slice(0, 3).map((u, i) => ({
          _id:          `conv_${u._id}`,
          participants: [currentUser, u],
          otherUser:    u,
          lastMessage:  { text: ["Hey! How are you?", "Did you see the hackathon post?", "Let's study together!"][i], createdAt: new Date(Date.now() - i * 3600000) },
          unread:       i === 0 ? 2 : 0,
        })));
      });
  }, []); // eslint-disable-line

  // ── LOAD MESSAGES when conversation changes ──────────────
  useEffect(() => {
    if (!activeConv) return;
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/conversations/${activeConv._id}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setMessages(data); })
      .catch(() => {
        // Demo messages when backend not available
        setMessages([
          { _id: "d1", conversationId: activeConv._id, senderId: activeConv.otherUser?._id, text: "Hey there! 👋", createdAt: new Date(Date.now() - 300000), readBy: [currentUser._id] },
          { _id: "d2", conversationId: activeConv._id, senderId: currentUser._id, text: "Hi! What's up?", createdAt: new Date(Date.now() - 240000), readBy: [activeConv.otherUser?._id] },
          { _id: "d3", conversationId: activeConv._id, senderId: activeConv.otherUser?._id, text: "Just saw the hackathon registration opened 🚀", createdAt: new Date(Date.now() - 180000), readBy: [] },
          { _id: "d4", conversationId: activeConv._id, senderId: currentUser._id, text: "Oh nice! Are you registering?", createdAt: new Date(Date.now() - 120000), readBy: [] },
          { _id: "d5", conversationId: activeConv._id, senderId: activeConv.otherUser?._id, text: "Definitely! Want to team up? 🏆", createdAt: new Date(Date.now() - 60000), readBy: [] },
        ]);
      });

    // Mark as read
    if (socket) socket.emit("mark_read", { convId: activeConv._id });
    setConversations(prev => prev.map(c => c._id === activeConv._id ? { ...c, unread: 0 } : c));

    // Join socket room
    if (socket) socket.emit("join_conversation", { convId: activeConv._id });
    return () => { if (socket) socket.emit("leave_conversation", { convId: activeConv._id }); };
  }, [activeConv?._id]); // eslint-disable-line

  // ── AUTO SCROLL ──────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  // ── LOAD ALL USERS for new chat ──────────────────────────
  useEffect(() => {
    if (!showNewChat) return;
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/users`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setAllUsers(data); })
      .catch(() => setAllUsers(SAMPLE_USERS));
  }, [showNewChat]);

  // ── TYPING HANDLER ───────────────────────────────────────
  const handleTyping = useCallback(() => {
    if (!socket || !activeConv) return;
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      socket.emit("typing_start", { convId: activeConv._id });
    }
    clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      isTypingRef.current = false;
      socket.emit("typing_stop", { convId: activeConv._id });
    }, 1500);
  }, [socket, activeConv]);

  // ── SEND MESSAGE ─────────────────────────────────────────
  const sendMessage = useCallback(async (text, imageUrl = null) => {
    if ((!text.trim() && !imageUrl) || !activeConv) return;

    const token = localStorage.getItem("token");
    const tempId = `temp_${Date.now()}`;
    const optimisticMsg = {
      _id:            tempId,
      conversationId: activeConv._id,
      senderId:       currentUser._id,
      text:           text.trim(),
      imageUrl,
      createdAt:      new Date(),
      readBy:         [],
      pending:        true,
    };

    // Optimistic update
    setMessages(prev => [...prev, optimisticMsg]);
    setInputText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    // Stop typing
    clearTimeout(typingTimerRef.current);
    isTypingRef.current = false;
    if (socket) socket.emit("typing_stop", { convId: activeConv._id });

    try {
      const res = await fetch(`${BASE_URL}/api/conversations/${activeConv._id}/messages`, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ text: text.trim(), imageUrl }),
      });
      if (res.ok) {
        const saved = await res.json();
        setMessages(prev => prev.map(m => m._id === tempId ? { ...saved, pending: false } : m));
        // Emit via socket so other user gets it instantly
        if (socket) socket.emit("send_message", { ...saved, convId: activeConv._id });
        // Update conv preview
        setConversations(prev => prev.map(c =>
          c._id === activeConv._id ? { ...c, lastMessage: saved } : c
        ));
      }
    } catch {
      // Demo mode: keep optimistic msg visible
      setMessages(prev => prev.map(m => m._id === tempId ? { ...m, pending: false } : m));
    }
  }, [activeConv, currentUser._id, socket]);

  // ── SEND on Enter ────────────────────────────────────────
  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  // ── AUTO-RESIZE textarea ─────────────────────────────────
  const handleInput = e => {
    setInputText(e.target.value);
    handleTyping();
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  // ── IMAGE UPLOAD ─────────────────────────────────────────
  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    // If backend has /api/upload, use that; else use base64 (demo)
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${BASE_URL}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body:   formData,
      });
      if (res.ok) {
        const { url } = await res.json();
        sendMessage("", url);
      }
    } catch {
      // Fallback: base64
      const reader = new FileReader();
      reader.onload = ev => sendMessage("", ev.target.result);
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  // ── START NEW CONVERSATION ───────────────────────────────
  const startNewConversation = async () => {
    if (!selectedUser) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BASE_URL}/api/conversations`, {
        method:  "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body:    JSON.stringify({ participantId: selectedUser._id }),
      });
      if (res.ok) {
        const conv = await res.json();
        setConversations(prev => {
          if (prev.find(c => c._id === conv._id)) return prev;
          return [conv, ...prev];
        });
        setActiveConv(conv);
        setMobileChatOpen(true);
      }
    } catch {
      // Demo mode
      const demoConv = {
        _id:          `conv_${Date.now()}`,
        participants: [currentUser, selectedUser],
        otherUser:    selectedUser,
        lastMessage:  null,
        unread:       0,
      };
      setConversations(prev => [demoConv, ...prev]);
      setActiveConv(demoConv);
      setMessages([]);
      setMobileChatOpen(true);
    }
    setShowNewChat(false);
    setSelectedUser(null);
    setNewChatSearch("");
  };

  // ── HELPERS ──────────────────────────────────────────────
  const getOtherUser = conv => conv.otherUser || conv.participants?.find(p => p._id !== currentUser._id);
  const isOnline     = userId => onlineUsers.has(userId);

  const filteredConvs = conversations.filter(c => {
    const other = getOtherUser(c);
    return other?.name?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredUsers = allUsers.filter(u =>
    u._id !== currentUser._id &&
    u.name?.toLowerCase().includes(newChatSearch.toLowerCase())
  );

  // ── RENDER ────────────────────────────────────────────────
  return (
    <>
      <style>{FONTS}{CSS}</style>

      {/* NAVBAR */}
      <nav className="msg-navbar">
        <div className="nav-brand" onClick={() => navigate("/dashboard")}>
          <div className="nav-brand-icon">C</div>
          <span className="nav-brand-text">CampusConnect</span>
        </div>
        <div className="nav-spacer" />
        <button className="nav-back-btn" onClick={() => navigate("/dashboard")}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Feed
        </button>
        <button className="theme-btn" onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙"}</button>
      </nav>

      {/* Connection banner */}
      {connStatus !== "connected" && (
        <div className={`conn-banner ${connStatus}`} style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 99 }}>
          {connStatus === "connecting"
            ? <><span>⟳</span> Connecting to server…</>
            : <><span>⚠</span> Disconnected — messages may be delayed. Reconnecting…</>
          }
        </div>
      )}

      {/* MAIN LAYOUT */}
      <div className="msg-layout">

        {/* LEFT: CONVERSATIONS SIDEBAR */}
        <div className={`conv-sidebar${mobileChatOpen ? " hidden" : ""}`}>
          <div className="conv-header">
            <div className="conv-title">Messages</div>
            <div className="conv-search">
              <svg className="conv-search-icon" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input className="conv-search-input" placeholder="Search conversations…"
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
          </div>

          <button className="new-chat-btn" onClick={() => setShowNewChat(true)}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Conversation
          </button>

          <div className="conv-list">
            {filteredConvs.length === 0 && (
              <div style={{ padding: "32px 16px", textAlign: "center", color: "var(--text3)", fontSize: 13 }}>
                No conversations yet.<br />
                <span style={{ color: "var(--gold)", cursor: "pointer" }} onClick={() => setShowNewChat(true)}>Start one!</span>
              </div>
            )}
            {filteredConvs.map(conv => {
              const other   = getOtherUser(conv);
              const online  = isOnline(other?._id);
              const isActive = activeConv?._id === conv._id;
              const typing  = typingUsers[conv._id];
              return (
                <div key={conv._id} className={`conv-item ${isActive ? "active" : ""}`}
                  onClick={() => { setActiveConv(conv); setMobileChatOpen(true); }}>
                  <div className="conv-avatar-wrap">
                    <div className="conv-avatar">
                      <Avatar name={other?.name || ""} src={other?.avatar} size={46} />
                    </div>
                    <div className={`conv-online-dot ${online ? "" : "offline"}`} />
                  </div>
                  <div className="conv-info">
                    <div className="conv-name-row">
                      <span className="conv-name">{other?.name}</span>
                      <span className="conv-time">{fmtTime(conv.lastMessage?.createdAt)}</span>
                    </div>
                    <div className={`conv-preview ${conv.lastMessage?.senderId === currentUser._id ? "you" : ""}`}>
                      {typing
                        ? <span className="conv-typing-preview">typing…</span>
                        : conv.lastMessage?.senderId === currentUser._id
                          ? <><span style={{ color: "var(--text3)" }}>You: </span>{conv.lastMessage?.text || "📷 Photo"}</>
                          : conv.lastMessage?.text || "📷 Photo"
                      }
                    </div>
                  </div>
                  {conv.unread > 0 && <div className="conv-unread-badge">{conv.unread}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: CHAT WINDOW */}
        <div className="chat-window">
          {!activeConv ? (
            <div className="chat-empty">
              <div className="chat-empty-icon">💬</div>
              <div style={{ fontSize: 18, fontFamily: "'DM Serif Display',serif", color: "var(--text)" }}>
                Your Messages
              </div>
              <div style={{ fontSize: 14, maxWidth: 280, textAlign: "center", lineHeight: 1.6 }}>
                Select a conversation to start chatting, or begin a new one.
              </div>
              <button className="new-chat-btn" style={{ width: "auto", padding: "10px 22px" }} onClick={() => setShowNewChat(true)}>
                + New Conversation
              </button>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              {(() => {
                const other  = getOtherUser(activeConv);
                const online = isOnline(other?._id);
                const typing = typingUsers[activeConv._id];
                return (
                  <div className="chat-header">
                    {/* Mobile back */}
                    <button className="chat-icon-btn" style={{ display: "none" }}
                      onClick={() => setMobileChatOpen(false)}
                      ref={el => { if (el) el.style.display = window.innerWidth <= 768 ? "flex" : "none"; }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="15 18 9 12 15 6"/>
                      </svg>
                    </button>
                    <Avatar name={other?.name || ""} src={other?.avatar} size={42}
                      style={{ border: online ? "2px solid var(--green)" : "2px solid var(--glass-border)" }} />
                    <div className="chat-header-info">
                      <div className="chat-header-name">{other?.name}</div>
                      <div className={`chat-header-status ${online ? "online" : ""}`}>
                        <div className="chat-header-dot" />
                        {typing ? <em style={{ color: "var(--green)" }}>typing…</em>
                          : online ? "Online now" : other?.branch || "Offline"}
                      </div>
                    </div>
                    <div className="chat-header-actions">
                      <button className="chat-icon-btn" title="View profile" onClick={() => navigate("/profile")}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Messages Area */}
              <div className="messages-area">
                {groupByDate(messages).map((item, i) => {
                  if (item.type === "divider") return (
                    <div key={`div_${i}`} className="date-divider">
                      <div className="date-divider-line" />
                      <span className="date-divider-text">{item.label}</span>
                      <div className="date-divider-line" />
                    </div>
                  );

                  const isMine  = item.senderId === currentUser._id;
                  const other   = getOtherUser(activeConv);
                  const isRead  = isMine && item.readBy?.includes(other?._id);
                  return (
                    <div key={item._id} className={`msg-row ${isMine ? "mine" : ""}`}>
                      {!isMine && (
                        <div className="msg-avatar">
                          <Avatar name={other?.name || ""} src={other?.avatar} size={30} />
                        </div>
                      )}
                      <div className="msg-bubble-wrap">
                        {item.imageUrl ? (
                          <div className="msg-image" onClick={() => setLightboxSrc(item.imageUrl)}>
                            <img src={item.imageUrl} alt="img" />
                          </div>
                        ) : (
                          <div className="msg-bubble" style={{ opacity: item.pending ? 0.6 : 1 }}>
                            {item.text}
                          </div>
                        )}
                        <div className="msg-meta">
                          <span className="msg-time">{fmtMsgTime(item.createdAt || item.timestamp)}</span>
                          {isMine && (
                            <span className={`msg-status ${isRead ? "read" : ""}`}>
                              {item.pending ? "⏳" : isRead ? "✓✓" : "✓"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Typing indicator */}
                {typingUsers[activeConv?._id] && (
                  <div className="typing-indicator">
                    <Avatar name={getOtherUser(activeConv)?.name || ""} src={getOtherUser(activeConv)?.avatar} size={30} />
                    <div className="typing-bubble">
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar */}
              <div className="chat-input-bar">
                <div className="chat-input-wrap">
                  <textarea
                    ref={textareaRef}
                    className="chat-textarea"
                    placeholder={`Message ${getOtherUser(activeConv)?.name?.split(" ")[0] || ""}…`}
                    value={inputText}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    rows={1}
                  />
                  <div className="chat-input-actions">
                    <button className="chat-attach-btn" onClick={() => fileInputRef.current?.click()} title="Send image">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </button>
                    <button className="chat-send-btn" disabled={!inputText.trim()} onClick={() => sendMessage(inputText)}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="file-input-hidden" onChange={handleImageUpload} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* NEW CHAT MODAL */}
      {showNewChat && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowNewChat(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">New Conversation</div>
              <button className="modal-close" onClick={() => { setShowNewChat(false); setSelectedUser(null); }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <input className="modal-input" placeholder="Search by name…"
                value={newChatSearch} onChange={e => setNewChatSearch(e.target.value)} autoFocus />
              <div className="modal-user-list">
                {filteredUsers.length === 0
                  ? <div style={{ padding: "16px", textAlign: "center", color: "var(--text3)", fontSize: 13 }}>No users found</div>
                  : filteredUsers.map(u => (
                    <div key={u._id}
                      className={`modal-user-item ${selectedUser?._id === u._id ? "selected" : ""}`}
                      onClick={() => setSelectedUser(u)}>
                      <div style={{ position: "relative" }}>
                        <Avatar name={u.name} src={u.avatar} size={40} />
                        {isOnline(u._id) && (
                          <div style={{ position: "absolute", bottom: 1, right: 1, width: 10, height: 10, borderRadius: "50%", background: "var(--green)", border: "2px solid var(--bg2)" }} />
                        )}
                      </div>
                      <div>
                        <div className="modal-user-name">{u.name}</div>
                        <div className="modal-user-sub">{u.branch || u.role}</div>
                      </div>
                      {selectedUser?._id === u._id && (
                        <div style={{ marginLeft: "auto", color: "var(--gold)", fontSize: 16 }}>✓</div>
                      )}
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-start-btn" disabled={!selectedUser} onClick={startNewConversation}>
                Start Conversation {selectedUser ? `with ${selectedUser.name.split(" ")[0]}` : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE LIGHTBOX */}
      {lightboxSrc && (
        <div className="lightbox" onClick={() => setLightboxSrc(null)}>
          <img src={lightboxSrc} alt="full" />
        </div>
      )}
    </>
  );
}