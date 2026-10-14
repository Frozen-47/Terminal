import React from 'react';
import { useOmarchyTheme } from '../../context/ThemeContext';
import { useWindowManager, WindowId } from '../../context/WindowManagerContext';
import {
  Terminal,
  Folder,
  FolderGit2,
  Cpu,
  FileCode,
  Music,
  FileText,
  Info,
  Palette,
  Layout,
  HelpCircle,
  Lock,
  RefreshCw
} from 'lucide-react';

export const DesktopContextMenu: React.FC = () => {
  const { theme, setIsThemePickerOpen } = useOmarchyTheme();
  const {
    desktopContextMenu,
    closeDesktopContextMenu,
    openWindow,
    toggleLayoutMode,
    setIsKeybindingsOpen,
    lockScreen
  } = useWindowManager();

  if (!desktopContextMenu || !desktopContextMenu.isOpen) return null;

  const { x, y } = desktopContextMenu;

  // Keep menu within viewport bounds
  const adjustedX = Math.min(x, window.innerWidth - 220);
  const adjustedY = Math.min(y, window.innerHeight - 380);

  const handleAction = (action: () => void) => {
    action();
    closeDesktopContextMenu();
  };

  return (
    <div
      onClick={e => e.stopPropagation()}
      style={{
        top: `${adjustedY}px`,
        left: `${adjustedX}px`,
        backgroundColor: theme.surface,
        borderColor: theme.borderActive,
        color: theme.fg
      }}
      className="fixed z-50 w-56 border shadow-2xl font-mono text-xs py-1 select-none animate-in fade-in zoom-in-95 duration-75"
    >
      <div className="px-3 py-1 text-[10px] text-zinc-500 uppercase tracking-wider font-bold border-b border-zinc-800 mb-1">
        Omarchy Desktop Menu
      </div>

      <button
        onClick={() => handleAction(() => openWindow('terminal'))}
        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5" style={{ color: theme.accent }} />
          <span>Launch Alacritty</span>
        </span>
        <span className="text-[10px] text-zinc-500">Super+Enter</span>
      </button>

      <button
        onClick={() => handleAction(() => openWindow('files'))}
        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Folder className="w-3.5 h-3.5 text-sky-400" />
          <span>Omarchy Files</span>
        </span>
        <span className="text-[10px] text-zinc-500">Super+E</span>
      </button>

      <button
        onClick={() => handleAction(() => openWindow('projects'))}
        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <FolderGit2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Projects (pacman)</span>
        </span>
        <span className="text-[10px] text-zinc-500">Super+2</span>
      </button>

      <button
        onClick={() => handleAction(() => openWindow('skills'))}
        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span>System Monitor (btop)</span>
        </span>
        <span className="text-[10px] text-zinc-500">Super+4</span>
      </button>

      <button
        onClick={() => handleAction(() => openWindow('editor'))}
        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <FileCode className="w-3.5 h-3.5 text-purple-400" />
          <span>Neovim Editor</span>
        </span>
      </button>

      <button
        onClick={() => handleAction(() => openWindow('music'))}
        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Music className="w-3.5 h-3.5 text-rose-400" />
          <span>Music (ncmpcpp)</span>
        </span>
        <span className="text-[10px] text-zinc-500">Super+5</span>
      </button>

      <button
        onClick={() => handleAction(() => openWindow('resume'))}
        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>View Resume</span>
        </span>
      </button>

      <button
        onClick={() => handleAction(() => openWindow('about'))}
        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-sky-400" />
          <span>About Omarchy OS</span>
        </span>
      </button>

      <div className="border-t border-zinc-800 my-1" />

      <button
        onClick={() => handleAction(() => setIsThemePickerOpen(true))}
        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Palette className="w-3.5 h-3.5 text-pink-400" />
          <span>Change Theme</span>
        </span>
        <span className="text-[10px] text-zinc-500">Super+T</span>
      </button>

      <button
        onClick={() => handleAction(toggleLayoutMode)}
        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Layout className="w-3.5 h-3.5 text-teal-400" />
          <span>Toggle Tiling / Float</span>
        </span>
      </button>

      <button
        onClick={() => handleAction(() => setIsKeybindingsOpen(true))}
        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <HelpCircle className="w-3.5 h-3.5 text-yellow-400" />
          <span>Keybindings</span>
        </span>
        <span className="text-[10px] text-zinc-500">Super+K</span>
      </button>

      <button
        onClick={() => handleAction(lockScreen)}
        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-red-400" />
          <span>Lock Desktop</span>
        </span>
        <span className="text-[10px] text-zinc-500">Super+L</span>
      </button>

      <button
        onClick={() => handleAction(() => window.location.reload())}
        className="w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-white/10 hover:text-white cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 text-zinc-400" />
          <span>Reload Session</span>
        </span>
      </button>
    </div>
  );
};
