// ═══════════════════════════════════════════════════════════
//  shared.jsx  ·  CampusConnect — Shared Foundation
//  Exports: FONTS, SHARED_CSS, AVATARS, GRADIENTS, USER,
//           Avatar, useToasts, ToastContainer,
//           Navbar (with notif + profile drawer),
//           Sidebar / SidebarContent
// ═══════════════════════════════════════════════════════════
import React, { useState, useRef, useEffect } from "react";

// ───────────────────────────────────────────────────────────
// GOOGLE FONTS
// ───────────────────────────────────────────────────────────
export const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');`;

// ───────────────────────────────────────────────────────────
// STATIC DATA
// ───────────────────────────────────────────────────────────
export const AVATARS = {
  "Sourav Kumar":  "https://i.pravatar.cc/150?img=3",
  "Priya Sharma":  "https://i.pravatar.cc/150?img=47",
  "Rahul Verma":   "https://i.pravatar.cc/150?img=12",
  "Ananya Singh":  "https://i.pravatar.cc/150?img=44",
  "Arjun Mehta":   "https://i.pravatar.cc/150?img=15",
  "Neha Gupta":    "https://i.pravatar.cc/150?img=25",
  "Karan Joshi":   "https://i.pravatar.cc/150?img=8",
  "Vikram Nair":   "https://i.pravatar.cc/150?img=7",
  "Shreya Patel":  "https://i.pravatar.cc/150?img=20",
  "Amit Kumar":    "https://i.pravatar.cc/150?img=33",
  "Divya Reddy":   "https://i.pravatar.cc/150?img=48",
  "Rohan Gupta":   "https://i.pravatar.cc/150?img=13",
  "Kavya Sharma":  "https://i.pravatar.cc/150?img=35",
  "Nikhil Joshi":  "https://i.pravatar.cc/150?img=6",
  "Pooja Singh":   "https://i.pravatar.cc/150?img=23",
  "Aditya Rao":    "https://i.pravatar.cc/150?img=17",
  "Riya Kapoor":   "https://i.pravatar.cc/150?img=29",
};

export const GRADIENTS = [
  "linear-gradient(135deg,#6b8fff,#3d6fff)",
  "linear-gradient(135deg,#c9a84c,#e8c97a)",
  "linear-gradient(135deg,#ff6b6b,#ff8e53)",
  "linear-gradient(135deg,#4ecb71,#2ecc71)",
  "linear-gradient(135deg,#a855f7,#6b8fff)",
  "linear-gradient(135deg,#f093fb,#f5576c)",
  "linear-gradient(135deg,#4facfe,#00f2fe)",
];

export const USER = {
  name:    "Sourav Kumar",
  branch:  "CSE",
  year:    "3rd Year",
  handle:  "@sourav_kumar",
  bio:     "Passionate CS student exploring full-stack development and ML. Open to collaborations, hackathons, and internship opportunities. Currently learning Rust & System Design. ☕",
  cgpa:    "8.7",
  batch:   "2026",
  avatar: localStorage.getItem("profileImage") || AVATARS["Sourav Kumar"]
};

// ───────────────────────────────────────────────────────────
// Avatar component — image with gradient+initials fallback
// ───────────────────────────────────────────────────────────
export function Avatar({ name, src, size = 44, style = {} }) {
  const initials = name ? name.split(" ").map(w => w[0]).join("").slice(0, 2) : "?";
  const idx = name ? name.charCodeAt(0) % GRADIENTS.length : 0;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: GRADIENTS[idx], display: "flex",
      alignItems: "center", justifyContent: "center",
      fontSize: size * 0.32, fontWeight: 600, color: "#fff",
      overflow: "hidden", flexShrink: 0, ...style,
    }}>
      {src
        ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={e => { e.target.style.display = "none"; }} />
        : <span>{initials}</span>
      }
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Toast hook + container
// ───────────────────────────────────────────────────────────
export function useToasts() {
  const [toasts, setToasts] = useState([]);
  const addToast = (type, title, msg, icon) => {
    const id = Date.now() + Math.random();
    setToasts(p => [...p, { id, type, title, msg, icon }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };
  return { toasts, addToast };
}

export function ToastContainer({ toasts }) {
  if (!toasts.length) return null;
  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:500, display:"flex", flexDirection:"column", gap:10, pointerEvents:"none" }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          display:"flex", alignItems:"center", gap:12,
          padding:"14px 18px", background:"var(--bg2)",
          border:"1px solid var(--glass-border)", borderRadius:14,
          boxShadow:"var(--shadow)", fontSize:14, color:"var(--text)",
          pointerEvents:"auto", minWidth:260, maxWidth:320,
          animation:"toastIn .3s ease",
        }}>
          <div style={{ width:32, height:32, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0, background: t.type==="like"?"var(--gold-dim)":t.type==="post"?"rgba(78,203,113,.15)":"rgba(61,111,255,.15)" }}>
            {t.icon}
          </div>
          <div>
            <div style={{ fontWeight:500 }}>{t.title}</div>
            <div style={{ fontSize:12, color:"var(--text2)", marginTop:2 }}>{t.msg}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// Sidebar inner content (shared between desktop & mobile)
// ───────────────────────────────────────────────────────────
export function SidebarContent({ navigate, activePage, networkCount, postCount, onClose, onOpenProfile }) {
  const items = [
  { id:"dashboard", icon:"⌂", label:"Home Feed" },
  { id:"network", icon:"◎", label:"Network" },
  { id:"message", icon:"◻", label:"Messages" },
  { id:"profile", icon:"◈", label:"My Profile" },
];
 const go = (id) => {
  navigate(`/${id}`);
  onClose?.();
};
  return (
    <>
      {onClose && (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div className="nav-brand-icon">C</div>
            <span style={{ fontFamily:"'DM Serif Display',serif", fontSize:16, background:"linear-gradient(90deg,var(--gold2),var(--text))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>CampusConnect</span>
          </div>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:8, background:"var(--glass)", border:"1px solid var(--glass-border)", color:"var(--text2)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}
      <div className="sidebar-label">Navigation</div>
      {items.map(item => (
        <div key={item.id} className={`nav-item ${activePage===item.id?"active":""}`} onClick={() => go(item.id)}>
          <span style={{ fontSize:17 }}>{item.icon}</span>
          {item.label}
          {item.badge && (
            <span style={{ marginLeft:"auto", background:item.badgeGold?"var(--gold)":"var(--accent)", color:item.badgeGold?"#000":"#fff", fontSize:10, fontWeight:600, padding:"2px 7px", borderRadius:20 }}>
              {item.badge}
            </span>
          )}
        </div>
      ))}
      <div className="sidebar-divider" />
      <div className="sidebar-label">Your Profile</div>
      <div className="sidebar-profile-card" onClick={() => { go("profile"); onOpenProfile?.(); }}>
        <Avatar name={USER.name} src={AVATARS[USER.name]} size={38} style={{ border:"2px solid var(--gold)" }} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:13, fontWeight:500, color:"var(--text)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{USER.name}</div>
          <div style={{ fontSize:11, color:"var(--text3)" }}>{USER.branch} · {USER.year}</div>
        </div>
        <svg width="12" height="12" fill="none" stroke="var(--text3)" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
      <div style={{ display:"flex", gap:6 }}>
        {[[networkCount,"Network"],[postCount,"Posts"]].map(([n,l]) => (
          <div key={l} style={{ flex:1, textAlign:"center", padding:"10px 6px", background:"var(--bg2)", borderRadius:"var(--radius-sm)", border:"1px solid var(--glass-border)" }}>
            <div style={{ fontFamily:"'DM Serif Display',serif", fontSize:17, color:"var(--text)" }}>{n}</div>
            <div style={{ fontSize:10, color:"var(--text3)", textTransform:"uppercase", letterSpacing:".08em", marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
      <div className="sidebar-divider" />
      <button className="logout-btn">
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Log Out
      </button>
    </>
  );
}

// ───────────────────────────────────────────────────────────
// Navbar  — fixed top bar with notif bell + profile drawer
// ───────────────────────────────────────────────────────────
export function Navbar({ navigate, activePage, theme, toggleTheme, networkCount=142, postCount=12 }) {
  const [notifOpen,        setNotifOpen]        = useState(false);
  const [profileOpen,      setProfileOpen]      = useState(false);
  const [mobileSidebarOpen,setMobileSidebarOpen]= useState(false);
  const [notifications,    setNotifications]    = useState([
    { id:1, icon:"❤️", text:<><strong>Priya Sharma</strong> liked your post</>,      time:"2m",  read:false },
    { id:2, icon:"💬", text:<><strong>Rahul Verma</strong> commented on your post</>,time:"15m", read:false },
    { id:3, icon:"🤝", text:<><strong>Amit Kumar</strong> sent a connection request</>,time:"1h",read:false },
    { id:4, icon:"🎉", text:<><strong>Hackathon 2025</strong> registrations open!</>, time:"2h",  read:true  },
  ]);
  const notifRef = useRef();
  const unread = notifications.filter(n=>!n.read).length;

  useEffect(() => {
    const h = e => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <>
      <nav className="navbar">
        <button className="nav-menu-btn" onClick={() => setMobileSidebarOpen(true)}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div className="nav-brand" style={{ cursor:"pointer" }} onClick={() => navigate("home")}>
          <div className="nav-brand-icon">C</div>
          <span className="nav-brand-text">CampusConnect</span>
        </div>
        <div className="nav-center">
          <div className="search-wrap">
            <svg className="search-icon" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input className="search-input" placeholder="Search students, posts, events…" />
          </div>
        </div>
        <div className="nav-right">
          <button className="theme-btn" onClick={toggleTheme}>{theme==="dark"?"☀️":"🌙"}</button>
          {/* Notification bell */}
          <div style={{ position:"relative" }} ref={notifRef}>
            <button className="nav-btn" onClick={() => { setNotifOpen(o=>!o); setProfileOpen(false); }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              {unread>0 && <span className="notif-badge">{unread}</span>}
            </button>
            {notifOpen && (
              <div className="notif-dropdown">
                <div className="notif-header">
                  <span className="notif-title">Notifications</span>
                  <button className="notif-clear" onClick={() => setNotifications(p=>p.map(n=>({...n,read:true})))}>Mark all read</button>
                </div>
                <div className="notif-list">
                  {notifications.map(n => (
                    <div key={n.id} className={`notif-item ${n.read?"":"unread"}`}
                      onClick={() => setNotifications(p=>p.map(x=>x.id===n.id?{...x,read:true}:x))}>
                      <div className={`notif-dot ${n.read?"read":""}`}/>
                      <div className="notif-item-icon">{n.icon}</div>
                      <div><div className="notif-item-text">{n.text}</div><div className="notif-item-time">{n.time}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="nav-divider"/>
          {/* Profile pill */}
          <div className={`nav-profile-btn ${profileOpen?"open":""}`} onClick={() => { setProfileOpen(o=>!o); setNotifOpen(false); }}>
            <div className="nav-avatar"><img src={AVATARS[USER.name]} alt={USER.name} onError={e=>{e.target.style.display="none";}}/></div>
            <div className="nav-profile-info">
              <div className="nav-profile-name">{USER.name}</div>
              <div className="nav-profile-sub">{USER.branch} · {USER.year}</div>
            </div>
            <svg className={`nav-chevron ${profileOpen?"open":""}`} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar */}
      {mobileSidebarOpen && (
        <>
          <div style={{ position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,.5)",backdropFilter:"blur(4px)" }} onClick={() => setMobileSidebarOpen(false)}/>
          <div className="mobile-sidebar">
            <SidebarContent navigate={navigate} activePage={activePage} networkCount={networkCount} postCount={postCount} onClose={() => setMobileSidebarOpen(false)}/>
          </div>
        </>
      )}

      {/* Profile drawer */}
      {profileOpen && (
        <>
          <div style={{ position:"fixed",inset:0,zIndex:150,background:"rgba(0,0,0,.45)",backdropFilter:"blur(4px)" }} onClick={() => setProfileOpen(false)}/>
          <div className="profile-drawer">
            <div className="drawer-cover">
              <button className="drawer-cover-close" onClick={() => setProfileOpen(false)}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <div className="drawer-avatar-wrap">
                <div className="drawer-avatar"><img src={AVATARS[USER.name]} alt={USER.name} onError={e=>{e.target.style.display="none";}}/></div>
                <div className="drawer-online"/>
              </div>
            </div>
            <div className="drawer-body">
              <div className="drawer-name">{USER.name}</div>
              <div className="drawer-handle">{USER.handle} · {USER.branch}</div>
              <div className="drawer-role">{USER.year} · Batch of {USER.batch} · CGPA {USER.cgpa}</div>
              <div className="drawer-bio">{USER.bio}</div>
              <div className="drawer-stats">
                {[[networkCount,"Network"],[postCount,"Posts"],["8","Events"],["3","Awards"],["65%","Profile"],["12","Saves"]].map(([n,l]) => (
                  <div key={l} className="drawer-stat"><div className="drawer-stat-num">{n}</div><div className="drawer-stat-label">{l}</div></div>
                ))}
              </div>
              <div className="drawer-actions">
                <button className="drawer-btn primary" onClick={() => { navigate("home"); setProfileOpen(false); }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  New Post
                </button>
                <button className="drawer-btn" onClick={() => { navigate("profile"); setProfileOpen(false); }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ───────────────────────────────────────────────────────────
// SHARED CSS  — injected once per page via <style>
// ───────────────────────────────────────────────────────────
export const SHARED_CSS = `
/* RESET */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
/* VARIABLES */
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
.app{min-height:100vh;background:var(--bg);background-image:radial-gradient(ellipse 80% 50% at 20% -10%,rgba(61,111,255,.07) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 80% 100%,rgba(201,168,76,.04) 0%,transparent 60%);transition:background .3s}
html[data-theme="light"] .app{background-image:radial-gradient(ellipse 80% 50% at 20% -10%,rgba(61,111,255,.04) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 80% 100%,rgba(201,168,76,.03) 0%,transparent 60%)}
/* NAVBAR */
.navbar{position:fixed;top:0;left:0;right:0;z-index:100;height:var(--nav-h);display:flex;align-items:center;background:var(--nav-bg);backdrop-filter:blur(24px);border-bottom:1px solid var(--glass-border);padding:0 16px;gap:12px}
.nav-brand{display:flex;align-items:center;gap:10px;flex-shrink:0}
.nav-brand-icon{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--gold),var(--accent));display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#fff}
.nav-brand-text{font-family:'DM Serif Display',serif;font-size:18px;background:linear-gradient(90deg,var(--gold2),var(--text));-webkit-background-clip:text;-webkit-text-fill-color:transparent;white-space:nowrap}
.nav-center{flex:1;display:flex;align-items:center;justify-content:center;min-width:0}
.search-wrap{position:relative;width:100%;max-width:440px}
.search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--text3);pointer-events:none}
.search-input{width:100%;background:var(--glass);border:1px solid var(--glass-border);border-radius:40px;padding:10px 16px 10px 40px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:all .2s}
.search-input::placeholder{color:var(--text3)}
.search-input:focus{border-color:rgba(201,168,76,.4);background:var(--bg2)}
.nav-right{display:flex;align-items:center;gap:6px;flex-shrink:0}
.nav-btn{width:40px;height:40px;border-radius:12px;border:1px solid transparent;background:transparent;color:var(--text2);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;position:relative}
.nav-btn:hover{background:var(--glass);border-color:var(--glass-border);color:var(--text)}
.theme-btn{width:40px;height:40px;border-radius:12px;border:1px solid var(--glass-border);background:var(--glass);color:var(--gold2);font-size:17px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s}
.theme-btn:hover{background:var(--gold-dim);transform:rotate(18deg)}
.notif-badge{position:absolute;top:6px;right:6px;width:16px;height:16px;border-radius:50%;background:var(--red);color:#fff;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid var(--bg);animation:pulseBadge 2s infinite}
@keyframes pulseBadge{0%,100%{box-shadow:0 0 0 0 rgba(224,85,85,.5)}50%{box-shadow:0 0 0 5px rgba(224,85,85,0)}}
.nav-divider{width:1px;height:28px;background:var(--glass-border);margin:0 2px}
.nav-profile-btn{display:flex;align-items:center;gap:8px;padding:5px 10px 5px 5px;border-radius:40px;border:1px solid var(--glass-border);background:var(--glass);cursor:pointer;transition:all .2s;color:var(--text)}
.nav-profile-btn:hover,.nav-profile-btn.open{border-color:rgba(201,168,76,.38);background:var(--gold-dim)}
.nav-avatar{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--accent));overflow:hidden;flex-shrink:0;box-shadow:0 0 0 1.5px var(--gold)}
.nav-avatar img{width:100%;height:100%;object-fit:cover}
.nav-profile-info{line-height:1.2}
.nav-profile-name{font-size:13px;font-weight:500;white-space:nowrap}
.nav-profile-sub{font-size:11px;color:var(--text3);white-space:nowrap}
.nav-chevron{color:var(--text3);transition:transform .2s;margin-left:2px;flex-shrink:0}
.nav-chevron.open{transform:rotate(180deg)}
.nav-menu-btn{display:none;width:40px;height:40px;border-radius:12px;border:1px solid var(--glass-border);background:var(--glass);color:var(--text2);align-items:center;justify-content:center;cursor:pointer;flex-shrink:0}
/* NOTIF DROPDOWN */
.notif-dropdown{position:absolute;top:calc(100% + 10px);right:0;width:340px;background:var(--bg2);border:1px solid var(--glass-border);border-radius:var(--radius);box-shadow:var(--shadow-lg);overflow:hidden;animation:slideDown .2s ease;z-index:200}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
.notif-header{display:flex;align-items:center;justify-content:space-between;padding:16px 18px 12px;border-bottom:1px solid var(--glass-border)}
.notif-title{font-family:'DM Serif Display',serif;font-size:16px;color:var(--text)}
.notif-clear{font-size:12px;color:var(--gold);cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif}
.notif-list{max-height:320px;overflow-y:auto}
.notif-item{display:flex;align-items:flex-start;gap:12px;padding:14px 18px;border-bottom:1px solid var(--glass-border);cursor:pointer;transition:background .15s}
.notif-item:last-child{border-bottom:none}
.notif-item:hover{background:var(--glass)}
.notif-item.unread{background:rgba(201,168,76,.04)}
.notif-dot{width:8px;height:8px;border-radius:50%;background:var(--gold);flex-shrink:0;margin-top:5px}
.notif-dot.read{background:transparent;border:1px solid var(--text3)}
.notif-item-icon{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.notif-item-text{font-size:13px;color:var(--text2);line-height:1.4}
.notif-item-text strong{color:var(--text);font-weight:500}
.notif-item-time{font-size:11px;color:var(--text3);margin-top:3px}
/* PROFILE DRAWER */
.profile-drawer{position:fixed;top:var(--nav-h);right:0;bottom:0;z-index:160;width:340px;background:var(--bg2);border-left:1px solid var(--glass-border);box-shadow:-8px 0 48px rgba(0,0,0,.3);display:flex;flex-direction:column;animation:drawerIn .28s cubic-bezier(.34,1.2,.64,1);overflow-y:auto}
@keyframes drawerIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
.drawer-cover{height:90px;flex-shrink:0;position:relative;background:linear-gradient(135deg,rgba(201,168,76,.22),rgba(61,111,255,.18))}
.drawer-cover-close{position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:50%;background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.12);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center}
.drawer-cover-close:hover{background:rgba(224,85,85,.5)}
.drawer-avatar-wrap{position:absolute;bottom:-38px;left:24px}
.drawer-avatar{width:76px;height:76px;border-radius:50%;border:3px solid var(--bg2);box-shadow:0 0 0 2.5px var(--gold);overflow:hidden;background:linear-gradient(135deg,var(--gold),var(--accent));display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:600;color:#fff}
.drawer-avatar img{width:100%;height:100%;object-fit:cover}
.drawer-online{position:absolute;bottom:4px;right:4px;width:14px;height:14px;border-radius:50%;background:var(--green);border:2px solid var(--bg2)}
.drawer-body{padding:52px 24px 28px;flex:1}
.drawer-name{font-family:'DM Serif Display',serif;font-size:22px;color:var(--text);margin-bottom:3px}
.drawer-handle{font-size:13px;color:var(--gold);margin-bottom:3px}
.drawer-role{font-size:13px;color:var(--text3);margin-bottom:18px}
.drawer-bio{font-size:13px;color:var(--text2);line-height:1.65;padding:12px 14px;border-radius:12px;background:var(--bg3);border:1px solid var(--glass-border);margin-bottom:18px}
.drawer-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px}
.drawer-stat{text-align:center;padding:12px 8px;border-radius:12px;background:var(--bg3);border:1px solid var(--glass-border)}
.drawer-stat:hover{border-color:rgba(201,168,76,.25);background:var(--gold-dim)}
.drawer-stat-num{font-family:'DM Serif Display',serif;font-size:20px;color:var(--text);line-height:1}
.drawer-stat-label{font-size:10px;color:var(--text3);margin-top:4px;text-transform:uppercase;letter-spacing:.08em}
.drawer-actions{display:flex;gap:10px}
.drawer-btn{flex:1;padding:11px;border-radius:12px;border:1px solid var(--glass-border);background:var(--bg3);color:var(--text2);font-size:13px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:6px}
.drawer-btn:hover{background:var(--glass);color:var(--text)}
.drawer-btn.primary{background:linear-gradient(135deg,var(--gold),#a0782a);border-color:transparent;color:#fff}
.drawer-btn.primary:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(201,168,76,.38)}
/* PAGE LAYOUT */
.layout{display:flex;padding-top:var(--nav-h);min-height:100vh}
/* SIDEBAR */
.sidebar{width:var(--sidebar-w);flex-shrink:0;position:sticky;top:var(--nav-h);height:calc(100vh - var(--nav-h));overflow-y:auto;padding:20px 14px;display:flex;flex-direction:column;gap:4px;border-right:1px solid var(--glass-border)}
.sidebar-label{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);padding:12px 12px 6px}
.nav-item{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:var(--radius-sm);cursor:pointer;border:1px solid transparent;transition:all .2s;color:var(--text2);font-size:14px}
.nav-item:hover{background:var(--glass);border-color:var(--glass-border);color:var(--text)}
.nav-item.active{background:var(--gold-dim);border-color:rgba(201,168,76,.2);color:var(--gold2)}
.sidebar-divider{height:1px;background:var(--glass-border);margin:8px 0}
.sidebar-profile-card{display:flex;align-items:center;gap:10px;padding:12px 14px;background:var(--bg2);border-radius:var(--radius-sm);border:1px solid var(--glass-border);cursor:pointer;transition:all .2s;margin-bottom:6px}
.sidebar-profile-card:hover{border-color:rgba(201,168,76,.32);background:var(--gold-dim)}
.logout-btn{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:var(--radius-sm);cursor:pointer;border:1px solid transparent;background:none;transition:all .2s;color:var(--text3);font-size:14px;font-family:'DM Sans',sans-serif;width:100%;text-align:left;margin-top:auto}
.logout-btn:hover{background:rgba(224,85,85,.08);border-color:rgba(224,85,85,.2);color:var(--red)}
/* MOBILE SIDEBAR */
.mobile-sidebar{position:fixed;top:0;left:0;bottom:0;width:280px;background:var(--bg2);border-right:1px solid var(--glass-border);z-index:201;padding:24px 16px;display:flex;flex-direction:column;gap:4px;animation:slideRight .28s cubic-bezier(.34,1.2,.64,1);overflow-y:auto}
@keyframes slideRight{from{transform:translateX(-100%);opacity:0}to{transform:translateX(0);opacity:1}}
/* SHARED ANIMATIONS */
@keyframes fadein{from{opacity:0}to{opacity:1}}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
@keyframes toastIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
/* SCROLLBAR */
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--glass-border);border-radius:4px}
/* RESPONSIVE */
@media(max-width:768px){
  .sidebar{display:none}
  .nav-brand-text{display:none}
  .nav-menu-btn{display:flex}
  .nav-profile-info{display:none}
  .nav-chevron{display:none}
}
@media(max-width:480px){.navbar{padding:0 12px;gap:8px}.nav-right{gap:4px}}
`;