import React, { useState, useEffect, useRef } from 'react';
import { useTerminal } from './useTerminal';
import type { LogLine } from './useTerminal';
import type { LanguageCode } from '../translations';

export interface TerminalConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onSetTheme?: (mode: 'dark' | 'light' | 'toggle') => void;
  currentLang?: LanguageCode;
  onSetLanguage?: (lang: LanguageCode) => void;
  onSwitchTab?: (tab: string) => void;
  onMusicCommand?: (action: 'play' | 'pause' | 'toggle' | 'next' | 'prev' | 'shuffle') => void;
  currentTrackInfo?: { title: string; artist: string; isPlaying: boolean; trackNumber?: string };
  isEmbedded?: boolean;
}

export default function TerminalConsole({
  isOpen,
  onClose,
  isDark,
  onSetTheme,
  currentLang = 'en',
  onSetLanguage,
  onSwitchTab,
  onMusicCommand,
  currentTrackInfo,
  isEmbedded = false
}: TerminalConsoleProps) {
  const {
    input,
    setInput,
    lines,
    currentPath,
    isAiLoading,
    isAiModeActive,
    gameState,
    suggestedPrompts,
    suggestionSuffix,
    refreshSuggestedPrompts,
    runCommand,
    handleFormSubmit,
    handleKeyDown,
    handleMinimize,
    handleClose
  } = useTerminal({
    onClose,
    onSetTheme,
    isDark,
    currentLang,
    onSetLanguage,
    onSwitchTab,
    onMusicCommand,
    currentTrackInfo
  });

  const [isMaximized, setIsMaximized] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, isOpen, input]);

  // Focus input on mount/open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleContainerClick = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    inputRef.current?.focus();
  };

  const renderClickableText = (text: string) => {
    const linkRegex = /(https?:\/\/[^\s]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const parts = text.split(linkRegex);
    if (parts.length === 1) return text;

    return parts.map((part, i) => {
      if (!part) return null;
      if (part.startsWith('http://') || part.startsWith('https://')) {
        let cleanUrl = part;
        let trailing = '';
        while (cleanUrl.length > 0 && [')', ']', '.', ',', '?', '!', ';', ':', '"', "'", '>', '<'].includes(cleanUrl[cleanUrl.length - 1])) {
          trailing = cleanUrl[cleanUrl.length - 1] + trailing;
          cleanUrl = cleanUrl.slice(0, -1);
        }
        return (
          <React.Fragment key={i}>
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#1793d1] hover:text-[#50fa7b] underline cursor-pointer font-bold"
            >
              {cleanUrl}
            </a>
            {trailing}
          </React.Fragment>
        );
      }
      if (part.includes('@') && !part.includes(' ')) {
        return (
          <a
            key={i}
            href={`mailto:${part}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[#1793d1] hover:text-[#50fa7b] underline cursor-pointer font-bold"
          >
            {part}
          </a>
        );
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  };

  if (!isOpen) return null;

  const SHORTCUT_COMMANDS = [
    'neofetch', 'about', 'skills', 'projects', 'experience', 'resume', 'contact', 'music play', 'ai', 'pacman -Syu', 'game', 'clear'
  ];

  const styles = {
    chassis: 'border-[#22262e] bg-[#000000] text-[#e6edf3]',
    header: 'bg-[#0d1117] border-b border-[#22262e] text-[#e6edf3]',
    title: 'text-[#e6edf3] font-mono font-bold text-xs',
    inputLine: 'text-[#ffffff] font-mono font-bold',
    outputLine: 'text-[#d8dee9] font-mono leading-[1.6] font-normal my-0.5',
    systemLine: 'text-[#1793d1] font-mono font-semibold leading-[1.6]',
    warningLine: 'text-[#f1fa8c] font-mono font-medium leading-[1.6]',
    highlightLine: 'text-[#00e5ff] font-mono font-semibold leading-[1.6]',
    errorLine: 'text-[#ff5555] font-mono leading-[1.6]',
    successLine: 'text-[#50fa7b] font-mono font-bold leading-[1.6]',
    bannerLine: 'text-[#1793d1] font-mono whitespace-pre text-[11px] leading-[1.1] font-bold select-text',
    footer: 'border-t border-[#22262e] bg-[#0d1117]'
  };

  return (
    <div
      onClick={handleContainerClick}
      className={`relative w-full h-full border flex flex-col font-mono text-[13px] overflow-hidden ${styles.chassis}`}
    >
      {/* ── SOLID ARCH LINUX WINDOW HEADER ─────────────────────────────────── */}
      <div 
        ref={headerRef}
        className={`flex items-center justify-between px-3 h-8 select-none z-10 ${styles.header}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-[#1793d1] font-bold text-sm">󰣇</span>
          <span className="text-xs text-[#e6edf3] font-mono font-bold tracking-tight">
            {isAiModeActive ? 'frozen@archlinux: ~ (elsa-ai)' : 'frozen@archlinux: ~ (zsh)'}
          </span>
          <span className="text-[10px] text-[#6e7681] font-mono hidden sm:inline">
            tty1 · 80x24
          </span>
        </div>

        {/* Flat Terminal Window Action Buttons */}
        <div className="flex items-center h-full select-none text-[#8b949e] font-mono text-xs">
          <button 
            onClick={(e) => { e.stopPropagation(); handleMinimize(); }}
            className="px-2.5 h-full hover:bg-[#21262d] hover:text-white transition-none cursor-pointer"
            title="Minimize"
          >
            [ - ]
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
            className="px-2.5 h-full hover:bg-[#21262d] hover:text-white transition-none cursor-pointer"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            [ ▢ ]
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            className="px-3 h-full hover:bg-[#da3633] hover:text-white transition-none cursor-pointer"
            title="Close"
          >
            [ ✕ ]
          </button>
        </div>
      </div>

      {/* ── TERMINAL LOGS OUTPUT AREA ──────────────────────────────────────── */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 md:p-5 space-y-1.5 select-text bg-[#000000]"
      >
        {lines.map((line, idx) => {
          if (line.type === 'banner') {
            return (
              <div key={idx} className={styles.bannerLine}>
                {line.text}
              </div>
            );
          }

          if (line.type === 'input') {
            return (
              <div key={idx} className="whitespace-pre-wrap font-mono select-text leading-relaxed text-[13px] text-white font-bold mt-2 pt-0.5">
                {line.text}
              </div>
            );
          }

          if (line.text.startsWith('[IMG]') && line.text.endsWith('[/IMG]')) {
            const imgUrl = line.text.slice(5, -6);
            return (
              <div key={idx} className="my-2 select-none">
                <div className="inline-block p-1 bg-white border border-[#22262e]">
                  <img src={imgUrl} alt="Terminal QR" className="w-32 h-32 object-contain" />
                </div>
              </div>
            );
          }

          const lineClass = {
            input: styles.inputLine,
            output: styles.outputLine,
            error: styles.errorLine,
            success: styles.successLine,
            system: styles.systemLine,
            warning: styles.warningLine,
            highlight: styles.highlightLine
          }[line.type as Exclude<LogLine['type'], 'banner'>];

          return (
            <div key={idx} className={`${lineClass} whitespace-pre-wrap font-mono text-[13px]`}>
              {renderClickableText(line.text)}
            </div>
          );
        })}

        {/* Active Input Prompt */}
        <form onSubmit={handleFormSubmit} className="flex items-center gap-1.5 mt-2 pt-1">
          <span className="select-none flex-shrink-0 font-mono text-[13px]">
            <span className="text-[#6272a4]">[</span>
            <span className="text-[#50fa7b] font-bold">frozen@archlinux</span>
            <span className="text-[#6272a4] mx-1"> </span>
            <span className="text-[#1793d1] font-bold">~{currentPath.length > 0 ? '/' + currentPath.join('/') : ''}</span>
            {isAiModeActive && <span className="text-[#00e5ff] font-semibold"> (elsa)</span>}
            {gameState?.isActive && <span className="text-[#f1fa8c] font-semibold"> (decrypt)</span>}
            <span className="text-[#6272a4]">]</span>
            <span className="text-[#e6edf3] font-bold">$ </span>
          </span>

          <div className="relative flex-1 flex items-center min-w-0 font-mono text-[13px]">
            {suggestionSuffix && !isAiLoading && (
              <div aria-hidden="true" className="absolute inset-0 flex items-center pointer-events-none select-none whitespace-pre overflow-hidden font-mono text-[13px]">
                <span className="opacity-0">{input}</span>
                <span className="text-[#484f58] font-normal">{suggestionSuffix}</span>
              </div>
            )}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isAiLoading}
              placeholder={isAiLoading ? "executing..." : isAiModeActive ? "query elsa ai..." : "type command (e.g. 'help', 'neofetch')..."}
              className="w-full bg-transparent border-none outline-none font-mono text-[13px] text-white placeholder:text-[#30363d] caret-[#1793d1] font-bold"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        </form>
      </div>

      {/* ── SOLID SHORTCUT BUTTONS BAR ─────────────────────────────────────── */}
      <div className={`p-2 select-none border-t border-[#22262e] bg-[#0d1117] flex items-center gap-1.5 overflow-x-auto shrink-0 [&::-webkit-scrollbar]:hidden`}>
        <span className="text-[#6e7681] text-[10px] font-mono font-bold uppercase tracking-wider pr-1 shrink-0">
          CMD:
        </span>
        {SHORTCUT_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              runCommand(cmd);
            }}
            className="px-2 py-0.5 text-[11px] font-mono bg-[#161b22] hover:bg-[#21262d] text-[#c9d1d9] hover:text-[#50fa7b] border border-[#30363d] hover:border-[#1793d1] transition-none cursor-pointer shrink-0"
          >
            [ {cmd} ]
          </button>
        ))}
      </div>
    </div>
  );
}