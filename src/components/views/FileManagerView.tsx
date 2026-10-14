import React, { useState } from 'react';
import { useOmarchyTheme } from '../../context/ThemeContext';
import { useWindowManager, WindowId } from '../../context/WindowManagerContext';
import { useAudioPlayer } from '../../context/AudioContext';
import {
  Folder,
  FileText,
  FileCode,
  Music,
  ArrowLeft,
  ArrowUp,
  Search,
  LayoutGrid,
  List,
  ExternalLink,
  HardDrive,
  Home,
  FolderGit2,
  FileCheck,
  Sliders
} from 'lucide-react';
import { PINNED_PROJECTS } from '../../constants';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  size: string;
  ext?: string;
  date: string;
  targetApp?: WindowId;
  previewText?: string;
}

const FILE_SYSTEM: Record<string, { parent: string | null; items: FileItem[] }> = {
  '~/portfolio': {
    parent: '~',
    items: [
      { name: 'projects', type: 'folder', size: '7 items', date: 'Oct 14, 2026' },
      { name: 'documents', type: 'folder', size: '4 items', date: 'Oct 14, 2026' },
      { name: 'skills', type: 'folder', size: '5 items', date: 'Oct 14, 2026' },
      { name: 'music', type: 'folder', size: '30 items', date: 'Oct 14, 2026' },
      { name: '.config', type: 'folder', size: '4 items', date: 'Oct 14, 2026' },
      { name: 'Resume.pdf', type: 'file', size: '248 KB', ext: 'pdf', date: 'Oct 14, 2026', targetApp: 'resume' },
      { name: 'README.md', type: 'file', size: '3.4 KB', ext: 'md', date: 'Oct 14, 2026', targetApp: 'editor' },
      { name: 'Frozen.jpg', type: 'file', size: '1.2 MB', ext: 'jpg', date: 'Oct 14, 2026', targetApp: 'about' }
    ]
  },
  '~/portfolio/projects': {
    parent: '~/portfolio',
    items: PINNED_PROJECTS.map(p => ({
      name: `${p.name.replace(/\s+/g, '-')}.proj`,
      type: 'file' as const,
      size: p.type,
      ext: 'proj',
      date: '2026',
      targetApp: 'projects' as WindowId,
      previewText: p.description
    }))
  },
  '~/portfolio/documents': {
    parent: '~/portfolio',
    items: [
      { name: 'Resume.pdf', type: 'file', size: '248 KB', ext: 'pdf', date: 'Oct 14, 2026', targetApp: 'resume' },
      { name: 'AboutMe.md', type: 'file', size: '2.1 KB', ext: 'md', date: 'Oct 14, 2026', targetApp: 'editor' },
      { name: 'CoverLetter.txt', type: 'file', size: '1.8 KB', ext: 'txt', date: 'Oct 14, 2026', targetApp: 'editor' },
      { name: 'humans.txt', type: 'file', size: '420 B', ext: 'txt', date: 'Oct 14, 2026', targetApp: 'editor' }
    ]
  },
  '~/portfolio/skills': {
    parent: '~/portfolio',
    items: [
      { name: 'frontend-matrix.json', type: 'file', size: '1.2 KB', ext: 'json', date: 'Oct 14, 2026', targetApp: 'skills' },
      { name: 'backend-services.json', type: 'file', size: '1.4 KB', ext: 'json', date: 'Oct 14, 2026', targetApp: 'skills' },
      { name: 'devops-infra.json', type: 'file', size: '980 B', ext: 'json', date: 'Oct 14, 2026', targetApp: 'skills' },
      { name: 'database-systems.json', type: 'file', size: '820 B', ext: 'json', date: 'Oct 14, 2026', targetApp: 'skills' },
      { name: 'ai-agents-llm.json', type: 'file', size: '1.6 KB', ext: 'json', date: 'Oct 14, 2026', targetApp: 'ai' }
    ]
  },
  '~/portfolio/music': {
    parent: '~/portfolio',
    items: [
      { name: "L's-Theme-A.flac", type: 'file', size: '24.2 MB', ext: 'flac', date: 'Death Note', targetApp: 'music' },
      { name: "Light's-Theme.flac", type: 'file', size: '22.8 MB', ext: 'flac', date: 'Death Note', targetApp: 'music' },
      { name: 'Kira-Kyrie.flac', type: 'file', size: '28.1 MB', ext: 'flac', date: 'Death Note', targetApp: 'music' },
      { name: 'death-note-ost.m3u', type: 'file', size: '1.4 KB', ext: 'm3u', date: 'Playlist (30)', targetApp: 'music' }
    ]
  },
  '~/.config': {
    parent: '~/portfolio',
    items: [
      { name: 'hyprland.conf', type: 'file', size: '4.8 KB', ext: 'conf', date: 'Omarchy', targetApp: 'editor' },
      { name: 'waybar.jsonc', type: 'file', size: '3.2 KB', ext: 'jsonc', date: 'Quickshell', targetApp: 'editor' },
      { name: 'alacritty.toml', type: 'file', size: '2.1 KB', ext: 'toml', date: 'Alacritty', targetApp: 'editor' },
      { name: 'omarchy-themes.json', type: 'file', size: '1.8 KB', ext: 'json', date: 'Themes', targetApp: 'settings' }
    ]
  }
};

export const FileManagerView: React.FC = () => {
  const { theme } = useOmarchyTheme();
  const { openWindow, addNotification } = useWindowManager();
  const { togglePlay } = useAudioPlayer();

  const [currentPath, setCurrentPath] = useState('~/portfolio');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const folderData = FILE_SYSTEM[currentPath] || { parent: '~/portfolio', items: [] };

  const filteredItems = folderData.items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemClick = (item: FileItem) => {
    setSelectedFile(item.name);
    if (item.type === 'folder') {
      const nextPath = `${currentPath}/${item.name}`;
      if (FILE_SYSTEM[nextPath]) {
        setCurrentPath(nextPath);
        setSelectedFile(null);
      }
    }
  };

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      const nextPath = `${currentPath}/${item.name}`;
      if (FILE_SYSTEM[nextPath]) {
        setCurrentPath(nextPath);
        setSelectedFile(null);
      }
    } else if (item.targetApp) {
      openWindow(item.targetApp);
      addNotification('Application Launched', `Opened ${item.name} in ${item.targetApp}`);
      if (item.targetApp === 'music') {
        togglePlay();
      }
    }
  };

  const handleNavigateUp = () => {
    if (folderData.parent && FILE_SYSTEM[folderData.parent]) {
      setCurrentPath(folderData.parent);
      setSelectedFile(null);
    }
  };

  const renderIcon = (item: FileItem) => {
    if (item.type === 'folder') {
      return <Folder className="w-8 h-8 text-sky-400 fill-sky-400/20" />;
    }
    if (item.ext === 'pdf') {
      return <FileCheck className="w-8 h-8 text-rose-400 fill-rose-400/20" />;
    }
    if (item.ext === 'md' || item.ext === 'txt') {
      return <FileText className="w-8 h-8 text-emerald-400 fill-emerald-400/20" />;
    }
    if (item.ext === 'flac' || item.ext === 'm3u') {
      return <Music className="w-8 h-8 text-purple-400 fill-purple-400/20" />;
    }
    if (item.ext === 'proj') {
      return <FolderGit2 className="w-8 h-8 text-amber-400 fill-amber-400/20" />;
    }
    return <FileCode className="w-8 h-8 text-blue-400 fill-blue-400/20" />;
  };

  return (
    <div
      style={{ backgroundColor: theme.surface, color: theme.fg }}
      className="w-full h-full flex flex-col font-mono text-xs select-none overflow-hidden"
    >
      {/* ── TOOLBAR ──────────────────────────────────────────────────────── */}
      <div
        style={{ backgroundColor: theme.surfaceAlt, borderColor: theme.border }}
        className="h-10 border-b px-3 flex items-center justify-between gap-3 shrink-0"
      >
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleNavigateUp}
            disabled={!folderData.parent || folderData.parent === '~'}
            style={{ borderColor: theme.border }}
            className="p-1.5 border hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
            title="Go Up"
          >
            <ArrowUp className="w-3.5 h-3.5 text-zinc-300" />
          </button>
          <button
            onClick={() => setCurrentPath('~/portfolio')}
            style={{ borderColor: theme.border }}
            className="p-1.5 border hover:bg-white/10 cursor-pointer"
            title="Go Home"
          >
            <Home className="w-3.5 h-3.5 text-zinc-300" />
          </button>
        </div>

        {/* Path Breadcrumb */}
        <div
          style={{ backgroundColor: theme.bg, borderColor: theme.border }}
          className="flex-1 max-w-xl h-7 border px-2.5 flex items-center gap-1 text-[11px] text-zinc-300 overflow-hidden"
        >
          <span style={{ color: theme.accent }}>/home/frozen</span>
          <span className="text-zinc-600">/</span>
          {currentPath.replace('~/', '').split('/').map((seg, i, arr) => (
            <React.Fragment key={i}>
              <span className={i === arr.length - 1 ? 'text-white font-bold' : 'text-zinc-400'}>
                {seg}
              </span>
              {i < arr.length - 1 && <span className="text-zinc-600">/</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Search & View Modes */}
        <div className="flex items-center gap-2">
          <div
            style={{ backgroundColor: theme.bg, borderColor: theme.border }}
            className="h-7 border px-2 flex items-center gap-1.5 w-36 sm:w-48"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search directory..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-[11px] outline-none text-zinc-200"
            />
          </div>

          <div style={{ borderColor: theme.border }} className="flex border">
            <button
              onClick={() => setViewMode('grid')}
              style={{
                backgroundColor: viewMode === 'grid' ? theme.accent : 'transparent',
                color: viewMode === 'grid' ? '#000000' : theme.fgMuted
              }}
              className="p-1.5 cursor-pointer font-bold"
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                backgroundColor: viewMode === 'list' ? theme.accent : 'transparent',
                color: viewMode === 'list' ? '#000000' : theme.fgMuted
              }}
              className="p-1.5 cursor-pointer font-bold"
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── BODY: SIDEBAR + FILES ────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <aside
          style={{ backgroundColor: theme.surfaceAlt, borderColor: theme.border }}
          className="w-44 border-r p-2.5 flex flex-col gap-3 shrink-0 hidden sm:flex text-[11px]"
        >
          <div>
            <div className="text-[10px] font-bold text-zinc-500 tracking-wider mb-1.5 px-1 uppercase">
              Places
            </div>
            <div className="space-y-0.5">
              {[
                { label: 'Portfolio Home', path: '~/portfolio', icon: Home },
                { label: 'Projects (7)', path: '~/portfolio/projects', icon: FolderGit2 },
                { label: 'Documents', path: '~/portfolio/documents', icon: FileText },
                { label: 'Skills & Stack', path: '~/portfolio/skills', icon: Sliders },
                { label: 'Music & OST', path: '~/portfolio/music', icon: Music },
                { label: 'Dotfiles & Conf', path: '~/.config', icon: FileCode }
              ].map(place => {
                const isActive = currentPath === place.path;
                const IconComponent = place.icon;
                return (
                  <button
                    key={place.path}
                    onClick={() => {
                      setCurrentPath(place.path);
                      setSelectedFile(null);
                    }}
                    style={{
                      backgroundColor: isActive ? theme.borderActive + '22' : 'transparent',
                      color: isActive ? theme.accent : theme.fgMuted,
                      borderColor: isActive ? theme.borderActive : 'transparent'
                    }}
                    className="w-full text-left px-2 py-1.5 border flex items-center gap-2 hover:text-white transition-none cursor-pointer"
                  >
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{place.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-auto border-t pt-2" style={{ borderColor: theme.border }}>
            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] px-1">
              <HardDrive className="w-3 h-3" />
              <span>NVMe 2TB: 1.4TB free</span>
            </div>
          </div>
        </aside>

        {/* Main Files Display */}
        <main className="flex-1 p-3 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="h-full flex items-center justify-center text-zinc-500 text-xs">
              No matching files in {currentPath}
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
              {filteredItems.map(item => {
                const isSelected = selectedFile === item.name;
                return (
                  <div
                    key={item.name}
                    onClick={() => handleItemClick(item)}
                    onDoubleClick={() => handleItemDoubleClick(item)}
                    style={{
                      borderColor: isSelected ? theme.borderActive : theme.border,
                      backgroundColor: isSelected ? theme.surfaceAlt : 'transparent'
                    }}
                    className="p-3 border flex flex-col items-center text-center gap-2 hover:bg-white/5 cursor-pointer transition-none group"
                  >
                    {renderIcon(item)}
                    <span className="text-[11px] text-zinc-200 font-medium truncate w-full group-hover:text-white">
                      {item.name}
                    </span>
                    <span className="text-[9px] text-zinc-500 font-mono">
                      {item.size}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full border" style={{ borderColor: theme.border }}>
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr style={{ backgroundColor: theme.surfaceAlt, color: theme.fgMuted }} className="border-b" style-border={{ borderColor: theme.border }}>
                    <th className="p-2">Name</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Size</th>
                    <th className="p-2">Date / Info</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map(item => {
                    const isSelected = selectedFile === item.name;
                    return (
                      <tr
                        key={item.name}
                        onClick={() => handleItemClick(item)}
                        onDoubleClick={() => handleItemDoubleClick(item)}
                        style={{
                          backgroundColor: isSelected ? theme.borderActive + '22' : 'transparent',
                          color: isSelected ? '#ffffff' : theme.fg
                        }}
                        className="border-b hover:bg-white/5 cursor-pointer border-zinc-800"
                      >
                        <td className="p-2 flex items-center gap-2">
                          <span className="shrink-0">{renderIcon(item)}</span>
                          <span className="truncate">{item.name}</span>
                        </td>
                        <td className="p-2 text-zinc-500 uppercase">{item.ext || item.type}</td>
                        <td className="p-2 text-zinc-400">{item.size}</td>
                        <td className="p-2 text-zinc-500">{item.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {/* ── STATUS BAR ───────────────────────────────────────────────────── */}
      <div
        style={{ backgroundColor: theme.surfaceAlt, borderColor: theme.border, color: theme.fgMuted }}
        className="h-6 border-t px-3 flex items-center justify-between text-[10px] shrink-0"
      >
        <span>
          {filteredItems.length} items (Double click to open)
        </span>
        <span style={{ color: theme.accent }}>
          thunar v4.18.8 (omarchy-native)
        </span>
      </div>
    </div>
  );
};
