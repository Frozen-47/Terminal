import React, { useState, useEffect } from 'react';
import { useOmarchyTheme } from '../../context/ThemeContext';
import { useWindowManager, WindowId } from '../../context/WindowManagerContext';
import { useAudioPlayer } from '../../context/AudioContext';
import { LanguageCode } from '../../translations';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import {
  Terminal,
  Folder,
  FolderGit2,
  Cpu,
  FileCode,
  Music,
  FileText,
  Bell,
  Lock,
  Layout,
  Monitor
} from 'lucide-react';

interface OmarchyBarProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const OmarchyBar: React.FC<OmarchyBarProps> = ({ currentLang, onLanguageChange }) => {
  const { theme, setIsThemePickerOpen } = useOmarchyTheme();
  const {
    activeWorkspace,
    setActiveWorkspace,
    openWindows,
    activeWindowId,
    openWindow,
    layoutMode,
    toggleLayoutMode,
    setIsLauncherOpen,
    setIsKeybindingsOpen,
    lockScreen,
    notifications,
    setIsNotificationCenterOpen,
    toggleShowDesktop,
    showDesktop
  } = useWindowManager();

  const { currentTrack, isPlaying, togglePlay, nextTrack } = useAudioPlayer();

  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      setDateStr(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const workspaces = [
    { num: 1, name: 'dev', label: '1:dev' },
    { num: 2, name: 'projects', label: '2:proj' },
    { num: 3, name: 'career', label: '3:exp' },
    { num: 4, name: 'system', label: '4:sys' },
    { num: 5, name: 'media', label: '5:ost' },
    { num: 6, name: 'agent', label: '6:ai' },
  ];

  const activeWin = openWindows[activeWindowId];

  return (
    <header
      style={{
        backgroundColor: theme.surface,
        borderColor: theme.border,
        color: theme.fg
      }}
      className="h-8 border-b flex items-center justify-between px-2 font-mono text-[11px] select-none z-40 shrink-0"
    >
      {/* ── LEFT: OMARCHY LOGO + WORKSPACES + QUICK APPS ─────────────────── */}
      <div className="flex items-center gap-1.5 min-w-0">
        {/* Omarchy Menu Launcher Trigger */}
        <button
          onClick={() => setIsLauncherOpen(true)}
          style={{
            backgroundColor: theme.surfaceAlt,
            borderColor: theme.borderActive,
            color: theme.accent
          }}
          className="px-2 py-0.5 border font-bold flex items-center gap-1.5 hover:opacity-90 transition-none cursor-pointer"
          title="Omarchy Application Launcher (Super + Space)"
        >
          <span>󰣇</span>
          <span className="text-[11px] font-bold text-white uppercase hidden sm:inline">omarchy</span>
        </button>

        {/* Workspaces List (1-6) */}
        <div className="flex items-center gap-0.5 bg-black/40 p-0.5 border" style={{ borderColor: theme.border }}>
          {workspaces.map((ws) => {
            const isActive = activeWorkspace === ws.num;
            return (
              <button
                key={ws.num}
                onClick={() => setActiveWorkspace(ws.num)}
                style={{
                  backgroundColor: isActive ? theme.accent : 'transparent',
                  color: isActive ? '#000000' : theme.fgMuted
                }}
                className={`px-1.5 py-0.2 text-[10.5px] font-bold transition-none cursor-pointer ${
                  isActive ? 'shadow-none' : 'hover:text-white'
                }`}
                title={`Workspace ${ws.num} (${ws.name}) [Super + ${ws.num}]`}
              >
                {ws.num}
              </button>
            );
          })}
        </div>

        {/* Quick App Launchers in Bar */}
        <div className="hidden xl:flex items-center gap-1 pl-1 border-l border-zinc-800">
          <button
            onClick={() => openWindow('terminal')}
            className="p-1 hover:text-white text-zinc-400 cursor-pointer"
            title="Alacritty Terminal"
          >
            <Terminal className="w-3.5 h-3.5" style={{ color: theme.accent }} />
          </button>
          <button
            onClick={() => openWindow('files')}
            className="p-1 hover:text-white text-zinc-400 cursor-pointer"
            title="Omarchy Files"
          >
            <Folder className="w-3.5 h-3.5 text-sky-400" />
          </button>
          <button
            onClick={() => openWindow('projects')}
            className="p-1 hover:text-white text-zinc-400 cursor-pointer"
            title="Projects (pacman)"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
          </button>
          <button
            onClick={() => openWindow('skills')}
            className="p-1 hover:text-white text-zinc-400 cursor-pointer"
            title="System Monitor (btop)"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          </button>
          <button
            onClick={() => openWindow('editor')}
            className="p-1 hover:text-white text-zinc-400 cursor-pointer"
            title="Neovim Editor"
          >
            <FileCode className="w-3.5 h-3.5 text-purple-400" />
          </button>
          <button
            onClick={() => openWindow('music')}
            className="p-1 hover:text-white text-zinc-400 cursor-pointer"
            title="Death Note Music (ncmpcpp)"
          >
            <Music className="w-3.5 h-3.5 text-rose-400" />
          </button>
          <button
            onClick={() => openWindow('resume')}
            className="p-1 hover:text-white text-zinc-400 cursor-pointer"
            title="Resume PDF"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>

        {/* Active Window Title Bar Text */}
        <div className="hidden md:flex items-center gap-1.5 pl-2 text-xs truncate max-w-[200px] lg:max-w-[280px]">
          <span style={{ color: theme.accent }} className="font-bold">::</span>
          <span className="truncate text-white font-medium" style={{ color: theme.fg }}>
            {activeWin?.title || 'omarchy-workstation'}
          </span>
        </div>
      </div>

      {/* ── CENTER: DEATH NOTE SOUNDTRACK (MPRIS / CMUS STATUS) ─────────────── */}
      <div
        style={{
          borderColor: theme.border,
          backgroundColor: theme.surfaceAlt
        }}
        className="hidden lg:flex items-center gap-2 px-2.5 py-0.5 border text-xs text-zinc-300"
      >
        <button
          onClick={togglePlay}
          style={{ color: isPlaying ? theme.success : theme.accent }}
          className="hover:opacity-80 transition-none cursor-pointer font-bold text-[11px]"
          title={isPlaying ? "Pause soundtrack" : "Play soundtrack"}
        >
          {isPlaying ? "[ ⏸ ]" : "[ ▶ ]"}
        </button>

        <div
          onClick={() => openWindow('music')}
          className="max-w-[180px] truncate cursor-pointer hover:underline text-[10.5px]"
          title={`${currentTrack.title} by ${currentTrack.artist}`}
        >
          <span style={{ color: theme.accent }} className="mr-1">♫</span>
          <span>{currentTrack.title}</span>
        </div>

        <button
          onClick={nextTrack}
          style={{ color: theme.fgMuted }}
          className="hover:text-white transition-none cursor-pointer text-[11px]"
          title="Next track"
        >
          [ ⏭ ]
        </button>
      </div>

      {/* ── RIGHT: SYSTEM TRAY, LAYOUT, THEME, LANG, CLOCK, POWER ──────────── */}
      <div className="flex items-center gap-1 text-xs">
        {/* Layout Mode (Tiling / Float) */}
        <button
          onClick={toggleLayoutMode}
          style={{
            backgroundColor: theme.surfaceAlt,
            color: theme.accent,
            borderColor: theme.border
          }}
          className="px-1.5 py-0.5 border text-[10px] font-bold hidden sm:flex items-center gap-1 hover:opacity-90 cursor-pointer"
          title={`Current Layout: ${layoutMode}. Click to switch.`}
        >
          <Layout className="w-3 h-3" />
          <span className="uppercase">{layoutMode}</span>
        </button>

        {/* Show Desktop Button */}
        <button
          onClick={toggleShowDesktop}
          style={{
            backgroundColor: showDesktop ? theme.accent : theme.surfaceAlt,
            color: showDesktop ? '#000000' : theme.fgMuted,
            borderColor: theme.border
          }}
          className="px-1.5 py-0.5 border text-[10px] font-bold hidden md:flex items-center gap-1 hover:opacity-90 cursor-pointer"
          title="Toggle Show Desktop (Super+D)"
        >
          <Monitor className="w-3 h-3" />
          <span>Desktop</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setIsNotificationCenterOpen(true)}
          style={{ borderColor: theme.border, backgroundColor: theme.surfaceAlt }}
          className="p-1 border relative text-zinc-300 hover:text-white cursor-pointer"
          title="Mako Notifications"
        >
          <Bell className="w-3.5 h-3.5" />
          {notifications.length > 0 && (
            <span
              style={{ backgroundColor: theme.accent, color: '#000000' }}
              className="absolute -top-1 -right-1 w-3.5 h-3.5 text-[8px] font-bold flex items-center justify-center"
            >
              {notifications.length}
            </span>
          )}
        </button>

        {/* Theme Selector */}
        <button
          onClick={() => setIsThemePickerOpen(true)}
          style={{
            borderColor: theme.border,
            backgroundColor: theme.surfaceAlt,
            color: theme.accent
          }}
          className="px-1.5 py-0.5 border text-[10px] font-bold hover:opacity-85 transition-none cursor-pointer hidden sm:inline-block"
          title="Omarchy Theme Selector (Super + T)"
        >
          [ 󰔎 {theme.name.split(' ')[0]} ]
        </button>

        {/* Language Switcher */}
        <LanguageSwitcher
          currentLang={currentLang}
          onLanguageChange={onLanguageChange}
        />

        {/* Digital Clock */}
        <div
          style={{
            borderColor: theme.border,
            backgroundColor: theme.surfaceAlt,
            color: theme.fg
          }}
          className="px-2 py-0.5 border text-[10.5px] font-bold flex items-center gap-1"
          title={`${dateStr} (UTC+05:30 Erode, IN)`}
        >
          <span style={{ color: theme.accent }}>󰥔</span>
          <span>{timeStr || '21:30:00'}</span>
        </div>

        {/* Lock Screen */}
        <button
          onClick={lockScreen}
          style={{
            borderColor: theme.border,
            backgroundColor: theme.surfaceAlt,
            color: theme.error
          }}
          className="p-1 border hover:opacity-80 transition-none cursor-pointer"
          title="Lock Screen (Super + L)"
        >
          <Lock className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
