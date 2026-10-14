import React, { useState } from 'react';
import { useOmarchyTheme } from '../../context/ThemeContext';
import { useWindowManager, WindowId } from '../../context/WindowManagerContext';
import {
  Terminal,
  Folder,
  FolderGit2,
  Cpu,
  Music,
  FileCode,
  FileText,
  Info,
  Settings,
  Bot
} from 'lucide-react';

interface DesktopIconItem {
  id: WindowId;
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  iconColor: string;
  badge?: string;
}

const DESKTOP_ITEMS: DesktopIconItem[] = [
  { id: 'files', label: 'Omarchy Files', icon: Folder, iconColor: '#38bdf8' },
  { id: 'terminal', label: 'Alacritty', icon: Terminal, iconColor: '#1793d1' },
  { id: 'projects', label: 'Projects (7)', icon: FolderGit2, iconColor: '#f59e0b', badge: '7' },
  { id: 'skills', label: 'btop++ Monitor', icon: Cpu, iconColor: '#10b981' },
  { id: 'music', label: 'Death Note OST', icon: Music, iconColor: '#c084fc', badge: '30' },
  { id: 'editor', label: 'Neovim', icon: FileCode, iconColor: '#a78bfa' },
  { id: 'resume', label: 'Resume.pdf', icon: FileText, iconColor: '#fb7185' },
  { id: 'about', label: 'About Omarchy', icon: Info, iconColor: '#38bdf8' },
  { id: 'ai', label: 'Elsa AI Agent', icon: Bot, iconColor: '#2dd4bf' },
  { id: 'settings', label: 'Control Center', icon: Settings, iconColor: '#94a3b8' }
];

export const DesktopIcons: React.FC = () => {
  const { theme } = useOmarchyTheme();
  const { openWindow, bringToFront } = useWindowManager();
  const [selectedId, setSelectedId] = useState<WindowId | null>(null);

  const handleClick = (id: WindowId, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedId(id);
  };

  const handleDoubleClick = (id: WindowId, e: React.MouseEvent) => {
    e.stopPropagation();
    openWindow(id);
    bringToFront(id);
  };

  return (
    <div
      onClick={() => setSelectedId(null)}
      className="absolute inset-0 p-4 pointer-events-none flex flex-col flex-wrap content-start gap-4 select-none z-0"
    >
      {DESKTOP_ITEMS.map(item => {
        const IconComponent = item.icon;
        const isSelected = selectedId === item.id;
        return (
          <div
            key={item.id}
            onClick={e => handleClick(item.id, e)}
            onDoubleClick={e => handleDoubleClick(item.id, e)}
            style={{
              backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              borderColor: isSelected ? theme.borderActive : 'transparent'
            }}
            className="pointer-events-auto w-24 p-2 border flex flex-col items-center text-center gap-1.5 cursor-pointer hover:bg-white/5 transition-none group"
            title={`Double-click to open ${item.label}`}
          >
            <div className="relative p-2 rounded-none bg-black/40 border border-zinc-800 group-hover:border-zinc-600">
              <IconComponent className="w-8 h-8" style={{ color: item.iconColor }} />
              {item.badge && (
                <span
                  style={{ backgroundColor: theme.accent, color: '#000000' }}
                  className="absolute -top-1.5 -right-1.5 text-[9px] font-bold px-1"
                >
                  {item.badge}
                </span>
              )}
            </div>

            <span
              className={`text-[11px] font-mono leading-tight tracking-tight line-clamp-2 px-1 ${
                isSelected ? 'text-white font-bold bg-blue-600/40' : 'text-zinc-200 group-hover:text-white'
              }`}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
