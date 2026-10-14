import React, { useState, useEffect } from 'react';
import { useOmarchyTheme } from '../../context/ThemeContext';
import { useWindowManager } from '../../context/WindowManagerContext';
import { Lock, Unlock, ArrowRight } from 'lucide-react';

export const HyprlockScreen: React.FC = () => {
  const { theme } = useOmarchyTheme();
  const { isLocked, unlockScreen, addNotification } = useWindowManager();

  const [password, setPassword] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      setDateStr(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isLocked) return null;

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setPassword('');
      unlockScreen();
      addNotification('Session Unlocked', 'Authenticated as frozen@omarchy', 'success');
    }, 400);
  };

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        color: theme.fg
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 font-mono select-none animate-in fade-in duration-200"
    >
      {/* Top Lock Indicator */}
      <div className="flex items-center gap-2 text-zinc-500 text-xs">
        <Lock className="w-3.5 h-3.5 text-rose-400" />
        <span>omarchy-hyprlock :: display :0</span>
      </div>

      {/* Center Clock & User Login */}
      <div className="flex flex-col items-center text-center max-w-sm w-full space-y-6">
        <div>
          <div className="text-6xl sm:text-7xl font-bold tracking-tight text-white mb-2 font-mono">
            {timeStr}
          </div>
          <div style={{ color: theme.accent }} className="text-sm font-medium">
            {dateStr}
          </div>
        </div>

        {/* User Card */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <img
              src="/Frozen.jpg"
              alt="Sabareesh GanesaMoorthi"
              className="w-24 h-24 border-2 object-cover shadow-2xl"
              style={{ borderColor: theme.borderActive }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <div>
            <h2 className="text-base font-bold text-white">Sabareesh GanesaMoorthi</h2>
            <p className="text-xs text-zinc-400">frozen@omarchy-workstation</p>
          </div>
        </div>

        {/* Password / Unlock Form */}
        <form onSubmit={handleUnlock} className="w-full space-y-3">
          <div
            style={{
              backgroundColor: theme.surfaceAlt,
              borderColor: theme.borderActive
            }}
            className="flex items-center border-2 px-3 py-2 shadow-inner"
          >
            <input
              type="password"
              placeholder="Enter password (or press Enter)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              className="w-full bg-transparent text-xs text-white placeholder-zinc-500 outline-none font-mono"
            />
            <button
              type="submit"
              disabled={isAuthenticating}
              style={{
                backgroundColor: theme.accent,
                color: '#000000'
              }}
              className="p-1 font-bold hover:opacity-90 cursor-pointer disabled:opacity-50"
              title="Unlock session"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleUnlock()}
            style={{ borderColor: theme.border }}
            className="w-full py-2 border bg-white/5 hover:bg-white/10 text-xs text-zinc-300 font-bold cursor-pointer transition-none"
          >
            {isAuthenticating ? 'Authenticating with PAM...' : '[ UNLOCK OMARCHY OS ]'}
          </button>
        </form>
      </div>

      {/* Bottom Session Details */}
      <div className="flex items-center justify-between w-full text-[11px] text-zinc-500 border-t border-zinc-800/80 pt-3">
        <span>Arch Linux 6.12.1-omarchy-lts</span>
        <span>Hyprland Wayland Compositor</span>
        <span>Press ESC or Enter to resume</span>
      </div>
    </div>
  );
};
