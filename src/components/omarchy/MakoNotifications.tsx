import React from 'react';
import { useOmarchyTheme } from '../../context/ThemeContext';
import { useWindowManager, NotificationItem } from '../../context/WindowManagerContext';
import { X, Info, CheckCircle, AlertTriangle, Music, Trash2 } from 'lucide-react';

export const MakoNotifications: React.FC = () => {
  const { theme } = useOmarchyTheme();
  const {
    notifications,
    dismissNotification,
    isNotificationCenterOpen,
    setIsNotificationCenterOpen
  } = useWindowManager();

  const renderIcon = (type?: NotificationItem['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
      case 'music':
        return <Music className="w-4 h-4 text-purple-400 shrink-0" />;
      default:
        return <Info className="w-4 h-4 text-sky-400 shrink-0" />;
    }
  };

  return (
    <>
      {/* ── TOP-RIGHT FLOATING TOASTS (MAKO STYLE) ────────────────────────── */}
      <div className="fixed top-10 right-3 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none select-none">
        {notifications.slice(0, 3).map(notif => (
          <div
            key={notif.id}
            onClick={() => dismissNotification(notif.id)}
            style={{
              backgroundColor: theme.surface,
              borderColor: theme.borderActive,
              borderLeftWidth: '4px',
              borderLeftColor: theme.accent
            }}
            className="pointer-events-auto border shadow-2xl p-3 flex items-start gap-2.5 font-mono text-xs animate-in slide-in-from-right duration-150 cursor-pointer hover:bg-white/5 transition-none"
          >
            {renderIcon(notif.type)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-white text-[11px] truncate">
                  {notif.title}
                </span>
                <span className="text-[9px] text-zinc-500 font-mono">
                  {notif.time}
                </span>
              </div>
              <p className="text-zinc-300 text-[11px] mt-0.5 leading-snug">
                {notif.message}
              </p>
            </div>
            <button
              onClick={e => {
                e.stopPropagation();
                dismissNotification(notif.id);
              }}
              className="text-zinc-500 hover:text-white p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* ── NOTIFICATION CENTER SLIDE-OVER DRAWER ─────────────────────────── */}
      {isNotificationCenterOpen && (
        <div
          onClick={() => setIsNotificationCenterOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 flex justify-end animate-in fade-in duration-100 select-none"
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ backgroundColor: theme.surface, borderColor: theme.border }}
            className="w-80 h-full border-l p-4 flex flex-col font-mono text-xs shadow-2xl animate-in slide-in-from-right duration-150"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span style={{ color: theme.accent }} className="font-bold">󰂚</span>
                <span className="font-bold text-white text-xs">Mako Notification Center</span>
              </div>
              <button
                onClick={() => setIsNotificationCenterOpen(false)}
                className="text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
              {notifications.length === 0 ? (
                <div className="h-40 flex items-center justify-center text-zinc-500 text-xs">
                  No system notifications
                </div>
              ) : (
                notifications.map(n => (
                  <div
                    key={n.id}
                    style={{ backgroundColor: theme.surfaceAlt, borderColor: theme.border }}
                    className="p-2.5 border text-zinc-300"
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-white">{n.title}</span>
                      <span className="text-[9px] text-zinc-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">{n.message}</p>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-between items-center text-[10px] text-zinc-500">
              <span>omarchy-mako v1.9</span>
              <button
                onClick={() => {
                  notifications.forEach(n => dismissNotification(n.id));
                }}
                className="text-red-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
