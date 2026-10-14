import welcomeBanner from '../assets/banner.txt?raw';

let sessionPasskey: string | null = null;

export const getSessionPasskey = (): string => {
  if (typeof window === 'undefined') return 'fehjkb';
  if (!sessionPasskey) {
    // Generate a fresh random 6-character lowercase code on every page load/session
    sessionPasskey = Math.random().toString(36).substring(2, 8).toLowerCase();
  }
  return sessionPasskey;
};

export const printConsoleEasterEgg = () => {
  if (typeof window === 'undefined') return;

  // Prevent duplicate logs during React StrictMode double mounts
  if ((window as any).__hasPrintedConsoleEasterEgg) return;
  (window as any).__hasPrintedConsoleEasterEgg = true;

  const passkey = getSessionPasskey();
  const cleanBanner = welcomeBanner.replace(/\r/g, '');

  const asciiArt = `${cleanBanner}\n\nDeveloper Passcode: ${passkey}`;

  console.log(
    `%c${asciiArt}\n%cHey Curious Developer! You found the hidden DevTools Easter Egg!\nPasscode: %c${passkey}%c\nEnter this code into the portfolio terminal to verify developer access!`,
    'color: #00bcd4; font-weight: bold; font-family: monospace;',
    'color: #ffffff; font-size: 13px; font-weight: 500; font-family: monospace;',
    'color: #ffc107; font-weight: bold; font-size: 14px; font-family: monospace;',
    'color: #a3a3a3; font-size: 12px; font-family: monospace;'
  );
};
