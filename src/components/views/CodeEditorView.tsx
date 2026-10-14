import React, { useState } from 'react';
import { useOmarchyTheme } from '../../context/ThemeContext';
import { Copy, Check, Terminal, FileCode } from 'lucide-react';

interface CodeFile {
  name: string;
  lang: string;
  content: string;
}

const CODE_FILES: CodeFile[] = [
  {
    name: 'portfolio.ts',
    lang: 'typescript',
    content: `/**
 * @name Sabareesh GanesaMoorthi (Frozen)
 * @role Full Stack Engineer & AI Specialist
 * @system Omarchy OS (Arch Linux + Hyprland)
 */

export const ENGINEER = {
  name: "Sabareesh GanesaMoorthi",
  alias: "Frozen-47",
  location: "Erode, Tamil Nadu, India",
  email: "frozen47.dev@gmail.com",
  github: "https://github.com/Frozen-47",
  linkedin: "https://linkedin.com/in/sabareesh-ganesamoorthi",
  
  stack: {
    core: ["TypeScript", "Python", "Rust", "Go"],
    frontend: ["React 19", "Next.js", "TailwindCSS", "Three.js"],
    backend: ["Node.js", "FastAPI", "Express", "GraphQL"],
    ai_ml: ["LangChain", "OpenAI API", "Hugging Face", "RAG Systems"],
    infrastructure: ["Docker", "Kubernetes", "Linux (Arch)", "PostgreSQL", "Redis"]
  },

  philosophy: [
    "Pixel-perfect craftsmanship (OCD grade).",
    "Solid colors over generic AI gradient fluff.",
    "Native keyboard-driven workflows & tiling compositors.",
    "Zero-bloat, high-performance systems."
  ]
};`
  },
  {
    name: 'hyprland.conf',
    lang: 'hyprland',
    content: `# ─────────────────────────────────────────────────────────────────────────────
# OMARCHY OS HYPRLAND CONFIGURATION
# Compositor: Hyprland v0.45.0 | Shell: Quickshell / Waybar
# ─────────────────────────────────────────────────────────────────────────────

monitor=,preferred,auto,1

# Input Configuration
input {
    kb_layout = us
    follow_mouse = 1
    touchpad {
        natural_scroll = true
    }
    sensitivity = 0 # -1.0 - 1.0, 0 means no modification.
}

# General Layout
general {
    gaps_in = 4
    gaps_out = 8
    border_size = 2
    col.active_border = rgb(1793d1) # Arch Blue Accent
    col.inactive_border = rgb(21262d)
    layout = dwindle
}

# Window Rules
windowrule = float, ^(pavucontrol)$
windowrule = float, ^(file-roller)$
windowrule = float, ^(feh)$

# Master Keybindings
$mainMod = SUPER

bind = $mainMod, RETURN, exec, alacritty
bind = $mainMod, SPACE, exec, walker --modules=applications
bind = $mainMod, E, exec, thunar
bind = $mainMod, W, killactive,
bind = $mainMod, F, fullscreen, 0
bind = $mainMod, S, togglesplit,
bind = $mainMod, T, exec, omarchy-theme-picker
bind = $mainMod, K, exec, omarchy-keybindings
bind = $mainMod, L, exec, hyprlock

# Workspace Navigation
bind = $mainMod, 1, workspace, 1
bind = $mainMod, 2, workspace, 2
bind = $mainMod, 3, workspace, 3
bind = $mainMod, 4, workspace, 4
bind = $mainMod, 5, workspace, 5
bind = $mainMod, 6, workspace, 6`
  },
  {
    name: 'AboutMe.md',
    lang: 'markdown',
    content: `# Sabareesh GanesaMoorthi

> Software Engineer | AI Builder | Linux Power User

Welcome to my portfolio workstation, running **Omarchy OS** directly inside your browser.

### Background
- Passionate full-stack software engineer specializing in scalable modern web platforms, distributed systems, and agentic AI architectures.
- Heavy believer in keyboard-driven productivity, terminal-first workflows, and uncompromising design consistency.
- Over 7 featured production systems spanning full-stack applications, AI tools, and developer platforms.

### Key Achievements
- Built Aura: Advanced developer platform with over 150+ active GitHub stars.
- Designed DevSync: Real-time code synchronization daemon with sub-10ms latency.
- Authored AutoInsight: Agentic AI analytics engine automating enterprise reporting.

Feel free to browse files, run terminal commands, listen to Death Note OST, or explore project packages via \`pacman\` or the Walker launcher.`
  },
  {
    name: 'experience.json',
    lang: 'json',
    content: `{
  "timeline": [
    {
      "role": "Full Stack Engineer & AI Specialist",
      "company": "Freelance / Open Source Labs",
      "period": "2023 - Present",
      "highlights": [
        "Architected and shipped multiple enterprise-grade React & Python applications.",
        "Integrated LLM inference pipelines with streaming WebSocket responses.",
        "Engineered real-time collaboration engines using CRDTs and WebRTC."
      ]
    },
    {
      "role": "Software Developer",
      "company": "Tech Ventures",
      "period": "2022 - 2023",
      "highlights": [
        "Developed full-stack web platforms using TypeScript, Next.js, and PostgreSQL.",
        "Decreased bundle sizes by 42% through lazy loading and code-splitting."
      ]
    }
  ]
}`
  }
];

export const CodeEditorView: React.FC = () => {
  const { theme } = useOmarchyTheme();
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentFile = CODE_FILES[activeFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = currentFile.content.split('\n');

  return (
    <div
      style={{ backgroundColor: theme.bg, color: theme.fg }}
      className="w-full h-full flex flex-col font-mono text-xs select-text overflow-hidden"
    >
      {/* ── TABS BAR ──────────────────────────────────────────────────────── */}
      <div
        style={{ backgroundColor: theme.surfaceAlt, borderColor: theme.border }}
        className="h-8 border-b flex items-center justify-between px-2 shrink-0 select-none overflow-x-auto"
      >
        <div className="flex items-center gap-1">
          {CODE_FILES.map((file, idx) => {
            const isActive = idx === activeFileIndex;
            return (
              <button
                key={file.name}
                onClick={() => setActiveFileIndex(idx)}
                style={{
                  backgroundColor: isActive ? theme.bg : 'transparent',
                  borderColor: isActive ? theme.borderActive : 'transparent',
                  color: isActive ? theme.accent : theme.fgMuted
                }}
                className="px-2.5 py-1 text-[11px] font-bold border-b-2 flex items-center gap-1.5 transition-none cursor-pointer"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{file.name}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleCopy}
          style={{ borderColor: theme.border, backgroundColor: theme.surface }}
          className="px-2 py-0.5 border text-[10px] flex items-center gap-1 hover:text-white cursor-pointer select-none"
        >
          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-zinc-400" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* ── EDITOR BODY: LINE NUMBERS + CODE ──────────────────────────────── */}
      <div className="flex-1 flex overflow-y-auto">
        {/* Line Numbers */}
        <div
          style={{ backgroundColor: theme.surfaceAlt, color: theme.fgMuted }}
          className="w-12 py-3 pr-2 text-right text-[11px] font-mono select-none border-r border-zinc-800 shrink-0"
        >
          {lines.map((_, i) => (
            <div key={i} className="leading-5">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1 p-3 font-mono text-[11.5px] leading-5 whitespace-pre overflow-x-auto">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="text-zinc-200 hover:bg-white/[0.03]">
                {line || ' '}
              </div>
            ))}
          </code>
        </div>
      </div>

      {/* ── STATUSLINE ───────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: theme.surfaceAlt,
          borderColor: theme.border,
          color: theme.fgMuted
        }}
        className="h-6 border-t px-2.5 flex items-center justify-between text-[10px] select-none shrink-0"
      >
        <div className="flex items-center gap-2">
          <span
            style={{ backgroundColor: theme.accent, color: '#000000' }}
            className="px-1.5 font-bold uppercase"
          >
            NORMAL
          </span>
          <span className="text-white font-bold">{currentFile.name}</span>
          <span className="text-zinc-500">[RO]</span>
        </div>

        <div className="flex items-center gap-3">
          <span>utf-8</span>
          <span>|</span>
          <span className="uppercase">{currentFile.lang}</span>
          <span>|</span>
          <span>{lines.length} lines</span>
          <span>|</span>
          <span style={{ color: theme.accent }}>NVIM v0.10.1</span>
        </div>
      </div>
    </div>
  );
};
