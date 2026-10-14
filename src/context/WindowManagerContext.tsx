import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type WindowId =
  | 'terminal'
  | 'files'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'music'
  | 'editor'
  | 'resume'
  | 'about'
  | 'settings'
  | 'ai';

export type LayoutMode = 'tiling' | 'floating';

export interface WindowMeta {
  id: WindowId;
  title: string;
  appClass: string;
  icon: string;
  workspace: number;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type?: 'info' | 'success' | 'warning' | 'music';
}

export interface WindowManagerContextType {
  activeWorkspace: number;
  setActiveWorkspace: (ws: number) => void;
  openWindows: Record<WindowId, WindowMeta>;
  activeWindowId: WindowId;
  setActiveWindowId: (id: WindowId) => void;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  toggleMaximizeWindow: (id: WindowId) => void;
  bringToFront: (id: WindowId) => void;
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  toggleLayoutMode: () => void;
  hyprGaps: number;
  setHyprGaps: (gaps: number) => void;
  isLauncherOpen: boolean;
  setIsLauncherOpen: (open: boolean) => void;
  isKeybindingsOpen: boolean;
  setIsKeybindingsOpen: (open: boolean) => void;
  isLocked: boolean;
  lockScreen: () => void;
  unlockScreen: () => void;
  notifications: NotificationItem[];
  addNotification: (title: string, message: string, type?: NotificationItem['type']) => void;
  dismissNotification: (id: string) => void;
  isNotificationCenterOpen: boolean;
  setIsNotificationCenterOpen: (open: boolean) => void;
  desktopContextMenu: { isOpen: boolean; x: number; y: number } | null;
  openDesktopContextMenu: (x: number, y: number) => void;
  closeDesktopContextMenu: () => void;
  showDesktop: boolean;
  setShowDesktop: (show: boolean) => void;
  toggleShowDesktop: () => void;
}

const DEFAULT_WINDOWS_META: Record<WindowId, WindowMeta> = {
  terminal: {
    id: 'terminal',
    title: 'alacritty — frozen@omarchy:~',
    appClass: 'Alacritty',
    icon: '󰣇',
    workspace: 1,
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 30, y: 30 },
    size: { width: 780, height: 560 }
  },
  files: {
    id: 'files',
    title: 'thunar — ~/portfolio',
    appClass: 'Thunar',
    icon: '󰉋',
    workspace: 1,
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 9,
    position: { x: 420, y: 70 },
    size: { width: 740, height: 540 }
  },
  projects: {
    id: 'projects',
    title: 'pacman -Qe projects (fzf)',
    appClass: 'Pacman',
    icon: '󰏖',
    workspace: 2,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 8,
    position: { x: 60, y: 50 },
    size: { width: 880, height: 600 }
  },
  experience: {
    id: 'experience',
    title: 'git log --graph --all (career)',
    appClass: 'GitLog',
    icon: '󰊢',
    workspace: 3,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 7,
    position: { x: 80, y: 60 },
    size: { width: 840, height: 580 }
  },
  skills: {
    id: 'skills',
    title: 'btop --system-matrix',
    appClass: 'Btop',
    icon: '󰓅',
    workspace: 4,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 6,
    position: { x: 70, y: 40 },
    size: { width: 860, height: 580 }
  },
  music: {
    id: 'music',
    title: 'ncmpcpp v0.9.2 (death-note-ost)',
    appClass: 'Cmus',
    icon: '󰝚',
    workspace: 5,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 120, y: 80 },
    size: { width: 800, height: 540 }
  },
  editor: {
    id: 'editor',
    title: 'nvim — portfolio.ts',
    appClass: 'Neovim',
    icon: '󰅪',
    workspace: 2,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 4,
    position: { x: 100, y: 60 },
    size: { width: 860, height: 580 }
  },
  resume: {
    id: 'resume',
    title: 'zathura — Resume.pdf',
    appClass: 'Zathura',
    icon: '󰈙',
    workspace: 3,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 3,
    position: { x: 140, y: 50 },
    size: { width: 820, height: 620 }
  },
  about: {
    id: 'about',
    title: 'fastfetch — omarchy-system-info',
    appClass: 'About',
    icon: '󰋽',
    workspace: 1,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 12,
    position: { x: 200, y: 90 },
    size: { width: 660, height: 490 }
  },
  settings: {
    id: 'settings',
    title: 'hyprctl — settings-center',
    appClass: 'Settings',
    icon: '󰒓',
    workspace: 1,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 11,
    position: { x: 160, y: 80 },
    size: { width: 720, height: 520 }
  },
  ai: {
    id: 'ai',
    title: 'elsa-agent@omarchy:~$ (repl)',
    appClass: 'Agent',
    icon: '󰚩',
    workspace: 6,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 2,
    position: { x: 150, y: 70 },
    size: { width: 780, height: 560 }
  }
};

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export const WindowManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [openWindows, setOpenWindows] = useState<Record<WindowId, WindowMeta>>(DEFAULT_WINDOWS_META);
  const [activeWindowId, setActiveWindowId] = useState<WindowId>('terminal');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('tiling');
  const [hyprGaps, setHyprGaps] = useState(8);
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [isKeybindingsOpen, setIsKeybindingsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [desktopContextMenu, setDesktopContextMenu] = useState<{ isOpen: boolean; x: number; y: number } | null>(null);

  const [topZ, setTopZ] = useState(20);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'boot-1',
      title: 'Omarchy OS v6.12-lts',
      message: 'Hyprland 0.45.0 Wayland compositor running. Welcome, Sabareesh.',
      time: 'Just now',
      type: 'info'
    }
  ]);

  const addNotification = (title: string, message: string, type: NotificationItem['type'] = 'info') => {
    const item: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title,
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type
    };
    setNotifications(prev => [item, ...prev.slice(0, 19)]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const bringToFront = (id: WindowId) => {
    const newZ = topZ + 1;
    setTopZ(newZ);
    setActiveWindowId(id);
    setOpenWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        zIndex: newZ,
        isMinimized: false
      }
    }));
  };

  const openWindow = (id: WindowId) => {
    setShowDesktop(false);
    const newZ = topZ + 1;
    setTopZ(newZ);
    setActiveWindowId(id);
    setOpenWindows(prev => {
      const current = prev[id];
      return {
        ...prev,
        [id]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          workspace: activeWorkspace, // open on current workspace!
          zIndex: newZ
        }
      };
    });
  };

  const closeWindow = (id: WindowId) => {
    setOpenWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
  };

  const minimizeWindow = (id: WindowId) => {
    setOpenWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
  };

  const toggleMaximizeWindow = (id: WindowId) => {
    setOpenWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
    }));
  };

  const toggleLayoutMode = () => {
    setLayoutMode(prev => (prev === 'tiling' ? 'floating' : 'tiling'));
  };

  const toggleShowDesktop = () => {
    setShowDesktop(prev => !prev);
  };

  const lockScreen = () => {
    setIsLocked(true);
  };

  const unlockScreen = () => {
    setIsLocked(false);
  };

  const openDesktopContextMenu = (x: number, y: number) => {
    setDesktopContextMenu({ isOpen: true, x, y });
  };

  const closeDesktopContextMenu = () => {
    setDesktopContextMenu(null);
  };

  // Close context menu on global click
  useEffect(() => {
    const handleClick = () => {
      if (desktopContextMenu?.isOpen) {
        closeDesktopContextMenu();
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [desktopContextMenu]);

  return (
    <WindowManagerContext.Provider
      value={{
        activeWorkspace,
        setActiveWorkspace,
        openWindows,
        activeWindowId,
        setActiveWindowId,
        openWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximizeWindow,
        bringToFront,
        layoutMode,
        setLayoutMode,
        toggleLayoutMode,
        hyprGaps,
        setHyprGaps,
        isLauncherOpen,
        setIsLauncherOpen,
        isKeybindingsOpen,
        setIsKeybindingsOpen,
        isLocked,
        lockScreen,
        unlockScreen,
        notifications,
        addNotification,
        dismissNotification,
        isNotificationCenterOpen,
        setIsNotificationCenterOpen,
        desktopContextMenu,
        openDesktopContextMenu,
        closeDesktopContextMenu,
        showDesktop,
        setShowDesktop,
        toggleShowDesktop
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
};

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) throw new Error('useWindowManager must be used within WindowManagerProvider');
  return context;
};
