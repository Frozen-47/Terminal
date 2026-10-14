import React, { useState } from 'react';
import { useOmarchyTheme } from '../../context/ThemeContext';
import { useWindowManager } from '../../context/WindowManagerContext';
import { Check, Copy, ExternalLink, RefreshCw, Cpu, HardDrive, Terminal } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { theme } = useOmarchyTheme();
  const { addNotification, openWindow } = useWindowManager();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('frozen47.dev@gmail.com');
    setCopiedEmail(true);
    addNotification('Clipboard', 'Copied frozen47.dev@gmail.com');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCheckUpdates = () => {
    setIsUpdating(true);
    addNotification('pacman -Syu', 'Synchronizing package databases: core, extra, multilib...');
    setTimeout(() => {
      setIsUpdating(false);
      addNotification('System Up to Date', 'all packages are up to date (omarchy-lts v6.12.1)', 'success');
    }, 1500);
  };

  return (
    <div
      style={{ backgroundColor: theme.surface, color: theme.fg }}
      className="w-full h-full p-4 sm:p-6 flex flex-col justify-between font-mono text-xs select-text overflow-y-auto"
    >
      <div className="space-y-5">
        {/* Top Profile Card */}
        <div
          style={{ backgroundColor: theme.surfaceAlt, borderColor: theme.border }}
          className="border p-4 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div className="relative">
            <img
              src="/Frozen.jpg"
              alt="Sabareesh GanesaMoorthi"
              className="w-20 h-20 rounded-none border-2 object-cover"
              style={{ borderColor: theme.accent }}
              onError={(e) => {
                // fallback if image not found
                e.currentTarget.style.display = 'none';
              }}
            />
            <div
              style={{ backgroundColor: theme.success }}
              className="absolute -bottom-1 -right-1 w-4 h-4 border-2 border-black"
              title="Online / Available for Hire"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Sabareesh GanesaMoorthi
              </h1>
              <span style={{ color: theme.accent }} className="text-xs font-bold">
                @Frozen-47
              </span>
            </div>
            <p className="text-zinc-400 text-xs mt-0.5">
              Full Stack Software Engineer & Agentic AI Specialist
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              <button
                onClick={handleCopyEmail}
                style={{ borderColor: theme.border, backgroundColor: theme.surface }}
                className="px-2 py-0.5 border text-[11px] flex items-center gap-1 hover:text-white cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-zinc-400" />}
                <span>frozen47.dev@gmail.com</span>
              </button>
              <a
                href="https://github.com/Frozen-47"
                target="_blank"
                rel="noreferrer"
                style={{ borderColor: theme.border, backgroundColor: theme.surface }}
                className="px-2 py-0.5 border text-[11px] flex items-center gap-1 hover:text-white"
              >
                <ExternalLink className="w-3 h-3 text-zinc-400" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/sabareesh-ganesamoorthi"
                target="_blank"
                rel="noreferrer"
                style={{ borderColor: theme.border, backgroundColor: theme.surface }}
                className="px-2 py-0.5 border text-[11px] flex items-center gap-1 hover:text-white"
              >
                <ExternalLink className="w-3 h-3 text-zinc-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* System Specs (Fastfetch Style) */}
        <div
          style={{ backgroundColor: theme.surfaceAlt, borderColor: theme.border }}
          className="border p-4 font-mono text-[11.5px]"
        >
          <div className="flex items-center gap-2 mb-3 pb-1.5 border-b border-zinc-800">
            <Terminal className="w-4 h-4" style={{ color: theme.accent }} />
            <span className="font-bold text-white">System Diagnostics & Environment</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-zinc-300">
            <div className="flex justify-between border-b border-zinc-800/60 py-1">
              <span className="text-zinc-500">Operating System:</span>
              <span className="text-white font-bold">Omarchy Linux (Arch Linux base)</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/60 py-1">
              <span className="text-zinc-500">Kernel:</span>
              <span>6.12.1-omarchy-lts-x86_64</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/60 py-1">
              <span className="text-zinc-500">Compositor:</span>
              <span style={{ color: theme.accent }}>Hyprland v0.45.0 (Wayland)</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/60 py-1">
              <span className="text-zinc-500">Desktop Shell:</span>
              <span>Quickshell / Waybar v0.10</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/60 py-1">
              <span className="text-zinc-500">Terminal:</span>
              <span>Alacritty v0.13.2</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/60 py-1">
              <span className="text-zinc-500">Editor:</span>
              <span>Neovim v0.10.1 (Lua config)</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/60 py-1">
              <span className="text-zinc-500">Processor:</span>
              <span>AMD Ryzen 9 7950X (32) @ 5.700GHz</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/60 py-1">
              <span className="text-zinc-500">Memory:</span>
              <span>16.4 GiB / 64.0 GiB (25%)</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/60 py-1">
              <span className="text-zinc-500">Graphics:</span>
              <span>NVIDIA GeForce RTX 4090 24GB</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800/60 py-1">
              <span className="text-zinc-500">Storage:</span>
              <span>Samsung 990 Pro 2TB NVMe (ext4)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{ borderColor: theme.border }}
        className="pt-4 border-t flex flex-wrap items-center justify-between gap-3 mt-4"
      >
        <button
          onClick={handleCheckUpdates}
          disabled={isUpdating}
          style={{
            backgroundColor: theme.accent,
            color: '#000000'
          }}
          className="px-3 py-1 font-bold flex items-center gap-1.5 hover:opacity-90 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
          <span>{isUpdating ? 'Synchronizing...' : 'Check System Updates'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openWindow('resume')}
            style={{ borderColor: theme.border, backgroundColor: theme.surfaceAlt }}
            className="px-2.5 py-1 border text-white hover:border-zinc-500 cursor-pointer"
          >
            Open Resume
          </button>
          <button
            onClick={() => openWindow('terminal')}
            style={{ borderColor: theme.border, backgroundColor: theme.surfaceAlt }}
            className="px-2.5 py-1 border text-white hover:border-zinc-500 cursor-pointer"
          >
            Launch Alacritty
          </button>
        </div>
      </div>
    </div>
  );
};
