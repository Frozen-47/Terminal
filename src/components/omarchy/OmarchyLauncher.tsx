import React, { useState, useEffect, useRef } from 'react';
import { useOmarchyTheme } from '../../context/ThemeContext';
import { useWindowManager, WindowId } from '../../context/WindowManagerContext';

interface LauncherItem {
  id: string;
  name: string;
  description: string;
  category: string;
  shortcut?: string;
  action: () => void;
}

export const OmarchyLauncher: React.FC = () => {
  const { theme, setIsThemePickerOpen } = useOmarchyTheme();
  const {
    isLauncherOpen,
    setIsLauncherOpen,
    setActiveWorkspace,
    openWindow,
    setIsKeybindingsOpen,
    lockScreen,
    toggleLayoutMode,
    addNotification
  } = useWindowManager();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const items: LauncherItem[] = [
    {
      id: 'alacritty',
      name: 'Alacritty Terminal',
      description: 'Interactive Arch Linux shell with neofetch, pacman, and full CLI commands',
      category: 'System',
      shortcut: 'Super+Enter',
      action: () => {
        openWindow('terminal');
      }
    },
    {
      id: 'files',
      name: 'Omarchy Files (Thunar)',
      description: 'Explore portfolio project files, documents, resume, configs, and audio assets',
      category: 'System',
      shortcut: 'Super+E',
      action: () => {
        openWindow('files');
      }
    },
    {
      id: 'projects',
      name: 'Projects Showcase (pacman -Qe)',
      description: 'Explore Sabareesh\'s 7 featured production builds (Aura, DevSync, AutoInsight, etc.)',
      category: 'Builds',
      shortcut: 'Super+2',
      action: () => {
        openWindow('projects');
      }
    },
    {
      id: 'experience',
      name: 'Career Milestones (git-log)',
      description: 'Software Engineering career milestones, work history, and GitHub activity',
      category: 'Career',
      shortcut: 'Super+3',
      action: () => {
        openWindow('experience');
      }
    },
    {
      id: 'skills',
      name: 'System Monitor & Stack (btop++)',
      description: 'Live CPU, RAM, GPU, processes, and technical proficiency matrix',
      category: 'Matrix',
      shortcut: 'Super+4',
      action: () => {
        openWindow('skills');
      }
    },
    {
      id: 'music',
      name: 'Death Note Music Station (ncmpcpp)',
      description: 'Authentic 30-track Death Note OST player with ASCII visualizer and scrub bar',
      category: 'Media',
      shortcut: 'Super+5',
      action: () => {
        openWindow('music');
      }
    },
    {
      id: 'editor',
      name: 'Neovim Code Editor',
      description: 'View portfolio source code, hyprland.conf, AboutMe.md, and configs',
      category: 'Code',
      action: () => {
        openWindow('editor');
      }
    },
    {
      id: 'resume',
      name: 'Document Viewer (Resume.pdf)',
      description: 'View, inspect, and download Sabareesh\'s official resume PDF',
      category: 'Docs',
      action: () => {
        openWindow('resume');
      }
    },
    {
      id: 'about',
      name: 'About Omarchy OS & Engineer',
      description: 'Hardware diagnostics, OS specs, and Sabareesh\'s contact profile',
      category: 'System',
      action: () => {
        openWindow('about');
      }
    },
    {
      id: 'settings',
      name: 'Omarchy Control Center',
      description: 'Theme customization, Hyprland gaps, window layout, and sound volume',
      category: 'System',
      action: () => {
        openWindow('settings');
      }
    },
    {
      id: 'ai',
      name: 'Elsa AI Assistant (Omarchy Agent)',
      description: 'Conversational agent shell for portfolio queries and system assistance',
      category: 'Agent',
      shortcut: 'Super+6',
      action: () => {
        openWindow('ai');
      }
    },
    {
      id: 'layout',
      name: 'Toggle Layout (Tiling / Float)',
      description: 'Switch between Hyprland automatic master-stack tiling and floating desktop',
      category: 'Window',
      action: () => {
        toggleLayoutMode();
      }
    },
    {
      id: 'theme',
      name: 'Omarchy Theme Selector',
      description: 'Switch between Solitude, Tokyo Night, Osaka Jade, Everforest, Gruvbox, Nord',
      category: 'Style',
      shortcut: 'Super+T',
      action: () => {
        setIsThemePickerOpen(true);
      }
    },
    {
      id: 'keybindings',
      name: 'Omarchy Keybindings Cheat Sheet',
      description: 'List of all system hotkeys (Super+Return, Super+Space, Super+W, etc.)',
      category: 'Help',
      shortcut: 'Super+K',
      action: () => {
        setIsKeybindingsOpen(true);
      }
    },
    {
      id: 'lock',
      name: 'Lock Desktop (hyprlock)',
      description: 'Lock workstation screen with authentic hyprlock prompt',
      category: 'Session',
      shortcut: 'Super+L',
      action: () => {
        lockScreen();
      }
    },
    {
      id: 'email',
      name: 'Copy Developer Email',
      description: 'Copy frozen47.dev@gmail.com to clipboard',
      category: 'Contact',
      action: () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText('frozen47.dev@gmail.com');
          addNotification('Clipboard', 'Copied frozen47.dev@gmail.com');
        }
      }
    }
  ];

  const filtered = items.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isLauncherOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isLauncherOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsLauncherOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + Math.max(1, filtered.length)) % Math.max(1, filtered.length));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = filtered[selectedIndex];
      if (target) {
        setIsLauncherOpen(false);
        target.action();
      }
    }
  };

  if (!isLauncherOpen) return null;

  return (
    <div
      onClick={() => setIsLauncherOpen(false)}
      className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-20 p-4 font-mono select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: theme.surface,
          borderColor: theme.borderActive,
          color: theme.fg
        }}
        className="w-full max-w-xl border-2 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Walker Header / Search Prompt */}
        <div
          style={{
            borderColor: theme.border,
            backgroundColor: theme.surfaceAlt
          }}
          className="p-3 border-b flex items-center gap-2"
        >
          <span style={{ color: theme.accent }} className="font-bold text-sm">󰍉</span>
          <span className="text-zinc-500 text-xs">walker:</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search applications, portfolio tools, documents..."
            className="w-full bg-transparent text-white placeholder-zinc-500 outline-none text-xs font-mono"
          />
          <span
            style={{ borderColor: theme.border, color: theme.fgMuted }}
            className="px-1.5 py-0.5 border text-[10px]"
          >
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y" style={{ borderColor: theme.border }}>
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-zinc-500 font-mono">
              No matching applications or tools found for "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setIsLauncherOpen(false);
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    backgroundColor: isSelected ? theme.borderActive + '22' : 'transparent',
                    borderLeftColor: isSelected ? theme.borderActive : 'transparent'
                  }}
                  className={`p-2.5 px-3 flex items-center justify-between border-l-4 cursor-pointer transition-none ${
                    isSelected ? 'text-white' : 'text-zinc-300'
                  }`}
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs truncate">{item.name}</span>
                      <span
                        style={{
                          backgroundColor: theme.surfaceAlt,
                          borderColor: theme.border,
                          color: theme.accent
                        }}
                        className="px-1.5 py-0.2 border text-[9px] uppercase tracking-wider font-bold"
                      >
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                      {item.description}
                    </p>
                  </div>

                  {item.shortcut && (
                    <span
                      style={{
                        borderColor: theme.border,
                        backgroundColor: theme.surfaceAlt,
                        color: theme.fgMuted
                      }}
                      className="px-1.5 py-0.5 border text-[10px] shrink-0 font-mono"
                    >
                      {item.shortcut}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Walker Footer */}
        <div
          style={{
            backgroundColor: theme.surfaceAlt,
            borderColor: theme.border,
            color: theme.fgMuted
          }}
          className="p-2 px-3 border-t flex items-center justify-between text-[10px] font-mono"
        >
          <div className="flex items-center gap-3">
            <span>↑↓: navigate</span>
            <span>·</span>
            <span>ENTER: execute</span>
            <span>·</span>
            <span>ESC: close</span>
          </div>
          <span style={{ color: theme.accent }}>
            walker v0.8 (omarchy)
          </span>
        </div>
      </div>
    </div>
  );
};
