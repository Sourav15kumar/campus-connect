
// ═══════════════════════════════════════════════════════════
//  profile.jsx  ·  CampusConnect — Profile Page
//
//  Features:
//  • Animated cover photo (click to upload your own image)
//  • Profile avatar with edit button (click to upload)
//  • Stats bar (connections, posts, events, awards, completion)
//  • 3 tabs: Posts grid | Skills (add/remove) | About
//  • Profile completion progress bars
//  • Social links (GitHub, LinkedIn, Email)
//  • Achievements section
//  • Edit Profile modal — edit all fields, saves live
//  • Fully responsive (desktop 2-col, mobile 1-col)
// ═══════════════════════════════════════════════════════════
import React, { useState, useRef } from "react";
import { FONTS, SHARED_CSS, AVATARS, USER, Avatar, Navbar, SidebarContent, ToastContainer, useToasts } from "./shared";

// ── SEED DATA ──────────────────────────────────────────────
const SEED_PROFILE = {
  name:      USER.name,
  handle:    USER.handle,
  branch:    USER.branch,
  year:      USER.year,
  cgpa:      USER.cgpa,
  batch:     USER.batch,
  bio:       USER.bio,
  github:    "github.com/sourav-kumar",
  linkedin:  "linkedin.com/in/sourav-kumar",
  email:     "sourav.kumar@college.edu",
  phone:     "+91 98765 43210",
  skills:    ["React","Python","Node.js","DSA","Machine Learning","UI/UX","Git","SQL","TypeScript","Docker"],
  interests: ["Open Source","Hackathons","System Design","Cloud Computing","Robotics"],
};

const POSTS = [
  { id:1, emoji:"🎉", title:"Internship at Samsung R&D",     time:"2h",  likes:42,  type:"achievement" },
  { id:2, emoji:"🚀", title:"Open Source React State Lib",   time:"5h",  likes:87,  type:"project"     },
  { id:3, emoji:"🏆", title:"2nd Place TechFest Hackathon",  time:"3d",  likes:134, type:"achievement" },
  { id:4, emoji:"📚", title:"DSA Revision Notes — Trees",    time:"5d",  likes:29,  type:"study"       },
  { id:5, emoji:"💡", title:"Side project: CampusAI",        time:"1w",  likes:56,  type:"idea"        },
  { id:6, emoji:"🎯", title:"Top 10% on LeetCode",           time:"2w",  likes:71,  type:"goal"        },
];

const ACHIEVEMENTS = [
  { icon:"🏆", title:"TechFest 2025",         sub:"2nd Place — Hackathon",           year:"2025" },
  { icon:"🎓", title:"Academic Excellence",    sub:"CGPA 8.7, 5 consecutive sems",   year:"2024" },
  { icon:"⭐", title:"Open Source",            sub:"500+ GitHub stars",              year:"2024" },
  { icon:"🤝", title:"Campus Ambassador",      sub:"Google Developer Student Club",  year:"2023" },
  { icon:"🥇", title:"Coding Olympiad",        sub:"State Level — Gold Medal",       year:"2022" },
];

const TYPE_COLOR = {
  achievement:{ bg:"rgba(201,168,76,.15)",    color:"#e8c97a"  },
  project:    { bg:"rgba(61,111,255,.12)",    color:"#6b8fff"  },
  study:      { bg:"rgba(78,203,113,.10)",    color:"#4ecb71"  },
  idea:       { bg:"rgba(168,85,247,.10)",    color:"#c084fc"  },
  goal:       { bg:"rgba(255,107,107,.10)",   color:"#ff8e7a"  },
};

// ── PAGE CSS ───────────────────────────────────────────────
const CSS = `
.profile-page{flex:1;min-width:0;overflow-x:hidden;padding-bottom:60px}
/* Cover */
.cover-wrap {
  position: relative;
  height: 280px;   /* 👈 pehle 240 tha */
  overflow: hidden;
}
html[data-theme="light"] .cover-wrap{background:linear-gradient(135deg,#cce3f5 0%,#e8d8f8 50%,#cff0e4 100%)}
.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;      /* 👈 crop karega properly */
  object-position: center; /* 👈 face center me rahe */
  display: block;
}
.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.1),
    rgba(0,0,0,0.5)
  );
  pointer-events: none;
}
html[data-theme="light"] .cover-overlay{background:linear-gradient(to bottom,transparent 30%,rgba(240,242,247,.85))}
.cover-particles{position:absolute;inset:0;overflow:hidden;opacity:.3}
.cover-particles span{position:absolute;border-radius:50%;animation:float 6s infinite ease-in-out}
@keyframes float{0%,100%{transform:translateY(0) scale(1);opacity:.3}50%{transform:translateY(-20px) scale(1.1);opacity:.6}}
.cover-btn {
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 20;
  
  padding: 10px 18px;
  border-radius: 12px;

  background: linear-gradient(135deg, #c9a84c, #a0782a);
  border: none;

  color: #fff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.3px;

  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(201,168,76,0.4);
}

.cover-btn:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 6px 20px rgba(201,168,76,0.6);
}

/* Hero */
.prof-hero {
  margin-top: -40px;   /* 👈 kam overlap */
  align-items: center; /* 👈 better alignment */
}
.avatar-ring-wrap{position:relative;

  display: inline-block;
  flex-shrink:0}
.avatar-ring{
  width: 130px;
  height: 130px;
  border-radius:50%;padding:3px;background:linear-gradient(135deg,var(--gold),var(--accent));box-shadow:0 8px 28px rgba(0,0,0,.55)}
.avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--bg);
}

.avatar-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.avatar-edit-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;

  width: 32px;
  height: 32px;
  border-radius: 50%;

  background: linear-gradient(135deg, #c9a84c, #a0782a);
  border: 3px solid var(--bg);

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  cursor: pointer;

  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  transition: all 0.25s ease;

  z-index: 5;
}

.avatar-edit-btn:hover {
  transform: scale(1.1);
}
.online-ring{
display: none;
}

.hero-info {
  background: rgba(0,0,0,0.4);   
  backdrop-filter: blur(10px);
  padding: 12px 18px;
  border-radius: 12px;
}
.hero-name {
  font-family: 'DM Serif Display', serif;
  font-size: 28px;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5); /* 👈 glow effect */
  margin-bottom: 4px;
}
.hero-handle {
  color: #e8c97a;
  font-size: 14px;
}
.hero-role{font-size:13px;color:var(--text3);margin-bottom:12px}
.hero-btns{display:flex;gap:9px;flex-wrap:wrap}
.btn-edit{padding:9px 22px;border-radius:10px;background:linear-gradient(135deg,var(--gold),#a0782a);border:none;color:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;box-shadow:0 3px 12px rgba(201,168,76,.28)}
.btn-edit:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(201,168,76,.42)}
.btn-share{padding:9px 20px;border-radius:10px;background:var(--glass);border:1px solid var(--glass-border);color:var(--text2);font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s}
.btn-share:hover{border-color:rgba(201,168,76,.3);color:var(--text);background:var(--gold-dim)}
/* Stats bar */
.stats-bar{display:flex;border:1px solid var(--glass-border);border-radius:var(--radius);overflow:hidden;margin:0 32px 24px;background:var(--bg2)}
.sbar-item{flex:1;text-align:center;padding:14px 6px;border-right:1px solid var(--glass-border);cursor:default;transition:background .2s}
.sbar-item:last-child{border-right:none}
.sbar-item:hover{background:var(--gold-dim)}
.sbar-num{font-family:'DM Serif Display',serif;font-size:22px;color:var(--text);line-height:1}
.sbar-lbl{font-size:10px;color:var(--text3);margin-top:3px;text-transform:uppercase;letter-spacing:.08em}
/* Body layout */
.prof-body{display:flex;gap:20px;padding:0 32px}
.prof-left{width:268px;flex-shrink:0;display:flex;flex-direction:column;gap:14px}
.prof-right{flex:1;min-width:0}
/* Profile cards */
.pf-card{background:var(--bg2);border:1px solid var(--glass-border);border-radius:var(--radius);padding:18px}
.pf-card-title{font-family:'DM Serif Display',serif;font-size:15px;color:var(--text);margin-bottom:14px}
/* Completion */
.compl-row{margin-bottom:10px}
.compl-head{display:flex;justify-content:space-between;font-size:12px;color:var(--text3);margin-bottom:5px}
.compl-head span:last-child{color:var(--gold);font-weight:600}
.compl-track{height:5px;border-radius:3px;background:var(--bg3);overflow:hidden}
.compl-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--gold),var(--accent));transition:width .7s cubic-bezier(.34,1.2,.64,1)}
/* Social links */
.social-a{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;background:var(--bg3);border:1px solid var(--glass-border);color:var(--text2);font-size:12px;transition:all .2s;margin-bottom:6px;cursor:pointer;text-decoration:none}
.social-a:hover{border-color:rgba(201,168,76,.3);color:var(--gold2);background:var(--gold-dim)}
.social-a span{font-size:17px}
/* Achievements */
.ach-item{display:flex;align-items:center;gap:11px;padding:10px 0;border-bottom:1px solid var(--glass-border)}
.ach-item:last-child{border-bottom:none;padding-bottom:0}
.ach-icon{width:38px;height:38px;border-radius:10px;background:var(--gold-dim);border:1px solid rgba(201,168,76,.2);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.ach-title{font-size:13px;font-weight:500;color:var(--text)}
.ach-sub{font-size:11px;color:var(--text3);margin-top:1px}
.ach-year{margin-left:auto;font-size:11px;color:var(--text3);flex-shrink:0}
/* Tabs */
.content-tabs{display:flex;gap:2px;border-bottom:1px solid var(--glass-border);margin-bottom:20px}
.ct{padding:10px 20px;font-size:13px;font-weight:500;color:var(--text3);cursor:pointer;border:none;background:none;font-family:'DM Sans',sans-serif;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .2s}
.ct:hover{color:var(--text)}
.ct.active{color:var(--gold2);border-bottom-color:var(--gold)}
/* Posts grid */
.posts-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.post-thumb{aspect-ratio:1;border-radius:12px;background:var(--bg3);border:1px solid var(--glass-border);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all .25s;padding:14px;text-align:center;gap:7px;animation:fadeUp .3s ease both}
.post-thumb:hover{border-color:rgba(201,168,76,.3);transform:scale(1.03)}
.pt-emoji{font-size:30px}
.pt-title{font-size:11px;color:var(--text2);line-height:1.35;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.pt-likes{font-size:10px;color:var(--text3);display:flex;align-items:center;gap:3px}
/* Skills */
.skills-wrap{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px}
.skill-chip{display:flex;align-items:center;gap:5px;padding:7px 13px;border-radius:20px;background:var(--bg3);border:1px solid var(--glass-border);font-size:13px;color:var(--text2);transition:all .2s;cursor:default}
.skill-chip:hover{border-color:rgba(201,168,76,.3);color:var(--gold2);background:var(--gold-dim)}
.skill-rm{width:15px;height:15px;border-radius:50%;background:rgba(224,85,85,.12);border:none;color:var(--red);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:9px;padding:0;transition:background .2s}
.skill-rm:hover{background:rgba(224,85,85,.28)}
.add-skill-row{display:flex;gap:8px;margin-top:6px}
.add-skill-inp{flex:1;background:var(--bg3);border:1px solid var(--glass-border);border-radius:10px;padding:9px 13px;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;outline:none;transition:all .2s}
.add-skill-inp::placeholder{color:var(--text3)}
.add-skill-inp:focus{border-color:rgba(201,168,76,.3)}
.add-skill-btn{padding:9px 16px;border-radius:10px;background:var(--gold-dim);border:1px solid rgba(201,168,76,.3);color:var(--gold2);font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;white-space:nowrap}
.add-skill-btn:hover{background:rgba(201,168,76,.22)}
.interest-chip{padding:6px 13px;border-radius:20px;font-size:13px;background:rgba(61,111,255,.1);border:1px solid rgba(61,111,255,.2);color:var(--accent2);cursor:default}
/* About grid */
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.about-item{padding:14px;background:var(--bg3);border:1px solid var(--glass-border);border-radius:12px;transition:all .2s}
.about-item:hover{border-color:rgba(201,168,76,.2)}
.about-lbl{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--text3);margin-bottom:5px}
.about-val{font-size:14px;color:var(--text);font-weight:500}
.about-full{grid-column:1/-1}
/* EDIT MODAL */
.modal-bg{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.72);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;animation:fadein .2s ease}
.edit-modal{background:var(--bg2);border:1px solid var(--glass-border);border-radius:20px;width:100%;max-width:570px;box-shadow:var(--shadow-lg);animation:scaleIn .22s ease;max-height:92vh;overflow-y:auto;display:flex;flex-direction:column}
.em-head{display:flex;align-items:center;justify-content:space-between;padding:20px 24px 16px;border-bottom:1px solid var(--glass-border);position:sticky;top:0;background:var(--bg2);z-index:1;border-radius:20px 20px 0 0}
.em-title{font-family:'DM Serif Display',serif;font-size:20px;color:var(--text)}
.em-close{width:36px;height:36px;border-radius:10px;background:var(--glass);border:1px solid var(--glass-border);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
.em-close:hover{background:rgba(224,85,85,.1);color:var(--red)}
.em-body{padding:22px 24px;display:flex;flex-direction:column;gap:16px}
.em-row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.em-lbl{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--text3);margin-bottom:6px}
.em-inp{width:100%;background:var(--bg3);border:1px solid var(--glass-border);border-radius:12px;padding:11px 14px;color:var(--text);font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:all .2s}
.em-inp:focus{border-color:rgba(201,168,76,.35);box-shadow:0 0 0 3px rgba(201,168,76,.07)}
.em-inp::placeholder{color:var(--text3)}
.em-ta{width:100%;background:var(--bg3);border:1px solid var(--glass-border);border-radius:12px;padding:12px 14px;color:var(--text);font-size:14px;line-height:1.65;font-family:'DM Sans',sans-serif;outline:none;resize:none;min-height:88px;transition:all .2s}
.em-ta:focus{border-color:rgba(201,168,76,.35);box-shadow:0 0 0 3px rgba(201,168,76,.07)}
.em-ta::placeholder{color:var(--text3)}
.em-foot{display:flex;gap:10px;justify-content:flex-end;padding:14px 24px 20px;border-top:1px solid var(--glass-border);position:sticky;bottom:0;background:var(--bg2);border-radius:0 0 20px 20px}
.btn-cancel{padding:10px 22px;border-radius:10px;background:var(--glass);border:1px solid var(--glass-border);color:var(--text2);font-size:13px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s}
.btn-cancel:hover{color:var(--text)}
.btn-save{padding:10px 28px;border-radius:10px;background:linear-gradient(135deg,var(--gold),#a0782a);border:none;color:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;box-shadow:0 3px 12px rgba(201,168,76,.28)}
.btn-save:hover{transform:translateY(-1px);box-shadow:0 5px 16px rgba(201,168,76,.42)}
/* Responsive */
@media(max-width:1100px){.prof-left{display:none}}
@media(max-width:768px){
  .prof-hero{padding:0 16px;margin-top:-46px;margin-bottom:14px}
  .stats-bar{margin:0 16px 16px}
  .prof-body{padding:0 16px;flex-direction:column}
  .prof-left{display:flex;width:100%}
  .posts-grid{grid-template-columns:repeat(2,1fr)}
  .about-grid{grid-template-columns:1fr}
  .about-full{grid-column:unset}
  .em-row2{grid-template-columns:1fr}
}
@media(max-width:480px){
  .cover-wrap{height:160px}
  .prof-hero{margin-top:-38px}
  .avatar-ring{width:82px;height:82px}
  .hero-name{font-size:20px}
  .posts-grid{grid-template-columns:repeat(2,1fr)}
  .stats-bar{flex-wrap:wrap}
  .sbar-item{min-width:calc(50% - 1px)}
}
`;

// ── COMPONENT ─────────────────────────────────────────────
export default function Profile({ navigate, activePage, theme, toggleTheme, networkCount=142, setNetworkCount, postCount=12, setPostCount }) {
  const { toasts, addToast } = useToasts();
  const [profile,  setProfile]  = useState(SEED_PROFILE);
  const [draft,    setDraft]    = useState(SEED_PROFILE);
  const [tab,      setTab]      = useState("posts");
  const [editOpen, setEditOpen] = useState(false);
  const [coverSrc, setCoverSrc] = useState(() => {
  return localStorage.getItem("coverImage") || null;
});
  const [avatarSrc, setAvatarSrc] = useState(() => {
  return localStorage.getItem("profileImage") || AVATARS[USER.name];
});
  const [newSkill, setNewSkill] = useState("");

  const coverRef  = useRef();
  const avatarRef = useRef();

  const uploadImg = (e, setter, toast, key) => {
  const file = e.target.files[0];
  if (!file) return;

  const r = new FileReader();
  r.onload = ev => {
    setter(ev.target.result);
    localStorage.setItem(key, ev.target.result); // 👈 SAVE permanently
    addToast("post", toast[0], toast[1], "📸");
  };
  r.readAsDataURL(file);
  e.target.value = "";
};

  const openEdit  = () => { setDraft({...profile}); setEditOpen(true); };
  const cancelEdit = () => setEditOpen(false);
  const saveEdit  = () => { setProfile({...draft}); setEditOpen(false); addToast("post","Profile Saved","Your changes are live ✨","✅"); };

  const removeSkill = s => setProfile(p => ({...p, skills:p.skills.filter(x=>x!==s)}));
  const addSkill = () => {
    const s = newSkill.trim(); if (!s || profile.skills.includes(s)) return;
    setProfile(p => ({...p, skills:[...p.skills,s]}));
    setNewSkill(""); addToast("post","Skill Added",`"${s}" added to your profile`,"🎯");
  };

  // Decorative particles on cover
  const particles = [
    {sz:80,  top:"15%", left:"8%",  color:"rgba(201,168,76,.5)",  dur:"7s",  delay:"0s"   },
    {sz:50,  top:"60%", left:"25%", color:"rgba(61,111,255,.4)",  dur:"5.5s",delay:"-2s"  },
    {sz:100, top:"20%", left:"55%", color:"rgba(201,168,76,.3)",  dur:"8s",  delay:"-1s"  },
    {sz:40,  top:"70%", left:"72%", color:"rgba(61,111,255,.5)",  dur:"6s",  delay:"-3s"  },
    {sz:65,  top:"40%", left:"88%", color:"rgba(201,168,76,.25)", dur:"9s",  delay:"-1.5s"},
  ];

  return (
    <>
      <style>{FONTS}{SHARED_CSS}{CSS}</style>
      <div className="app">
        <Navbar navigate={navigate} activePage={activePage} theme={theme} toggleTheme={toggleTheme} networkCount={networkCount} postCount={postCount} />
        <div className="layout">
          <aside className="sidebar">
            <SidebarContent navigate={navigate} activePage={activePage} networkCount={networkCount} postCount={postCount} />
          </aside>

          <div className="profile-page">
            {/* ── COVER ── */}
            <div className="cover-wrap">
              {coverSrc
                ? <img className="cover-img" src={coverSrc} alt="cover" />
                : (
                  <div className="cover-particles">
                    {particles.map((p,i) => (
                      <span key={i} style={{ width:p.sz, height:p.sz, top:p.top, left:p.left, background:p.color, animationDuration:p.dur, animationDelay:p.delay }} />
                    ))}
                  </div>
                )
              }
              <div className="cover-overlay"/>
              <button className="cover-btn" onClick={() => coverRef.current?.click()}>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                {coverSrc ? "Change Cover" : "Add Cover Photo"}
              </button>
              <input ref={coverRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>uploadImg(e,setCoverSrc,["Cover Updated","Your cover photo was changed"],"coverImage")} />
            </div>

            {/* ── HERO ── */}
            <div className="prof-hero">
              <div className="avatar-ring-wrap">
                <div className="avatar-ring">
                  <div className="avatar-inner">
                    <img src={avatarSrc || AVATARS[USER.name]} alt={profile.name} onError={e=>{e.target.style.display="none";}} />
                  </div>
                </div>
                <div className="online-ring"/>
                <button className="avatar-edit-btn" onClick={() => avatarRef.current?.click()}>
                  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                </button>
                <input ref={avatarRef} type="file" accept="image/*" style={{display:"none"}}
                 onChange={e=>uploadImg(e,setAvatarSrc,["Photo Updated","Profile picture changed"],"profileImage")} />
              </div>
              <div className="hero-info">
                <div className="hero-name">{profile.name}</div>
                <div className="hero-handle">{profile.handle}</div>
                <div className="hero-role">{profile.branch} · {profile.year} · Batch of {profile.batch} · CGPA {profile.cgpa}</div>
                <div className="hero-btns">
                  <button className="btn-edit" onClick={openEdit}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{marginRight:5}}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    Edit Profile
                  </button>
                  <button className="btn-share">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{marginRight:5}}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    Share Profile
                  </button>
                </div>
              </div>
            </div>

            {/* ── STATS BAR ── */}
            <div className="stats-bar">
              {[[networkCount,"Connections"],[postCount,"Posts"],["8","Events"],["3","Awards"],["65%","Completion"]].map(([n,l]) => (
                <div key={l} className="sbar-item">
                  <div className="sbar-num">{n}</div>
                  <div className="sbar-lbl">{l}</div>
                </div>
              ))}
            </div>

            {/* ── BODY ── */}
            <div className="prof-body">
              {/* Left sidebar */}
              <div className="prof-left">
                {/* Completion */}
                <div className="pf-card">
                  <div className="pf-card-title">Profile Strength</div>
                  {[["Bio",100],["Skills",80],["Education",100],["Social Links",60],["Cover Photo",coverSrc?100:0]].map(([l,v]) => (
                    <div key={l} className="compl-row">
                      <div className="compl-head"><span>{l}</span><span>{v}%</span></div>
                      <div className="compl-track"><div className="compl-fill" style={{width:`${v}%`}}/></div>
                    </div>
                  ))}
                </div>
                {/* Social */}
                <div className="pf-card">
                  <div className="pf-card-title">Social Links</div>
                  {[["🐙","GitHub",profile.github],["💼","LinkedIn",profile.linkedin],["✉️","Email",profile.email],["📱","Phone",profile.phone]].map(([ic,lbl,val]) => (
                    <div key={lbl} className="social-a" onClick={()=>addToast("comment","Opening",lbl,"🔗")}>
                      <span>{ic}</span>
                      <div>
                        <div style={{fontSize:11,color:"var(--text3)",marginBottom:1}}>{lbl}</div>
                        <div style={{fontSize:12}}>{val}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Achievements */}
                <div className="pf-card">
                  <div className="pf-card-title">Achievements</div>
                  {ACHIEVEMENTS.map(a => (
                    <div key={a.title} className="ach-item">
                      <div className="ach-icon">{a.icon}</div>
                      <div><div className="ach-title">{a.title}</div><div className="ach-sub">{a.sub}</div></div>
                      <div className="ach-year">{a.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right main */}
              <div className="prof-right">
                <div className="content-tabs">
                  {[["posts","Posts"],["skills","Skills"],["about","About"]].map(([id,lbl]) => (
                    <button key={id} className={`ct ${tab===id?"active":""}`} onClick={()=>setTab(id)}>{lbl}</button>
                  ))}
                </div>

                {/* Posts tab */}
                {tab==="posts" && (
                  <div className="posts-grid">
                    {POSTS.map((p,i) => {
                      const tc = TYPE_COLOR[p.type] || TYPE_COLOR.idea;
                      return (
                        <div key={p.id} className="post-thumb" style={{animationDelay:`${i*.05}s`, background:tc.bg, border:`1px solid ${tc.color}22`}}>
                          <div className="pt-emoji">{p.emoji}</div>
                          <div className="pt-title" style={{color:tc.color}}>{p.title}</div>
                          <div className="pt-likes" style={{color:tc.color+"aa"}}>
                            <svg width="10" height="10" fill={tc.color} viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                            {p.likes} · {p.time} ago
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Skills tab */}
                {tab==="skills" && (
                  <div>
                    <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:"var(--text)",marginBottom:12}}>Technical Skills</div>
                    <div className="skills-wrap">
                      {profile.skills.map(s => (
                        <div key={s} className="skill-chip">
                          {s}
                          <button className="skill-rm" onClick={()=>removeSkill(s)}>✕</button>
                        </div>
                      ))}
                    </div>
                    <div className="add-skill-row">
                      <input className="add-skill-inp" placeholder="Add a skill (e.g. Kubernetes)…" value={newSkill} onChange={e=>setNewSkill(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addSkill()} maxLength={30} />
                      <button className="add-skill-btn" onClick={addSkill}>+ Add</button>
                    </div>
                    <div style={{marginTop:28}}>
                      <div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:"var(--text)",marginBottom:12}}>Interests</div>
                      <div className="skills-wrap">
                        {profile.interests.map(i => <span key={i} className="interest-chip">{i}</span>)}
                      </div>
                    </div>
                  </div>
                )}

                {/* About tab */}
                {tab==="about" && (
                  <div className="about-grid">
                    {[["Branch",profile.branch],["Year",profile.year],["Batch",`Batch of ${profile.batch}`],["CGPA",profile.cgpa],["Email",profile.email],["Phone",profile.phone]].map(([l,v]) => (
                      <div key={l} className="about-item"><div className="about-lbl">{l}</div><div className="about-val">{v}</div></div>
                    ))}
                    <div className="about-item about-full">
                      <div className="about-lbl">Bio</div>
                      <div style={{fontSize:14,color:"var(--text)",lineHeight:1.7}}>{profile.bio}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── EDIT MODAL ── */}
        {editOpen && (
          <div className="modal-bg" onClick={e=>e.target===e.currentTarget&&cancelEdit()}>
            <div className="edit-modal">
              <div className="em-head">
                <div className="em-title">Edit Profile</div>
                <button className="em-close" onClick={cancelEdit}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div className="em-body">
                <div className="em-row2">
                  <div><label className="em-lbl">Full Name</label><input className="em-inp" value={draft.name} onChange={e=>setDraft(d=>({...d,name:e.target.value}))} /></div>
                  <div><label className="em-lbl">Handle</label><input className="em-inp" value={draft.handle} onChange={e=>setDraft(d=>({...d,handle:e.target.value}))} /></div>
                </div>
                <div className="em-row2">
                  <div><label className="em-lbl">Branch</label><input className="em-inp" value={draft.branch} onChange={e=>setDraft(d=>({...d,branch:e.target.value}))} /></div>
                  <div><label className="em-lbl">Year</label><input className="em-inp" value={draft.year} onChange={e=>setDraft(d=>({...d,year:e.target.value}))} /></div>
                </div>
                <div className="em-row2">
                  <div><label className="em-lbl">CGPA</label><input className="em-inp" value={draft.cgpa} onChange={e=>setDraft(d=>({...d,cgpa:e.target.value}))} /></div>
                  <div><label className="em-lbl">Batch Year</label><input className="em-inp" value={draft.batch} onChange={e=>setDraft(d=>({...d,batch:e.target.value}))} /></div>
                </div>
                <div><label className="em-lbl">Bio</label><textarea className="em-ta" value={draft.bio} onChange={e=>setDraft(d=>({...d,bio:e.target.value}))} maxLength={300}/></div>
                <div className="em-row2">
                  <div><label className="em-lbl">GitHub</label><input className="em-inp" value={draft.github} onChange={e=>setDraft(d=>({...d,github:e.target.value}))} /></div>
                  <div><label className="em-lbl">LinkedIn</label><input className="em-inp" value={draft.linkedin} onChange={e=>setDraft(d=>({...d,linkedin:e.target.value}))} /></div>
                </div>
                <div className="em-row2">
                  <div><label className="em-lbl">Email</label><input className="em-inp" value={draft.email} onChange={e=>setDraft(d=>({...d,email:e.target.value}))} /></div>
                  <div><label className="em-lbl">Phone</label><input className="em-inp" value={draft.phone} onChange={e=>setDraft(d=>({...d,phone:e.target.value}))} /></div>
                </div>
              </div>
              <div className="em-foot">
                <button className="btn-cancel" onClick={cancelEdit}>Cancel</button>
                <button className="btn-save" onClick={saveEdit}>Save Changes ✦</button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer toasts={toasts} />
      </div>
    </>
  );
}