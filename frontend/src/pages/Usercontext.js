// ─────────────────────────────────────────────────────────
//  userContext.js  –  Single source of truth for user data
//  Import this in ALL pages: Dashboard, Network, Message,
//  Events, Profile
// ─────────────────────────────────────────────────────────

// Logged-in user (hardcoded for demo — replace with auth context later)
export const CURRENT_USER = {
  id: "sourav_001",
  name: "Sourav Kumar",
  handle: "@sourav_kumar",
  branch: "CSE",
  year: "3rd Year",
  batch: "2026",
  cgpa: "8.7",
  role: "CSE · 3rd Year",
  bio: "Passionate CS student exploring full-stack dev and ML. Open to hackathons & internships. Currently learning Rust & System Design. ☕",
};

// Avatar map — same across ALL pages
export const AVATARS = {
  "Priya Sharma":  "https://i.pravatar.cc/150?img=47",
  "Rahul Verma":   "https://i.pravatar.cc/150?img=12",
  "Ananya Singh":  "https://i.pravatar.cc/150?img=44",
  "Arjun Mehta":   "https://i.pravatar.cc/150?img=15",
  "Sourav Kumar":  "https://i.pravatar.cc/150?img=3",
  "Neha Gupta":    "https://i.pravatar.cc/150?img=25",
  "Karan Joshi":   "https://i.pravatar.cc/150?img=8",
  "Vikram Singh":  "https://i.pravatar.cc/150?img=33",
  "Shreya Patel":  "https://i.pravatar.cc/150?img=49",
  "Amit Tiwari":   "https://i.pravatar.cc/150?img=59",
};

// Gradient fallbacks
export const GRADIENTS = [
  "linear-gradient(135deg,#6b8fff,#3d6fff)",
  "linear-gradient(135deg,#c9a84c,#e8c97a)",
  "linear-gradient(135deg,#ff6b6b,#ff8e53)",
  "linear-gradient(135deg,#4ecb71,#2ecc71)",
  "linear-gradient(135deg,#a855f7,#6b8fff)",
  "linear-gradient(135deg,#f093fb,#f5576c)",
  "linear-gradient(135deg,#4facfe,#00f2fe)",
];

// Get profile image for the CURRENT logged-in user
// Always reads from localStorage so Profile page changes reflect everywhere
export function getMyProfileImage() {
  return localStorage.getItem("profileImage") || AVATARS[CURRENT_USER.name];
}

// Get avatar for any user by name
export function getAvatar(name) {
  return AVATARS[name] || null;
}

// Avatar component — use this everywhere instead of inline divs
// Import as: import { AvatarImg } from "./userContext"
export function AvatarImg({ name, src, size = 44, style = {} }) {
  const initials = name ? name.split(" ").map(w => w[0]).join("").slice(0, 2) : "?";
  const idx = name ? name.charCodeAt(0) % GRADIENTS.length : 0;
  const imgSrc = src || getAvatar(name);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: GRADIENTS[idx],
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.32, fontWeight: 600, color: "#fff",
      overflow: "hidden", flexShrink: 0, ...style,
    }}>
      {imgSrc
        ? <img src={imgSrc} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
        : <span>{initials}</span>
      }
    </div>
  );
}

// All people in the app
export const ALL_PEOPLE = [
  { id: "p1", name: "Priya Sharma",  role: "Web Developer",    branch: "ECE", year: "2nd Year", skills: ["React", "Node.js"],       mutual: 12, connected: true  },
  { id: "p2", name: "Arjun Mehta",   role: "Open Source Dev",  branch: "CSE", year: "4th Year", skills: ["Go", "Rust"],             mutual: 8,  connected: true  },
  { id: "p3", name: "Neha Gupta",    role: "ML Enthusiast",    branch: "IT",  year: "3rd Year", skills: ["Python", "TensorFlow"],   mutual: 15, connected: true  },
  { id: "p4", name: "Rahul Verma",   role: "Backend Dev",      branch: "ME",  year: "3rd Year", skills: ["Java", "Spring"],         mutual: 5,  connected: false },
  { id: "p5", name: "Ananya Singh",  role: "UI/UX Designer",   branch: "IT",  year: "2nd Year", skills: ["Figma", "CSS"],           mutual: 9,  connected: false },
  { id: "p6", name: "Karan Joshi",   role: "Data Scientist",   branch: "ECE", year: "1st Year", skills: ["Python", "SQL"],          mutual: 3,  connected: false },
  { id: "p7", name: "Vikram Singh",  role: "DevOps Engineer",  branch: "CSE", year: "4th Year", skills: ["Docker", "AWS"],          mutual: 7,  connected: false },
  { id: "p8", name: "Shreya Patel",  role: "Android Dev",      branch: "IT",  year: "3rd Year", skills: ["Kotlin", "Firebase"],     mutual: 11, connected: true  },
  { id: "p9", name: "Amit Tiwari",   role: "Competitive Coder",branch: "CSE", year: "2nd Year", skills: ["C++", "Algorithms"],      mutual: 6,  connected: false },
];

// Seed conversations for Message page
export const SEED_CONVERSATIONS = [
  {
    id: "c1", userId: "p1", name: "Priya Sharma", lastMsg: "Thanks for the resume tips! 🙏", time: "2m", unread: 2, online: true,
    messages: [
      { id: 1, from: "them", text: "Hey Sourav! Can you help me with my resume?", time: "10:30 AM" },
      { id: 2, from: "me",   text: "Sure! Send it over, I'll review it tonight.", time: "10:32 AM" },
      { id: 3, from: "them", text: "I've attached it. Focus on the projects section?", time: "10:35 AM" },
      { id: 4, from: "me",   text: "Got it. I'll add more impact metrics and action verbs.", time: "10:40 AM" },
      { id: 5, from: "them", text: "Thanks for the resume tips! 🙏", time: "10:41 AM" },
    ],
  },
  {
    id: "c2", userId: "p2", name: "Arjun Mehta", lastMsg: "Let's collab on the hackathon!", time: "1h", unread: 0, online: true,
    messages: [
      { id: 1, from: "them", text: "Dude, Hackathon 2025 registrations are open!", time: "9:00 AM" },
      { id: 2, from: "me",   text: "Yes I saw! What's your team size?", time: "9:05 AM" },
      { id: 3, from: "them", text: "Just me and Neha. Need 2 more. You in?", time: "9:06 AM" },
      { id: 4, from: "me",   text: "100% in! I'll bring Karan along.", time: "9:10 AM" },
      { id: 5, from: "them", text: "Let's collab on the hackathon!", time: "9:11 AM" },
    ],
  },
  {
    id: "c3", userId: "p3", name: "Neha Gupta", lastMsg: "Which ML library should I use?", time: "3h", unread: 1, online: false,
    messages: [
      { id: 1, from: "them", text: "Sourav bhai, starting ML project.", time: "Yesterday" },
      { id: 2, from: "me",   text: "Nice! What's the problem statement?", time: "Yesterday" },
      { id: 3, from: "them", text: "Image classification for plant diseases.", time: "Yesterday" },
      { id: 4, from: "me",   text: "Use PyTorch with ResNet50 pretrained. Transfer learning FTW!", time: "Yesterday" },
      { id: 5, from: "them", text: "Which ML library should I use?", time: "3h ago" },
    ],
  },
  {
    id: "c4", userId: "p8", name: "Shreya Patel", lastMsg: "Can you review my PR?", time: "1d", unread: 0, online: false,
    messages: [
      { id: 1, from: "them", text: "Hey! I pushed the Android auth module.", time: "Yesterday" },
      { id: 2, from: "me",   text: "Looks clean! Few nits in the ViewModel.", time: "Yesterday" },
      { id: 3, from: "them", text: "Fixed! Can you review my PR?", time: "Yesterday" },
    ],
  },
];