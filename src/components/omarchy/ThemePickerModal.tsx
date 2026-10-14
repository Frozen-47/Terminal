import React from 'react';
import { useOmarchyTheme } from '../../context/ThemeContext';

export const ThemePickerModal: React.FC = () => {
  const { theme, setThemeById, themesList, isThemePickerOpen, setIsThemePickerOpen } = useOmarchyTheme();

  if (!isThemePickerOpen) return null;

  return (
    <div
      onClick={() => setIsThemePickerOpen(false)}
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 font-mono select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: theme.surface,
          borderColor: theme.borderActive,
          color: theme.fg
        }}
        className="w-full max-w-xl border-2 shadow-2xl p-4 space-y-4"
      >
        {/* Header */}
        <div
          style={{ borderColor: theme.border }}
          className="pb-2 border-b flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span style={{ color: theme.accent }} className="text-sm font-bold">
              󰔎 omarchy-theme-selector
            </span>
            <span className="text-[11px] text-[#8b949e]">
              Active: {theme.name}
            </span>
          </div>
          <button
            onClick={() => setIsThemePickerOpen(false)}
            className="px-2 py-0.5 text-xs bg-[#161b22] hover:bg-[#da3633] text-white border border-[#30363d] cursor-pointer"
          >
            [ ESC ]
          </button>
        </div>

        {/* Theme List */}
        <div className="space-y-2 max-h-80 overflow-y-auto macos-terminal-scroll pr-1">
          {themesList.map((t) => {
            const isCurrent = t.id === theme.id;
            return (
              <div
                key={t.id}
                onClick={() => {
                  setThemeById(t.id);
                  setIsThemePickerOpen(false);
                }}
                style={{
                  backgroundColor: isCurrent ? t.surfaceAlt : t.bg,
                  borderColor: isCurrent ? t.borderActive : t.border
                }}
                className={`p-3 border flex items-center justify-between cursor-pointer transition-none ${
                  isCurrent ? 'ring-1' : 'hover:border-white/40'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {t.name}
                    </span>
                    <span className="text-[10px] text-[#8b949e]">
                      by {t.author}
                    </span>
                    {isCurrent && (
                      <span
                        style={{
                          backgroundColor: t.accent,
                          color: '#000000'
                        }}
                        className="text-[10px] px-1.5 font-bold uppercase"
                      >
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#8b949e] font-mono block mt-0.5">
                    bg: {t.bg} · accent: {t.accent}
                  </span>
                </div>

                {/* Color Swatch Dots */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="size-4 border border-black/40" style={{ backgroundColor: t.bg }} title="Background" />
                  <div className="size-4 border border-black/40" style={{ backgroundColor: t.accent }} title="Accent" />
                  <div className="size-4 border border-black/40" style={{ backgroundColor: t.success }} title="Success" />
                  <div className="size-4 border border-black/40" style={{ backgroundColor: t.warning }} title="Warning" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          style={{
            borderColor: theme.border,
            color: theme.fgMuted
          }}
          className="pt-2 border-t text-[11px] flex items-center justify-between"
        >
          <span>Select theme to restyle terminal, bar, and widgets immediately.</span>
          <span style={{ color: theme.accent }}>Omarchy Styles</span>
        </div>
      </div>
    </div>
  );
};
