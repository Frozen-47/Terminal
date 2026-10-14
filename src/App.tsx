import React, { useState, useEffect } from 'react';
import { ThemeProvider, useOmarchyTheme } from './context/ThemeContext';
import { WindowManagerProvider, useWindowManager, WindowMeta } from './context/WindowManagerContext';
import { AudioProvider, useAudioPlayer } from './context/AudioContext';
import { LanguageCode } from './translations';
import { OmarchyBar } from './components/omarchy/OmarchyBar';
import { HyprlandStage } from './components/omarchy/HyprlandStage';
import { OmarchyLauncher } from './components/omarchy/OmarchyLauncher';
import { KeybindingsModal } from './components/omarchy/KeybindingsModal';
import { ThemePickerModal } from './components/omarchy/ThemePickerModal';
import { MakoNotifications } from './components/omarchy/MakoNotifications';
import { HyprlockScreen } from './components/omarchy/HyprlockScreen';

function OmarchyDesktop() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const { theme, setIsThemePickerOpen } = useOmarchyTheme();
  const {
    activeWorkspace,
    setActiveWorkspace,
    openWindows,
    activeWindowId,
    bringToFront,
    openWindow,
    layoutMode,
    toggleLayoutMode,
    hyprGaps,
    isLauncherOpen,
    setIsLauncherOpen,
    isKeybindingsOpen,
    setIsKeybindingsOpen,
    isLocked,
    lockScreen,
    showDesktop,
    toggleShowDesktop
  } = useWindowManager();

  // Master Omarchy Hotkey Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLocked) return;

      const isSuper = e.metaKey || e.altKey;
      const target = e.target as HTMLElement;
      const isTyping = (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') && !target.hasAttribute('data-hotkey-allow');

      // Super + Space: Open Walker Launcher
      if (isSuper && (e.code === 'Space' || e.key === ' ')) {
        e.preventDefault();
        setIsLauncherOpen(true);
        return;
      }

      // Super + Return: Launch Alacritty Terminal
      if (isSuper && e.key === 'Enter') {
        e.preventDefault();
        openWindow('terminal');
        return;
      }

      // Super + E: Launch Omarchy Files (Thunar)
      if (isSuper && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        openWindow('files');
        return;
      }

      // Super + K: Open Keybindings
      if (isSuper && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsKeybindingsOpen(true);
        return;
      }

      // Super + T: Open Theme Selector
      if (isSuper && e.key.toLowerCase() === 't') {
        e.preventDefault();
        setIsThemePickerOpen(true);
        return;
      }

      // Super + V: Toggle Tiling vs Floating Layout
      if (isSuper && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        toggleLayoutMode();
        return;
      }

      // Super + D: Toggle Show Desktop
      if (isSuper && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggleShowDesktop();
        return;
      }

      // Super + L: Lock Screen
      if (isSuper && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        lockScreen();
        return;
      }

      // Workspace switching: Super + 1..6
      if (isSuper && ['1', '2', '3', '4', '5', '6'].includes(e.key)) {
        e.preventDefault();
        setActiveWorkspace(parseInt(e.key, 10));
        return;
      }

      // Quick ESC closes modals if open
      if (e.key === 'Escape') {
        setIsLauncherOpen(false);
        setIsKeybindingsOpen(false);
        setIsThemePickerOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked]);

  // Open windows list for the taskbar
  const openWindowsList = (Object.values(openWindows) as WindowMeta[]).filter(w => w.isOpen);

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        color: theme.fg
      }}
      className="w-screen h-screen flex flex-col font-mono overflow-hidden select-none"
    >
      {/* ── TOP: OMARCHY BAR (QUICKSHELL / WAYBAR) ───────────────────────── */}
      <OmarchyBar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />

      {/* ── CENTER: HYPRLAND MULTI-WINDOW DESKTOP STAGE ──────────────────── */}
      <HyprlandStage
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />

      {/* ── BOTTOM: OMARCHY TASKBAR & HYPRLAND STATUS LINE ───────────────── */}
      <footer
        style={{
          backgroundColor: theme.surface,
          borderColor: theme.border,
          color: theme.fgMuted
        }}
        className="h-7 border-t px-2.5 flex items-center justify-between text-[11px] font-mono shrink-0 select-none z-30"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            style={{
              backgroundColor: theme.accent,
              color: '#000000'
            }}
            className="px-1.5 font-bold text-[10px]"
          >
            HYPRLAND
          </span>
          <span style={{ color: theme.border }}>|</span>
          <span className="text-white font-bold hidden sm:inline">ws:{activeWorkspace}</span>
          <span style={{ color: theme.border }} className="hidden sm:inline">|</span>
          <span style={{ color: theme.accent }} className="hidden sm:inline">
            layout:{layoutMode}
          </span>
          <span style={{ color: theme.border }} className="hidden sm:inline">|</span>
          <span className="hidden md:inline">gaps:{hyprGaps}px</span>

          {/* Open Windows Taskbar Pills */}
          <div className="flex items-center gap-1 pl-2 border-l border-zinc-800 overflow-x-auto">
            {openWindowsList.map(w => {
              const isFocus = activeWindowId === w.id;
              return (
                <button
                  key={w.id}
                  onClick={() => bringToFront(w.id)}
                  style={{
                    backgroundColor: isFocus ? theme.borderActive + '33' : theme.surfaceAlt,
                    borderColor: isFocus ? theme.borderActive : theme.border,
                    color: isFocus ? '#ffffff' : theme.fgMuted
                  }}
                  className={`px-2 py-0.5 border text-[10px] flex items-center gap-1.5 transition-none cursor-pointer ${
                    w.isMinimized ? 'opacity-50' : ''
                  }`}
                  title={`${w.title} (Click to focus / restore)`}
                >
                  <span style={{ color: theme.accent }}>{w.icon || '󰣇'}</span>
                  <span className="truncate max-w-[100px]">{w.appClass}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hotkey Cheatsheet Hints */}
        <div className="hidden lg:flex items-center gap-2.5 text-[10px] text-zinc-500">
          <span>Super+Space: launcher</span>
          <span>·</span>
          <span>Super+Enter: terminal</span>
          <span>·</span>
          <span>Super+E: files</span>
          <span>·</span>
          <span>Super+V: layout</span>
          <span>·</span>
          <span>Super+D: desktop</span>
          <span>·</span>
          <span>Super+K: hotkeys</span>
        </div>

        {/* System & OS Info */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline" style={{ color: theme.accent }}>
            theme:{theme.id}
          </span>
          <span style={{ color: theme.border }}>|</span>
          <span style={{ color: theme.success }} className="font-bold text-[10.5px]">
            omarchy-lts v6.12
          </span>
        </div>
      </footer>

      {/* ── MODALS / LAUNCHERS / NOTIFICATIONS / LOCK SCREEN ─────────────── */}
      <OmarchyLauncher />
      <KeybindingsModal />
      <ThemePickerModal />
      <MakoNotifications />
      <HyprlockScreen />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <WindowManagerProvider>
        <AudioProvider>
          <OmarchyDesktop />
        </AudioProvider>
      </WindowManagerProvider>
    </ThemeProvider>
  );
}
