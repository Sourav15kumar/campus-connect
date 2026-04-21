
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// function Register() {
//   const navigate = useNavigate();

//   // 🧠 Step 1: State banate hain taaki input ka data store ho sake
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // 🧠 Step 2: Form submit hone par ye function chalega
//   const handleRegister = (e) => {
//     e.preventDefault(); // page reload hone se rokta hai

//     // 🧠 Step 3: check karo sab filled hai ya nahi
//     if (!name || !email || !password) {
//       alert("Please fill all fields");
//       return;
//     }

//     // 🧠 Step 4: abhi backend nahi hai to console me data dekh lo
//     console.log("User Registered:", { name, email, password });

//     // 🧠 Step 5: success message
//     alert("Registration Successful!");

//     // 🧠 Step 6: login page pe bhej do
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex relative overflow-hidden bg-black">

//       {/* 🔥 Background Image */}
//       <div className="absolute inset-0">
//         <img
//           src="https://images.unsplash.com/photo-1557683316-973673baf926"
//           alt="background"
//           className="w-full h-full object-cover opacity-40"
//         />
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-sm"></div>
//       </div>

//       {/* LEFT SIDE */}
//       <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-12 relative z-10">
//         <div className="text-center text-white">
//           <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
//             CampusConnect
//           </h1>

//           <p className="text-lg opacity-90 max-w-md leading-relaxed">
//             Connect with students, collaborate on projects and build your
//             professional network inside your campus.
//           </p>

//           <div className="mt-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse mx-auto"></div>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex w-full md:w-1/2 items-center justify-center p-8 relative z-10">

//         <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

//           {/* TOP TOGGLE */}
//           <div className="flex justify-end mb-6 text-sm font-medium">
//             <button
//               onClick={() => navigate("/login")}
//               className="px-4 py-2 text-gray-300 hover:text-white transition"
//             >
//               Sign In
//             </button>

//             <button
//               className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md"
//             >
//               Register
//             </button>
//           </div>

//           <h2 className="text-3xl font-bold mb-8 text-white">
//             Create Account
//           </h2>

//           {/* 🧠 Form submit handle */}
//           <form onSubmit={handleRegister} className="space-y-5">

//             {/* Full Name */}
//             <div>
//               <label className="text-sm text-gray-200">Full Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full mt-1 px-4 py-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="text-sm text-gray-200">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full mt-1 px-4 py-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="text-sm text-gray-200">Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full mt-1 px-4 py-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
//               />
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-purple-500/40 transition-all duration-300"
//             >
//               Register
//             </button>

//           </form>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Register;



import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful ✅");

      console.log(res.data);

      navigate("/login");

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-black">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1557683316-973673baf926"
          alt="background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-sm"></div>
      </div>

      {/* LEFT */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-12 relative z-10">
        <div className="text-center text-white">
          <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
            CampusConnect
          </h1>

          <p className="text-lg opacity-90 max-w-md leading-relaxed">
            Connect with students, collaborate on projects and build your
            professional network inside your campus.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 relative z-10">

        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

          <div className="flex justify-end mb-6 text-sm font-medium">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-gray-300 hover:text-white transition"
            >
              Sign In
            </button>

            <button
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg"
            >
              Register
            </button>
          </div>

          <h2 className="text-3xl font-bold mb-8 text-white">
            Create Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-200">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-white/20 text-white border border-white/30 rounded-lg"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-200">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-white/20 text-white border border-white/30 rounded-lg"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-200">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-3 bg-white/20 text-white border border-white/30 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold"
            >
              Register
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Register;