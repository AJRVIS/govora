"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center animate-fade-up">
      <nav className="bg-white/80 backdrop-blur-xl border border-sky-100 shadow-sm shadow-sky-100/50 rounded-full px-8 py-3.5 flex items-center justify-between w-full max-w-4xl">
        
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
            G
          </div>
          <span className="text-xl font-extrabold text-slate-800 tracking-tight">Govora</span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6">
          <Link 
            href="/" 
            className="text-slate-500 hover:text-sky-500 font-semibold text-sm transition-colors"
          >
            Dashboard
          </Link>
          <button className="bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-sm">
            New Project
          </button>
        </div>
      </nav>
    </div>
  );
}