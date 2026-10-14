import React from 'react';
import { useOmarchyTheme, OMARCHY_THEMES } from '../../context/ThemeContext';
import { useWindowManager } from '../../context/WindowManagerContext';
import { useAudioPlayer } from '../../context/AudioContext';
import { Palette, Layout, Volume2, Monitor, Check } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { theme, setThemeById } = useOmarchyTheme();
  const {
    layoutMode,
    setLayoutMode,
    hyprGaps,
    setHyprGaps,
    addNotification
  } = useWindowManager();

  const { volume, setVolume, isMuted, toggleMute } = useAudioPlayer();

  const handleThemeChange = (id: string, name: string) => {
    setThemeById(id);
    addNotification('Theme Changed', `Switched to ${name} palette`, 'info');
  };

  return (
    <div
      style={{ backgroundColor: theme.surface, color: theme.fg }}
      className="w-full h-full p-4 sm:p-6 font-mono text-xs overflow-y-auto select-none space-y-6"
    >
      {/* ── APPEARANCE: OMARCHY DARK THEMES ──────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 mb-3 pb-1 border-b border-zinc-800">
          <Palette className="w-4 h-4" style={{ color: theme.accent }} />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Omarchy Visual Themes (Solid Dark Palettes)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {Object.values(OMARCHY_THEMES).map(t => {
            const isSelected = theme.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => handleThemeChange(t.id, t.name)}
                style={{
                  backgroundColor: t.surface,
                  borderColor: isSelected ? theme.borderActive : t.border
                }}
                className={`p-3 border-2 cursor-pointer transition-none relative ${
                  isSelected ? 'ring-1 ring-white/20' : 'hover:border-zinc-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-xs">{t.name}</span>
                  {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                </div>

                <div className="text-[10px] text-zinc-500 mb-2">By {t.author}</div>

                {/* Color swatches */}
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 border border-zinc-700" style={{ backgroundColor: t.bg }} title="Background" />
                  <div className="w-4 h-4 border border-zinc-700" style={{ backgroundColor: t.surfaceAlt }} title="Surface" />
                  <div className="w-4 h-4 border border-zinc-700" style={{ backgroundColor: t.accent }} title="Accent" />
                  <div className="w-4 h-4 border border-zinc-700" style={{ backgroundColor: t.success }} title="Success" />
                  <div className="w-4 h-4 border border-zinc-700" style={{ backgroundColor: t.borderActive }} title="Border" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── HYPRLAND WINDOW MANAGER OPTIONS ───────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 mb-3 pb-1 border-b border-zinc-800">
          <Layout className="w-4 h-4" style={{ color: theme.accent }} />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Hyprland Compositor & Tiling Options
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Layout Mode */}
          <div
            style={{ backgroundColor: theme.surfaceAlt, borderColor: theme.border }}
            className="p-3.5 border space-y-2.5"
          >
            <div className="text-white font-bold text-xs">Window Layout Mode</div>
            <p className="text-zinc-400 text-[11px]">
              Switch between authentic Hyprland automatic tiling or classic floating desktop windows.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  setLayoutMode('tiling');
                  addNotification('Layout Mode', 'Switched to Hyprland Tiling layout');
                }}
                style={{
                  backgroundColor: layoutMode === 'tiling' ? theme.accent : 'transparent',
                  color: layoutMode === 'tiling' ? '#000000' : theme.fg,
                  borderColor: theme.border
                }}
                className="flex-1 py-1.5 border text-center font-bold cursor-pointer"
              >
                [ Tiling (Master-Stack) ]
              </button>
              <button
                onClick={() => {
                  setLayoutMode('floating');
                  addNotification('Layout Mode', 'Switched to Floating Windows layout');
                }}
                style={{
                  backgroundColor: layoutMode === 'floating' ? theme.accent : 'transparent',
                  color: layoutMode === 'floating' ? '#000000' : theme.fg,
                  borderColor: theme.border
                }}
                className="flex-1 py-1.5 border text-center font-bold cursor-pointer"
              >
                [ Floating Desktop ]
              </button>
            </div>
          </div>

          {/* Hyprland Gaps */}
          <div
            style={{ backgroundColor: theme.surfaceAlt, borderColor: theme.border }}
            className="p-3.5 border space-y-2.5"
          >
            <div className="flex justify-between items-center text-white font-bold text-xs">
              <span>Hyprland Gaps Size</span>
              <span style={{ color: theme.accent }}>{hyprGaps}px</span>
            </div>
            <p className="text-zinc-400 text-[11px]">
              Distance in pixels between adjacent tiled windows and desktop screen edges.
            </p>
            <div className="flex gap-1.5 pt-1">
              {[0, 4, 8, 12, 16].map(g => (
                <button
                  key={g}
                  onClick={() => setHyprGaps(g)}
                  style={{
                    backgroundColor: hyprGaps === g ? theme.accent : 'transparent',
                    color: hyprGaps === g ? '#000000' : theme.fg,
                    borderColor: theme.border
                  }}
                  className="flex-1 py-1 border text-center font-bold text-[11px] cursor-pointer"
                >
                  {g}px
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AUDIO & SOUNDTRACK ────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 mb-3 pb-1 border-b border-zinc-800">
          <Volume2 className="w-4 h-4" style={{ color: theme.accent }} />
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">
            Audio System (Death Note OST Daemon)
          </h2>
        </div>

        <div
          style={{ backgroundColor: theme.surfaceAlt, borderColor: theme.border }}
          className="p-3.5 border flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="text-white font-bold text-xs">Master Output Volume</div>
            <div className="text-zinc-400 text-[11px]">
              High fidelity audio playback streamed via HTML5 WebAudio player.
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-64">
            <button
              onClick={toggleMute}
              style={{ borderColor: theme.border, backgroundColor: theme.surface }}
              className="px-2 py-1 border text-zinc-300 hover:text-white cursor-pointer"
            >
              {isMuted ? 'UNMUTE' : 'MUTE'}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <span className="w-10 text-right text-zinc-400 font-mono">
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
