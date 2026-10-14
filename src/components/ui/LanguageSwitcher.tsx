import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { LANGUAGES, LanguageCode } from '../../translations';

interface LanguageSwitcherProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('pointerdown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-flex items-center text-left" ref={dropdownRef}>
      {/* Downward Horizontal Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-1 rounded-xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
          role="menu"
        >
          {LANGUAGES.map((lang) => {
            const isCurrent = lang.code === currentLang;
            return (
              <div key={lang.code} className="relative group/lang">
                <button
                  type="button"
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={`px-2 py-1 text-[11px] font-mono uppercase font-bold rounded-lg transition-all cursor-pointer select-none ${
                    isCurrent
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-2xs'
                      : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 border border-transparent'
                  }`}
                  role="menuitem"
                >
                  {lang.code}
                </button>

                {/* Hover Tooltip showing full language name */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 bg-black/90 dark:bg-white/95 text-white dark:text-black text-[10px] font-sans font-medium rounded-md opacity-0 group-hover/lang:opacity-100 transition-all duration-150 pointer-events-none whitespace-nowrap z-50 shadow-md scale-95 group-hover/lang:scale-100">
                  {lang.nativeLabel}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-black/90 dark:border-t-white/95" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Small Inline Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="group/btn inline-flex items-center gap-1 text-[11px] font-mono text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-all cursor-pointer select-none rounded-md px-1.5 py-0.5 hover:bg-black/5 dark:hover:bg-white/10 border border-black/5 dark:border-white/5"
        title={`Language: ${selected.nativeLabel}`}
      >
        <Globe className="size-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span className="uppercase font-semibold">{selected.code}</span>
        <span className="max-w-0 overflow-hidden group-hover/btn:max-w-24 opacity-0 group-hover/btn:opacity-100 transition-all duration-200 ease-out whitespace-nowrap text-[10px] font-sans text-black/70 dark:text-white/70">
          · {selected.nativeLabel}
        </span>
        <ChevronDown
          className={`size-2.5 text-black/40 dark:text-white/40 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
    </div>
  );
};
