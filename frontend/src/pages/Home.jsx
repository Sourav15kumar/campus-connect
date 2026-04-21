

import React from "react";
import { GraduationCap, Users, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
 
export default function Home() {
   const navigate = useNavigate();
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-cyan-600 text-white">

      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400 rounded-full blur-3xl opacity-30 -z-10"></div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 backdrop-blur-xl bg-white/10 border-b border-white/20 sticky top-0 z-50">

        <div className="flex items-center gap-2">
          <GraduationCap size={30} className="text-cyan-300" />
          <h1 className="text-2xl font-bold tracking-wide">
            CampusConnect
          </h1>
        </div>

        <div className="hidden md:flex gap-8 font-medium">
          <a href="#" className="hover:text-cyan-300 transition">Home</a>
          <a href="#" className="hover:text-cyan-300 transition">Features</a>
          <a href="#" className="hover:text-cyan-300 transition">About</a>
          <a href="#" className="hover:text-cyan-300 transition">Contact</a>
        </div>

        <button  onClick={() => navigate("/login")} className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold shadow-lg hover:scale-105 transition">
          Login
        </button>

      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-28 relative">

        <h2 className="text-5xl md:text-7xl font-extrabold leading-tight max-w-4xl bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">
          Connecting Students, Ideas & Opportunities
        </h2>

        <p className="mt-8 text-lg md:text-xl text-gray-200 max-w-2xl">
          CampusConnect is your all-in-one platform to collaborate, share resources,
          and stay updated with campus activities.
        </p>

        <div className="mt-12 flex gap-6">
          <button className="px-10 py-4 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-2xl font-semibold shadow-2xl hover:scale-110 transition duration-300">
            Get Started
          </button>

          <button className="px-10 py-4 border border-white/40 backdrop-blur-lg rounded-2xl font-semibold hover:bg-white hover:text-indigo-700 transition duration-300">
            Explore
          </button>
        </div>

      </section>

      {/* Features Section */}
      <section className="px-10 pb-28">
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">

          {/* Card 1 */}
          <div className="group bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 hover:-translate-y-4 hover:shadow-cyan-500/40 transition duration-500">
            <Users size={45} className="mb-6 text-cyan-300 group-hover:scale-110 transition" />
            <h3 className="text-2xl font-semibold mb-4">Student Network</h3>
            <p className="text-gray-200">
              Connect with classmates, seniors, and alumni in one unified platform.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 hover:-translate-y-4 hover:shadow-purple-500/40 transition duration-500">
            <MessageSquare size={45} className="mb-6 text-purple-300 group-hover:scale-110 transition" />
            <h3 className="text-2xl font-semibold mb-4">Collaboration</h3>
            <p className="text-gray-200">
              Discuss projects, share notes, and work together seamlessly.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 hover:-translate-y-4 hover:shadow-blue-500/40 transition duration-500">
            <GraduationCap size={45} className="mb-6 text-blue-300 group-hover:scale-110 transition" />
            <h3 className="text-2xl font-semibold mb-4">Career Growth</h3>
            <p className="text-gray-200">
              Discover internships, events, and career opportunities.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}