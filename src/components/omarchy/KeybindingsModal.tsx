import React from 'react';
import { useOmarchyTheme } from '../../context/ThemeContext';
import { useWindowManager } from '../../context/WindowManagerContext';

export const KeybindingsModal: React.FC = () => {
  const { theme } = useOmarchyTheme();
  const { isKeybindingsOpen, setIsKeybindingsOpen } = useWindowManager();

  if (!isKeybindingsOpen) return null;

  const sections = [
    {
      title: 'WINDOW MANAGEMENT & DESKTOP (HYPRLAND)',
      bindings: [
        { key: 'Super + Return', desc: 'Focus / Launch Alacritty Terminal' },
        { key: 'Super + E', desc: 'Open Omarchy Files (Thunar)' },
        { key: 'Super + W', desc: 'Close active window' },
        { key: 'Super + F', desc: 'Toggle fullscreen active window' },
        { key: 'Super + V', desc: 'Toggle Tiling vs Floating Desktop layout' },
        { key: 'Super + D', desc: 'Show desktop / toggle all windows' },
        { key: 'Super + L', desc: 'Lock workstation desktop (hyprlock)' }
      ]
    },
    {
      title: 'SYSTEM & MENUS (QUICKSHELL / WALKER)',
      bindings: [
        { key: 'Super + Space', desc: 'Open Omarchy Application Launcher (Walker)' },
        { key: 'Super + K', desc: 'Display this keybindings cheat sheet' },
        { key: 'Super + T', desc: 'Open Omarchy Theme Selector' },
        { key: 'Super + 1..6', desc: 'Switch directly to workspace 1 through 6' },
        { key: 'Right Click', desc: 'Open Omarchy Desktop Context Menu' }
      ]
    },
    {
      title: 'MEDIA & TERMINAL COMMANDS',
      bindings: [
        { key: 'music play/pause', desc: 'Control Death Note OST playback in terminal' },
        { key: 'music next/prev', desc: 'Skip or return to soundtrack tracks' },
        { key: 'files', desc: 'Launch Omarchy File Manager from CLI' },
        { key: 'projects', desc: 'Open Projects Pacman Store from CLI' },
        { key: 'btop / matrix', desc: 'Launch System Monitor & Capabilities Matrix' },
        { key: 'neofetch', desc: 'Display Arch Linux specs & Sabareesh\'s profile' },
        { key: 'pacman -Syu', desc: 'Synchronize packages & update developer environment' }
      ]
    }
  ];

  return (
    <div
      onClick={() => setIsKeybindingsOpen(false)}
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 font-mono select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: theme.surface,
          borderColor: theme.borderActive,
          color: theme.fg
        }}
        className="w-full max-w-2xl border-2 shadow-2xl p-4 space-y-4"
      >
        {/* Header */}
        <div
          style={{ borderColor: theme.border }}
          className="pb-2 border-b flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span style={{ color: theme.accent }} className="text-sm font-bold">
              󰣇 omarchy-menu-keybindings
            </span>
            <span className="text-[11px] text-[#8b949e]">
              Hyprland v0.45.0 (Cheat Sheet)
            </span>
          </div>
          <button
            onClick={() => setIsKeybindingsOpen(false)}
            className="px-2 py-0.5 text-xs bg-[#161b22] hover:bg-[#da3633] text-white border border-[#30363d] cursor-pointer"
          >
            [ ESC / CLOSE ]
          </button>
        </div>

        {/* Content Columns */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {sections.map((sec, idx) => (
            <div key={idx} className="space-y-1.5">
              <div
                style={{ color: theme.accent, borderColor: theme.border }}
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b"
              >
                ── {sec.title} ──
              </div>
              <div className="grid grid-cols-1 gap-1 text-xs">
                {sec.bindings.map((b, bIdx) => (
                  <div
                    key={bIdx}
                    style={{ borderColor: theme.border }}
                    className="flex items-center justify-between p-1.5 hover:bg-white/5 transition-none border-b"
                  >
                    <span
                      style={{ color: theme.warning, borderColor: theme.border }}
                      className="font-bold bg-black px-2 py-0.5 border"
                    >
                      {b.key}
                    </span>
                    <span className="text-zinc-300 text-[11px] text-right font-medium">
                      {b.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            borderColor: theme.border,
            color: theme.fgMuted
          }}
          className="pt-2 border-t flex items-center justify-between text-[11px]"
        >
          <span>Use Super (Windows/Cmd) key for all compositor bindings</span>
          <span style={{ color: theme.accent }}>hyprctl dispatch</span>
        </div>
      </div>
    </div>
  );
};
