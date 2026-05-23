"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Project {
  id: number;
  name: string;
  location: string;
  budget: number;
  status: string;
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8000/projects");
        if (!response.ok) throw new Error("Could not fetch project data.");
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-36 pb-20">
        
        {/* Friendly Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up delay-100">
          <span className="bg-white border border-sky-100 text-sky-600 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm mb-4 inline-block">
            Overview
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
            Manage your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Projects</span>
          </h1>
          <p className="text-slate-500 text-lg">
            Monitor locations, budgets, and operational statuses in real-time.
          </p>
        </div>

        {/* Loading UI */}
        {loading && (
          <div className="flex flex-col items-center py-12 animate-fade-up delay-200">
            <div className="w-12 h-12 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error UI */}
        {error && (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-red-100 shadow-xl shadow-red-50 text-center animate-fade-up delay-200">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">⚠️</div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Connection Error</h3>
            <p className="text-slate-500 mb-6">{error}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="group bg-white rounded-[2rem] p-6 sm:p-8 border border-sky-50 shadow-sm hover:shadow-xl hover:shadow-sky-100/50 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden animate-fade-up"
                style={{ animationDelay: `${(index % 3 + 1) * 100}ms` }}
              >
                {/* Decorative background blob */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-sky-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 -z-10"></div>

                {/* Status Pill */}
                <div className="flex justify-between items-start mb-6 z-10">
                  <div className="w-10 h-10 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center font-bold">
                    #{project.id}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                    project.status.toLowerCase() === 'active' || project.status.toLowerCase() === 'completed'
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-amber-50 text-amber-600'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-8 z-10">
                  <h2 className="text-xl font-extrabold text-slate-800 mb-1 group-hover:text-sky-600 transition-colors">
                    {project.name}
                  </h2>
                  <p className="text-slate-500 font-medium text-sm">📍 {project.location}</p>
                </div>

                <div className="mb-6 z-10">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total Budget</p>
                  <p className="text-2xl font-black text-slate-800">
                    ${project.budget.toLocaleString()}
                  </p>
                </div>

                {/* Nice Interactive Button */}
                <Link href={`/projects/${project.id}`} className="block z-10">
                  <button className="w-full py-3.5 bg-sky-50 text-sky-600 font-bold rounded-2xl group-hover:bg-sky-500 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-sky-200">
                    View Details →
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}