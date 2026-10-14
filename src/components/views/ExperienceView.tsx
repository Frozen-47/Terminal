import React, { useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import 'react-activity-calendar/tooltips.css';
import { TRANSLATIONS, LanguageCode } from '../../translations';

interface ExperienceViewProps {
  currentLang: LanguageCode;
  isDark: boolean;
}

export const ExperienceView: React.FC<ExperienceViewProps> = ({ currentLang, isDark }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const timeline = t.experienceTimeline || TRANSLATIONS.en.experienceTimeline;

  const handleCopyEmail = () => {
    const email = "sabareeshgm47@gmail.com";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col font-mono bg-[#000000] text-[#e6edf3] overflow-y-auto macos-terminal-scroll p-4 space-y-4 select-text">
      {/* Top Status Strip */}
      <div className="p-3 border border-[#22262e] bg-[#0d1117] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[#1793d1] font-bold text-sm">󰣇</span>
          <span className="text-xs font-bold text-[#e6edf3]">
            git log --graph --oneline --decorate --all | Career Milestones
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 font-bold bg-[#1793d1] hover:bg-[#50fa7b] text-black border border-[#1793d1] transition-none cursor-pointer"
          >
            [ VIEW RÉSUMÉ PDF ↗ ]
          </a>
          <button
            onClick={handleCopyEmail}
            className="px-2.5 py-1 font-bold bg-[#161b22] hover:bg-[#21262d] text-white border border-[#30363d] transition-none cursor-pointer"
          >
            {copiedEmail ? "[ EMAIL COPIED! ]" : "[ COPY EMAIL ]"}
          </button>
        </div>
      </div>

      {/* GitHub Activity Box */}
      <div className="border border-[#22262e] bg-[#0d1117] p-3 space-y-2">
        <div className="flex items-center justify-between text-xs text-[#8b949e]">
          <span className="font-bold text-[#50fa7b]">
            $ git-activity --user Frozen-47
          </span>
          <span className="text-[#6e7681]">contributions stream</span>
        </div>
        <div className="overflow-x-auto py-1">
          <div className="min-w-[650px]">
            <GitHubCalendar
              username="Frozen-47"
              colorScheme="dark"
              blockSize={10}
              blockMargin={4}
              fontSize={11}
            />
          </div>
        </div>
      </div>

      {/* Git Graph Timeline */}
      <div className="border border-[#22262e] bg-[#0a0c10] p-4 space-y-4">
        <div className="text-xs text-[#8b949e] font-bold uppercase tracking-wider pb-2 border-b border-[#22262e]">
          ── COMMIT GRAPH HISTORY ──
        </div>

        <div className="space-y-4 text-xs font-mono">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative pl-6 border-l-2 border-[#1793d1] space-y-1">
              <div className="absolute -left-[7px] top-0 size-3 bg-[#1793d1] border-2 border-black" />

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#f1fa8c] font-bold">
                  * [{item.date}]
                </span>
                <span className="text-white font-bold text-sm">
                  {item.title}
                </span>
                <span className="text-[#8b949e]">
                  ({item.subtitle})
                </span>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-[#50fa7b] text-black font-bold uppercase">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="space-y-1 text-[#d8dee9] pt-1 pl-2">
                {item.description.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 text-[12px]">
                    <span className="text-[#1793d1]">├──</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
