import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Message from "./pages/Message";
import ProtectedRoute from "./components/ProtectedRoute";
import Network from "./pages/Network";
import Events from "./pages/Events";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();   // ✅ IMPORTANT

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />

      {/* ✅ FIXED */}
      <Route path="/network" element={<Network navigate={navigate} activePage="network" />} />

      {/* ✅ FIXED */}
      <Route path="/message" element={<Message navigate={navigate} activePage="message" />} />

      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/events" element={<Events navigate={navigate} activePage="events" />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;










// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import EditProfile from "./pages/EditProfile";
// import Message from "./pages/Message";
// import Network from "./pages/Network";
// import Events from "./pages/Events";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
    
//       <Routes>

//         {/* Redirect */}
//         <Route path="/" element={<Navigate to="/dashboard" replace />} />

//         {/* Public */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Protected */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Other Pages */}
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/edit-profile" element={<EditProfile />} />
//         <Route path="/network" element={<Network />} />
//         <Route path="/message" element={<Message />} />
//         <Route path="/events" element={<Events />} />

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/dashboard" replace />} />

//       </Routes>
    
//   );
// }

// export default App;