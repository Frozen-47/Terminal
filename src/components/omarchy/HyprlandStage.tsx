import React, { useState, useRef } from 'react';
import { useOmarchyTheme } from '../../context/ThemeContext';
import { useWindowManager, WindowId, WindowMeta } from '../../context/WindowManagerContext';
import { LanguageCode } from '../../translations';

// Views
import TerminalConsole from '../TerminalConsole';
import { FileManagerView } from '../views/FileManagerView';
import { ProjectsView } from '../views/ProjectsView';
import { ExperienceView } from '../views/ExperienceView';
import { SkillsView } from '../views/SkillsView';
import { MusicPlayerView } from '../views/MusicPlayerView';
import { CodeEditorView } from '../views/CodeEditorView';
import { ResumeView } from '../views/ResumeView';
import { AboutView } from '../views/AboutView';
import { SettingsView } from '../views/SettingsView';
import { ElsaAIView } from '../views/ElsaAIView';

// Desktop Elements
import { DesktopIcons } from './DesktopIcons';
import { DesktopContextMenu } from './DesktopContextMenu';

interface HyprlandStageProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const HyprlandStage: React.FC<HyprlandStageProps> = ({ currentLang, onLanguageChange }) => {
  const { theme } = useOmarchyTheme();
  const {
    activeWorkspace,
    openWindows,
    activeWindowId,
    setActiveWindowId,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    bringToFront,
    layoutMode,
    hyprGaps,
    openDesktopContextMenu,
    showDesktop
  } = useWindowManager();

  // Floating window dragging state
  const [dragState, setDragState] = useState<{
    id: WindowId;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const [windowPositions, setWindowPositions] = useState<Record<string, { x: number; y: number }>>({
    terminal: { x: 40, y: 30 },
    files: { x: 380, y: 60 },
    projects: { x: 70, y: 40 },
    skills: { x: 100, y: 50 },
    music: { x: 140, y: 70 },
    editor: { x: 80, y: 50 },
    resume: { x: 120, y: 60 },
    about: { x: 180, y: 80 },
    settings: { x: 160, y: 70 },
    ai: { x: 120, y: 60 }
  });

  const handleMouseDown = (id: WindowId, e: React.MouseEvent) => {
    if (layoutMode !== 'floating') return;
    bringToFront(id);
    const currentPos = windowPositions[id] || { x: 50, y: 50 };
    setDragState({
      id,
      startX: e.clientX,
      startY: e.clientY,
      origX: currentPos.x,
      origY: currentPos.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState) return;
    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;
    setWindowPositions(prev => ({
      ...prev,
      [dragState.id]: {
        x: Math.max(0, dragState.origX + dx),
        y: Math.max(0, dragState.origY + dy)
      }
    }));
  };

  const handleMouseUp = () => {
    setDragState(null);
  };

  const renderWindowContent = (id: WindowId) => {
    switch (id) {
      case 'terminal':
        return (
          <TerminalConsole
            isOpen={true}
            onClose={() => closeWindow('terminal')}
            isDark={true}
            currentLang={currentLang}
            onSetLanguage={onLanguageChange}
            isEmbedded={true}
          />
        );
      case 'files':
        return <FileManagerView />;
      case 'projects':
        return <ProjectsView currentLang={currentLang} />;
      case 'experience':
        return <ExperienceView currentLang={currentLang} isDark={true} />;
      case 'skills':
        return <SkillsView currentLang={currentLang} />;
      case 'music':
        return <MusicPlayerView />;
      case 'editor':
        return <CodeEditorView />;
      case 'resume':
        return <ResumeView />;
      case 'about':
        return <AboutView />;
      case 'settings':
        return <SettingsView />;
      case 'ai':
        return <ElsaAIView />;
      default:
        return null;
    }
  };

  // Filter windows that are open and not minimized on the current workspace (or all open if global)
  const currentWorkspaceWindows = (Object.values(openWindows) as WindowMeta[]).filter(
    w => w.isOpen && !w.isMinimized && (w.workspace === activeWorkspace || activeWorkspace === 1)
  );

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    openDesktopContextMenu(e.clientX, e.clientY);
  };

  return (
    <main
      onContextMenu={handleContextMenu}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        backgroundColor: theme.bg,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
        backgroundSize: '24px 24px',
        padding: `${hyprGaps}px`
      }}
      className="flex-1 w-full h-full relative overflow-hidden select-none"
    >
      {/* ── DESKTOP SHORTCUTS & BACKGROUND CANVAS ────────────────────────── */}
      <DesktopIcons />

      {/* Subtle Arch / Omarchy OS Center Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <div className="text-[180px] font-bold tracking-tighter text-white font-mono">
          󰣇 OMARCHY
        </div>
      </div>

      {/* ── WINDOWS MANAGER DISPLAY ──────────────────────────────────────── */}
      {!showDesktop && currentWorkspaceWindows.length > 0 && (
        <>
          {layoutMode === 'tiling' ? (
            /* ── HYPRLAND TILING COMPOSITOR (MASTER-STACK / DWINDLE) ───────── */
            <div
              style={{ gap: `${hyprGaps}px` }}
              className="w-full h-full flex flex-col md:flex-row relative z-10 overflow-hidden"
            >
              {currentWorkspaceWindows.length === 1 ? (
                /* Single Full Window */
                <TiledWindow
                  win={currentWorkspaceWindows[0]}
                  isActive={activeWindowId === currentWorkspaceWindows[0].id}
                  theme={theme}
                  onFocus={() => bringToFront(currentWorkspaceWindows[0].id)}
                  onMinimize={() => minimizeWindow(currentWorkspaceWindows[0].id)}
                  onMaximize={() => toggleMaximizeWindow(currentWorkspaceWindows[0].id)}
                  onClose={() => closeWindow(currentWorkspaceWindows[0].id)}
                >
                  {renderWindowContent(currentWorkspaceWindows[0].id)}
                </TiledWindow>
              ) : currentWorkspaceWindows.length === 2 ? (
                /* Two Windows: 50% Master / 50% Stack */
                <>
                  <div className="w-full md:w-1/2 h-full flex flex-col">
                    <TiledWindow
                      win={currentWorkspaceWindows[0]}
                      isActive={activeWindowId === currentWorkspaceWindows[0].id}
                      theme={theme}
                      onFocus={() => bringToFront(currentWorkspaceWindows[0].id)}
                      onMinimize={() => minimizeWindow(currentWorkspaceWindows[0].id)}
                      onMaximize={() => toggleMaximizeWindow(currentWorkspaceWindows[0].id)}
                      onClose={() => closeWindow(currentWorkspaceWindows[0].id)}
                    >
                      {renderWindowContent(currentWorkspaceWindows[0].id)}
                    </TiledWindow>
                  </div>
                  <div className="w-full md:w-1/2 h-full flex flex-col">
                    <TiledWindow
                      win={currentWorkspaceWindows[1]}
                      isActive={activeWindowId === currentWorkspaceWindows[1].id}
                      theme={theme}
                      onFocus={() => bringToFront(currentWorkspaceWindows[1].id)}
                      onMinimize={() => minimizeWindow(currentWorkspaceWindows[1].id)}
                      onMaximize={() => toggleMaximizeWindow(currentWorkspaceWindows[1].id)}
                      onClose={() => closeWindow(currentWorkspaceWindows[1].id)}
                    >
                      {renderWindowContent(currentWorkspaceWindows[1].id)}
                    </TiledWindow>
                  </div>
                </>
              ) : (
                /* 3+ Windows: Master (Left 50%), Stack (Right Column) */
                <>
                  <div className="w-full md:w-1/2 h-full flex flex-col">
                    <TiledWindow
                      win={currentWorkspaceWindows[0]}
                      isActive={activeWindowId === currentWorkspaceWindows[0].id}
                      theme={theme}
                      onFocus={() => bringToFront(currentWorkspaceWindows[0].id)}
                      onMinimize={() => minimizeWindow(currentWorkspaceWindows[0].id)}
                      onMaximize={() => toggleMaximizeWindow(currentWorkspaceWindows[0].id)}
                      onClose={() => closeWindow(currentWorkspaceWindows[0].id)}
                    >
                      {renderWindowContent(currentWorkspaceWindows[0].id)}
                    </TiledWindow>
                  </div>
                  <div
                    style={{ gap: `${hyprGaps}px` }}
                    className="w-full md:w-1/2 h-full flex flex-col"
                  >
                    {currentWorkspaceWindows.slice(1).map(w => (
                      <div key={w.id} className="flex-1 min-h-0 flex flex-col">
                        <TiledWindow
                          win={w}
                          isActive={activeWindowId === w.id}
                          theme={theme}
                          onFocus={() => bringToFront(w.id)}
                          onMinimize={() => minimizeWindow(w.id)}
                          onMaximize={() => toggleMaximizeWindow(w.id)}
                          onClose={() => closeWindow(w.id)}
                        >
                          {renderWindowContent(w.id)}
                        </TiledWindow>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            /* ── FLOATING DESKTOP WINDOWS (DRAGGABLE / RESIZABLE) ─────────── */
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              {currentWorkspaceWindows.map(w => {
                const pos = windowPositions[w.id] || { x: 60, y: 40 };
                const isMax = w.isMaximized;
                const isFocus = activeWindowId === w.id;

                return (
                  <div
                    key={w.id}
                    onClick={() => bringToFront(w.id)}
                    style={{
                      top: isMax ? 0 : `${pos.y}px`,
                      left: isMax ? 0 : `${pos.x}px`,
                      width: isMax ? '100%' : `${w.size.width}px`,
                      height: isMax ? '100%' : `${w.size.height}px`,
                      zIndex: isFocus ? 40 : w.zIndex,
                      borderColor: isFocus ? theme.borderActive : theme.border,
                      backgroundColor: theme.surface
                    }}
                    className={`pointer-events-auto absolute border-2 flex flex-col shadow-2xl transition-none ${
                      isMax ? 'inset-0' : 'max-w-[95vw] max-h-[90vh]'
                    }`}
                  >
                    {/* Window Title Bar */}
                    <div
                      onMouseDown={e => handleMouseDown(w.id, e)}
                      style={{
                        backgroundColor: theme.surfaceAlt,
                        borderColor: theme.border,
                        color: theme.fg
                      }}
                      className="h-8 border-b flex items-center justify-between px-2.5 text-xs font-mono shrink-0 select-none cursor-move"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span style={{ color: theme.accent }} className="font-bold text-xs">
                          {w.icon || '󰣇'}
                        </span>
                        <span className="font-bold text-white text-[11px] truncate">
                          {w.title}
                        </span>
                      </div>

                      <div className="flex items-center text-[#8b949e] text-[11px] gap-1 shrink-0">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            minimizeWindow(w.id);
                          }}
                          className="px-1 hover:text-white cursor-pointer"
                          title="Minimize"
                        >
                          [ — ]
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            toggleMaximizeWindow(w.id);
                          }}
                          className="px-1 hover:text-white cursor-pointer"
                          title="Maximize"
                        >
                          [ ▢ ]
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            closeWindow(w.id);
                          }}
                          className="px-1 hover:text-red-400 cursor-pointer"
                          title="Close"
                        >
                          [ ✕ ]
                        </button>
                      </div>
                    </div>

                    {/* Window Interior Content */}
                    <div className="flex-1 overflow-hidden">
                      {renderWindowContent(w.id)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ── DESKTOP CONTEXT MENU ─────────────────────────────────────────── */}
      <DesktopContextMenu />
    </main>
  );
};

/* ── REUSABLE TILED HYPRLAND WINDOW WRAPPER ──────────────────────────────── */
interface TiledWindowProps {
  win: WindowMeta;
  isActive: boolean;
  theme: any;
  onFocus: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  children: React.ReactNode;
}

const TiledWindow: React.FC<TiledWindowProps> = ({
  win,
  isActive,
  theme,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
  children
}) => {
  return (
    <div
      onClick={onFocus}
      style={{
        borderColor: isActive ? theme.borderActive : theme.border,
        backgroundColor: theme.surface
      }}
      className={`w-full h-full border-2 flex flex-col overflow-hidden transition-none ${
        isActive ? 'ring-1 ring-white/10' : ''
      }`}
    >
      {/* Title Bar */}
      <div
        style={{
          backgroundColor: theme.surfaceAlt,
          borderColor: theme.border,
          color: theme.fg
        }}
        className="h-7 border-b flex items-center justify-between px-2.5 text-xs font-mono shrink-0 select-none"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span style={{ color: theme.accent }} className="font-bold text-xs">
            {win.icon || '󰣇'}
          </span>
          <span className="font-bold text-white text-[11px] truncate">
            {win.title}
          </span>
        </div>

        <div className="flex items-center text-[#8b949e] text-[11px] gap-1 shrink-0">
          <button
            onClick={e => {
              e.stopPropagation();
              onMinimize();
            }}
            className="px-1 hover:text-white cursor-pointer"
            title="Minimize"
          >
            [ — ]
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              onMaximize();
            }}
            className="px-1 hover:text-white cursor-pointer"
            title="Maximize (Super+F)"
          >
            [ ▢ ]
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              onClose();
            }}
            className="px-1 hover:text-red-400 cursor-pointer"
            title="Close (Super+W)"
          >
            [ ✕ ]
          </button>
        </div>
      </div>

      {/* Interior */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
};
