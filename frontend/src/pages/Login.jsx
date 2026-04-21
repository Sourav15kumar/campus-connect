import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    console.log(res.data); // 🔍 DEBUG

    const token = res.data.token;
    const user = res.data.user;   // ⭐ USER LO

    // ⭐ SAVE BOTH
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    alert("Login Successful ");

    navigate("/dashboard");
    window.location.reload(); // ⭐ IMPORTANT (UI refresh)

  } catch (error) {
    alert("Invalid Credentials");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-100 p-6">

      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            CampusConnect
          </h2>

          <p className="text-gray-500 mb-8 text-sm">
            Welcome back! Please login to continue.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
            >
              Login
            </button>

          </form>

          <p className="mt-6 text-sm text-gray-500">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-600 cursor-pointer font-medium hover:underline"
            >
              Register
            </span>
          </p>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Campus"
            className="h-full w-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}

export default Login;

// import { useNavigate } from "react-router-dom";

// import { useState } from "react";
// import axios from "axios";

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         { email, password }
//       );

//       console.log(response.data);
//       alert("Login Successful 🚀");
//     } catch (error) {
//       alert("Invalid Credentials ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      
//       <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">

//         {/* LEFT SIDE FORM */}
//         <div className="w-full md:w-1/2 p-10">
//           <h2 className="text-4xl font-bold text-gray-800 mb-4">
//             CampusConnect
//           </h2>
//           <p className="text-gray-500 mb-8">
//             Connect. Collaborate. Grow.
//           </p>

//           <form onSubmit={handleLogin} className="space-y-5">

//             <input
//               type="email"
//               placeholder="Email Address"
//               className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <button
//               type="submit"
//               className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md"
//             >
//               Login
//             </button>

//           </form>

//           <p className="mt-6 text-sm text-gray-500">
//             Don’t have an account?{" "}
//             <span className="text-indigo-600 font-medium cursor-pointer hover:underline"
//             onClick={() => navigate("/register")}
//             >
//   Register
// </span>
//           </p>
//         </div>

//         {/* RIGHT SIDE IMAGE */}
//         <div className="hidden md:block md:w-1/2">
//           <img
//             src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
//             alt="Campus"
//             className="h-full w-full object-cover"
//           />
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Login;