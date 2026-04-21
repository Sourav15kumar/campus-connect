const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');`;

const CSS = `
/* ── RESET & ROOT VARIABLES ── */
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
/* Light-mode overrides */
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
.app{min-height:100vh;background:var(--bg);
  background-image:radial-gradient(ellipse 80% 50% at 20% -10%,rgba(61,111,255,.07) 0%,transparent 60%),
  radial-gradient(ellipse 60% 40% at 80% 100%,rgba(201,168,76,.04) 0%,transparent 60%);
  transition:background .3s}
html[data-theme="light"] .app{background-image:radial-gradient(ellipse 80% 50% at 20% -10%,rgba(61,111,255,.04) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 80% 100%,rgba(201,168,76,.03) 0%,transparent 60%)}

/* ── NAVBAR ── */
.navbar{position:fixed;top:0;left:0;right:0;z-index:100;height:var(--nav-h);display:flex;align-items:center;background:var(--nav-bg);backdrop-filter:blur(24px);border-bottom:1px solid var(--glass-border);padding:0 16px;gap:12px;transition:background .3s,border-color .3s}
.nav-brand{display:flex;align-items:center;gap:10px;flex-shrink:0;text-decoration:none;cursor:pointer}
.nav-brand-icon{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--gold),var(--accent));display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#fff;box-shadow:0 0 16px rgba(201,168,76,.25)}
.nav-brand-text{font-family:'DM Serif Display',serif;font-size:18px;background:linear-gradient(90deg,var(--gold2),var(--text));-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:.02em;white-space:nowrap}
.nav-center{flex:1;display:flex;align-items:center;justify-content:center;min-width:0}
.search-wrap{position:relative;width:100%;max-width:440px}
.search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--text3);pointer-events:none}
.search-input{width:100%;background:var(--glass);border:1px solid var(--glass-border);border-radius:40px;padding:10px 16px 10px 40px;color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;outline:none;transition:all .2s}
.search-input::placeholder{color:var(--text3)}
.search-input:focus{border-color:rgba(201,168,76,.4);background:var(--bg2);box-shadow:0 0 0 3px rgba(201,168,76,.08)}
.nav-right{display:flex;align-items:center;gap:6px;flex-shrink:0}
.nav-btn{width:40px;height:40px;border-radius:12px;border:1px solid transparent;background:transparent;color:var(--text2);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;position:relative}
.nav-btn:hover{background:var(--glass);border-color:var(--glass-border);color:var(--text)}
.theme-btn{width:40px;height:40px;border-radius:12px;border:1px solid var(--glass-border);background:var(--glass);color:var(--gold2);font-size:17px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s}
.theme-btn:hover{background:var(--gold-dim);border-color:rgba(201,168,76,.3);transform:rotate(18deg)}
.notif-badge{position:absolute;top:6px;right:6px;width:16px;height:16px;border-radius:50%;background:var(--red);color:#fff;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid var(--bg);animation:pulseBadge 2s infinite}
@keyframes pulseBadge{0%,100%{box-shadow:0 0 0 0 rgba(224,85,85,.5)}50%{box-shadow:0 0 0 5px rgba(224,85,85,0)}}
.nav-divider{width:1px;height:28px;background:var(--glass-border);margin:0 2px}
.nav-profile-btn{display:flex;align-items:center;gap:8px;padding:5px 10px 5px 5px;border-radius:40px;border:1px solid var(--glass-border);background:var(--glass);cursor:pointer;transition:all .2s;color:var(--text)}
.nav-profile-btn:hover{border-color:rgba(201,168,76,.38);background:var(--gold-dim);box-shadow:0 0 0 3px rgba(201,168,76,.07)}
.nav-avatar{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--accent));display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff;overflow:hidden;flex-shrink:0;box-shadow:0 0 0 1.5px var(--gold)}
.nav-avatar img{width:100%;height:100%;object-fit:cover}
.nav-profile-info{line-height:1.2}
.nav-profile-name{font-size:13px;font-weight:500;white-space:nowrap}
.nav-profile-sub{font-size:11px;color:var(--text3);white-space:nowrap}
.nav-chevron{color:var(--text3);transition:transform .2s;margin-left:2px;flex-shrink:0}
.nav-chevron.open{transform:rotate(180deg)}
.nav-menu-btn{display:none;width:40px;height:40px;border-radius:12px;border:1px solid var(--glass-border);background:var(--glass);color:var(--text2);align-items:center;justify-content:center;cursor:pointer;transition:all .2s;flex-shrink:0}
.nav-menu-btn:hover{color:var(--text);background:var(--glass)}

/* ── NOTIFICATION DROPDOWN ── */
.notif-dropdown{position:absolute;top:calc(100% + 10px);right:0;width:340px;background:var(--bg2);border:1px solid var(--glass-border);border-radius:var(--radius);box-shadow:var(--shadow-lg);overflow:hidden;animation:slideDown .2s ease;z-index:200}
@keyframes slideDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
.notif-header{display:flex;align-items:center;justify-content:space-between;padding:16px 18px 12px;border-bottom:1px solid var(--glass-border)}
.notif-title{font-family:'DM Serif Display',serif;font-size:16px;color:var(--text)}
.notif-clear{font-size:12px;color:var(--gold);cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif;transition:opacity .2s}
.notif-clear:hover{opacity:.7}
.notif-list{max-height:320px;overflow-y:auto}
.notif-item{display:flex;align-items:flex-start;gap:12px;padding:14px 18px;border-bottom:1px solid var(--glass-border);transition:background .15s;cursor:pointer}
.notif-item:last-child{border-bottom:none}
.notif-item:hover{background:var(--glass)}
.notif-item.unread{background:rgba(201,168,76,.04)}
.notif-dot{width:8px;height:8px;border-radius:50%;background:var(--gold);flex-shrink:0;margin-top:5px}
.notif-dot.read{background:transparent;border:1px solid var(--text3)}
.notif-item-icon{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.notif-item-text{font-size:13px;color:var(--text2);line-height:1.4}
.notif-item-text strong{color:var(--text);font-weight:500}
.notif-item-time{font-size:11px;color:var(--text3);margin-top:3px}
.notif-empty{padding:32px;text-align:center;color:var(--text3);font-size:14px}

/* ── STORIES STRIP ── */
.stories-wrap{padding:20px 0 4px;margin-bottom:4px}
.stories-label{font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:12px;padding:0 2px}
.stories-row{display:flex;gap:12px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none}
.stories-row::-webkit-scrollbar{display:none}
.story-item{display:flex;flex-direction:column;align-items:center;gap:7px;cursor:pointer;flex-shrink:0}
.story-ring{width:60px;height:60px;border-radius:50%;padding:2.5px;background:linear-gradient(135deg,var(--gold),#ff6b6b,var(--accent));position:relative;transition:transform .2s;flex-shrink:0}
.story-ring:hover{transform:scale(1.06)}
.story-ring.seen{background:var(--glass-border);padding:2px}
.story-ring.add-story{background:linear-gradient(135deg,var(--accent),var(--gold))}
.story-inner{width:100%;height:100%;border-radius:50%;overflow:hidden;border:2.5px solid var(--bg2);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:600;color:#fff;background:var(--bg3)}
.story-inner img{width:100%;height:100%;object-fit:cover}
.story-add-icon{position:absolute;bottom:0;right:0;width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--accent));border:2px solid var(--bg2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700}
.story-name{font-size:11px;color:var(--text2);text-align:center;max-width:64px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

/* ── STORY VIEWER OVERLAY ── */
.story-viewer-overlay{position:fixed;inset:0;z-index:400;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;animation:fadein .2s ease}
@keyframes fadein{from{opacity:0}to{opacity:1}}
.story-viewer{position:relative;width:360px;max-width:95vw;border-radius:20px;overflow:hidden;background:#000;box-shadow:0 24px 80px rgba(0,0,0,.8)}
.story-progress-bar{display:flex;gap:4px;padding:12px 12px 0;position:absolute;top:0;left:0;right:0;z-index:2}
.story-progress-seg{flex:1;height:3px;background:rgba(255,255,255,.3);border-radius:2px;overflow:hidden}
.story-progress-fill{height:100%;background:#fff;border-radius:2px;transition:width .1s linear}
.story-media{width:100%;aspect-ratio:9/16;object-fit:cover;display:block}
.story-media-placeholder{width:100%;aspect-ratio:9/16;display:flex;align-items:center;justify-content:center;font-size:72px}
.story-viewer-header{position:absolute;top:28px;left:0;right:0;z-index:2;display:flex;align-items:center;gap:10px;padding:0 14px}
.story-viewer-avatar{width:36px;height:36px;border-radius:50%;border:2px solid #fff;overflow:hidden;flex-shrink:0}
.story-viewer-avatar img{width:100%;height:100%;object-fit:cover}
.story-viewer-name{color:#fff;font-size:14px;font-weight:500;flex:1}
.story-viewer-time{color:rgba(255,255,255,.65);font-size:12px}
.story-viewer-close{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.15);border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s}
.story-viewer-close:hover{background:rgba(255,255,255,.3)}
.story-viewer-caption{position:absolute;bottom:0;left:0;right:0;padding:40px 18px 20px;background:linear-gradient(to top,rgba(0,0,0,.7),transparent);color:#fff;font-size:14px;line-height:1.5}
.story-nav-btn{position:absolute;top:50%;transform:translateY(-50%);z-index:3;width:44px;height:60px;background:transparent;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.6);transition:color .2s}
.story-nav-btn:hover{color:#fff}
.story-nav-btn.prev{left:0}
.story-nav-btn.next{right:0}

/* ── PROFILE SLIDE-IN DRAWER ── */
.profile-drawer-overlay{position:fixed;inset:0;z-index:150;background:rgba(0,0,0,.45);backdrop-filter:blur(4px);animation:fadein .2s ease}
.profile-drawer{position:fixed;top:var(--nav-h);right:0;bottom:0;z-index:160;width:340px;background:var(--bg2);border-left:1px solid var(--glass-border);box-shadow:-8px 0 48px rgba(0,0,0,.3);display:flex;flex-direction:column;animation:drawerIn .28s cubic-bezier(.34,1.2,.64,1);overflow-y:auto}
@keyframes drawerIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
.drawer-cover{height:90px;flex-shrink:0;position:relative;background:linear-gradient(135deg,rgba(201,168,76,.22),rgba(61,111,255,.18))}
.drawer-cover-close{position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:50%;background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.12);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
.drawer-cover-close:hover{background:rgba(224,85,85,.5)}
.drawer-avatar-wrap{position:absolute;bottom:-38px;left:24px}
.drawer-avatar{width:76px;height:76px;border-radius:50%;border:3px solid var(--bg2);box-shadow:0 0 0 2.5px var(--gold),0 6px 20px rgba(0,0,0,.32);overflow:hidden;background:linear-gradient(135deg,var(--gold),var(--accent));display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:600;color:#fff}
.drawer-avatar img{width:100%;height:100%;object-fit:cover}
.drawer-online{position:absolute;bottom:4px;right:4px;width:14px;height:14px;border-radius:50%;background:var(--green);border:2px solid var(--bg2)}
.drawer-body{padding:52px 24px 28px;flex:1}
.drawer-name{font-family:'DM Serif Display',serif;font-size:22px;color:var(--text);margin-bottom:3px}
.drawer-handle{font-size:13px;color:var(--gold);margin-bottom:3px}
.drawer-role{font-size:13px;color:var(--text3);margin-bottom:18px}
.drawer-bio{font-size:13px;color:var(--text2);line-height:1.65;padding:12px 14px;border-radius:12px;background:var(--bg3);border:1px solid var(--glass-border);margin-bottom:18px}
.drawer-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px}
.drawer-stat{text-align:center;padding:12px 8px;border-radius:12px;background:var(--bg3);border:1px solid var(--glass-border);transition:all .2s;cursor:default}
.drawer-stat:hover{border-color:rgba(201,168,76,.25);background:var(--gold-dim)}
.drawer-stat-num{font-family:'DM Serif Display',serif;font-size:20px;color:var(--text);line-height:1}
.drawer-stat-label{font-size:10px;color:var(--text3);margin-top:4px;text-transform:uppercase;letter-spacing:.08em}
.drawer-section{margin-bottom:20px}
.drawer-section-title{font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:10px}
.drawer-skills{display:flex;flex-wrap:wrap;gap:7px}
.drawer-skill{padding:5px 12px;border-radius:20px;background:var(--bg3);border:1px solid var(--glass-border);font-size:12px;color:var(--text2);transition:all .2s;cursor:default}
.drawer-skill:hover{border-color:rgba(201,168,76,.3);color:var(--gold2);background:var(--gold-dim)}
.drawer-activity{display:flex;flex-direction:column;gap:8px}
.drawer-activity-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:var(--bg3);border:1px solid var(--glass-border);font-size:13px;color:var(--text2)}
.drawer-progress-wrap{margin-bottom:4px}
.drawer-progress-label{display:flex;align-items:center;justify-content:space-between;font-size:12px;color:var(--text3);margin-bottom:7px}
.drawer-progress-bar{height:5px;border-radius:4px;background:var(--bg3);overflow:hidden}
.drawer-progress-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,var(--gold),var(--accent));transition:width .6s cubic-bezier(.34,1.2,.64,1)}
.drawer-actions{display:flex;gap:10px;margin-top:4px}
.drawer-btn{flex:1;padding:11px;border-radius:12px;border:1px solid var(--glass-border);background:var(--bg3);color:var(--text2);font-size:13px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:6px}
.drawer-btn:hover{background:var(--glass);color:var(--text)}
.drawer-btn.primary{background:linear-gradient(135deg,var(--gold),#a0782a);border-color:transparent;color:#fff;box-shadow:0 4px 14px rgba(201,168,76,.25)}
.drawer-btn.primary:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(201,168,76,.38)}

/* ── PAGE LAYOUT ── */
.layout{display:flex;padding-top:var(--nav-h);min-height:100vh}

/* ── LEFT SIDEBAR ── */
.sidebar{width:var(--sidebar-w);flex-shrink:0;position:sticky;top:var(--nav-h);height:calc(100vh - var(--nav-h));overflow-y:auto;padding:20px 14px;display:flex;flex-direction:column;gap:4px;border-right:1px solid var(--glass-border)}
.sidebar-label{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);padding:12px 12px 6px}
.nav-item{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:var(--radius-sm);cursor:pointer;border:1px solid transparent;transition:all .2s;color:var(--text2);font-size:14px}
.nav-item:hover{background:var(--glass);border-color:var(--glass-border);color:var(--text)}
.nav-item.active{background:var(--gold-dim);border-color:rgba(201,168,76,.2);color:var(--gold2)}
.nav-item-badge{margin-left:auto;background:var(--accent);color:#fff;font-size:10px;font-weight:600;padding:2px 7px;border-radius:20px;min-width:20px;text-align:center}
.nav-item-badge.gold{background:var(--gold);color:#000}
.sidebar-divider{height:1px;background:var(--glass-border);margin:8px 0}
.logout-btn{display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:var(--radius-sm);cursor:pointer;border:1px solid transparent;background:none;transition:all .2s;color:var(--text3);font-size:14px;font-family:'DM Sans',sans-serif;width:100%;text-align:left;margin-top:auto}
.logout-btn:hover{background:rgba(224,85,85,.08);border-color:rgba(224,85,85,.2);color:var(--red)}

/* ── MOBILE SIDEBAR OVERLAY ── */
.mobile-sidebar-overlay{display:none;position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.5);backdrop-filter:blur(4px)}
.mobile-sidebar{position:fixed;top:0;left:0;bottom:0;width:280px;background:var(--bg2);border-right:1px solid var(--glass-border);z-index:201;padding:24px 16px;display:flex;flex-direction:column;gap:4px;animation:slideRight .28s cubic-bezier(.34,1.2,.64,1);overflow-y:auto}
@keyframes slideRight{from{transform:translateX(-100%);opacity:0}to{transform:translateX(0);opacity:1}}
.mobile-sidebar-close{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}

/* ── MAIN FEED AREA ── */
.main{flex:1;padding:16px 20px 60px;max-width:680px;margin:0 auto;width:100%}

/* ── COMPOSE BOX ── */
.compose-card{background:var(--bg2);border:1px solid var(--glass-border);border-radius:var(--radius);padding:16px;margin-bottom:16px;transition:border-color .2s}
.compose-card:hover{border-color:rgba(201,168,76,.2)}
.compose-row{display:flex;align-items:center;gap:12px}
.compose-avatar{width:40px;height:40px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,var(--gold),var(--accent));display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:600;color:#fff;overflow:hidden}
.compose-avatar img{width:100%;height:100%;object-fit:cover}
.compose-trigger{flex:1;background:var(--bg3);border:1px solid var(--glass-border);border-radius:40px;padding:11px 18px;color:var(--text3);font-size:14px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;text-align:left}
.compose-trigger:hover{border-color:rgba(201,168,76,.3);color:var(--text2);background:var(--bg2)}
.compose-actions{display:flex;gap:6px;margin-top:12px;padding-top:12px;border-top:1px solid var(--glass-border);flex-wrap:wrap}
.compose-action-btn{display:flex;align-items:center;gap:6px;padding:7px 12px;border-radius:8px;border:1px solid transparent;background:none;color:var(--text3);font-size:12px;font-weight:500;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
.compose-action-btn:hover{background:var(--glass);border-color:var(--glass-border);color:var(--text)}

/* ── POST CARD ── */
.post-card{background:var(--bg2);border:1px solid var(--glass-border);border-radius:var(--radius);margin-bottom:16px;overflow:hidden;transition:border-color .25s,box-shadow .25s;animation:fadeUp .3s ease both}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.post-card:hover{border-color:rgba(255,255,255,.1);box-shadow:var(--shadow)}
html[data-theme="light"] .post-card:hover{border-color:rgba(0,0,0,.12)}
.post-header{display:flex;align-items:center;gap:12px;padding:16px 16px 0}
.post-user-name{font-size:15px;font-weight:500;color:var(--text)}
.post-user-sub{font-size:12px;color:var(--text3);margin-top:1px}
.post-time{margin-left:auto;font-size:12px;color:var(--text3);white-space:nowrap}
.post-body{padding:12px 16px;font-size:15px;line-height:1.65;color:var(--text);white-space:pre-wrap}
.post-image{width:100%;max-height:400px;object-fit:cover;display:block}
.post-footer{display:flex;align-items:center;gap:4px;padding:10px 12px 12px;border-top:1px solid var(--glass-border)}
.post-action{display:flex;align-items:center;gap:6px;padding:7px 10px;border-radius:8px;border:1px solid transparent;background:none;color:var(--text3);font-size:13px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
.post-action:hover{background:var(--glass);border-color:var(--glass-border);color:var(--text)}
.post-action.liked{color:var(--gold);background:var(--gold-dim);border-color:rgba(201,168,76,.2)}
.post-action.liked svg{fill:var(--gold)}
.post-action.bookmarked{color:var(--accent2);background:rgba(61,111,255,.1);border-color:rgba(61,111,255,.2)}
.post-action.bookmarked svg{fill:var(--accent2)}
.post-action-spacer{flex:1}

/* ── POLL INSIDE POST ── */
.post-poll{padding:0 16px 14px}
.poll-question{font-size:15px;font-weight:500;color:var(--text);margin-bottom:12px}
.poll-option{margin-bottom:8px;cursor:pointer}
.poll-option-bar{position:relative;border-radius:10px;overflow:hidden;border:1px solid var(--glass-border);height:44px;display:flex;align-items:center;transition:all .2s}
.poll-option-bar:hover{border-color:rgba(201,168,76,.3)}
.poll-option-bar.voted{border-color:rgba(201,168,76,.3)}
.poll-fill{position:absolute;left:0;top:0;bottom:0;background:var(--gold-dim);border-radius:10px;transition:width .6s cubic-bezier(.34,1.2,.64,1)}
.poll-option-bar.voted .poll-fill{background:linear-gradient(90deg,rgba(201,168,76,.2),rgba(201,168,76,.08))}
.poll-label{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 14px;font-size:14px;color:var(--text)}
.poll-pct{font-size:13px;color:var(--gold);font-weight:600}
.poll-meta{font-size:12px;color:var(--text3);margin-top:8px}

/* ── COMMENTS SECTION ── */
.comments-section{border-top:1px solid var(--glass-border);padding:0 16px 14px}
.comment-item{display:flex;gap:10px;margin-top:12px;animation:fadeUp .2s ease}
.comment-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--gold));display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#fff;flex-shrink:0;overflow:hidden}
.comment-avatar img{width:100%;height:100%;object-fit:cover;border-radius:50%}
.comment-bubble{background:var(--bg3);border:1px solid var(--glass-border);border-radius:12px;padding:10px 14px;flex:1}
.comment-author{font-size:13px;font-weight:500;color:var(--text)}
.comment-text{font-size:13px;color:var(--text2);margin-top:2px;line-height:1.45}
.comment-input-row{display:flex;gap:10px;margin-top:12px;align-items:center}
.comment-input{flex:1;background:var(--bg3);border:1px solid var(--glass-border);border-radius:40px;padding:9px 16px;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;outline:none;transition:all .2s}
.comment-input::placeholder{color:var(--text3)}
.comment-input:focus{border-color:rgba(201,168,76,.3);box-shadow:0 0 0 3px rgba(201,168,76,.06)}
.comment-send{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--gold),#a0782a);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;transition:all .2s;flex-shrink:0}
.comment-send:hover{transform:scale(1.08);box-shadow:0 4px 12px rgba(201,168,76,.35)}

/* ── CREATE POST MODAL ── */
.modal-overlay{position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;animation:fadein .2s ease}
.modal{background:var(--bg2);border:1px solid var(--glass-border);border-radius:20px;width:100%;max-width:560px;box-shadow:var(--shadow-lg);animation:scaleIn .22s ease;max-height:90vh;overflow-y:auto}
@keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
.modal-header{display:flex;align-items:center;justify-content:space-between;padding:20px 22px 0;position:sticky;top:0;background:var(--bg2);z-index:1;border-radius:20px 20px 0 0}
.modal-title{font-family:'DM Serif Display',serif;font-size:20px;color:var(--text)}
.modal-close{width:36px;height:36px;border-radius:10px;background:var(--glass);border:1px solid var(--glass-border);color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
.modal-close:hover{background:rgba(224,85,85,.1);border-color:rgba(224,85,85,.2);color:var(--red)}
.modal-tabs{display:flex;gap:6px;padding:14px 22px 0}
.modal-tab{flex:1;padding:9px;border-radius:10px;border:1px solid var(--glass-border);background:var(--glass);color:var(--text2);font-size:13px;font-weight:500;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:6px}
.modal-tab:hover{color:var(--text);background:var(--bg3)}
.modal-tab.active{background:var(--gold-dim);border-color:rgba(201,168,76,.3);color:var(--gold2)}
.modal-body{padding:14px 22px}
.modal-user-row{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.modal-textarea{width:100%;background:var(--bg3);border:1px solid var(--glass-border);border-radius:14px;padding:14px 16px;color:var(--text);font-size:15px;line-height:1.6;font-family:'DM Sans',sans-serif;outline:none;resize:none;min-height:100px;transition:all .2s}
.modal-textarea::placeholder{color:var(--text3)}
.modal-textarea:focus{border-color:rgba(201,168,76,.35);box-shadow:0 0 0 3px rgba(201,168,76,.06)}
.modal-tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.modal-tag{padding:5px 12px;border-radius:20px;background:var(--glass);border:1px solid var(--glass-border);color:var(--text2);font-size:12px;cursor:pointer;transition:all .15s}
.modal-tag:hover{background:var(--gold-dim);border-color:rgba(201,168,76,.3);color:var(--gold2)}
.img-upload-area{border:2px dashed var(--glass-border);border-radius:14px;padding:24px;text-align:center;cursor:pointer;transition:all .2s;margin-bottom:12px;position:relative;overflow:hidden}
.img-upload-area:hover{border-color:rgba(201,168,76,.35);background:var(--gold-dim)}
.img-upload-area.has-image{border-style:solid;border-color:rgba(201,168,76,.3);padding:0}
.img-upload-area img{width:100%;max-height:280px;object-fit:cover;border-radius:12px;display:block}
.img-upload-remove{position:absolute;top:8px;right:8px;width:28px;height:28px;border-radius:50%;background:rgba(0,0,0,.6);border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s}
.img-upload-remove:hover{background:rgba(224,85,85,.8)}
.img-upload-icon{font-size:32px;margin-bottom:8px}
.img-upload-text{font-size:14px;color:var(--text2);margin-bottom:4px}
.img-upload-sub{font-size:12px;color:var(--text3)}
.img-file-input{display:none}
.poll-builder{margin-bottom:12px}
.poll-q-input{width:100%;background:var(--bg3);border:1px solid var(--glass-border);border-radius:12px;padding:12px 16px;color:var(--text);font-size:14px;font-family:'DM Sans',sans-serif;outline:none;transition:all .2s;margin-bottom:10px}
.poll-q-input::placeholder{color:var(--text3)}
.poll-q-input:focus{border-color:rgba(201,168,76,.3);box-shadow:0 0 0 3px rgba(201,168,76,.06)}
.poll-opt-row{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.poll-opt-input{flex:1;background:var(--bg3);border:1px solid var(--glass-border);border-radius:10px;padding:10px 14px;color:var(--text);font-size:13px;font-family:'DM Sans',sans-serif;outline:none;transition:all .2s}
.poll-opt-input::placeholder{color:var(--text3)}
.poll-opt-input:focus{border-color:rgba(201,168,76,.3)}
.poll-remove-opt{width:32px;height:32px;border-radius:8px;background:rgba(224,85,85,.08);border:1px solid rgba(224,85,85,.15);color:var(--red);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
.poll-remove-opt:hover{background:rgba(224,85,85,.15)}
.add-option-btn{display:flex;align-items:center;gap:6px;padding:9px 14px;border-radius:10px;border:1px dashed var(--glass-border);background:none;color:var(--text3);font-size:13px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;width:100%;justify-content:center}
.add-option-btn:hover{border-color:rgba(201,168,76,.3);color:var(--gold2);background:var(--gold-dim)}
.modal-footer{display:flex;align-items:center;justify-content:space-between;padding:12px 22px 20px;border-top:1px solid var(--glass-border)}
.modal-char{font-size:12px;color:var(--text3)}
.post-btn{padding:10px 28px;border-radius:40px;background:linear-gradient(135deg,var(--gold),#a0782a);border:none;cursor:pointer;color:#fff;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;transition:all .2s;box-shadow:0 4px 16px rgba(201,168,76,.28)}
.post-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(201,168,76,.42)}
.post-btn:disabled{opacity:.4;cursor:not-allowed;transform:none}

/* ── TOAST NOTIFICATIONS ── */
.toast-container{position:fixed;bottom:24px;right:24px;z-index:500;display:flex;flex-direction:column;gap:10px;pointer-events:none}
.toast{display:flex;align-items:center;gap:12px;padding:14px 18px;background:var(--bg2);border:1px solid var(--glass-border);border-radius:14px;box-shadow:var(--shadow);font-size:14px;color:var(--text);animation:toastIn .3s ease;pointer-events:auto;min-width:260px;max-width:320px}
@keyframes toastIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
.toast-icon{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0}
.toast.like .toast-icon{background:var(--gold-dim)}
.toast.comment .toast-icon{background:rgba(61,111,255,.15)}
.toast.post .toast-icon{background:rgba(78,203,113,.15)}

/* ── RIGHT PANEL ── */
.right-panel{width:264px;flex-shrink:0;padding:16px;display:flex;flex-direction:column;gap:14px;position:sticky;top:var(--nav-h);height:calc(100vh - var(--nav-h));overflow-y:auto}
.panel-card{background:var(--bg2);border:1px solid var(--glass-border);border-radius:var(--radius);padding:16px}
.panel-heading{font-family:'DM Serif Display',serif;font-size:15px;color:var(--text);margin-bottom:12px;display:flex;align-items:center;justify-content:space-between}
.panel-see-all{font-size:12px;color:var(--gold);cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif}
.panel-see-all:hover{opacity:.7}
.suggestion-item{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.sug-name{font-size:13px;font-weight:500;color:var(--text)}
.sug-sub{font-size:11px;color:var(--text3)}
.sug-connect{margin-left:auto;padding:5px 11px;border-radius:20px;border:1px solid rgba(201,168,76,.3);background:var(--gold-dim);color:var(--gold2);font-size:11px;font-weight:500;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;white-space:nowrap}
.sug-connect:hover{background:rgba(201,168,76,.22)}
.sug-connect.connected{border-color:var(--glass-border);background:var(--glass);color:var(--text3)}
.event-item{display:flex;gap:10px;margin-bottom:12px}
.event-date-badge{width:40px;flex-shrink:0;text-align:center;background:var(--bg3);border:1px solid var(--glass-border);border-radius:10px;padding:6px}
.event-date-day{font-size:17px;font-weight:700;color:var(--gold2);line-height:1;font-family:'DM Serif Display',serif}
.event-date-mon{font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.06em}
.event-name{font-size:13px;font-weight:500;color:var(--text);margin-bottom:2px}
.event-sub{font-size:11px;color:var(--text3)}

/* scrollbar */
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--glass-border);border-radius:4px}

/* ── RESPONSIVE ── */
@media(max-width:1100px){.right-panel{display:none}}
@media(max-width:768px){
  .sidebar{display:none}
  .nav-brand-text{display:none}
  .nav-menu-btn{display:flex}
  .nav-profile-info{display:none}
  .nav-chevron{display:none}
  .mobile-sidebar-overlay{display:block}
  .main{padding:12px 12px 80px}
}
@media(max-width:480px){
  .navbar{padding:0 12px;gap:8px}
  .nav-right{gap:4px}
  .story-ring{width:52px;height:52px}
  .stories-row{gap:10px}
}
`;

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./shared";
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
  "linear-gradient(135deg,#f093fb,#f5576c)",
  "linear-gradient(135deg,#4facfe,#00f2fe)",
];

const INITIAL_STORIES = [
  { id: 1, user: "Priya Sharma", emoji: "🎉", caption: "Got my internship offer!! 🎊 Samsung R&D here I come!", seen: false, time: "2h ago", bg: "linear-gradient(135deg,#f093fb,#f5576c)" },
  { id: 2, user: "Arjun Mehta",  emoji: "🚀", caption: "Shipped my first open-source lib today. OSS life ❤️",  seen: false, time: "4h ago", bg: "linear-gradient(135deg,#4facfe,#00f2fe)" },
  { id: 3, user: "Neha Gupta",   emoji: "📚", caption: "Exam season is here. Coffee + code = survival mode ☕",  seen: true,  time: "6h ago", bg: "linear-gradient(135deg,#a8edea,#fed6e3)" },
  { id: 4, user: "Karan Joshi",  emoji: "🏆", caption: "Won the inter-college debate! Feeling great 🏅",        seen: false, time: "8h ago", bg: "linear-gradient(135deg,#f7971e,#ffd200)" },
];

const INITIAL_POSTS = [
  {
    id: 1, name: "Priya Sharma", role: "ECE · 2nd Year",
    content: "Just got my internship at Samsung R&D! 🎉 Hard work and late nights finally paying off. Grateful for this opportunity. If anyone needs help with their resume, feel free to reach out!",
    likes: 10, comments: 2, liked: false, bookmarked: false, showComments: false,
    commentList: [
      { id: 1, author: "Rahul Verma",  text: "Congratulations Priya! So proud of you 🔥" },
      { id: 2, author: "Ananya Singh", text: "Amazinggg! You deserve it 💪" },
    ],
    time: "2h ago", type: "text", image: null, poll: null,
  },
  {
    id: 2, name: "Arjun Mehta", role: "CS · 4th Year",
    content: "Just shipped my first open-source library — a utility belt for React state management. Star it if you find it useful! 🚀\n\n#OpenSource #React #JavaScript",
    likes: 34, comments: 5, liked: false, bookmarked: false, showComments: false,
    commentList: [], time: "5h ago", type: "text", image: null, poll: null,
  },
  {
    id: 3, name: "Neha Gupta", role: "IT · 3rd Year",
    content: "Quick poll — which language should I learn next?",
    likes: 18, comments: 3, liked: false, bookmarked: false, showComments: false,
    commentList: [], time: "1d ago", type: "poll", image: null,
    poll: {
      question: "Which language should I learn next?",
      options: [
        { id: 1, text: "Rust 🦀", votes: 24 },
        { id: 2, text: "Go 🐹",   votes: 18 },
        { id: 3, text: "Kotlin 📱", votes: 12 },
        { id: 4, text: "Swift 🍎", votes: 9 },
      ],
      totalVotes: 63,
      votedFor: null,
    },
  },
];

const INITIAL_SUGGESTIONS = [
  { name: "Rahul Verma",  role: "ME · 3rd Year",  connected: false },
  { name: "Ananya Singh", role: "IT · 2nd Year",  connected: false },
  { name: "Karan Joshi",  role: "ECE · 1st Year", connected: false },
];

const EVENTS = [
  { day: "07", mon: "Apr", name: "Hackathon 2025",  sub: "Tech Club · Online" },
  { day: "12", mon: "Apr", name: "Placement Drive", sub: "CSE Dept · LT Hall" },
  { day: "18", mon: "Apr", name: "Cultural Fest",   sub: "Main Campus" },
];

const SKILLS = ["React", "Python", "Node.js", "DSA", "Machine Learning", "UI/UX", "Git", "SQL"];
const TAGS   = ["💼 Internship", "🚀 Project", "📚 Study", "🏆 Achievement", "💡 Idea", "🎉 Celebration"];

function Avatar({ name, src, size = 44, style = {} }) {
  const initials = name ? name.split(" ").map(w => w[0]).join("").slice(0, 2) : "?";
  const idx      = name ? name.charCodeAt(0) % GRADIENTS.length : 0;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: GRADIENTS[idx],
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.32, fontWeight: 600, color: "#fff",
      overflow: "hidden", flexShrink: 0, ...style,
    }}>
      {src && (
        <img
          src={src} alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => { e.target.style.display = "none"; }}
        />
      )}
      {!src && <span>{initials}</span>}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  // Logged-in user
  const user = { name: "Sourav Kumar", branch: "CSE", year: "3rd Year" };

  // ── PROFILE IMAGE: read from localStorage (set by Profile page)
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem("profileImage") || AVATARS[user.name];
  });

  // Listen for profile image updates from other pages (e.g. Profile.jsx)
  useEffect(() => {
    const handleStorage = () => {
      const img = localStorage.getItem("profileImage");
      if (img) setProfileImage(img);
    };
    window.addEventListener("storage", handleStorage);
    // Also check on mount in case page navigated back
    handleStorage();
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // ── STATE ──────────────────────────────────
  const [posts,         setPosts]         = useState(INITIAL_POSTS);
  const [stories,       setStories]       = useState(INITIAL_STORIES);
  const [networkCount,  setNetworkCount]  = useState(0);
  const [postCount,     setPostCount]     = useState(0);
  const [notifications, setNotifications] = useState([
    { id: 1, icon: "❤️", text: <><strong>Priya Sharma</strong> liked your post</>,      time: "2m ago",  read: false },
    { id: 2, icon: "💬", text: <><strong>Rahul Verma</strong> commented</>,              time: "15m ago", read: false },
    { id: 3, icon: "🎉", text: <><strong>Hackathon 2025</strong> registrations open!</>, time: "1h ago",  read: true  },
  ]);
  const [suggestions,   setSuggestions]   = useState(INITIAL_SUGGESTIONS);

  const [notifOpen,         setNotifOpen]         = useState(false);
  const [profileOpen,       setProfileOpen]       = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showModal,         setShowModal]         = useState(false);

  const [modalTab,     setModalTab]     = useState("text");
  const [postText,     setPostText]     = useState("");
  const [postImage,    setPostImage]    = useState(null);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions,  setPollOptions]  = useState(["", ""]);

  const [activeNav, setActiveNav] = useState("home");
  const [toasts, setToasts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [theme, setTheme] = useState("dark");
  const [storyViewer,   setStoryViewer]   = useState(null);
  const [storyProgress, setStoryProgress] = useState(0);

  // ── REFS ───────────────────────────────────
  const notifRef         = useRef();
  const postImgInputRef  = useRef();
  const storyImgInputRef = useRef();
  const storyTimerRef    = useRef();

  const unreadCount = notifications.filter(n => !n.read).length;

  // ── EFFECTS ────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem("cc-theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  useEffect(() => {
    if (!storyViewer) return;
    setStoryProgress(0);
    clearInterval(storyTimerRef.current);
    let p = 0;
    storyTimerRef.current = setInterval(() => {
      p += 2;
      setStoryProgress(p);
      if (p >= 100) {
        clearInterval(storyTimerRef.current);
        setStoryViewer(sv => {
          if (!sv) return null;
          if (sv.index < sv.stories.length - 1) return { ...sv, index: sv.index + 1 };
          return null;
        });
      }
    }, 100);
    return () => clearInterval(storyTimerRef.current);
  }, [storyViewer?.index, storyViewer?.stories]);

  useEffect(() => {
    const handler = e => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── HANDLERS ───────────────────────────────
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("cc-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const addToast = (type, title, msg, icon) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, title, msg, icon }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
    setNotifications(prev => [
      { id: Date.now(), icon, text: <><strong>{title}</strong> {msg}</>, time: "just now", read: false },
      ...prev,
    ]);
  };

  const toggleLike = id => {
    setPosts(prev => prev.map(p => {
      if (p.id !== id) return p;
      const nowLiked = !p.liked;
      if (nowLiked) addToast("like", "New Like", "You liked this post", "❤️");
      return { ...p, liked: nowLiked, likes: nowLiked ? p.likes + 1 : p.likes - 1 };
    }));
  };

  const toggleBookmark = id =>
    setPosts(prev => prev.map(p => p.id === id ? { ...p, bookmarked: !p.bookmarked } : p));

  const toggleComments = id =>
    setPosts(prev => prev.map(p => p.id === id ? { ...p, showComments: !p.showComments } : p));

  const submitComment = postId => {
    const text = (commentInputs[postId] || "").trim();
    if (!text) return;
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      addToast("comment", "Comment Added", "Your comment was posted", "💬");
      return { ...p, comments: p.comments + 1, commentList: [...p.commentList, { id: Date.now(), author: user.name, text }] };
    }));
    setCommentInputs(prev => ({ ...prev, [postId]: "" }));
  };

  const votePoll = (postId, optId) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId || !p.poll || p.poll.votedFor) return p;
      const newOpts = p.poll.options.map(o => o.id === optId ? { ...o, votes: o.votes + 1 } : o);
      return { ...p, poll: { ...p.poll, options: newOpts, totalVotes: p.poll.totalVotes + 1, votedFor: optId } };
    }));
    addToast("post", "Vote Cast", "Your vote was recorded!", "🗳️");
  };

  const handlePostImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPostImage(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleStoryImageChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const newStory = {
        id:      Date.now(),
        user:    user.name,
        image:   ev.target.result,
        emoji:   null,
        caption: "My Story",
        seen:    false,
        time:    "just now",
        bg:      "linear-gradient(135deg,var(--gold),var(--accent))",
      };
      setStories(prev => [newStory, ...prev]);
      addToast("post", "Story Added", "Your story is now live 📸", "📸");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const openStory = (storyList, idx) => {
    setStoryViewer({ stories: storyList, index: idx });
    setStories(prev => prev.map((s, i) => i === idx ? { ...s, seen: true } : s));
  };

  const navStory = dir => {
    setStoryViewer(sv => {
      if (!sv) return null;
      const next = sv.index + dir;
      if (next < 0 || next >= sv.stories.length) return null;
      setStories(prev => prev.map((s, i) => i === next ? { ...s, seen: true } : s));
      return { ...sv, index: next };
    });
  };

  const connectUser = name => {
    setSuggestions(prev => prev.map(s => {
      if (s.name !== name) return s;
      const nowConnected = !s.connected;
      setNetworkCount(c => nowConnected ? c + 1 : c - 1);
      if (nowConnected) addToast("like", "Connected!", `You are now connected with ${name}`, "🤝");
      return { ...s, connected: nowConnected };
    }));
  };

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const openModal = (tab = "text") => { setModalTab(tab); setShowModal(true); };

  const canSubmit = () => {
    if (modalTab === "text")  return postText.trim().length > 0;
    if (modalTab === "image") return postImage !== null;
    if (modalTab === "poll")  return pollQuestion.trim() && pollOptions.filter(o => o.trim()).length >= 2;
    return false;
  };

  const submitPost = () => {
    if (!canSubmit()) return;
    let newPost = {
      id: Date.now(), name: user.name, role: `${user.branch} · ${user.year}`,
      likes: 0, comments: 0, liked: false, bookmarked: false,
      showComments: false, commentList: [], time: "just now",
    };
    if (modalTab === "text") {
      newPost = { ...newPost, content: postText, type: "text", image: null, poll: null };
    } else if (modalTab === "image") {
      newPost = { ...newPost, content: postText || "", type: "image", image: postImage, poll: null };
    } else if (modalTab === "poll") {
      const opts = pollOptions.filter(o => o.trim()).map((o, i) => ({ id: i + 1, text: o, votes: 0 }));
      newPost = { ...newPost, content: pollQuestion, type: "poll", image: null,
        poll: { question: pollQuestion, options: opts, totalVotes: 0, votedFor: null } };
    }
    setPosts(prev => [newPost, ...prev]);
    setPostCount(c => c + 1);
    setPostText(""); setPostImage(null); setPollQuestion(""); setPollOptions(["", ""]);
    setShowModal(false);
    addToast("post", "Post Published", "Your post is now live ✨", "🎉");
  };

  const myPostCount = postCount + posts.filter(p => p.name === user.name && p.id > 100).length;
  const currentStory = storyViewer ? storyViewer.stories[storyViewer.index] : null;

  // ── NAV ITEMS with paths ──────────────────
const navItems = [
  { id: "home",     icon: "⌂", label: "Home Feed",  path: "/dashboard" },
  { id: "network",  icon: "◎", label: "Network",    path: "/network" },
  { id: "messages", icon: "◻", label: "Messages",   path: "/message" },
  { id: "events",   icon: "◈", label: "Events",     path: "/events" },
];

  // ── SIDEBAR CONTENT ───────────────────────
  const SidebarContent = ({ onClose }) => (
    <>
      {onClose && (
        <div className="mobile-sidebar-close">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="nav-brand-icon">C</div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, background: "linear-gradient(90deg,var(--gold2),var(--text))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              CampusConnect
            </span>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: "var(--glass)", border: "1px solid var(--glass-border)", color: "var(--text2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}

      <div className="sidebar-label">Navigation</div>
      {navItems.map(item => (
        <div
          key={item.id}
          className={`nav-item ${activeNav === item.id ? "active" : ""}`}
          onClick={() => {
            setActiveNav(item.id);
            navigate(item.path);
            onClose && onClose();
          }}
        >
          <span style={{ fontSize: 17 }}>{item.icon}</span>
          {item.label}
        </div>
      ))}

      <div className="sidebar-divider" />

      <div className="sidebar-label">Your Profile</div>
      <div
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "var(--bg2)", borderRadius: "var(--radius-sm)", border: "1px solid var(--glass-border)", cursor: "pointer", transition: "all .2s" }}
        onClick={() => { navigate("/profile"); onClose && onClose(); }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,.32)"; e.currentTarget.style.background = "var(--gold-dim)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--glass-border)"; e.currentTarget.style.background = "var(--bg2)"; }}
      >
        {/* FIX: Use profileImage state (from localStorage) */}
        <Avatar name={user.name} src={profileImage} size={38} style={{ border: "2px solid var(--gold)", boxShadow: "0 0 0 1px var(--bg2)" }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
          <div style={{ fontSize: 11, color: "var(--text3)" }}>{user.branch} · {user.year}</div>
        </div>
        <svg width="12" height="12" fill="none" stroke="var(--text3)" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </div>

      <div style={{ display: "flex", gap: 6 }}>
        {[[networkCount, "Network"], [myPostCount, "Posts"]].map(([n, l]) => (
          <div key={l} style={{ flex: 1, textAlign: "center", padding: "10px 6px", background: "var(--bg2)", borderRadius: "var(--radius-sm)", border: "1px solid var(--glass-border)" }}>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, color: "var(--text)" }}>{n}</div>
            <div style={{ fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 2 }}>{l}</div>
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

  // ── RENDER ────────────────────────────────
  return (
    <>
      <style>{FONTS}{CSS}</style>
      <div className="app">

        {/* NAVBAR */}
        <nav className="navbar">
          <button className="nav-menu-btn" onClick={() => setMobileSidebarOpen(true)}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          <div className="nav-brand" onClick={() => navigate("/dashboard")}>
            <div className="nav-brand-icon">C</div>
            <span className="nav-brand-text">CampusConnect</span>
          </div>

          <div className="nav-center">
            <div className="search-wrap">
              <svg className="search-icon" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input className="search-input" placeholder="Search students, posts, events…" />
            </div>
          </div>

          <div className="nav-right">
            <button className="theme-btn" onClick={toggleTheme} title={theme === "dark" ? "Light mode" : "Dark mode"}>
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {/* Notification bell */}
            <div style={{ position: "relative" }} ref={notifRef}>
              <button className="nav-btn" onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
              </button>

              {notifOpen && (
                <div className="notif-dropdown">
                  <div className="notif-header">
                    <span className="notif-title">Notifications</span>
                    <button className="notif-clear" onClick={markAllRead}>Mark all read</button>
                  </div>
                  <div className="notif-list">
                    {notifications.length === 0
                      ? <div className="notif-empty">All caught up! 🎉</div>
                      : notifications.map(n => (
                          <div key={n.id} className={`notif-item ${n.read ? "" : "unread"}`}
                            onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}>
                            <div className={`notif-dot ${n.read ? "read" : ""}`} />
                            <div className="notif-item-icon">{n.icon}</div>
                            <div>
                              <div className="notif-item-text">{n.text}</div>
                              <div className="notif-item-time">{n.time}</div>
                            </div>
                          </div>
                        ))
                    }
                  </div>
                </div>
              )}
            </div>

            <div className="nav-divider" />

            {/* Profile pill — FIX: uses profileImage state, navigates to /profile */}
            <div className="nav-profile-btn" onClick={() => navigate("/profile")}>
              <div className="nav-avatar">
                {/* FIX: profileImage from state (localStorage) instead of USER.name */}
                <img src={profileImage} alt={user.name} onError={e => { e.target.style.display = "none"; }} />
              </div>
              <div className="nav-profile-info">
                <div className="nav-profile-name">{user.name}</div>
                <div className="nav-profile-sub">{user.branch} · {user.year}</div>
              </div>
              <svg className="nav-chevron" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
        </nav>

        {/* MOBILE SIDEBAR */}
        {mobileSidebarOpen && (
          <>
            <div className="mobile-sidebar-overlay" onClick={() => setMobileSidebarOpen(false)} />
            <div className="mobile-sidebar">
              <SidebarContent onClose={() => setMobileSidebarOpen(false)} />
            </div>
          </>
        )}

        {/* PROFILE DRAWER */}
        {profileOpen && (
          <>
            <div className="profile-drawer-overlay" onClick={() => setProfileOpen(false)} />
            <div className="profile-drawer">
              <div className="drawer-cover">
                <button className="drawer-cover-close" onClick={() => setProfileOpen(false)}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
                <div className="drawer-avatar-wrap">
                  <div className="drawer-avatar">
                    {/* FIX: profileImage from state */}
                    <img src={profileImage} alt={user.name} onError={e => { e.target.style.display = "none"; }} />
                  </div>
                  <div className="drawer-online" />
                </div>
              </div>
              <div className="drawer-body">
                <div className="drawer-name">{user.name}</div>
                <div className="drawer-handle">@sourav_kumar · CSE</div>
                <div className="drawer-role">3rd Year · Batch of 2026 · CGPA 8.7</div>
                <div className="drawer-bio">
                  Passionate CS student exploring full-stack development and ML. Open to collaborations, hackathons, and internship opportunities. Currently learning Rust &amp; System Design. ☕
                </div>
                <div className="drawer-stats">
                  {[[networkCount, "Network"], [myPostCount, "Posts"], ["8", "Events"], ["3", "Awards"], ["65%", "Profile"], ["12", "Saves"]].map(([n, l]) => (
                    <div key={l} className="drawer-stat">
                      <div className="drawer-stat-num">{n}</div>
                      <div className="drawer-stat-label">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="drawer-section">
                  <div className="drawer-section-title">Profile Completion</div>
                  <div className="drawer-progress-wrap">
                    <div className="drawer-progress-label"><span>Overall</span><span style={{ color: "var(--gold)", fontWeight: 600 }}>65%</span></div>
                    <div className="drawer-progress-bar"><div className="drawer-progress-fill" style={{ width: "65%" }} /></div>
                  </div>
                </div>
                <div className="drawer-section">
                  <div className="drawer-section-title">Skills &amp; Interests</div>
                  <div className="drawer-skills">{SKILLS.map(s => <span key={s} className="drawer-skill">{s}</span>)}</div>
                </div>
                <div className="drawer-actions">
                  <button className="drawer-btn primary" onClick={() => { openModal("text"); setProfileOpen(false); }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    New Post
                  </button>
                  <button className="drawer-btn" onClick={() => { navigate("/profile"); setProfileOpen(false); }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* PAGE LAYOUT */}
        <div className="layout">
          <aside className="sidebar">
            <SidebarContent />
          </aside>

          {/* MAIN FEED */}
          <main className="main">

            {/* STORY STRIP */}
            <div className="stories-wrap">
              <div className="stories-label">Stories</div>
              <div className="stories-row">
                <div className="story-item" onClick={() => storyImgInputRef.current?.click()}>
                  <div className="story-ring add-story">
                    <div className="story-inner" style={{ background: "var(--bg3)" }}>
                      <Avatar name={user.name} src={profileImage} size={51} />
                    </div>
                    <div className="story-add-icon">+</div>
                  </div>
                  <span className="story-name" style={{ color: "var(--gold2)", fontWeight: 500 }}>Your Story</span>
                </div>

                <input ref={storyImgInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleStoryImageChange} />

                {stories.map((s, i) => (
                  <div key={s.id} className="story-item" onClick={() => openStory(stories, i)}>
                    <div className={`story-ring ${s.seen ? "seen" : ""}`}>
                      <div className="story-inner" style={{ background: s.bg || "var(--bg3)" }}>
                        {s.image
                          ? <img src={s.image} alt={s.user} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          : AVATARS[s.user]
                            ? <img src={AVATARS[s.user]} alt={s.user} onError={e => { e.target.style.display = "none"; }} />
                            : <span>{s.emoji}</span>
                        }
                      </div>
                    </div>
                    <span className="story-name">{s.user.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COMPOSE BOX */}
            <div className="compose-card">
              <div className="compose-row">
                <div className="compose-avatar">
                  {/* FIX: uses profileImage state */}
                  <img src={profileImage} alt={user.name} onError={e => { e.target.style.display = "none"; }} />
                </div>
                <button className="compose-trigger" onClick={() => openModal("text")}>
                  Share something, {user.name.split(" ")[0]}…
                </button>
              </div>
              <div className="compose-actions">
                <button className="compose-action-btn" onClick={() => openModal("image")}>📷 Photo</button>
                <button className="compose-action-btn" onClick={() => openModal("poll")}>📊 Poll</button>
                <button className="compose-action-btn" onClick={() => openModal("text")}>🔗 Link</button>
                <button className="compose-action-btn" onClick={() => openModal("text")}>🏷️ Tag</button>
              </div>
            </div>

            {/* FEED POSTS */}
            {posts.map((p, i) => (
              <div key={p.id} className="post-card" style={{ animationDelay: `${i * 0.04}s` }}>
                <div className="post-header">
                  <Avatar name={p.name} src={p.name === user.name ? profileImage : AVATARS[p.name]} size={42} />
                  <div>
                    <div className="post-user-name">{p.name}</div>
                    <div className="post-user-sub">{p.role}</div>
                  </div>
                  <div className="post-time">{p.time}</div>
                </div>

                {p.content ? <div className="post-body">{p.content}</div> : null}
                {p.image && <img src={p.image} alt="post" className="post-image" />}

                {p.poll && (
                  <div className="post-poll">
                    <div className="poll-question">{p.poll.question}</div>
                    {p.poll.options.map(opt => {
                      const pct   = p.poll.totalVotes > 0 ? Math.round((opt.votes / p.poll.totalVotes) * 100) : 0;
                      const voted = p.poll.votedFor === opt.id;
                      return (
                        <div key={opt.id} className="poll-option" onClick={() => votePoll(p.id, opt.id)}>
                          <div className={`poll-option-bar ${p.poll.votedFor ? "voted" : ""}`}>
                            {p.poll.votedFor && <div className="poll-fill" style={{ width: `${pct}%` }} />}
                            <div className="poll-label">
                              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                {voted && <span style={{ color: "var(--gold)", fontSize: 13 }}>✓</span>}
                                {opt.text}
                              </span>
                              {p.poll.votedFor && <span className="poll-pct">{pct}%</span>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="poll-meta">{p.poll.totalVotes} votes · {p.poll.votedFor ? "You voted" : "Click to vote"}</div>
                  </div>
                )}

                <div className="post-footer">
                  <button className={`post-action ${p.liked ? "liked" : ""}`} onClick={() => toggleLike(p.id)}>
                    <svg width="15" height="15" fill={p.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                    </svg>
                    {p.likes}
                  </button>
                  <button className="post-action" onClick={() => toggleComments(p.id)}>
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    {p.comments}
                  </button>
                  <button className="post-action">
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                    Share
                  </button>
                  <div className="post-action-spacer" />
                  <button className={`post-action ${p.bookmarked ? "bookmarked" : ""}`} onClick={() => toggleBookmark(p.id)}>
                    <svg width="15" height="15" fill={p.bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>
                </div>

                {p.showComments && (
                  <div className="comments-section">
                    {p.commentList.map(c => (
                      <div key={c.id} className="comment-item">
                        <div className="comment-avatar">
                          <img src={c.author === user.name ? profileImage : AVATARS[c.author]} alt={c.author} onError={e => { e.target.style.display = "none"; }} />
                        </div>
                        <div className="comment-bubble">
                          <div className="comment-author">{c.author}</div>
                          <div className="comment-text">{c.text}</div>
                        </div>
                      </div>
                    ))}
                    <div className="comment-input-row">
                      <Avatar name={user.name} src={profileImage} size={30} />
                      <input
                        className="comment-input"
                        placeholder="Write a comment…"
                        value={commentInputs[p.id] || ""}
                        onChange={e => setCommentInputs(prev => ({ ...prev, [p.id]: e.target.value }))}
                        onKeyDown={e => e.key === "Enter" && submitComment(p.id)}
                      />
                      <button className="comment-send" onClick={() => submitComment(p.id)}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </main>

          {/* RIGHT PANEL */}
          <aside className="right-panel">
            <div className="panel-card">
              <div className="panel-heading">
                People you may know
                <button className="panel-see-all">See all</button>
              </div>
              {suggestions.map(s => (
                <div key={s.name} className="suggestion-item">
                  <Avatar name={s.name} src={AVATARS[s.name]} size={36} />
                  <div>
                    <div className="sug-name">{s.name}</div>
                    <div className="sug-sub">{s.role}</div>
                  </div>
                  <button className={`sug-connect ${s.connected ? "connected" : ""}`} onClick={() => connectUser(s.name)}>
                    {s.connected ? "✓ Connected" : "+ Connect"}
                  </button>
                </div>
              ))}
            </div>

            <div className="panel-card">
              <div className="panel-heading">
                Upcoming Events
                <button className="panel-see-all" onClick={() => navigate("/events")}>View all</button>
              </div>
              {EVENTS.map(e => (
                <div key={e.name} className="event-item" style={{ cursor: "pointer" }} onClick={() => navigate("/events")}>
                  <div className="event-date-badge">
                    <div className="event-date-day">{e.day}</div>
                    <div className="event-date-mon">{e.mon}</div>
                  </div>
                  <div>
                    <div className="event-name">{e.name}</div>
                    <div className="event-sub">{e.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* CREATE POST MODAL */}
        {showModal && (
          <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
            <div className="modal">
              <div className="modal-header">
                <div className="modal-title">Create Post</div>
                <button className="modal-close" onClick={() => setShowModal(false)}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              <div className="modal-tabs">
                {[["text", "✍️", "Text"], ["image", "📷", "Photo"], ["poll", "📊", "Poll"]].map(([t, ic, lb]) => (
                  <button key={t} className={`modal-tab ${modalTab === t ? "active" : ""}`} onClick={() => setModalTab(t)}>
                    {ic} {lb}
                  </button>
                ))}
              </div>

              <div className="modal-body">
                <div className="modal-user-row">
                  <Avatar name={user.name} src={profileImage} size={44} style={{ border: "2px solid var(--gold)", boxShadow: "0 0 12px rgba(201,168,76,.25)" }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>{user.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text3)" }}>{user.branch} · {user.year}</div>
                  </div>
                </div>

                {modalTab === "text" && (
                  <>
                    <textarea className="modal-textarea" placeholder="What's on your mind?" value={postText} onChange={e => setPostText(e.target.value)} autoFocus maxLength={500} />
                    <div className="modal-tags">
                      {TAGS.map(tag => (
                        <span key={tag} className="modal-tag" onClick={() => setPostText(p => p + (p ? " " : "") + tag)}>{tag}</span>
                      ))}
                    </div>
                  </>
                )}

                {modalTab === "image" && (
                  <>
                    <div className={`img-upload-area ${postImage ? "has-image" : ""}`} onClick={() => !postImage && postImgInputRef.current?.click()}>
                      {postImage ? (
                        <>
                          <img src={postImage} alt="preview" />
                          <button className="img-upload-remove" onClick={e => { e.stopPropagation(); setPostImage(null); }}>
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="img-upload-icon">📷</div>
                          <div className="img-upload-text">Click to upload a photo</div>
                          <div className="img-upload-sub">PNG, JPG, GIF up to 10MB</div>
                        </>
                      )}
                    </div>
                    <input ref={postImgInputRef} className="img-file-input" type="file" accept="image/*" onChange={handlePostImageChange} />
                    <textarea className="modal-textarea" placeholder="Add a caption… (optional)" value={postText} onChange={e => setPostText(e.target.value)} style={{ minHeight: 70 }} maxLength={300} />
                  </>
                )}

                {modalTab === "poll" && (
                  <div className="poll-builder">
                    <input className="poll-q-input" placeholder="Ask a question…" value={pollQuestion} onChange={e => setPollQuestion(e.target.value)} maxLength={150} autoFocus />
                    {pollOptions.map((opt, i) => (
                      <div key={i} className="poll-opt-row">
                        <input className="poll-opt-input" placeholder={`Option ${i + 1}`} value={opt}
                          onChange={e => { const n = [...pollOptions]; n[i] = e.target.value; setPollOptions(n); }} maxLength={60} />
                        {pollOptions.length > 2 && (
                          <button className="poll-remove-opt" onClick={() => setPollOptions(prev => prev.filter((_, j) => j !== i))}>
                            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    {pollOptions.length < 5 && (
                      <button className="add-option-btn" onClick={() => setPollOptions(prev => [...prev, ""])}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        Add option
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <span className="modal-char">
                  {modalTab === "text"  ? `${postText.length}/500`
                   : modalTab === "poll" ? `${pollOptions.filter(o => o.trim()).length} options`
                   : postImage          ? "Photo ready"
                   : "No photo"}
                </span>
                <button className="post-btn" disabled={!canSubmit()} onClick={submitPost}>
                  Publish Post ✦
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STORY VIEWER */}
        {storyViewer && currentStory && (
          <div className="story-viewer-overlay" onClick={() => setStoryViewer(null)}>
            <div className="story-viewer" onClick={e => e.stopPropagation()}>
              <div className="story-progress-bar">
                {storyViewer.stories.map((_, i) => (
                  <div key={i} className="story-progress-seg">
                    <div className="story-progress-fill" style={{
                      width: i < storyViewer.index ? "100%" : i === storyViewer.index ? `${storyProgress}%` : "0%",
                    }} />
                  </div>
                ))}
              </div>

              <div className="story-viewer-header">
                <div className="story-viewer-avatar">
                  <img src={currentStory.user === user.name ? profileImage : AVATARS[currentStory.user]} alt={currentStory.user} onError={e => { e.target.style.display = "none"; }} />
                </div>
                <div>
                  <div className="story-viewer-name">{currentStory.user}</div>
                  <div className="story-viewer-time">{currentStory.time}</div>
                </div>
                <button className="story-viewer-close" onClick={() => setStoryViewer(null)}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {currentStory.image
                ? <img className="story-media" src={currentStory.image} alt="story" />
                : (
                  <div className="story-media-placeholder" style={{ background: currentStory.bg }}>
                    <span style={{ fontSize: 80 }}>{currentStory.emoji}</span>
                  </div>
                )
              }

              <div className="story-viewer-caption">{currentStory.caption}</div>

              <button className="story-nav-btn prev" onClick={() => navStory(-1)}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="story-nav-btn next" onClick={() => navStory(1)}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        )}

        {/* TOAST STACK */}
        <div className="toast-container">
          {toasts.map(t => (
            <div key={t.id} className={`toast ${t.type}`}>
              <div className="toast-icon">{t.icon}</div>
              <div>
                <div style={{ fontWeight: 500 }}>{t.title}</div>
                <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>{t.msg}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}