import React, { useState, useRef, useCallback, useEffect } from 'react';
import { askAI } from '../ai';
import type { ChatMessage } from '../ai';
import welcomeBanner from '../assets/banner.txt?raw';
import { getNodeAtPath, getDirContentsAtPath, resolvePath, VIRTUAL_FS } from './terminalFS';
import type { VirtualFile, VirtualDirectory } from './terminalFS';
import { MAX_MESSAGES, getRandomPrompts } from './utils';
import { PINNED_PROJECTS } from '../constants';
import { TRANSLATIONS, LanguageCode, LANGUAGES } from '../translations';
import { DEATH_NOTE_TRACKS } from '../data/deathNoteTracks';

import {
  getSecretsMenu,
  fetchPublicIP,
  fetchWeather,
  fetchJoke,
  fetchAdvice,
  fetchCatFact,
  fetchSpaceInfo,
  generateQR,
  getWhoInfo
} from './secretCommands';
import { printConsoleEasterEgg, getSessionPasskey } from './devPasskey';

export interface LogLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system' | 'banner' | 'warning' | 'highlight';
}

const BANNER_LOG_LINES: LogLine[] = welcomeBanner.split('\n').map((line: string) => ({
  text: line.replace(/\r$/, ''),
  type: 'banner'
}));

const getInitialLines = (): LogLine[] => {
  const loginTime = new Date().toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return [
    { text: `Linux archlinux 6.11.2-arch1-1-frozenn #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux`, type: "system" },
    { text: `Last login: ${loginTime} on tty1`, type: "system" },
    { text: "", type: "output" },
    ...BANNER_LOG_LINES,
    { text: "", type: "output" },
    { text: "Sabareesh GanesaMoorthi (Frozen) — Systems & Software Developer", type: "success" },
    { text: "Type 'neofetch' for system info, 'projects' for builds, 'skills' for stack, or 'help' for manual.", type: "output" },
    { text: "Terminal prompt active. Type 'ai' for Elsa AI shell, 'game' for decryption challenge.", type: "highlight" },
    { text: "", type: "output" }
  ];
};

const konamiCode = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export interface UseTerminalProps {
  onClose: () => void;
  onSetTheme?: (mode: 'dark' | 'light' | 'toggle') => void;
  isDark?: boolean;
  currentLang?: LanguageCode;
  onSetLanguage?: (lang: LanguageCode) => void;
  onSwitchTab?: (tab: string) => void;
  onMusicCommand?: (action: 'play' | 'pause' | 'toggle' | 'next' | 'prev' | 'shuffle') => void;
  currentTrackInfo?: { title: string; artist: string; isPlaying: boolean; trackNumber?: string };
}

export function useTerminal({
  onClose,
  currentLang = 'en',
  onSetLanguage,
  onSwitchTab,
  onMusicCommand,
  currentTrackInfo
}: UseTerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState<LogLine[]>(getInitialLines);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [aiHistory, setAiHistory] = useState<ChatMessage[]>([]);
  const [isAiModeActive, setIsAiModeActive] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);
  const [sessionStartTime] = useState<number>(Date.now());
  const [gameState, setGameState] = useState<{
    isActive: boolean;
    targetBinary: string;
    targetDecimal: number;
    attempts: number;
  } | null>(null);

  const konamiIndexRef = useRef(0);

  useEffect(() => {
    printConsoleEasterEgg();
  }, []);

  const handleMinimize = () => {
    onClose();
  };

  const handleClose = () => {
    setLines(getInitialLines());
    setIsAiModeActive(false);
    setIsAiLoading(false);
    setGameState(null);
    setInput('');
    setHistory([]);
    setHistoryIndex(-1);
    setAiHistory([]);
    setCurrentPath([]);
    onClose();
  };

  const startNewGame = () => {
    const randomNum = Math.floor(Math.random() * 256);
    const binary = randomNum.toString(2).padStart(8, '0');
    setGameState({
      isActive: true,
      targetBinary: binary,
      targetDecimal: randomNum,
      attempts: 0
    });
    return [
      { text: "┌──[ CYBERSECURITY DECRYPTION SANDBOX ]──────────────────────────────────┐", type: "system" as const },
      { text: "│ Challenge: Translate the raw 8-bit binary register into decimal integer. │", type: "output" as const },
      { text: `│ TARGET REGISTER : [ ${binary} ]                                              │`, type: "system" as const },
      { text: "│ Input decimal value below (0-255), or type 'quit' to abort.              │", type: "output" as const },
      { text: "└──────────────────────────────────────────────────────────────────────────┘", type: "system" as const }
    ];
  };

  const queryAI = async (queryText: string) => {
    setIsAiLoading(true);
    setLines(prev => [...prev, { text: "elsa: thinking...", type: "system" }]);

    try {
      const reply = await askAI({ message: queryText, history: aiHistory });
      
      setLines(prev => {
        const filtered = prev.filter(line => line.text !== "elsa: thinking...");
        return [...filtered, { text: reply, type: "output" }];
      });

      setAiHistory(prev => {
        const nextHistory: ChatMessage[] = [
          ...prev,
          { role: 'user', text: queryText },
          { role: 'ai', text: reply }
        ];
        if (nextHistory.length > MAX_MESSAGES) {
          return nextHistory.slice(-MAX_MESSAGES);
        }
        return nextHistory;
      });
      setSuggestedPrompts(getRandomPrompts());
    } catch {
      setLines(prev => {
        const filtered = prev.filter(line => line.text !== "elsa: thinking...");
        return [...filtered, { text: "error: failed to receive AI packet stream.", type: "error" }];
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  const renderArchNeofetch = (): LogLine[] => {
    const elapsedSeconds = Math.floor((Date.now() - sessionStartTime) / 1000);
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    const uptimeStr = `${mins}m ${secs}s`;

    return [
      { text: "                   -`                    frozen@archlinux", type: "system" },
      { text: "                  .o+`                   ----------------", type: "output" },
      { text: "                 `ooo/                   OS: Arch Linux x86_64", type: "output" },
      { text: "                `+oooo:                  Host: Sabareesh Workstation (Erode, IN)", type: "output" },
      { text: "               `+oooooo:                 Kernel: 6.11.2-arch1-1-frozenn", type: "output" },
      { text: `               -+oooooo+:                Uptime: ${uptimeStr}`, type: "output" },
      { text: "             `/:-:++oooo+:               Packages: 24 (projects), 16 (skills)", type: "output" },
      { text: "            `/++++/+++++++:              Shell: zsh 5.9 (omz)", type: "output" },
      { text: "           `/++++++++++++++:             WM: Hyprland / i3-gaps", type: "output" },
      { text: "          `/+++ooooooooooooo/`           Terminal: alacritty", type: "output" },
      { text: "         ./ooosssso++osssssso+`          CPU: AMD Ryzen 7 / Intel Core i7 @ 4.2GHz", type: "output" },
      { text: "        .oossssso-````/ossssss+`         Memory: 3.4GiB / 16.0GiB", type: "output" },
      { text: "       -osssssso.      :ssssssso.        Languages: Java, C++, Python, TypeScript", type: "output" },
      { text: "      :osssssss/        osssso+++.       Founder: DevSnapz Community Hub", type: "highlight" },
      { text: "     /ossssssss/        +ssssooo/-       GitHub: https://github.com/Frozen-47", type: "system" },
      { text: "   `/ossssso+/:-        -:/+osssso+-     Website: https://frozenn.in", type: "system" },
      { text: "  `+sso+:-`                 `.-/+oso:    Soundtrack: Death Note OST 1 & 2", type: "output" },
      { text: " `++:.                           `-/+/   Colors: [██ #1793D1] [██ #50FA7B] [██ #F1FA8C] [██ #BD93F9]", type: "system" },
      { text: " .`                                 `/", type: "system" }
    ];
  };

  const renderTree = (
    dir: Record<string, VirtualFile | VirtualDirectory>,
    prefix = ""
  ): string[] => {
    const entries = Object.keys(dir);
    const results: string[] = [];

    entries.forEach((key, index) => {
      const isLast = index === entries.length - 1;
      const item = dir[key];
      const connector = isLast ? "└── " : "├── ";
      const childPrefix = prefix + (isLast ? "    " : "│   ");

      if (item.type === 'dir') {
        results.push(`${prefix}${connector}${key}/`);
        results.push(...renderTree(item.children, childPrefix));
      } else {
        results.push(`${prefix}${connector}${key}`);
      }
    });

    return results;
  };

  const runCommand = (cmdText: string) => {
    const cmd = cmdText.trim();
    if (!cmd) return;

    // Save history
    const nextHistory = [...history, cmd];
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length);

    // Append input to logs with pure Arch prompt
    const displayPath = currentPath.length > 0 ? '~/' + currentPath.join('/') : '~';
    const subMode = isAiModeActive ? ' (elsa)' : gameState?.isActive ? ' (decrypt)' : '';
    const promptPrefix = `[frozen@archlinux ${displayPath}${subMode}]$ `;
    setLines(prev => [...prev, { text: `${promptPrefix}${cmd}`, type: 'input' }]);

    // DevTools Passkey Verification
    const activePasskey = getSessionPasskey();
    if (cmd.trim().toLowerCase() === activePasskey.toLowerCase()) {
      setLines(prev => [
        ...prev,
        { text: `[AUTH OK] Passkey [${activePasskey}] Verified!`, type: "success" },
        { text: "You solved Sabareesh's hidden DevTools security challenge.", type: "output" },
        { text: "Direct Coordinates:", type: "output" },
        { text: "  Email    : sabareeshgm47@gmail.com", type: "output" },
        { text: "  Discord  : frozen (1272910357517701147)", type: "output" },
        { text: "  GitHub   : https://github.com/Frozen-47", type: "output" },
        { text: `Mention code '${activePasskey}' in your message for priority access.`, type: "highlight" }
      ]);
      return;
    }

    // AI Chat Mode Processing
    if (isAiModeActive) {
      const lowerCmd = cmd.trim().toLowerCase();
      if (lowerCmd === 'quit' || lowerCmd === 'exit' || lowerCmd === ':q') {
        setIsAiModeActive(false);
        setLines(prev => [...prev, { text: "Session detached from Elsa AI. Back in archlinux shell.", type: "system" }]);
        return;
      }
      if (lowerCmd === 'clear' || lowerCmd === 'cls' || lowerCmd === 'clear-host') {
        setLines([]);
        return;
      }
      queryAI(cmd);
      return;
    }

    // Decryption Game Mode
    if (gameState?.isActive) {
      const lowerFirst = cmd.trim().toLowerCase().split(/\s+/)[0];
      if (['quit', 'exit', 'abort', ':q'].includes(lowerFirst)) {
        setGameState(null);
        setLines(prev => [...prev, { text: "Decryption protocol terminated.", type: "system" }]);
        return;
      }

      const guess = parseInt(cmd, 10);
      if (isNaN(guess)) {
        setLines(prev => [...prev, { text: "error: Please enter a valid decimal number (0-255).", type: "error" }]);
        return;
      }

      if (guess === gameState.targetDecimal) {
        setGameState(null);
        setLines(prev => [
          ...prev,
          { text: "ACCESS GRANTED: Cipher decrypted. Firewall sequence bypassed.", type: "success" }
        ]);
      } else {
        const nextAttempts = gameState.attempts + 1;
        if (nextAttempts >= 4) {
          const solution = gameState.targetDecimal;
          setGameState(null);
          setLines(prev => [
            ...prev,
            { text: `ACCESS DENIED: Lockout triggered. Correct decimal was ${solution}.`, type: "error" }
          ]);
        } else {
          setGameState(prev => prev ? { ...prev, attempts: nextAttempts } : null);
          setLines(prev => [
            ...prev,
            { text: `Mismatch. Attempt ${nextAttempts}/4.`, type: "error" },
            { text: `TARGET REGISTER : [ ${gameState.targetBinary} ]`, type: "system" }
          ]);
        }
      }
      return;
    }

    // Standard CLI Commands
    const cmdTokens = cmd.toLowerCase().split(/\s+/);
    const command = cmdTokens[0];
    const cmdArgs = cmdTokens.slice(1);

    switch (command) {
      case 'help':
      case 'man':
      case '?':
        setLines(prev => [
          ...prev,
          { text: "┌──[ ARCHLINUX / FROZENN SHELL COMMAND MANUAL ]────────────────────────────┐", type: "system" },
          { text: "│ PORTFOLIO COMMANDS:                                                      │", type: "highlight" },
          { text: "│   neofetch      Display Arch Linux system specs & developer profile      │", type: "output" },
          { text: "│   about         Sabareesh's background, education & systems focus        │", type: "output" },
          { text: "│   projects      List featured software builds & open-source repos        │", type: "output" },
          { text: "│   skills        Technical matrix: Languages, Core CS & Cloud             │", type: "output" },
          { text: "│   experience    Career milestones (DevSnapz Founder, Independent Dev)    │", type: "output" },
          { text: "│   contact       Direct communication lines (Email, Discord, GitHub)      │", type: "output" },
          { text: "│   resume        Open résumé PDF directly (/Resume.pdf)                   │", type: "output" },
          { text: "│                                                                          │", type: "output" },
          { text: "│ SYSTEM & TOOLS:                                                          │", type: "highlight" },
          { text: "│   music <cmd>   Death Note OST audio (play, pause, next, prev, ls, now)  │", type: "output" },
          { text: "│   ai [query]    Enter Elsa AI conversational REPL                        │", type: "output" },
          { text: "│   game          Start cybersecurity binary byte decryption challenge     │", type: "output" },
          { text: "│   pacman -Syu   Arch Linux package manager easter egg                    │", type: "output" },
          { text: "│   tree          Display virtual filesystem tree                          │", type: "output" },
          { text: "│   ls / cd / cat Navigate virtual filesystem files                        │", type: "output" },
          { text: "│   secrets       List utility easter eggs (weather, joke, advice, ip, qr) │", type: "output" },
          { text: "│   uname -a      Kernel release information                               │", type: "output" },
          { text: "│   free -h       System memory allocation                                 │", type: "output" },
          { text: "│   clear         Clear shell history                                      │", type: "output" },
          { text: "│   view <tab>    Switch TUI tab (projects, experience, skills, music, ai) │", type: "output" },
          { text: "└──────────────────────────────────────────────────────────────────────────┘", type: "system" }
        ]);
        break;

      case 'neofetch':
      case 'fastfetch':
      case 'fetch':
        setLines(prev => [...prev, ...renderArchNeofetch()]);
        break;

      case 'about':
      case 'bio':
      case 'whoami': {
        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
        setLines(prev => [
          ...prev,
          { text: "┌──[ ABOUT SABAREESH GANESAMOORTHI (FROZEN) ]──────────────────────────────┐", type: "system" },
          { text: `│ Role      : ${t.role.padEnd(60)} │`, type: "highlight" },
          { text: "│ Location  : Erode, Tamil Nadu, India                                     │", type: "output" },
          { text: "│ GitHub    : https://github.com/Frozen-47                                 │", type: "system" },
          { text: "│ Website   : https://frozenn.in                                           │", type: "system" },
          { text: "│                                                                          │", type: "output" },
          { text: "│ Systems-focused Information Technology student specializing in backend   │", type: "output" },
          { text: "│ development, clean C++ & Java architectures, Python automation, and web  │", type: "output" },
          { text: "│ systems. Founder of DevSnapz, author of 20+ open-source GitHub projects. │", type: "output" },
          { text: "│                                                                          │", type: "output" },
          { text: "│ Contact   : sabareeshgm47@gmail.com | Discord: frozen                    │", type: "success" },
          { text: "└──────────────────────────────────────────────────────────────────────────┘", type: "system" }
        ]);
        break;
      }

      case 'projects':
      case 'repos':
        setLines(prev => [
          ...prev,
          { text: "┌──[ FEATURED PROJECTS & BUILDS ]──────────────────────────────────────────┐", type: "system" },
          ...PINNED_PROJECTS.map((p, idx) => ({
            text: `│ [${idx + 1}] ${p.name.padEnd(18)} [${p.type}]  ${p.url.padEnd(41)} │\n│     ${p.description}`,
            type: "output" as const
          })),
          { text: "├──────────────────────────────────────────────────────────────────────────┤", type: "system" },
          { text: "│ View all 20+ repos on GitHub: https://github.com/Frozen-47               │", type: "success" },
          { text: "│ Tip: Type 'view projects' for interactive TUI browser.                   │", type: "system" },
          { text: "└──────────────────────────────────────────────────────────────────────────┘", type: "system" }
        ]);
        break;

      case 'skills':
      case 'matrix':
      case 'stack':
        setLines(prev => [
          ...prev,
          { text: "┌──[ TECHNICAL MATRIX & CAPABILITIES ]─────────────────────────────────────┐", type: "system" },
          { text: "│ LANGUAGES :                                                              │", type: "highlight" },
          { text: "│   Java            [██████████████████░░] 90%   Core, Backend, OOP        │", type: "output" },
          { text: "│   C & C++         [█████████████████░░░] 85%   DSA, Memory, Systems      │", type: "output" },
          { text: "│   Python          [████████████████░░░░] 80%   Automation, Scripting     │", type: "output" },
          { text: "│   HTML & CSS      [██████████████████░░] 90%   Semantic DOM, Tailwind    │", type: "output" },
          { text: "│                                                                          │", type: "output" },
          { text: "│ CORE COMPUTER SCIENCE :                                                  │", type: "highlight" },
          { text: "│   Data Structures [██████████████████░░] 90%   Trees, Graphs, Hash Maps  │", type: "output" },
          { text: "│   Algorithms      [█████████████████░░░] 85%   Sorting, DP, Complexity   │", type: "output" },
          { text: "│   Problem Solving [██████████████████░░] 90%   Algorithmic Optimization  │", type: "output" },
          { text: "│   OOPs            [██████████████████░░] 90%   Inheritance, Polymorphism │", type: "output" },
          { text: "│   Linux & Git     [█████████████████░░░] 85%   Arch, Bash, Workflows     │", type: "output" },
          { text: "│   Clerk Auth      [████████████████░░░░] 80%   Security & User Sessions  │", type: "output" },
          { text: "│                                                                          │", type: "output" },
          { text: "│ DEPLOYMENT & CLOUD :                                                     │", type: "highlight" },
          { text: "│   Vercel, Supabase, Netlify, Render, GitHub Pages                        │", type: "output" },
          { text: "└──────────────────────────────────────────────────────────────────────────┘", type: "system" }
        ]);
        break;

      case 'experience':
      case 'timeline':
      case 'work':
      case 'history': {
        const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
        const timeline = t.experienceTimeline || TRANSLATIONS.en.experienceTimeline;
        const out: LogLine[] = [
          { text: "┌──[ CAREER TIMELINE & ACHIEVEMENTS ]──────────────────────────────────────┐", type: "system" }
        ];
        timeline.forEach((item, idx) => {
          out.push({
            text: `│ * [${item.date}] ${item.title} (${item.subtitle})${item.badge ? ` [${item.badge}]` : ''}`,
            type: "highlight"
          });
          item.description.forEach(desc => {
            out.push({ text: `│   ├── ${desc}`, type: "output" });
          });
          if (idx < timeline.length - 1) {
            out.push({ text: "│   |", type: "output" });
          }
        });
        out.push({ text: "└──────────────────────────────────────────────────────────────────────────┘", type: "system" });
        setLines(prev => [...prev, ...out]);
        break;
      }

      case 'contact':
      case 'socials':
        setLines(prev => [
          ...prev,
          { text: "┌──[ CONTACT COORDINATES ]─────────────────────────────────────────────────┐", type: "system" },
          { text: "│  Email     : sabareeshgm47@gmail.com                                     │", type: "output" },
          { text: "│  Discord   : frozen (1272910357517701147)                                │", type: "output" },
          { text: "│  GitHub    : https://github.com/Frozen-47                                │", type: "output" },
          { text: "│  Website   : https://frozenn.in                                          │", type: "output" },
          { text: "│  Location  : Erode, Tamil Nadu, India                                    │", type: "output" },
          { text: "│  Status    : Open to internships, collaborations & engineering roles     │", type: "highlight" },
          { text: "└──────────────────────────────────────────────────────────────────────────┘", type: "system" }
        ]);
        break;

      case 'resume':
      case 'cv':
        if (typeof window !== 'undefined') {
          window.open('/Resume.pdf', '_blank');
        }
        setLines(prev => [
          ...prev,
          { text: "Opening résumé: /Resume.pdf (external tab)", type: "success" },
          { text: "Direct link: https://frozenn.in/Resume.pdf", type: "output" }
        ]);
        break;

      case 'music':
      case 'cmus':
      case 'ncmpcpp': {
        const subCmd = cmdArgs[0]?.toLowerCase();
        if (subCmd === 'play') {
          onMusicCommand?.('play');
          setLines(prev => [
            ...prev,
            { text: `cmus: playing track #${currentTrackInfo?.trackNumber || '04'} [${currentTrackInfo?.title || "L's Theme"}]`, type: "success" }
          ]);
        } else if (subCmd === 'pause' || subCmd === 'stop') {
          onMusicCommand?.('pause');
          setLines(prev => [...prev, { text: "cmus: playback paused.", type: "system" }]);
        } else if (subCmd === 'next') {
          onMusicCommand?.('next');
          setLines(prev => [...prev, { text: "cmus: skipped to next track.", type: "system" }]);
        } else if (subCmd === 'prev') {
          onMusicCommand?.('prev');
          setLines(prev => [...prev, { text: "cmus: returning to previous track.", type: "system" }]);
        } else if (subCmd === 'ls' || subCmd === 'list') {
          const listLogs: LogLine[] = [
            { text: "┌──[ DEATH NOTE SOUNDTRACK (SELECTION) ]───────────────────────────────────┐", type: "highlight" }
          ];
          DEATH_NOTE_TRACKS.slice(0, 10).forEach(t => {
            listLogs.push({ text: `│ [#${t.trackNumber}] ${t.title.padEnd(30)} ${t.artist.padEnd(20)} ${t.duration} │`, type: "output" });
          });
          listLogs.push({ text: `│ ... and ${DEATH_NOTE_TRACKS.length - 10} more tracks in library.                              │`, type: "system" });
          listLogs.push({ text: "└──────────────────────────────────────────────────────────────────────────┘", type: "highlight" });
          setLines(prev => [...prev, ...listLogs]);
        } else if (subCmd === 'now') {
          setLines(prev => [
            ...prev,
            { text: `cmus [${currentTrackInfo?.isPlaying ? 'PLAYING' : 'PAUSED'}]: ${currentTrackInfo?.title || "L's Theme"} - ${currentTrackInfo?.artist || "Hideki Taniuchi"}`, type: "highlight" }
          ]);
        } else {
          setLines(prev => [
            ...prev,
            { text: "cmus audio commands: music play | music pause | music next | music prev | music ls | music now", type: "system" }
          ]);
        }
        break;
      }

      case 'pacman': {
        const flag = cmdArgs.join(' ');
        if (flag.includes('-syu') || flag.includes('-s') || flag.includes('-syyu')) {
          setLines(prev => [
            ...prev,
            { text: ":: Synchronizing package databases...", type: "system" },
            { text: " core is up to date", type: "output" },
            { text: " extra is up to date", type: "output" },
            { text: " multilib is up to date", type: "output" },
            { text: ":: Starting full system upgrade...", type: "system" },
            { text: " resolving dependencies...", type: "output" },
            { text: " looking for conflicting packages...", type: "output" },
            { text: "Packages (4) java-openjdk-21  gcc-14.2  python-3.12  frozenn-terminal-2.4", type: "highlight" },
            { text: "(4/4) checking keys in keyring                     [######################] 100%", type: "output" },
            { text: "(4/4) upgrading frozenn-portfolio-system           [######################] 100%", type: "success" },
            { text: "System patched and up to date on Arch Linux rolling release.", type: "success" }
          ]);
        } else if (flag.includes('-q')) {
          setLines(prev => [
            ...prev,
            { text: "aiverse 1.0.0-1\ngrade-calculator 2.1.0-1\ndevsnapz-landing 0.9.4-1\narcticdex 1.2.0-1\nsolunar-theme 1.0.0-1\ntodo-cli 1.1.0-1\nwordsmuseum 1.0.0-1", type: "output" }
          ]);
        } else {
          setLines(prev => [
            ...prev,
            { text: "pacman: try 'pacman -Syu' to update or 'pacman -Q' to query packages.", type: "output" }
          ]);
        }
        break;
      }

      case 'uname':
        setLines(prev => [
          ...prev,
          { text: "Linux archlinux 6.11.2-arch1-1-frozenn #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux", type: "output" }
        ]);
        break;

      case 'free':
        setLines(prev => [
          ...prev,
          { text: "               total        used        free      shared  buff/cache   available", type: "system" },
          { text: "Mem:            16Gi       3.4Gi        10Gi       256Mi       2.6Gi        12Gi", type: "output" },
          { text: "Swap:          8.0Gi          0B       8.0Gi", type: "output" }
        ]);
        break;

      case 'df':
        setLines(prev => [
          ...prev,
          { text: "Filesystem      Size  Used Avail Use% Mounted on", type: "system" },
          { text: "/dev/nvme0n1p2  950G  180G  722G  20% /", type: "output" },
          { text: "/dev/nvme0n1p1  512M   45M  467M   9% /boot", type: "output" }
        ]);
        break;

      case 'hostname':
        setLines(prev => [...prev, { text: "archlinux", type: "output" }]);
        break;

      case 'arch':
        setLines(prev => [...prev, { text: "x86_64", type: "output" }]);
        break;

      case 'date':
        setLines(prev => [...prev, { text: new Date().toString(), type: "output" }]);
        break;

      case 'uptime': {
        const elapsedSeconds = Math.floor((Date.now() - sessionStartTime) / 1000);
        const mins = Math.floor(elapsedSeconds / 60);
        const secs = elapsedSeconds % 60;
        setLines(prev => [
          ...prev,
          { text: `up ${mins} minutes, ${secs} seconds, 1 user, load average: 0.12, 0.08, 0.04`, type: "output" }
        ]);
        break;
      }

      case 'echo':
        setLines(prev => [...prev, { text: cmdText.trim().substring(4).trim(), type: "output" }]);
        break;

      case 'view':
      case 'tab': {
        const targetTab = cmdArgs[0]?.toLowerCase();
        if (['projects', 'experience', 'skills', 'music', 'ai', 'terminal'].includes(targetTab)) {
          onSwitchTab?.(targetTab);
          setLines(prev => [
            ...prev,
            { text: `Switched view tab to [${targetTab}].`, type: "success" }
          ]);
        } else {
          setLines(prev => [
            ...prev,
            { text: "Available tabs: view terminal | view projects | view experience | view skills | view music | view ai", type: "output" }
          ]);
        }
        break;
      }

      case 'lang': {
        const langArg = cmdArgs[0]?.toLowerCase() as LanguageCode;
        if (langArg && ['en', 'ta', 'hi', 'es', 'de', 'ja', 'fr'].includes(langArg)) {
          onSetLanguage?.(langArg);
          const langObj = LANGUAGES.find(l => l.code === langArg);
          setLines(prev => [
            ...prev,
            { text: `Language set: ${langObj?.label} (${langObj?.nativeLabel})`, type: "success" }
          ]);
        } else {
          setLines(prev => [
            ...prev,
            { text: `Current language: ${currentLang.toUpperCase()}`, type: "highlight" },
            { text: "Options: lang en | lang ta | lang hi | lang es | lang de | lang ja | lang fr", type: "output" }
          ]);
        }
        break;
      }

      case 'ai': {
        const queryIdx = cmdText.toLowerCase().indexOf('ai');
        const query = queryIdx !== -1 ? cmdText.substring(queryIdx + 2).trim() : '';
        setSuggestedPrompts(getRandomPrompts());
        if (query) {
          queryAI(query);
        } else {
          setIsAiModeActive(true);
          setLines(prev => [
            ...prev,
            { text: "Connected to Elsa AI shell. Type question directly or 'exit' to return to bash.", type: "system" }
          ]);
        }
        break;
      }

      case 'game':
        setLines(prev => [...prev, ...startNewGame()]);
        break;

      case 'secrets':
      case 'secret':
        setLines(prev => [...prev, ...getSecretsMenu()]);
        break;

      case 'ip':
        (async () => {
          setLines(prev => [...prev, { text: "resolving ip...", type: "system" }]);
          const ipRes = await fetchPublicIP();
          setLines(prev => {
            const filtered = prev.filter(l => l.text !== "resolving ip...");
            return [...filtered, ...ipRes];
          });
        })();
        break;

      case 'weather': {
        const weatherTarget = cmdArgs.join(' ').trim();
        (async () => {
          const loadingMsg = weatherTarget
            ? `probing weather for ${weatherTarget}...`
            : "detecting coordinates...";
          setLines(prev => [...prev, { text: loadingMsg, type: "system" }]);
          const wRes = await fetchWeather(weatherTarget);
          setLines(prev => {
            const filtered = prev.filter(l => l.text !== loadingMsg);
            return [...filtered, ...wRes];
          });
        })();
        break;
      }

      case 'joke':
        (async () => {
          setLines(prev => [...prev, { text: "fetching joke...", type: "system" }]);
          const jRes = await fetchJoke();
          setLines(prev => {
            const filtered = prev.filter(l => l.text !== "fetching joke...");
            return [...filtered, ...jRes];
          });
        })();
        break;

      case 'advice':
        (async () => {
          setLines(prev => [...prev, { text: "fetching advice...", type: "system" }]);
          const aRes = await fetchAdvice();
          setLines(prev => {
            const filtered = prev.filter(l => l.text !== "fetching advice...");
            return [...filtered, ...aRes];
          });
        })();
        break;

      case 'space':
        (async () => {
          setLines(prev => [...prev, { text: "querying NASA APOD...", type: "system" }]);
          const sRes = await fetchSpaceInfo();
          setLines(prev => {
            const filtered = prev.filter(l => l.text !== "querying NASA APOD...");
            return [...filtered, ...sRes];
          });
        })();
        break;

      case 'cat': {
        const target = cmdArgs[0];
        if (target) {
          const targetPath = resolvePath(currentPath, target);
          const node = getNodeAtPath(targetPath);
          if (node) {
            if ('type' in node && node.type === 'file') {
              const fileLines = node.content.split('\n');
              setLines(prev => [
                ...prev,
                ...fileLines.map(line => ({ text: line, type: 'output' as const }))
              ]);
            } else {
              setLines(prev => [
                ...prev,
                { text: `cat: ${target}: Is a directory`, type: "error" }
              ]);
            }
            break;
          }
        }
        (async () => {
          setLines(prev => [...prev, { text: "fetching cat fact...", type: "system" }]);
          const cRes = await fetchCatFact();
          setLines(prev => {
            const filtered = prev.filter(l => l.text !== "fetching cat fact...");
            return [...filtered, ...cRes];
          });
        })();
        break;
      }

      case 'qr': {
        const qrInput = cmdText.trim().substring(2).trim();
        setLines(prev => [...prev, ...generateQR(qrInput)]);
        break;
      }

      case 'whois':
      case 'who':
        setLines(prev => [...prev, ...getWhoInfo()]);
        break;

      case 'sudo':
        setLines(prev => [
          ...prev,
          { text: "visitor is not in the sudoers file. This incident will be reported to /var/log/secure.", type: "error" }
        ]);
        break;

      case 'clear':
      case 'cls':
        setLines([]);
        break;

      case 'exit':
        handleClose();
        break;

      case 'cd': {
        const target = cmdArgs[0];
        if (!target) {
          setCurrentPath([]);
          break;
        }

        const newPath = resolvePath(currentPath, target);
        const node = getNodeAtPath(newPath);

        if (newPath.length === 0) {
          setCurrentPath([]);
          break;
        }

        if (node && 'type' in node) {
          if (node.type === 'dir') {
            setCurrentPath(newPath);
          } else {
            setLines(prev => [
              ...prev,
              { text: `cd: not a directory: ${target}`, type: "error" }
            ]);
          }
        } else if (node && !('type' in node)) {
          setCurrentPath(newPath);
        } else {
          setLines(prev => [
            ...prev,
            { text: `cd: no such file or directory: ${target}`, type: "error" }
          ]);
        }
        break;
      }

      case 'ls': {
        const target = cmdArgs.find(arg => !arg.startsWith('-'));
        const targetPath = target ? resolvePath(currentPath, target) : currentPath;
        const node = getNodeAtPath(targetPath);

        if (!node) {
          setLines(prev => [
            ...prev,
            { text: `ls: cannot access '${target || ''}': No such file or directory`, type: "error" }
          ]);
          break;
        }

        const rows: string[] = [];
        let contents: Record<string, VirtualFile | VirtualDirectory> | null = null;

        if (targetPath.length === 0 || !('type' in node)) {
          contents = node as Record<string, VirtualFile | VirtualDirectory>;
        } else if (node.type === 'dir') {
          contents = node.children;
        } else {
          const fileNode = node as VirtualFile;
          rows.push(`-rw-r--r--  1 frozen staff  ${String(fileNode.content.length).padStart(4, ' ')}  Oct 14 12:00  ${fileNode.name}`);
        }

        if (contents) {
          Object.keys(contents).forEach(name => {
            const item = contents![name];
            const isDir = item.type === 'dir';
            const permissions = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
            const size = isDir ? '4096' : String(item.content.length).padStart(4, ' ');
            rows.push(`${permissions}  1 frozen staff  ${size}  Oct 14 12:00  ${name}${isDir ? '/' : ''}`);
          });
        }

        setLines(prev => [
          ...prev,
          ...rows.map(row => ({ text: row, type: "output" as const }))
        ]);
        break;
      }

      case 'tree': {
        const treeLines = renderTree(VIRTUAL_FS);
        setLines(prev => [
          ...prev,
          { text: ".", type: "system" },
          ...treeLines.map(t => ({ text: t, type: "output" as const }))
        ]);
        break;
      }

      case 'pwd': {
        const currentPathStr = currentPath.length > 0 ? '/' + currentPath.join('/') : '';
        setLines(prev => [
          ...prev,
          { text: `/home/frozen${currentPathStr}`, type: "output" }
        ]);
        break;
      }

      default:
        setLines(prev => [
          ...prev,
          { text: `zsh: command not found: ${command}. Type 'help' for manual.`, type: "error" }
        ]);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;
    runCommand(cmd);
    setInput('');
  };

  const PRIMARY_COMMANDS = [
    'help', 'neofetch', 'about', 'skills', 'projects', 'experience', 'contact',
    'resume', 'music', 'cmus', 'pacman', 'uname', 'free', 'df', 'ai', 'lang', 'view', 'game', 'secrets',
    'ls', 'cd', 'cat', 'pwd', 'tree', 'echo', 'date', 'uptime', 'clear', 'exit'
  ];

  const suggestionSuffix = React.useMemo(() => {
    if (isAiLoading) return '';
    const trimmed = input.trimStart();
    if (!trimmed) return '';

    const parts = trimmed.split(/\s+/);
    if (parts.length === 1) {
      const prefix = parts[0].toLowerCase();
      const match = PRIMARY_COMMANDS.find(c => c.startsWith(prefix) && c !== prefix);
      if (match) {
        return match.slice(prefix.length);
      }
    }
    return '';
  }, [input, isAiLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Check Konami Code
    const key = e.key;
    const expectedKey = konamiCode[konamiIndexRef.current];
    if (key.toLowerCase() === expectedKey.toLowerCase()) {
      konamiIndexRef.current += 1;
      if (konamiIndexRef.current === konamiCode.length) {
        konamiIndexRef.current = 0;
        setInput('');
        setHistoryIndex(history.length);
        setLines(prev => [
          ...prev,
          { text: "KONAMI CODE DETECTED — ROOT ACCESS EMULATED", type: 'success' },
          { text: "Cheat enabled. Arch Linux privileges elevated. Try 'pacman -Syu' or 'neofetch'.", type: 'output' }
        ]);
        return;
      }
    } else {
      konamiIndexRef.current = key === 'ArrowUp' ? 1 : 0;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setLines([]);
      return;
    }

    if (e.key === 'Tab' || (e.key === 'ArrowRight' && e.currentTarget.selectionStart === input.length)) {
      if (suggestionSuffix) {
        e.preventDefault();
        setInput(input + suggestionSuffix + ' ');
        return;
      }
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const trimmed = input.trimStart();
      if (!trimmed) return;
      const parts = trimmed.split(/\s+/);
      if (parts.length === 1) {
        const prefix = parts[0].toLowerCase();
        const matches = PRIMARY_COMMANDS.filter(c => c.startsWith(prefix));
        if (matches.length === 1) {
          setInput(matches[0] + ' ');
        } else if (matches.length > 1) {
          setLines(prev => [
            ...prev,
            { text: `[frozen@archlinux ~]$ ${input}`, type: 'input' },
            { text: matches.join('   '), type: 'output' }
          ]);
        }
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const targetIndex = (historyIndex === -1 || historyIndex >= history.length)
        ? history.length - 1
        : Math.max(0, historyIndex - 1);
      setHistoryIndex(targetIndex);
      setInput(history[targetIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0) return;
      if (historyIndex < history.length - 1) {
        const targetIndex = historyIndex + 1;
        setHistoryIndex(targetIndex);
        setInput(history[targetIndex]);
      } else {
        setHistoryIndex(history.length);
        setInput('');
      }
    }
  };

  return {
    input,
    setInput,
    history,
    lines,
    setLines,
    currentPath,
    isAiLoading,
    isAiModeActive,
    gameState,
    suggestedPrompts,
    suggestionSuffix,
    refreshSuggestedPrompts: () => setSuggestedPrompts(getRandomPrompts()),
    runCommand,
    handleFormSubmit,
    handleKeyDown,
    handleMinimize,
    handleClose
  };
}
