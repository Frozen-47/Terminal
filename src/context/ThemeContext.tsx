import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface OmarchyTheme {
  id: string;
  name: string;
  author: string;
  bg: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  borderActive: string;
  fg: string;
  fgMuted: string;
  accent: string;
  accentSecondary: string;
  success: string;
  warning: string;
  error: string;
}

export const OMARCHY_THEMES: Record<string, OmarchyTheme> = {
  'solitude': {
    id: 'solitude',
    name: 'Solitude (Default)',
    author: 'DHH',
    bg: '#000000',
    surface: '#0d1117',
    surfaceAlt: '#161b22',
    border: '#21262d',
    borderActive: '#1793d1',
    fg: '#f0f6fc',
    fgMuted: '#8b949e',
    accent: '#1793d1', // Arch Blue
    accentSecondary: '#00e5ff',
    success: '#50fa7b',
    warning: '#f1fa8c',
    error: '#ff5555'
  },
  'tokyo-night': {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    author: 'enkia',
    bg: '#1a1b26',
    surface: '#16161e',
    surfaceAlt: '#1f2335',
    border: '#292e42',
    borderActive: '#7aa2f7',
    fg: '#c0caf5',
    fgMuted: '#565f89',
    accent: '#7aa2f7',
    accentSecondary: '#bb9af7',
    success: '#9ece6a',
    warning: '#e0af68',
    error: '#f7768e'
  },
  'osaka-jade': {
    id: 'osaka-jade',
    name: 'Osaka Jade',
    author: 'Justin Lowry',
    bg: '#0a100d',
    surface: '#0f1715',
    surfaceAlt: '#15221e',
    border: '#1f332c',
    borderActive: '#2dd4bf',
    fg: '#ecfdf5',
    fgMuted: '#6ee7b7',
    accent: '#2dd4bf',
    accentSecondary: '#34d399',
    success: '#10b981',
    warning: '#fbbf24',
    error: '#f43f5e'
  },
  'everforest': {
    id: 'everforest',
    name: 'Everforest',
    author: 'sainnhe',
    bg: '#272e33',
    surface: '#1e2326',
    surfaceAlt: '#2d353b',
    border: '#414b50',
    borderActive: '#a7c080',
    fg: '#d3c6aa',
    fgMuted: '#859289',
    accent: '#a7c080',
    accentSecondary: '#7fbbb3',
    success: '#a7c080',
    warning: '#dbbc7f',
    error: '#e67e80'
  },
  'gruvbox': {
    id: 'gruvbox',
    name: 'Gruvbox Dark',
    author: 'morhetz',
    bg: '#1d2021',
    surface: '#282828',
    surfaceAlt: '#32302f',
    border: '#3c3836',
    borderActive: '#fe8019',
    fg: '#ebdbb2',
    fgMuted: '#928374',
    accent: '#fe8019',
    accentSecondary: '#fabd2f',
    success: '#b8bb26',
    warning: '#fabd2f',
    error: '#fb4934'
  },
  'nord': {
    id: 'nord',
    name: 'Nord Frost',
    author: 'Arctic Ice Studio',
    bg: '#242933',
    surface: '#2e3440',
    surfaceAlt: '#3b4252',
    border: '#434c5e',
    borderActive: '#88c0d0',
    fg: '#eceff4',
    fgMuted: '#7b88a1',
    accent: '#88c0d0',
    accentSecondary: '#81a1c1',
    success: '#a3be8c',
    warning: '#ebcb8b',
    error: '#bf616a'
  }
};

interface ThemeContextType {
  theme: OmarchyTheme;
  setThemeById: (id: string) => void;
  themesList: OmarchyTheme[];
  isThemePickerOpen: boolean;
  setIsThemePickerOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('omarchy_theme') || 'solitude';
    }
    return 'solitude';
  });

  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);

  const theme = OMARCHY_THEMES[themeId] || OMARCHY_THEMES.solitude;

  const setThemeById = (id: string) => {
    if (OMARCHY_THEMES[id]) {
      setThemeId(id);
      localStorage.setItem('omarchy_theme', id);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--term-bg', theme.bg);
    root.style.setProperty('--term-fg', theme.fg);
    root.style.setProperty('--term-border', theme.border);
    root.style.setProperty('--term-border-active', theme.borderActive);
    root.style.setProperty('--term-accent', theme.accent);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setThemeById,
        themesList: Object.values(OMARCHY_THEMES),
        isThemePickerOpen,
        setIsThemePickerOpen
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useOmarchyTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useOmarchyTheme must be used within ThemeProvider');
  return context;
};
