import React, { useState } from 'react';
import { useOmarchyTheme } from '../../context/ThemeContext';
import { Download, ExternalLink, ZoomIn, ZoomOut, FileText, CheckCircle, Award } from 'lucide-react';

export const ResumeView: React.FC = () => {
  const { theme } = useOmarchyTheme();
  const [zoom, setZoom] = useState(100);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Sabareesh_GanesaMoorthi_Resume.pdf';
    link.click();
  };

  return (
    <div
      style={{ backgroundColor: theme.surface, color: theme.fg }}
      className="w-full h-full flex flex-col font-mono text-xs overflow-hidden select-text"
    >
      {/* ── TOOLBAR ──────────────────────────────────────────────────────── */}
      <div
        style={{ backgroundColor: theme.surfaceAlt, borderColor: theme.border }}
        className="h-10 border-b px-3 flex items-center justify-between gap-2 shrink-0 select-none"
      >
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" style={{ color: theme.accent }} />
          <span className="font-bold text-white text-xs">Sabareesh_GanesaMoorthi_Resume.pdf</span>
          <span className="text-zinc-500 text-[10px] hidden sm:inline">[Page 1 of 1]</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div style={{ borderColor: theme.border }} className="flex items-center border">
            <button
              onClick={() => setZoom(z => Math.max(70, z - 10))}
              className="p-1 hover:bg-white/10 text-zinc-300 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-[10px] text-zinc-400 font-mono">{zoom}%</span>
            <button
              onClick={() => setZoom(z => Math.min(140, z + 10))}
              className="p-1 hover:bg-white/10 text-zinc-300 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Download & External Open */}
          <button
            onClick={handleDownload}
            style={{
              backgroundColor: theme.accent,
              color: '#000000'
            }}
            className="px-2.5 py-1 font-bold text-[11px] flex items-center gap-1.5 hover:opacity-90 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>

          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ borderColor: theme.border, backgroundColor: theme.surface }}
            className="p-1.5 border hover:text-white cursor-pointer"
            title="Open Raw PDF in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5 text-zinc-300" />
          </a>
        </div>
      </div>

      {/* ── DOCUMENT CANVAS ──────────────────────────────────────────────── */}
      <div className="flex-1 bg-black/60 p-4 sm:p-6 overflow-y-auto flex justify-center">
        <div
          style={{
            backgroundColor: '#0d1117',
            borderColor: theme.border,
            width: `${Math.min(100, zoom)}%`,
            maxWidth: '820px'
          }}
          className="border shadow-2xl p-6 sm:p-10 font-sans transition-all duration-150 text-zinc-200"
        >
          {/* Header */}
          <header className="border-b border-zinc-800 pb-5 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Sabareesh GanesaMoorthi
                </h1>
                <p style={{ color: theme.accent }} className="text-sm font-medium mt-0.5">
                  Full Stack Software Engineer & AI Specialist
                </p>
              </div>

              <div className="text-xs text-zinc-400 space-y-1 font-mono text-left sm:text-right">
                <div>frozen47.dev@gmail.com</div>
                <div>+91 93608 14787</div>
                <div>Tamil Nadu, India</div>
                <div className="flex sm:justify-end gap-3 text-sky-400 font-sans pt-1">
                  <a href="https://github.com/Frozen-47" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
                  <span>·</span>
                  <a href="https://linkedin.com/in/sabareesh-ganesamoorthi" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                </div>
              </div>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-1 mb-2">
              Summary
            </h2>
            <p className="text-xs leading-relaxed text-zinc-300">
              High-velocity software engineer with extensive experience developing full-stack distributed web applications,
              LLM inference integrations, and developer tooling. Passionate about keyboard-driven developer ergonomics,
              robust TypeScript architectures, Linux systems, and solid visual precision.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-1 mb-2">
              Technical Proficiencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-white font-semibold">Languages: </span>
                <span className="text-zinc-300">TypeScript, JavaScript, Python, Rust, Go, SQL</span>
              </div>
              <div>
                <span className="text-white font-semibold">Frontend: </span>
                <span className="text-zinc-300">React 19, Next.js, TailwindCSS, Vite, Redux, Three.js</span>
              </div>
              <div>
                <span className="text-white font-semibold">Backend: </span>
                <span className="text-zinc-300">Node.js, Express, FastAPI, GraphQL, REST APIs</span>
              </div>
              <div>
                <span className="text-white font-semibold">Databases: </span>
                <span className="text-zinc-300">PostgreSQL, Redis, MongoDB, Supabase, Prisma</span>
              </div>
              <div>
                <span className="text-white font-semibold">DevOps & Systems: </span>
                <span className="text-zinc-300">Docker, Kubernetes, Arch Linux, CI/CD, Git, Nginx</span>
              </div>
              <div>
                <span className="text-white font-semibold">AI & ML: </span>
                <span className="text-zinc-300">LangChain, OpenAI API, Hugging Face, RAG Architectures</span>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-1 mb-3">
              Experience
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-white">Full Stack Engineer & AI Specialist</h3>
                  <span className="text-xs text-zinc-500 font-mono">2023 – Present</span>
                </div>
                <div className="text-xs text-sky-400 mb-1.5 font-medium">Independent Software Engineering & Open Source</div>
                <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1">
                  <li>Engineered reactive web applications utilizing Next.js, TypeScript, and microservice backends.</li>
                  <li>Deployed streaming AI agents utilizing OpenAI GPT-4o and Claude APIs with sub-second token latency.</li>
                  <li>Authored and maintained multiple open-source repositories with over 150+ community stars.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-white">Software Development Engineer</h3>
                  <span className="text-xs text-zinc-500 font-mono">2022 – 2023</span>
                </div>
                <div className="text-xs text-sky-400 mb-1.5 font-medium">Tech Innovations</div>
                <ul className="list-disc list-inside text-xs text-zinc-300 space-y-1">
                  <li>Built responsive client-facing interfaces with React and TailwindCSS serving thousands of daily active users.</li>
                  <li>Optimized complex database queries in PostgreSQL, achieving a 35% reduction in API response times.</li>
                  <li>Collaborated closely with cross-functional teams using Agile methodology and automated CI/CD pipelines.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-1 mb-3">
              Key Projects
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">Aura:</span>
                  <span className="text-zinc-400">Collaborative modern developer portal with 150+ GitHub stars.</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">DevSync:</span>
                  <span className="text-zinc-400">High-concurrency file synchronization daemon with WebRTC protocol.</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">AutoInsight:</span>
                  <span className="text-zinc-400">Agentic business intelligence platform transforming SQL into automated executive summaries.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-1 mb-2">
              Education
            </h2>
            <div className="flex justify-between items-baseline text-xs">
              <div>
                <div className="font-bold text-white">Bachelor of Technology in Information Technology</div>
                <div className="text-zinc-400">First Class with Distinction</div>
              </div>
              <span className="text-zinc-500 font-mono">2020 – 2024</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
