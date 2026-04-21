// ═══════════════════════════════════════════════════════════
//  network.jsx  ·  CampusConnect — Network Page
//
//  Features:
//  • "My Connections" tab  — people you're already connected with
//  • "Discover" tab        — suggested campus people
//  • Search by name / role / branch
//  • Branch filter chips
//  • Connect / Disconnect toggle with live count update
//  • Message button → navigates to Messages page
//  • Fully responsive grid (4 → 3 → 2 → 1 columns)
// ═══════════════════════════════════════════════════════════
import React, { useState } from "react";
import { FONTS, SHARED_CSS, AVATARS, USER, Avatar, Navbar, SidebarContent, ToastContainer, useToasts } from "./shared";

// ── SEED DATA ──────────────────────────────────────────────
const ALL_PEOPLE = [
  // Connected
  { id:1,  name:"Priya Sharma",  branch:"ECE", year:"2nd Year", role:"Web Developer",       mutual:12, connected:true,  online:true,  skills:["React","Node.js"],      about:"Passionate about frontend dev and competitive coding." },
  { id:2,  name:"Arjun Mehta",   branch:"CSE", year:"4th Year", role:"Open Source Dev",     mutual:8,  connected:true,  online:false, skills:["Go","Rust"],            about:"Building open-source tools used by thousands." },
  { id:3,  name:"Neha Gupta",    branch:"IT",  year:"3rd Year", role:"ML Enthusiast",       mutual:15, connected:true,  online:true,  skills:["Python","TensorFlow"],  about:"Deep learning researcher, Kaggle expert." },
  { id:4,  name:"Karan Joshi",   branch:"ECE", year:"1st Year", role:"Competitive Coder",   mutual:5,  connected:true,  online:false, skills:["C++","DSA"],            about:"Targeting ICPC, LeetCode top 1%." },
  { id:5,  name:"Rahul Verma",   branch:"ME",  year:"3rd Year", role:"Robotics Club Head",  mutual:9,  connected:true,  online:true,  skills:["CAD","Python"],         about:"Building autonomous drones for campus deliveries." },
  { id:6,  name:"Ananya Singh",  branch:"IT",  year:"2nd Year", role:"UI/UX Designer",      mutual:11, connected:true,  online:false, skills:["Figma","CSS"],          about:"Design-first engineer. Figma files > wireframes." },
  { id:7,  name:"Vikram Nair",   branch:"CSE", year:"4th Year", role:"Backend Engineer",    mutual:6,  connected:true,  online:true,  skills:["Node.js","SQL"],        about:"Microservices enthusiast, coffee addict ☕" },
  { id:8,  name:"Shreya Patel",  branch:"MBA", year:"1st Year", role:"Product Manager",     mutual:3,  connected:true,  online:false, skills:["Strategy","Agile"],     about:"Bridging tech and business at campus startup lab." },
  // Suggestions
  { id:9,  name:"Amit Kumar",    branch:"CSE", year:"2nd Year", role:"Full Stack Dev",      mutual:14, connected:false, online:true,  skills:["React","MongoDB"],      about:"MERN stack dev, always building side projects." },
  { id:10, name:"Divya Reddy",   branch:"ECE", year:"3rd Year", role:"VLSI Designer",       mutual:7,  connected:false, online:false, skills:["VHDL","Cadence"],       about:"Chip design intern at NXP Semiconductors." },
  { id:11, name:"Rohan Gupta",   branch:"ME",  year:"4th Year", role:"CAD Specialist",      mutual:9,  connected:false, online:true,  skills:["SolidWorks","ANSYS"],   about:"3D printing enthusiast, formula SAE team lead." },
  { id:12, name:"Kavya Sharma",  branch:"IT",  year:"2nd Year", role:"Data Analyst",        mutual:12, connected:false, online:false, skills:["Python","Tableau"],     about:"Turning messy data into clean dashboards." },
  { id:13, name:"Nikhil Joshi",  branch:"CSE", year:"1st Year", role:"Python Developer",    mutual:5,  connected:false, online:true,  skills:["Python","Flask"],       about:"Building automations and web scrapers." },
  { id:14, name:"Pooja Singh",   branch:"MBA", year:"2nd Year", role:"Marketing Lead",      mutual:8,  connected:false, online:false, skills:["SEO","Analytics"],      about:"Growth hacker at campus incubator." },
  { id:15, name:"Aditya Rao",    branch:"CSE", year:"3rd Year", role:"DevOps Engineer",     mutual:10, connected:false, online:true,  skills:["Docker","K8s"],         about:"k8s clusters before breakfast." },
  { id:16, name:"Riya Kapoor",   branch:"ECE", year:"2nd Year", role:"IoT Developer",       mutual:6,  connected:false, online:false, skills:["Arduino","MQTT"],       about:"Smart campus projects & embedded systems." },
];

const BRANCHES = ["All","CSE","ECE","IT","ME","MBA"];

const BRANCH_COLOR = {
  CSE:{ bg:"rgba(61,111,255,.12)",  color:"#6b8fff", border:"rgba(61,111,255,.25)"  },
  ECE:{ bg:"rgba(201,168,76,.12)",  color:"#e8c97a", border:"rgba(201,168,76,.25)"  },
  IT: { bg:"rgba(78,203,113,.10)",  color:"#4ecb71", border:"rgba(78,203,113,.22)"  },
  ME: { bg:"rgba(255,107,107,.10)", color:"#ff8e7a", border:"rgba(255,107,107,.22)" },
  MBA:{ bg:"rgba(168,85,247,.10)",  color:"#c084fc", border:"rgba(168,85,247,.22)"  },
};

// ── PAGE-SPECIFIC CSS ──────────────────────────────────────
const CSS = `
.net-main{flex:1;padding:28px 28px 60px;min-width:0;max-width:1100px}
.page-title{font-family:'DM Serif Display',serif;font-size:30px;color:var(--text);margin-bottom:4px}
.page-sub{font-size:14px;color:var(--text3);margin-bottom:24px}
/* Stats chips */
.stat-row{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:24px}
.stat-chip{display:flex;align-items:center;gap:8px;padding:9px 16px;background:var(--bg2);border:1px solid var(--glass-border);border-radius:40px;font-size:13px;color:var(--text2);transition:all .2s;cursor:default}
.stat-chip:hover{border-color:rgba(201,168,76,.3);color:var(--text)}
.stat-chip strong{color:var(--gold2);font-size:15px;font-family:'DM Serif Display',serif}
/* Controls */
.net-controls{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;align-items:center}
.net-search-wrap{position:relative;flex:1;min-width:200px}
.ns-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--text3)}
.net-search{width:100%;background:var(--bg2);border:1px solid var(--glass-border);border-radius:40px;padding:11px 16px 11px 42px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:all .2s}
.net-search::placeholder{color:var(--text3)}
.net-search:focus{border-color:rgba(201,168,76,.35);box-shadow:0 0 0 3px rgba(201,168,76,.07)}
.branch-filters{display:flex;gap:6px;flex-wrap:wrap}
.bf{padding:8px 15px;border-radius:40px;border:1px solid var(--glass-border);background:var(--glass);color:var(--text2);font-size:13px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
.bf:hover{border-color:rgba(201,168,76,.3)}
.bf.active{background:var(--gold-dim);border-color:rgba(201,168,76,.4);color:var(--gold2);font-weight:500}
/* Main tabs */
.main-tabs{display:flex;gap:2px;margin-bottom:24px;border-bottom:1px solid var(--glass-border)}
.mt{padding:11px 22px;font-size:14px;font-weight:500;color:var(--text3);cursor:pointer;border:none;background:none;font-family:'DM Sans',sans-serif;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .2s}
.mt:hover{color:var(--text)}
.mt.active{color:var(--gold2);border-bottom-color:var(--gold)}
/* Section heading */
.sec-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
.sec-title{font-family:'DM Serif Display',serif;font-size:19px;color:var(--text)}
.sec-badge{font-size:12px;color:var(--text3);background:var(--bg3);border:1px solid var(--glass-border);padding:3px 12px;border-radius:20px}
/* Cards grid */
.cards-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:14px}
/* Card */
.pcard{background:var(--bg2);border:1px solid var(--glass-border);border-radius:var(--radius);padding:20px;transition:all .25s;animation:fadeUp .35s ease both;position:relative;overflow:hidden}
.pcard::after{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),var(--accent));opacity:0;transition:opacity .3s}
.pcard:hover{border-color:rgba(201,168,76,.22);box-shadow:0 8px 32px rgba(0,0,0,.32);transform:translateY(-3px)}
.pcard:hover::after{opacity:1}
.card-top{display:flex;gap:13px;margin-bottom:12px;align-items:flex-start}
.online-wrap{position:relative;flex-shrink:0}
.online-dot{position:absolute;bottom:2px;right:2px;width:11px;height:11px;border-radius:50%;background:var(--green);border:2px solid var(--bg2)}
.card-info{flex:1;min-width:0}
.card-name{font-size:15px;font-weight:500;color:var(--text);margin-bottom:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.card-role{font-size:12px;color:var(--text3);margin-bottom:7px}
.skill-tags{display:flex;gap:5px;flex-wrap:wrap}
.stag{font-size:11px;padding:2px 8px;border-radius:20px;background:var(--bg3);border:1px solid var(--glass-border);color:var(--text3);white-space:nowrap}
.branch-pill{display:inline-flex;align-items:center;padding:3px 11px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:.04em;margin-bottom:9px}
.mutual{font-size:12px;color:var(--text3);margin-bottom:13px;display:flex;align-items:center;gap:5px}
.card-btns{display:flex;gap:8px}
.btn-connect{flex:1;padding:9px;border-radius:10px;background:linear-gradient(135deg,var(--gold),#a0782a);border:none;color:#fff;font-size:12px;font-weight:600;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;box-shadow:0 3px 10px rgba(201,168,76,.22)}
.btn-connect:hover{transform:translateY(-1px);box-shadow:0 5px 14px rgba(201,168,76,.38)}
.btn-connect.conn{background:var(--bg3);border:1px solid var(--glass-border);color:var(--text3);box-shadow:none}
.btn-connect.conn:hover{background:rgba(224,85,85,.08);border-color:rgba(224,85,85,.3);color:var(--red)}
.btn-msg{width:36px;height:36px;border-radius:10px;background:var(--glass);border:1px solid var(--glass-border);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
.btn-msg:hover{background:rgba(61,111,255,.12);border-color:rgba(61,111,255,.3);color:var(--accent2)}
/* Empty */
.empty{text-align:center;padding:64px 20px;color:var(--text3)}
.empty-icon{font-size:52px;margin-bottom:14px}
.empty-title{font-family:'DM Serif Display',serif;font-size:20px;color:var(--text2);margin-bottom:6px}
/* Responsive */
@media(max-width:900px){.cards-grid{grid-template-columns:repeat(auto-fill,minmax(220px,1fr))}}
@media(max-width:600px){
  .net-main{padding:16px 12px 60px}
  .cards-grid{grid-template-columns:1fr 1fr}
  .net-controls{flex-direction:column}
  .net-search-wrap{min-width:100%;width:100%}
}
@media(max-width:380px){.cards-grid{grid-template-columns:1fr}}
`;

// ── COMPONENT ─────────────────────────────────────────────
export default function Network({ navigate, activePage, theme, toggleTheme, networkCount=142, setNetworkCount, postCount=12 }) {
  const { toasts, addToast } = useToasts();
  const [people,   setPeople]   = useState(ALL_PEOPLE);
  const [search,   setSearch]   = useState("");
  const [branch,   setBranch]   = useState("All");
  const [tab,      setTab]      = useState("connections");

  const toggleConnect = (id) => {
    setPeople(prev => prev.map(p => {
      if (p.id !== id) return p;
      const now = !p.connected;
      setNetworkCount?.(c => now ? c+1 : c-1);
      addToast("like", now?"Connected! 🤝":"Removed", now?`You're now connected with ${p.name}`:`Removed ${p.name}`, now?"🤝":"👋");
      return { ...p, connected: now };
    }));
  };

  const filtered = people.filter(p => {
    const q = search.toLowerCase();
    return (!q || p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q) || p.branch.toLowerCase().includes(q))
        && (branch === "All" || p.branch === branch);
  });

  const connections = filtered.filter(p =>  p.connected);
  const suggestions = filtered.filter(p => !p.connected);
  const list = tab === "connections" ? connections : suggestions;

  return (
    <>
      <style>{FONTS}{SHARED_CSS}{CSS}</style>
      <div className="app">
        <Navbar navigate={navigate} activePage={activePage} theme={theme} toggleTheme={toggleTheme} networkCount={networkCount} postCount={postCount} />
        <div className="layout">
          <aside className="sidebar">
            <SidebarContent navigate={navigate} activePage={activePage} networkCount={networkCount} postCount={postCount} />
          </aside>

          <main className="net-main">
            {/* Header */}
            <div className="page-title">My Network</div>
            <div className="page-sub">Manage connections and discover your campus community</div>

            {/* Stats */}
            <div className="stat-row">
              {[["🤝","Connections",people.filter(p=>p.connected).length],["🔍","Suggestions",people.filter(p=>!p.connected).length],["🏫","Branches",[...new Set(people.map(p=>p.branch))].length],["🌐","Total Network",networkCount]].map(([ic,lbl,val]) => (
                <div key={lbl} className="stat-chip"><span>{ic}</span><span>{lbl}: <strong>{val}</strong></span></div>
              ))}
            </div>

            {/* Search + Branch filter */}
            <div className="net-controls">
              <div className="net-search-wrap">
                <svg className="ns-icon" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input className="net-search" placeholder="Search by name, role or branch…" value={search} onChange={e=>setSearch(e.target.value)} />
              </div>
              <div className="branch-filters">
                {BRANCHES.map(b => (
                  <button key={b} className={`bf ${branch===b?"active":""}`} onClick={()=>setBranch(b)}>{b}</button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="main-tabs">
              <button className={`mt ${tab==="connections"?"active":""}`} onClick={()=>setTab("connections")}>
                My Connections ({people.filter(p=>p.connected).length})
              </button>
              <button className={`mt ${tab==="discover"?"active":""}`} onClick={()=>setTab("discover")}>
                Discover People ({people.filter(p=>!p.connected).length})
              </button>
            </div>

            <div className="sec-head">
              <div className="sec-title">{tab==="connections"?"People you know":"Recommended for you"}</div>
              <div className="sec-badge">{list.length} {tab==="connections"?"connections":"suggestions"}</div>
            </div>

            {list.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">{tab==="connections"?"🤝":"🔍"}</div>
                <div className="empty-title">No results found</div>
                <div>Try different search terms or filters</div>
              </div>
            ) : (
              <div className="cards-grid">
                {list.map((p, i) => {
                  const bc = BRANCH_COLOR[p.branch] || BRANCH_COLOR.CSE;
                  return (
                    <div key={p.id} className="pcard" style={{ animationDelay:`${i*.045}s` }}>
                      <div className="card-top">
                        <div className="online-wrap">
                          <Avatar name={p.name} src={AVATARS[p.name]} size={52} />
                          {p.online && <div className="online-dot"/>}
                        </div>
                        <div className="card-info">
                          <div className="card-name">{p.name}</div>
                          <div className="card-role">{p.role}</div>
                          <div className="skill-tags">
                            {p.skills.map(s => <span key={s} className="stag">{s}</span>)}
                          </div>
                        </div>
                      </div>

                      <div className="branch-pill" style={{ background:bc.bg, color:bc.color, border:`1px solid ${bc.border}` }}>
                        {p.branch} · {p.year}
                      </div>

                      <div className="mutual">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        {p.mutual} mutual connections
                      </div>

                      <div className="card-btns">
                        <button className={`btn-connect ${p.connected?"conn":""}`} onClick={()=>toggleConnect(p.id)}>
                          {p.connected?"✓ Connected":"+ Connect"}
                        </button>
                        <button className="btn-msg" title="Message" onClick={()=>navigate("/message")}>
                          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
        <ToastContainer toasts={toasts} />
      </div>
    </>
  );
}