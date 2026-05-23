"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Project {
  id: number;
  name: string;
  location: string;
  budget: number;
  status: string;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const idParam = params?.id;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idParam) return;

    const fetchProjectDetails = async () => {
      try {
        const response = await fetch("http://localhost:8000/projects");
        if (!response.ok) throw new Error("Failed to fetch project list.");
        const data: Project[] = await response.json();
        
        const foundProject = data.find((p) => p.id === Number(idParam));
        
        if (foundProject) setProject(foundProject);
        else setError("Could not find a project with this ID.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [idParam]);

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-36 pb-20">
        
        {/* Nice Interactive Back Button */}
        <div className="mb-8 animate-fade-up">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-white text-slate-600 hover:text-sky-600 hover:border-sky-200 font-bold text-sm px-5 py-2.5 rounded-full border border-slate-200 shadow-sm transition-all hover:shadow-md hover:-translate-x-1"
          >
            ← Back to Projects
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center py-20 animate-fade-up">
            <div className="w-12 h-12 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin"></div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-white rounded-3xl p-10 border border-red-100 shadow-xl shadow-red-50 text-center animate-fade-up">
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Project Not Found</h3>
            <p className="text-slate-500 mb-8">{error}</p>
            <Link href="/">
              <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                Return Home
              </button>
            </Link>
          </div>
        )}

        {!loading && !error && project && (
          <div className="space-y-6">
            
            {/* Bright, Premium Hero Card */}
            <div className="bg-gradient-to-br from-sky-400 to-blue-500 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-xl shadow-sky-200 animate-fade-up delay-100 relative overflow-hidden">
              {/* Abstract decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-900 opacity-10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                <div>
                  <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-bold px-4 py-1.5 rounded-full mb-6 inline-block">
                    Project #{project.id}
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2">
                    {project.name}
                  </h1>
                  <p className="text-sky-100 font-medium text-lg flex items-center gap-2">
                    📍 {project.location}
                  </p>
                </div>
                
                <div>
                  <div className="bg-white text-slate-800 px-6 py-3 rounded-2xl shadow-lg inline-flex flex-col items-center md:items-end">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</span>
                    <span className="font-black text-lg flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        project.status.toLowerCase() === 'active' || project.status.toLowerCase() === 'completed'
                          ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}></span>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Crisp White Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-up delay-200">
              
              {/* Budget Card */}
              <div className="bg-white rounded-[2rem] p-8 border border-sky-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center text-xl mb-6">
                  💰
                </div>
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-2">Total Budget</h3>
                <p className="text-4xl font-black text-slate-800">
                  ${project.budget.toLocaleString()}
                </p>
              </div>

              {/* Info Card */}
              <div className="bg-white rounded-[2rem] p-8 border border-sky-50 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center text-xl mb-6">
                  📝
                </div>
                <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-2">Summary</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  This project is currently categorized as <strong className="text-slate-800 capitalize">{project.status}</strong> within the <strong className="text-slate-800">{project.location}</strong> operating region. 
                </p>
              </div>
            </div>

          </div>
        )}
      </main>
    </>
  );
}