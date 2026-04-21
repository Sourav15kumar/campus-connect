import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./shared";

// ── Shared avatar map (same as Dashboard)
const AVATARS = {
  "Priya Sharma":  "https://i.pravatar.cc/150?img=47",
  "Rahul Verma":   "https://i.pravatar.cc/150?img=12",
  "Ananya Singh":  "https://i.pravatar.cc/150?img=44",
  "Arjun Mehta":   "https://i.pravatar.cc/150?img=15",
  "Sourav Kumar":  "https://i.pravatar.cc/150?img=3",
  "Neha Gupta":    "https://i.pravatar.cc/150?img=25",
  "Karan Joshi":   "https://i.pravatar.cc/150?img=8",
};

const GRADIENTS = [
  "linear-gradient(135deg,#6b8fff,#3d6fff)",
  "linear-gradient(135deg,#c9a84c,#e8c97a)",
  "linear-gradient(135deg,#ff6b6b,#ff8e53)",
  "linear-gradient(135deg,#4ecb71,#2ecc71)",
  "linear-gradient(135deg,#a855f7,#6b8fff)",
];

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');`;

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0a0c10;--bg2:#0f1218;--bg3:#151a22;
  --glass:rgba(255,255,255,0.035);--glass-border:rgba(255,255,255,0.07);
  --gold:#c9a84c;--gold2:#e8c97a;--gold-dim:rgba(201,168,76,0.15);
  --text:#e8e6e1;--text2:#8a8880;--text3:#5a5856;
  --accent:#3d6fff;--accent2:#6b8fff;--red:#e05555;--green:#4ecb71;
  --sidebar-w:240px;--nav-h:64px;--radius:16px;--radius-sm:10px;
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
html,body,#root{height:100%}
body{font-family:'DM Sans',sans-serif;color:var(--text);background:var(--bg);overflow-x:hidden;transition:background .3s,color .3s}

/* NAVBAR */
.navbar{position:fixed;top:0;left:0;right:0;z-index:100;height:var(--nav-h);display:flex;align-items:center;background:var(--nav-bg);backdrop-filter:blur(24px);border-bottom:1px solid var(--glass-border);padding:0 16px;gap:12px;transition:background .3s}
.nav-brand{display:flex;align-items:center;gap:10px;flex-shrink:0;text-decoration:none;cursor:pointer}
.nav-brand-icon{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--gold),var(--accent));display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#fff}
.nav-brand-text{font-family:'DM Serif Display',serif;font-size:18px;background:linear-gradient(90deg,var(--gold2),var(--text));-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:.02em;white-space:nowrap}
.nav-center{flex:1;display:flex;align-items:center;justify-content:center;min-width:0}
.search-wrap{position:relative;width:100%;max-width:440px}
.search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--text3);pointer-events:none}
.search-input{width:100%;background:var(--glass);border:1px solid var(--glass-border);border-radius:40px;padding:10px 16px 10px 40px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:all .2s}
.search-input::placeholder{color:var(--text3)}
.search-input:focus{border-color:rgba(201,168,76,.4);background:var(--bg2)}
.nav-right{display:flex;align-items:center;gap:6px;flex-shrink:0}
.nav-btn{width:40px;height:40px;border-radius:12px;border:1px solid transparent;background:transparent;color:var(--text2);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}
.nav-btn:hover{background:var(--glass);color:var(--text)}
.theme-btn{width:40px;height:40px;border-radius:12px;border:1px solid var(--glass-border);background:var(--glass);color:var(--gold2);font-size:17px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s}
.theme-btn:hover{background:var(--gold-dim);border-color:rgba(201,168,76,.3);transform:rotate(18deg)}
.nav-divider{width:1px;height:28px;background:var(--glass-border);margin:0 2px}
.nav-profile-btn{display:flex;align-items:center;gap:8px;padding:5px 10px 5px 5px;border-radius:40px;border:1px solid var(--glass-border);background:var(--glass);cursor:pointer;transition:all .2s;color:var(--text)}
.nav-profile-btn:hover{border-color:rgba(201,168,76,.38);background:var(--gold-dim)}
.nav-avatar{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--accent));display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;overflow:hidden;flex-shrink:0;box-shadow:0 0 0 1.5px var(--gold)}
.nav-avatar img{width:100%;height:100%;object-fit:cover}
.nav-profile-info{line-height:1.2}
.nav-profile-name{font-size:13px;font-weight:500;white-space:nowrap}
.nav-profile-sub{font-size:11px;color:var(--text3);white-space:nowrap}

/* LAYOUT */
.app{min-height:100vh;background:var(--bg);background-image:radial-gradient(ellipse 80% 50% at 20% -10%,rgba(61,111,255,.07) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 80% 100%,rgba(201,168,76,.04) 0%,transparent 60%);transition:background .3s}
html[data-theme="light"] .app{background-image:radial-gradient(ellipse 80% 50% at 20% -10%,rgba(61,111,255,.04) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 80% 100%,rgba(201,168,76,.03) 0%,transparent 60%)}
.layout{display:flex;padding-top:var(--nav-h);min-height:100vh}

/* SIDEBAR */
.sidebar{width:var(--sidebar-w);flex-shrink:0;position:sticky;top:var(--nav-h);height:calc(100vh - var(--nav-h));overflow-y:auto;padding:20px 14px;display:flex;flex-direction:column;gap:4px;border-right:1px solid var(--glass-border)}
.sidebar-label{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);padding:12px 12px 6px}
.nav-item{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:var(--radius-sm);cursor:pointer;border:1px solid transparent;transition:all .2s;color:var(--text2);font-size:14px}
.nav-item:hover{background:var(--glass);border-color:var(--glass-border);color:var(--text)}
.nav-item.active{background:var(--gold-dim);border-color:rgba(201,168,76,.2);color:var(--gold2)}
.sidebar-divider{height:1px;background:var(--glass-border);margin:8px 0}
.logout-btn{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:var(--radius-sm);cursor:pointer;border:1px solid transparent;background:none;transition:all .2s;color:var(--text3);font-size:14px;font-family:'DM Sans',sans-serif;width:100%;text-align:left;margin-top:auto}
.logout-btn:hover{background:rgba(224,85,85,.08);border-color:rgba(224,85,85,.2);color:var(--red)}

/* MAIN CONTENT */
.main{flex:1;padding:24px 24px 60px;max-width:900px;margin:0 auto;width:100%}

/* PAGE HEADER */
.page-header{margin-bottom:28px;animation:fadeUp .4s ease}
.page-title{font-family:'DM Serif Display',serif;font-size:32px;color:var(--text);margin-bottom:6px}
.page-subtitle{font-size:14px;color:var(--text3)}

/* FILTER TABS */
.filter-row{display:flex;gap:8px;margin-bottom:24px;flex-wrap:wrap;animation:fadeUp .4s ease .05s both}
.filter-tab{padding:8px 18px;border-radius:40px;border:1px solid var(--glass-border);background:var(--glass);color:var(--text2);font-size:13px;font-weight:500;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
.filter-tab:hover{background:var(--bg2);color:var(--text)}
.filter-tab.active{background:var(--gold-dim);border-color:rgba(201,168,76,.3);color:var(--gold2)}

/* FEATURED EVENT BANNER */
.featured-event{background:var(--bg2);border:1px solid var(--glass-border);border-radius:20px;overflow:hidden;margin-bottom:24px;display:flex;min-height:200px;position:relative;animation:fadeUp .4s ease .1s both;cursor:pointer;transition:all .25s}
.featured-event:hover{border-color:rgba(201,168,76,.3);box-shadow:var(--shadow)}
.featured-bg{position:absolute;inset:0;background:linear-gradient(135deg,rgba(61,111,255,.15),rgba(201,168,76,.12));pointer-events:none}
.featured-bg-pattern{position:absolute;inset:0;background-image:radial-gradient(circle at 70% 50%,rgba(201,168,76,.08) 0%,transparent 60%),radial-gradient(circle at 20% 80%,rgba(61,111,255,.06) 0%,transparent 40%);pointer-events:none}
.featured-content{position:relative;z-index:1;padding:28px 32px;flex:1;display:flex;flex-direction:column;justify-content:space-between}
.featured-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:20px;background:var(--gold-dim);border:1px solid rgba(201,168,76,.3);font-size:11px;font-weight:600;color:var(--gold2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px;width:fit-content}
.featured-title{font-family:'DM Serif Display',serif;font-size:26px;color:var(--text);margin-bottom:8px;line-height:1.2}
.featured-meta{display:flex;flex-wrap:wrap;gap:16px;margin-bottom:16px}
.featured-meta-item{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text2)}
.featured-actions{display:flex;gap:10px;flex-wrap:wrap}
.btn-primary{padding:10px 24px;border-radius:40px;background:linear-gradient(135deg,var(--gold),#a0782a);border:none;cursor:pointer;color:#fff;font-size:13px;font-weight:600;font-family:'DM Sans',sans-serif;transition:all .2s;box-shadow:0 4px 14px rgba(201,168,76,.25)}
.btn-primary:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(201,168,76,.4)}
.btn-secondary{padding:10px 20px;border-radius:40px;background:var(--glass);border:1px solid var(--glass-border);cursor:pointer;color:var(--text2);font-size:13px;font-weight:500;font-family:'DM Sans',sans-serif;transition:all .2s}
.btn-secondary:hover{background:var(--bg3);color:var(--text)}
.featured-image-side{width:220px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:80px;padding:20px;position:relative}

/* EVENTS GRID */
.events-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-bottom:32px}
.event-card{background:var(--bg2);border:1px solid var(--glass-border);border-radius:var(--radius);overflow:hidden;cursor:pointer;transition:all .25s;animation:fadeUp .4s ease both}
.event-card:hover{border-color:rgba(201,168,76,.25);box-shadow:var(--shadow);transform:translateY(-2px)}
.event-card-top{height:120px;position:relative;display:flex;align-items:center;justify-content:center;font-size:48px}
.event-card-category{position:absolute;top:12px;left:12px;padding:4px 10px;border-radius:20px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.08em}
.event-card-date-badge{position:absolute;top:12px;right:12px;background:rgba(0,0,0,.55);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:6px 10px;text-align:center}
.event-card-day{font-family:'DM Serif Display',serif;font-size:20px;color:#fff;line-height:1}
.event-card-mon{font-size:9px;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.08em;margin-top:1px}
.event-card-body{padding:14px 16px}
.event-card-title{font-size:15px;font-weight:500;color:var(--text);margin-bottom:6px}
.event-card-sub{font-size:12px;color:var(--text3);margin-bottom:12px;line-height:1.45}
.event-card-footer{display:flex;align-items:center;justify-content:space-between;padding-top:10px;border-top:1px solid var(--glass-border)}
.event-card-attendees{display:flex;align-items:center;gap:-4px}
.attendee-pip{width:22px;height:22px;border-radius:50%;border:2px solid var(--bg2);overflow:hidden;background:var(--bg3);flex-shrink:0}
.attendee-pip img{width:100%;height:100%;object-fit:cover}
.attendee-count{font-size:11px;color:var(--text3);margin-left:8px}
.event-register-btn{padding:5px 14px;border-radius:20px;border:1px solid rgba(201,168,76,.3);background:var(--gold-dim);color:var(--gold2);font-size:11px;font-weight:500;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
.event-register-btn:hover{background:rgba(201,168,76,.22)}
.event-register-btn.registered{background:rgba(78,203,113,.1);border-color:rgba(78,203,113,.3);color:var(--green)}

/* SECTION TITLE */
.section-title{font-family:'DM Serif Display',serif;font-size:20px;color:var(--text);margin-bottom:16px;display:flex;align-items:center;gap:10px}
.section-title::after{content:'';flex:1;height:1px;background:var(--glass-border)}

/* CALENDAR STRIP */
.calendar-strip{background:var(--bg2);border:1px solid var(--glass-border);border-radius:var(--radius);padding:16px 20px;margin-bottom:24px;animation:fadeUp .4s ease .15s both}
.calendar-month{font-size:12px;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px}
.calendar-days{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none}
.calendar-days::-webkit-scrollbar{display:none}
.cal-day{flex-shrink:0;width:48px;text-align:center;padding:8px 4px;border-radius:12px;cursor:pointer;transition:all .2s;border:1px solid transparent}
.cal-day:hover{background:var(--glass);border-color:var(--glass-border)}
.cal-day.active{background:var(--gold-dim);border-color:rgba(201,168,76,.3)}
.cal-day.has-event::after{content:'';display:block;width:4px;height:4px;border-radius:50%;background:var(--gold);margin:4px auto 0}
.cal-day-name{font-size:10px;color:var(--text3);text-transform:uppercase;margin-bottom:4px}
.cal-day-num{font-size:16px;font-weight:500;color:var(--text)}
.cal-day.active .cal-day-num{color:var(--gold2)}

/* MODAL */
.modal-overlay{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;animation:fadein .2s ease}
.modal{background:var(--bg2);border:1px solid var(--glass-border);border-radius:20px;width:100%;max-width:560px;box-shadow:var(--shadow-lg);animation:scaleIn .22s ease;max-height:88vh;overflow-y:auto}
@keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
@keyframes fadein{from{opacity:0}to{opacity:1}}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.modal-header{display:flex;align-items:center;justify-content:space-between;padding:20px 22px 0;position:sticky;top:0;background:var(--bg2);z-index:1;border-radius:20px 20px 0 0}
.modal-title{font-family:'DM Serif Display',serif;font-size:20px;color:var(--text)}
.modal-close{width:36px;height:36px;border-radius:10px;background:var(--glass);border:1px solid var(--glass-border);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
.modal-close:hover{background:rgba(224,85,85,.1);border-color:rgba(224,85,85,.2);color:var(--red)}
.modal-body{padding:18px 22px 22px}
.modal-event-banner{height:160px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:64px;margin-bottom:18px;position:relative;overflow:hidden}
.modal-event-banner-bg{position:absolute;inset:0}
.modal-detail-row{display:flex;align-items:flex-start;gap:12px;margin-bottom:14px}
.modal-detail-icon{width:34px;height:34px;border-radius:10px;background:var(--bg3);border:1px solid var(--glass-border);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.modal-detail-label{font-size:11px;color:var(--text3);margin-bottom:2px;text-transform:uppercase;letter-spacing:.06em}
.modal-detail-value{font-size:14px;color:var(--text);font-weight:500}
.modal-desc{font-size:14px;color:var(--text2);line-height:1.65;padding:14px;background:var(--bg3);border-radius:12px;border:1px solid var(--glass-border);margin-bottom:18px}
.modal-attendees-row{display:flex;align-items:center;gap:10px;margin-bottom:18px}
.modal-footer{display:flex;gap:10px;padding:12px 22px 20px;border-top:1px solid var(--glass-border)}

/* TOAST */
.toast-container{position:fixed;bottom:24px;right:24px;z-index:500;display:flex;flex-direction:column;gap:10px;pointer-events:none}
.toast{display:flex;align-items:center;gap:12px;padding:14px 18px;background:var(--bg2);border:1px solid var(--glass-border);border-radius:14px;box-shadow:var(--shadow);font-size:14px;color:var(--text);animation:toastIn .3s ease;pointer-events:auto;min-width:260px;max-width:320px}
@keyframes toastIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
.toast-icon{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;background:rgba(78,203,113,.15)}

/* SCROLLBAR */
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--glass-border);border-radius:4px}

/* RESPONSIVE */
@media(max-width:768px){
  .sidebar{display:none}
  .featured-image-side{display:none}
  .featured-content{padding:20px}
  .main{padding:12px 12px 80px}
  .events-grid{grid-template-columns:1fr}
}
`;

// ── Events seed data
const ALL_EVENTS = [
  {
    id: 1, title: "Hackathon 2025", emoji: "💻", day: "07", mon: "Apr", year: "2025",
    category: "Tech", catColor: "rgba(61,111,255,.2)", catText: "#6b8fff",
    bg: "linear-gradient(135deg,rgba(61,111,255,.25),rgba(107,143,255,.12))",
    location: "Online · Zoom", time: "10:00 AM – 10:00 PM", organizer: "Tech Club",
    seats: 120, registered: 84, isRegistered: false,
    desc: "24-hour hackathon open to all students. Build something amazing — AI tools, social apps, dev utilities. Top 3 teams win cash prizes and internship referrals. Solo or team of up to 4.",
    tags: ["Prizes", "Team Event", "Open Source"],
    attendeeImgs: ["https://i.pravatar.cc/150?img=47", "https://i.pravatar.cc/150?img=12", "https://i.pravatar.cc/150?img=44"],
  },
  {
    id: 2, title: "Placement Drive", emoji: "🏢", day: "12", mon: "Apr", year: "2025",
    category: "Career", catColor: "rgba(201,168,76,.2)", catText: "#e8c97a",
    bg: "linear-gradient(135deg,rgba(201,168,76,.22),rgba(232,201,122,.1))",
    location: "LT Hall · CSE Dept", time: "9:00 AM – 5:00 PM", organizer: "Training & Placement Cell",
    seats: 200, registered: 178, isRegistered: false,
    desc: "Annual placement drive with 15+ companies including TCS, Infosys, Wipro, and startups. Bring updated resume, formal attire mandatory. Pre-registration compulsory. Mock interviews available the day before.",
    tags: ["Placement", "Companies", "Resume"],
    attendeeImgs: ["https://i.pravatar.cc/150?img=15", "https://i.pravatar.cc/150?img=25", "https://i.pravatar.cc/150?img=8"],
  },
  {
    id: 3, title: "Cultural Fest", emoji: "🎭", day: "18", mon: "Apr", year: "2025",
    category: "Cultural", catColor: "rgba(248,113,113,.2)", catText: "#f87171",
    bg: "linear-gradient(135deg,rgba(248,113,113,.2),rgba(251,146,60,.12))",
    location: "Main Campus · Open Ground", time: "4:00 PM – 11:00 PM", organizer: "Student Council",
    seats: 500, registered: 312, isRegistered: false,
    desc: "Annual cultural extravaganza with dance competitions, music performances, stand-up comedy, and food stalls. Free entry for all students. Guest artist performance at 8 PM.",
    tags: ["Free Entry", "Music", "Dance", "Food"],
    attendeeImgs: ["https://i.pravatar.cc/150?img=3", "https://i.pravatar.cc/150?img=47", "https://i.pravatar.cc/150?img=12"],
  },
  {
    id: 4, title: "AI/ML Workshop", emoji: "🤖", day: "22", mon: "Apr", year: "2025",
    category: "Workshop", catColor: "rgba(168,85,247,.2)", catText: "#c084fc",
    bg: "linear-gradient(135deg,rgba(168,85,247,.2),rgba(107,143,255,.12))",
    location: "Lab 3 · IT Block", time: "2:00 PM – 6:00 PM", organizer: "AI Club",
    seats: 60, registered: 58, isRegistered: false,
    desc: "Hands-on workshop covering Transformers, LLMs, and prompt engineering. Prerequisites: Basic Python. Bring your laptop. Certificates provided. Limited seats — register early!",
    tags: ["Hands-on", "Certificate", "Limited Seats"],
    attendeeImgs: ["https://i.pravatar.cc/150?img=44", "https://i.pravatar.cc/150?img=15", "https://i.pravatar.cc/150?img=25"],
  },
  {
    id: 5, title: "Sports Day", emoji: "⚽", day: "25", mon: "Apr", year: "2025",
    category: "Sports", catColor: "rgba(78,203,113,.2)", catText: "#4ecb71",
    bg: "linear-gradient(135deg,rgba(78,203,113,.2),rgba(16,185,129,.1))",
    location: "Sports Ground · Block B", time: "8:00 AM – 6:00 PM", organizer: "Sports Committee",
    seats: 300, registered: 145, isRegistered: false,
    desc: "Inter-branch sports competition covering cricket, football, badminton, table tennis and more. Register for your branch team. Individual events also available. Medals for top performers.",
    tags: ["Competition", "Team Sports", "Medals"],
    attendeeImgs: ["https://i.pravatar.cc/150?img=8", "https://i.pravatar.cc/150?img=3", "https://i.pravatar.cc/150?img=47"],
  },
  {
    id: 6, title: "Entrepreneurship Talk", emoji: "🚀", day: "02", mon: "May", year: "2025",
    category: "Talk", catColor: "rgba(251,191,36,.2)", catText: "#fbbf24",
    bg: "linear-gradient(135deg,rgba(251,191,36,.2),rgba(245,158,11,.1))",
    location: "Auditorium · Main Block", time: "3:00 PM – 5:00 PM", organizer: "E-Cell",
    seats: 250, registered: 89, isRegistered: false,
    desc: "Fireside chat with startup founders and investors. Learn about product building, fundraising, and scaling. Q&A session at the end. Networking hour post-event. Open to all branches.",
    tags: ["Startup", "Networking", "Q&A"],
    attendeeImgs: ["https://i.pravatar.cc/150?img=12", "https://i.pravatar.cc/150?img=44", "https://i.pravatar.cc/150?img=15"],
  },
];

const CATEGORIES = ["All", "Tech", "Career", "Cultural", "Workshop", "Sports", "Talk"];

function Avatar({ name, src, size = 44, style = {} }) {
  const initials = name ? name.split(" ").map(w => w[0]).join("").slice(0, 2) : "?";
  const idx = name ? name.charCodeAt(0) % GRADIENTS.length : 0;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: GRADIENTS[idx], display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.32, fontWeight: 600, color: "#fff", overflow: "hidden", flexShrink: 0, ...style }}>
      {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} /> : <span>{initials}</span>}
    </div>
  );
}

export default function Events() {
  const navigate = useNavigate();
  const user = { name: "Sourav Kumar", branch: "CSE", year: "3rd Year" };

  const [theme, setTheme] = useState(() => localStorage.getItem("cc-theme") || "dark");
  const [activeFilter, setActiveFilter] = useState("All");
  const [events, setEvents] = useState(ALL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [activeNav] = useState("events");

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("cc-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const addToast = (msg, icon) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, icon }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  };

  const registerEvent = (id) => {
    setEvents(prev => prev.map(e => {
      if (e.id !== id) return e;
      const wasRegistered = e.isRegistered;
      addToast(wasRegistered ? `Unregistered from ${e.title}` : `Registered for ${e.title}! 🎉`, wasRegistered ? "❌" : "✅");
      return { ...e, isRegistered: !wasRegistered, registered: wasRegistered ? e.registered - 1 : e.registered + 1 };
    }));
    if (selectedEvent?.id === id) {
      setSelectedEvent(prev => prev ? { ...prev, isRegistered: !prev.isRegistered, registered: prev.isRegistered ? prev.registered - 1 : prev.registered + 1 } : null);
    }
  };

  const filteredEvents = activeFilter === "All" ? events : events.filter(e => e.category === activeFilter);
  const featuredEvent = events[0];

  // Calendar strip — April 2025 days 1–30
  const calDays = Array.from({ length: 30 }, (_, i) => {
    const d = i + 1;
    const names = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const date = new Date(2025, 3, d); // April 2025
    const hasEvent = events.some(e => e.mon === "Apr" && parseInt(e.day) === d);
    return { d, name: names[date.getDay()], hasEvent };
  });

  const navItems = [
    { id: "home", icon: "⌂", label: "Home Feed", path: "/dashboard" },
    { id: "network", icon: "◎", label: "Network", path: "/network" },
    { id: "messages", icon: "◻", label: "Messages", path: "/message" },
    { id: "events", icon: "◈", label: "Events", path: "/events" },
  ];

  const profileImg = localStorage.getItem("profileImage") || AVATARS[user.name];

  return (
    <>
      <style>{FONTS}{CSS}</style>
      <div className="app">

        {/* NAVBAR */}
        <nav className="navbar">
          <div className="nav-brand" onClick={() => navigate("/dashboard")}>
            <div className="nav-brand-icon">C</div>
            <span className="nav-brand-text">CampusConnect</span>
          </div>
          <div className="nav-center">
            <div className="search-wrap">
              <svg className="search-icon" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input className="search-input" placeholder="Search events…" />
            </div>
          </div>
          <div className="nav-right">
            <button className="theme-btn" onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙"}</button>
            <div className="nav-divider" />
            <div className="nav-profile-btn" onClick={() => navigate("/profile")}>
              <div className="nav-avatar">
                <img src={profileImg} alt={user.name} onError={e => { e.target.style.display = "none"; }} />
              </div>
              <div className="nav-profile-info">
                <div className="nav-profile-name">{user.name}</div>
                <div className="nav-profile-sub">{user.branch} · {user.year}</div>
              </div>
            </div>
          </div>
        </nav>

        <div className="layout">

          {/* SIDEBAR */}
          <aside className="sidebar">
            <div className="sidebar-label">Navigation</div>
            {navItems.map(item => (
              <div key={item.id} className={`nav-item ${activeNav === item.id ? "active" : ""}`}
                onClick={() => navigate(item.path)}>
                <span style={{ fontSize: 17 }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
            <div className="sidebar-divider" />
            <div className="sidebar-label">Your Profile</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "var(--bg2)", borderRadius: "var(--radius-sm)", border: "1px solid var(--glass-border)", cursor: "pointer", transition: "all .2s" }}
              onClick={() => navigate("/profile")}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,.32)"; e.currentTarget.style.background = "var(--gold-dim)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--glass-border)"; e.currentTarget.style.background = "var(--bg2)"; }}>
              <Avatar name={user.name} src={profileImg} size={38} style={{ border: "2px solid var(--gold)" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>{user.branch} · {user.year}</div>
              </div>
            </div>
            <div className="sidebar-divider" />
            <button className="logout-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Log Out
            </button>
          </aside>

          {/* MAIN */}
          <main className="main">
            <div className="page-header">
              <div className="page-title">Events 🎪</div>
              <div className="page-subtitle">{events.length} upcoming events on campus</div>
            </div>

            {/* Calendar strip */}
            <div className="calendar-strip">
              <div className="calendar-month">April 2025</div>
              <div className="calendar-days">
                {calDays.map(d => (
                  <div key={d.d} className={`cal-day ${d.hasEvent ? "has-event" : ""} ${d.d === 7 ? "active" : ""}`}>
                    <div className="cal-day-name">{d.name}</div>
                    <div className="cal-day-num">{d.d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured event */}
            <div className="section-title">Featured</div>
            <div className="featured-event" onClick={() => setSelectedEvent(featuredEvent)}>
              <div className="featured-bg" />
              <div className="featured-bg-pattern" />
              <div className="featured-content">
                <div>
                  <div className="featured-badge">⭐ Featured Event</div>
                  <div className="featured-title">{featuredEvent.title}</div>
                  <div className="featured-meta">
                    <span className="featured-meta-item">📅 {featuredEvent.day} {featuredEvent.mon}, {featuredEvent.year}</span>
                    <span className="featured-meta-item">📍 {featuredEvent.location}</span>
                    <span className="featured-meta-item">⏰ {featuredEvent.time}</span>
                  </div>
                </div>
                <div className="featured-actions">
                  <button className="btn-primary" onClick={e => { e.stopPropagation(); registerEvent(featuredEvent.id); }}>
                    {featuredEvent.isRegistered ? "✓ Registered" : "Register Now"}
                  </button>
                  <button className="btn-secondary" onClick={e => { e.stopPropagation(); setSelectedEvent(featuredEvent); }}>View Details</button>
                </div>
              </div>
              <div className="featured-image-side">{featuredEvent.emoji}</div>
            </div>

            {/* Filter tabs */}
            <div className="filter-row">
              {CATEGORIES.map(cat => (
                <button key={cat} className={`filter-tab ${activeFilter === cat ? "active" : ""}`}
                  onClick={() => setActiveFilter(cat)}>{cat}</button>
              ))}
            </div>

            {/* Events grid */}
            <div className="section-title">All Events</div>
            <div className="events-grid">
              {filteredEvents.map((ev, i) => (
                <div key={ev.id} className="event-card" style={{ animationDelay: `${i * 0.05}s` }}
                  onClick={() => setSelectedEvent(ev)}>
                  <div className="event-card-top" style={{ background: ev.bg }}>
                    <span>{ev.emoji}</span>
                    <div className="event-card-category" style={{ background: ev.catColor, color: ev.catText }}>
                      {ev.category}
                    </div>
                    <div className="event-card-date-badge">
                      <div className="event-card-day">{ev.day}</div>
                      <div className="event-card-mon">{ev.mon}</div>
                    </div>
                  </div>
                  <div className="event-card-body">
                    <div className="event-card-title">{ev.title}</div>
                    <div className="event-card-sub">📍 {ev.location} · ⏰ {ev.time}</div>
                    <div className="event-card-footer">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="event-card-attendees">
                          {ev.attendeeImgs.slice(0, 3).map((src, j) => (
                            <div key={j} className="attendee-pip" style={{ marginLeft: j > 0 ? -8 : 0 }}>
                              <img src={src} alt="" />
                            </div>
                          ))}
                        </div>
                        <span className="attendee-count">+{ev.registered} going</span>
                      </div>
                      <button className={`event-register-btn ${ev.isRegistered ? "registered" : ""}`}
                        onClick={e => { e.stopPropagation(); registerEvent(ev.id); }}>
                        {ev.isRegistered ? "✓ Going" : "Register"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text3)" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 16, marginBottom: 4 }}>No {activeFilter} events found</div>
                <div style={{ fontSize: 13 }}>Check back soon or explore other categories</div>
              </div>
            )}
          </main>
        </div>

        {/* EVENT DETAIL MODAL */}
        {selectedEvent && (
          <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setSelectedEvent(null)}>
            <div className="modal">
              <div className="modal-header">
                <div className="modal-title">{selectedEvent.title}</div>
                <button className="modal-close" onClick={() => setSelectedEvent(null)}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-event-banner" style={{ background: selectedEvent.bg }}>
                  <div className="modal-event-banner-bg" style={{ background: selectedEvent.bg }} />
                  <span style={{ position: "relative", zIndex: 1 }}>{selectedEvent.emoji}</span>
                </div>

                {[
                  ["📅", "Date & Time", `${selectedEvent.day} ${selectedEvent.mon} ${selectedEvent.year} · ${selectedEvent.time}`],
                  ["📍", "Location", selectedEvent.location],
                  ["👥", "Organizer", selectedEvent.organizer],
                  ["🎟️", "Seats", `${selectedEvent.registered}/${selectedEvent.seats} registered (${selectedEvent.seats - selectedEvent.registered} left)`],
                ].map(([icon, label, value]) => (
                  <div key={label} className="modal-detail-row">
                    <div className="modal-detail-icon">{icon}</div>
                    <div>
                      <div className="modal-detail-label">{label}</div>
                      <div className="modal-detail-value">{value}</div>
                    </div>
                  </div>
                ))}

                <div className="modal-desc">{selectedEvent.desc}</div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  {selectedEvent.tags.map(t => (
                    <span key={t} style={{ padding: "4px 12px", borderRadius: 20, background: "var(--bg3)", border: "1px solid var(--glass-border)", fontSize: 12, color: "var(--text2)" }}>{t}</span>
                  ))}
                </div>

                <div className="modal-attendees-row">
                  {selectedEvent.attendeeImgs.map((src, i) => (
                    <div key={i} className="attendee-pip" style={{ width: 28, height: 28, marginLeft: i > 0 ? -8 : 0 }}>
                      <img src={src} alt="" />
                    </div>
                  ))}
                  <span style={{ fontSize: 13, color: "var(--text3)", marginLeft: 10 }}>
                    {selectedEvent.registered} people registered
                  </span>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-primary" style={{ flex: 1 }}
                  onClick={() => { registerEvent(selectedEvent.id); setSelectedEvent(null); }}>
                  {selectedEvent.isRegistered ? "✓ Cancel Registration" : "🎟️ Register Now"}
                </button>
                <button className="btn-secondary" onClick={() => setSelectedEvent(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* TOAST */}
        <div className="toast-container">
          {toasts.map(t => (
            <div key={t.id} className="toast">
              <div className="toast-icon">{t.icon}</div>
              <div style={{ fontSize: 14 }}>{t.msg}</div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}