export interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

export const MAX_MESSAGES = 50;

export const ALL_SUGGESTED_PROMPTS = [
  "What is Sabareesh's tech stack?",
  "What is DevSnapz?",
  "What are his career goals?",
  "Tell me about his certifications",
  "What projects has he built?",
  "Where is Sabareesh studying?",
  "What is the AIverse project?",
  "Does he know Data Structures?",
  "Tell me about ByteSense",
  "What is his primary programming language?",
  "How many projects has he completed?",
  "What is the ArcticDEX project?",
  "Does Sabareesh know React and TypeScript?",
  "Is he interested in cybersecurity?",
  "Tell me about the Solunar Discord theme",
  "How can I reach out to Sabareesh?",
  "Where is he based?",
  "Is he looking for internships?",
  "Can I download his resume?",
  "What are his hobbies outside of coding?",
];

export const getRandomPrompts = (): string[] =>
  [...ALL_SUGGESTED_PROMPTS].sort(() => 0.5 - Math.random()).slice(0, 4);

export const INITIAL_MESSAGE: Message = {
  id: 'initial-msg',
  role: 'ai',
  text: "Hey — I'm Elsa ⚡ Ask me anything about Frozen's projects, skills, or journey.",
};

const STORAGE_KEY = 'elsa_chat';
const EXPIRY_MS = 60 * 60 * 1000;

export function loadMessages(): Message[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [INITIAL_MESSAGE];
    const { messages, savedAt } = JSON.parse(raw);
    if (Date.now() - savedAt > EXPIRY_MS) {
      sessionStorage.removeItem(STORAGE_KEY);
      return [INITIAL_MESSAGE];
    }
    return messages;
  } catch {
    return [INITIAL_MESSAGE];
  }
}

export function saveMessages(messages: Message[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, savedAt: Date.now() }));
  } catch {}
}

export function fallbackCopy(text: string) {
  const el = document.createElement('textarea');
  el.value = text;
  el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
  document.body.appendChild(el);
  el.select();
  try { document.execCommand('copy'); } catch {}
  document.body.removeChild(el);
}

export const playGlitchSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const bufferSize = audioCtx.sampleRate * 0.5;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = buffer;
    
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(3, now);
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.linearRampToValueAtTime(150, now + 0.45);
    
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    const gatingSteps = [
      { t: 0.00, v: 0.08 },
      { t: 0.03, v: 0.00 },
      { t: 0.06, v: 0.07 },
      { t: 0.09, v: 0.00 },
      { t: 0.14, v: 0.09 },
      { t: 0.20, v: 0.00 },
      { t: 0.24, v: 0.08 },
      { t: 0.30, v: 0.01 },
      { t: 0.34, v: 0.00 },
      { t: 0.39, v: 0.06 },
      { t: 0.44, v: 0.00 }
    ];
    
    gatingSteps.forEach(step => {
      gainNode.gain.setValueAtTime(step.v, now + step.t);
    });
    
    gainNode.gain.setValueAtTime(0.02, now + 0.45);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    
    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    noiseNode.start(now);
    noiseNode.stop(now + 0.5);
  } catch (e) {
    console.warn("Web Audio glitch sound failed:", e);
  }
};
