import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowUp, ArrowUpRight, Code2, FolderOpen, Mail, GraduationCap, ExternalLink, Copy, Check, RotateCcw } from 'lucide-react';
import { askAI } from '../../ai';
import type { ChatMessage } from '../../ai';

interface Message extends ChatMessage {
  id: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const MAX_MESSAGES = 50;

// ── HELPERS ───────────────────────────────────────────────────────────────────

// FIX 1: URL test as a function — avoids statefulness of reused regex with /g
const isURL = (text: string): boolean =>
  /https?:\/\/[^\s]+|(?:github\.com|linkedin\.com|frozenn\.in)[^\s]*/.test(text);

const URL_PATTERN =
  /(https?:\/\/[^\s]+|(?:github\.com|linkedin\.com|frozenn\.in)[^\s]*)/g;

const TRAILING_PUNCT = /[).,!?;:'"]+$/;


// ── CUSTOM ICONS ──────────────────────────────────────────────────────────────
export const ElsaAILogo = ({
  className = '',
  size = 20,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`flex-shrink-0 ${className}`}
  >
    {/* Main Clean 4-point AI Star */}
    <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z" />
    {/* Companion Sparkle */}
    <path
      d="M19 7C19 5.34315 20.3431 4 22 4C20.3431 4 19 2.65685 19 1C19 2.65685 17.6569 4 16 4C17.6569 4 19 5.34315 19 7Z"
      opacity="0.7"
    />
  </svg>
);



// ── LINKIFY ───────────────────────────────────────────────────────────────────
const linkify = (text: string): React.ReactNode[] => {
  const parts = text.split(URL_PATTERN);
  return parts.map((part, i) => {
    // FIX 1: Use isURL() function instead of regex .test() directly
    if (isURL(part)) {
      const clean = part.replace(TRAILING_PUNCT, '');
      const trail = part.slice(clean.length);
      const href = clean.startsWith('http') ? clean : `https://${clean}`;
      return (
        <React.Fragment key={i}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={clean}
            className="underline decoration-emerald-500/40 underline-offset-4 hover:decoration-emerald-500 break-all"
          >
            {clean.replace(/^https?:\/\//, '')}<ExternalLink size={12} className="inline ml-1" />
          </a>
          {trail}
        </React.Fragment>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

// ── MARKDOWN-LIKE RENDERER ────────────────────────────────────────────────────
// Supports: **bold**, `inline code`, ```code blocks```, bullet lists, linkify
const renderMarkdown = (text: string): React.ReactNode[] => {
  const lines = text.split('\n');
  // Raw node descriptors before post-processing
  type RawNode =
    | { type: 'block'; node: React.ReactNode }
    | { type: 'li'; node: React.ReactNode; key: number };
  const raw: RawNode[] = [];
  let codeBlock: string[] = [];
  let inCode = false;
  let lang = '';

  const processInline = (line: string, key: string | number): React.ReactNode => {
    const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return (
      <React.Fragment key={key}>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code
                key={i}
                className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[11px]"
              >
                {part.slice(1, -1)}
              </code>
            );
          }
          return <React.Fragment key={i}>{linkify(part)}</React.Fragment>;
        })}
      </React.Fragment>
    );
  };

  lines.forEach((line, idx) => {
    if (line.startsWith('```')) {
      if (!inCode) {
        inCode = true;
        lang = line.slice(3).trim();
        codeBlock = [];
      } else {
        inCode = false;
        raw.push({
          type: 'block',
          node: (
            <div
              key={`cb-${idx}`}
              className="my-2 rounded-lg overflow-hidden border border-black/10 dark:border-white/10"
            >
              {lang && (
                <div className="px-3 py-1 text-[10px] font-mono bg-black/10 dark:bg-white/10 text-secondary uppercase tracking-wider">
                  {lang}
                </div>
              )}
              <pre className="px-3 py-2 text-[11px] font-mono overflow-x-auto bg-black/5 dark:bg-white/5 leading-relaxed">
                <code>{codeBlock.join('\n')}</code>
              </pre>
            </div>
          ),
        });
        lang = '';
      }
      return;
    }

    if (inCode) {
      codeBlock.push(line);
      return;
    }

    if (line.startsWith('- ') || line.startsWith('• ')) {
      // FIX (List bug): collect as 'li' type; will be wrapped in <ul> below
      raw.push({ type: 'li', node: processInline(line.slice(2), idx), key: idx });
      return;
    }

    if (line.trim() === '') {
      raw.push({ type: 'block', node: <div key={`sp-${idx}`} className="h-1" /> });
      return;
    }

    raw.push({ type: 'block', node: <p key={idx}>{processInline(line, idx)}</p> });
  });

  // Post-process: group consecutive 'li' entries into a single <ul>
  const nodes: React.ReactNode[] = [];
  let i = 0;
  while (i < raw.length) {
    const item = raw[i];
    if (item.type === 'li') {
      const liNodes: React.ReactNode[] = [];
      const groupKey = item.key;
      while (i < raw.length && raw[i].type === 'li') {
        const li = raw[i] as { type: 'li'; node: React.ReactNode; key: number };
        liNodes.push(
          <li key={li.key} className="ml-4 list-disc">
            {li.node}
          </li>
        );
        i++;
      }
      nodes.push(
        <ul key={`ul-${groupKey}`} className="my-1 space-y-0.5">
          {liNodes}
        </ul>
      );
    } else {
      nodes.push(item.node);
      i++;
    }
  }

  return nodes;
};

// ── MESSAGE TEXT ──────────────────────────────────────────────────────────────
// FIX 9: Memoize rendered output per message
const MessageText = ({ text, role }: { text: string; role: 'user' | 'ai' }) => {
  const rendered = useMemo(() => {
    if (role === 'user') return <>{text}</>;
    return <>{renderMarkdown(text)}</>;
  }, [text, role]);

  return rendered;
};

// ── COPY BUTTON ───────────────────────────────────────────────────────────────
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const confirm = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    };

    // FIX (Clipboard fallback): navigator.clipboard requires secure context (https).
    // Fall back to execCommand for http or older browsers.
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(confirm).catch(() => {
        fallbackCopy(text);
        confirm();
      });
    } else {
      fallbackCopy(text);
      confirm();
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute bottom-0 left-0 opacity-60 hover:opacity-100 focus-visible:opacity-100 p-1 rounded-md text-secondary hover:text-primary hover:bg-black/10 dark:hover:bg-white/10 transition-all"
      aria-label="Copy message"
      title="Copy message"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
};

// execCommand fallback for non-secure contexts
function fallbackCopy(text: string) {
  const el = document.createElement('textarea');
  el.value = text;
  el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
  document.body.appendChild(el);
  el.select();
  try { document.execCommand('copy'); } catch { /* silent */ }
  document.body.removeChild(el);
}

// ── TYPING ANIMATION ──────────────────────────────────────────────────────────
// Uses requestAnimationFrame + word-chunking for smooth perf on long responses.
// FIX (Performance): rAF avoids timer drift; chunking by words keeps it fast
// without hammering the renderer with single-char updates.
const TypingMessage = ({
  fullText,
  onDone,
}: {
  fullText: string;
  onDone: () => void;
}) => {
  const [displayed, setDisplayed] = useState('');
  const stateRef = useRef({ wordIndex: 0, rafId: 0, lastTime: 0 });
  // Split on word boundaries so we chunk by words, not bytes
  const words = useMemo(() => fullText.split(/(\s+)/), [fullText]);

  useEffect(() => {
    const state = stateRef.current;
    state.wordIndex = 0;
    state.lastTime = 0;
    setDisplayed('');

    const INTERVAL_MS = 18; // ~55 words/s — feels alive but readable

    const tick = (now: number) => {
      if (now - state.lastTime >= INTERVAL_MS) {
        state.lastTime = now;
        // Advance by 2 tokens (word + whitespace) per frame
        state.wordIndex = Math.min(state.wordIndex + 2, words.length);
        const next = words.slice(0, state.wordIndex).join('');
        setDisplayed(next);
        if (state.wordIndex >= words.length) {
          onDone();
          return;
        }
      }
      state.rafId = requestAnimationFrame(tick);
    };

    state.rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(state.rafId);
  }, [fullText, words, onDone]);

  return <>{renderMarkdown(displayed)}</>;
};

// ── CHAT STORAGE ──────────────────────────────────────────────────────────────
const STORAGE_KEY = 'elsa_chat';
const EXPIRY_MS = 60 * 60 * 1000; // 1 hour

// FIX 6: Upgraded initial message with more personality
const INITIAL_MESSAGE: Message = {
  id: 'initial-msg',
  role: 'ai',
  text: "Hey — I'm Elsa ⚡ Ask me anything about Sabareesh's projects, skills, or journey. I've got the inside scoop.",
};

function loadMessages(): Message[] {
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

function saveMessages(messages: Message[]) {
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ messages, savedAt: Date.now() })
    );
  } catch {
    // sessionStorage full or unavailable — fail silently
  }
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [inputValue, setInputValue] = useState('');
  const [view, setView] = useState<'explore' | 'ask'>('explore');
  const [topicIndex, setTopicIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Track which message id is still "typing" for animation
  const [typingId, setTypingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);



  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen && window.innerWidth <= 640) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    if (isOpen) {
      handleResize();
      window.addEventListener('resize', handleResize);
      if (window.innerWidth > 640) {
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const handleClearChat = () => {
    if (isLoading) return;
    setMessages([INITIAL_MESSAGE]);
    setView('explore');
    setTypingId(null);
    setInputValue('');
    sessionStorage.removeItem(STORAGE_KEY);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSend = async (e?: React.FormEvent, directMessage?: string) => {
    e?.preventDefault();

    const messageToSend = directMessage || inputValue.trim();
    if (!messageToSend || isLoading) return;


    setInputValue('');

    setView('ask');
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      text: messageToSend,
    };

    // FIX (Race condition): Build the updated history synchronously so
    // askAI receives the up-to-date list, not the stale React state snapshot.
    const updatedMessages = [...messages, userMsg].slice(-MAX_MESSAGES);
    setMessages(updatedMessages);

    setIsLoading(true);

    try {
      const response = await askAI({
        message: messageToSend,
        history: updatedMessages, // ✅ fresh — not stale `messages`
      });

      const aiMsg: Message = {
        id: crypto.randomUUID(),
        role: 'ai',
        text: response,
      };

      setMessages((prev) => {
        const updated = [...prev, aiMsg];
        return updated.slice(-MAX_MESSAGES);
      });

      // FIX (Typing overlap): reset first so fast sends never stack two animations
      setTypingId(null);
      setTypingId(aiMsg.id);
    } catch (err: any) {
      const status = err?.response?.status ?? err?.status;
      let errorText =
        "Sorry, I'm having trouble connecting right now. Please try again later!";
      if (status === 429) {
        errorText =
          "You're sending messages too fast. Please wait a moment and try again.";
      } else if (status >= 504 || err?.name === 'AbortError') {
        errorText =
          "The request timed out. Elsa might be busy — please try again in a moment.";
      } else if (status >= 500) {
        errorText =
          'Elsa is having server issues right now. Please try again shortly.';
      } else if (!navigator.onLine) {
        errorText =
          'You appear to be offline. Please check your connection and try again.';
      }
      setMessages((prev) => {
        const updated = [
          ...prev,
          { id: crypto.randomUUID(), role: 'ai' as const, text: errorText },
        ];
        return updated.slice(-MAX_MESSAGES);
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const isWelcome = messages.length === 1 && messages[0].id === INITIAL_MESSAGE.id;
  const topics = [
    { label: 'Projects', number: '01', title: 'From idea\nto something real.', detail: 'Explore AI tools, developer communities, and everyday utilities.', tags: ['AiVerse', 'DevSnapz', 'GradeCalculator'], section: 'projects', action: 'See the projects', prompt: 'Give me a quick tour of Sabareesh’s three most interesting projects.', Icon: FolderOpen },
    { label: 'Skills', number: '02', title: 'The tools.\nThe thinking.', detail: 'A closer look at the languages and fundamentals behind the work.', tags: ['Python', 'C & C++', 'Java'], section: 'skills', action: 'Explore the stack', prompt: 'What are Sabareesh’s strongest technical skills, and how has he used them?', Icon: Code2 },
    { label: 'Journey', number: '03', title: 'Always learning.\nAlways building.', detail: 'Follow the path from IT student to independent developer and founder.', tags: ['IT student', 'Developer', 'Founder'], section: 'experience', action: 'View the timeline', prompt: 'Walk me through Sabareesh’s education and experience briefly.', Icon: GraduationCap },
    { label: 'Connect', number: '04', title: 'Good things start\nwith a hello.', detail: 'Get to know Sabareesh, find his résumé, or start a conversation.', tags: ['Résumé', 'Contact', 'Collaboration'], section: 'about', action: 'Find contact details', prompt: 'How can I contact Sabareesh or find his résumé?', Icon: Mail },
  ];
  const topic = topics[topicIndex];
  const explore = view === 'explore';
  const visitSection = () => {
    onClose();
    const section = document.getElementById(topic.section);
    section?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    if (section) { section.tabIndex = -1; section.focus({ preventScroll: true }); }
  };
  return createPortal(
    <div className="elsa-overlay fixed inset-0 z-[1000] flex items-end justify-end pointer-events-none p-2 sm:p-6">
      <div className="elsa-panel pointer-events-auto flex w-full flex-col overflow-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border border-black/10 dark:border-white/10"
        role="dialog" aria-modal="false" aria-labelledby="ai-modal-title">
        <header className="flex shrink-0 items-center justify-between gap-3 px-5 py-4 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><ElsaAILogo size={22} /></div>
            <div>
              <h2 id="ai-modal-title" className="text-sm font-semibold">Elsa</h2>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">Sabareesh’s AI guide</p>
            </div>
          </div>
          <div className="flex gap-1">
            {!isWelcome && <button type="button" onClick={handleClearChat} disabled={isLoading} className="elsa-icon-button disabled:opacity-30" aria-label="Start a new conversation" title="New conversation"><RotateCcw size={17} /></button>}
            <button type="button" onClick={onClose} className="elsa-icon-button" aria-label="Close chat" title="Close chat (Esc)"><X size={20} /></button>
          </div>
        </header>

        <nav className="mx-5 mt-4 flex shrink-0 rounded-full bg-black/[0.04] dark:bg-white/[0.06] p-1" aria-label="Elsa mode">
          {(['explore', 'ask'] as const).map(mode => <button key={mode} type="button" aria-pressed={view === mode} onClick={() => setView(mode)} className={`flex-1 rounded-full py-2 text-xs font-medium transition-colors ${view === mode ? 'bg-white text-black dark:bg-zinc-800 dark:text-white' : 'text-zinc-500'}`}>{mode === 'explore' ? 'Explore' : isLoading ? 'Ask · thinking…' : 'Ask Elsa'}</button>)}
        </nav>
        <div className="elsa-conversation min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          {explore ? (
            <div className="elsa-explore flex min-h-full flex-col">
              <div className="mb-3 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400"><span>Choose a rabbit hole</span><span className="font-mono">{topic.number} / 04</span></div>
              <div className="mb-4 grid grid-cols-4 gap-1" aria-label="Explore topics">
                {topics.map((item, index) => <button key={item.label} type="button" aria-pressed={topicIndex === index} onClick={() => setTopicIndex(index)} className={`rounded-full px-1.5 py-2 text-xs transition-colors ${topicIndex === index ? 'bg-zinc-900 text-white dark:bg-white dark:text-black' : 'text-zinc-500 hover:bg-black/5 dark:hover:bg-white/10'}`}>{item.label}</button>)}
              </div>
              <div key={topic.label} className="elsa-topic relative flex flex-1 flex-col overflow-hidden rounded-[22px] p-4 sm:p-6">
                <div className="mb-4 flex items-center justify-between"><topic.Icon size={24} strokeWidth={1.4} /><span className="text-xs font-mono uppercase tracking-widest">{topic.label}</span></div>
                <h3 className="relative text-[26px] sm:text-[30px] font-medium leading-[1.15] tracking-[-0.04em] whitespace-pre-line">{topic.title.replace(/\\n/g, '\n')}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-70">{topic.detail}</p>
                <div className="mb-4 mt-3 flex flex-wrap gap-1.5">{topic.tags.map(tag => <span key={tag} className="rounded-md border border-current/10 bg-white/30 px-2 py-1 text-xs">{tag}</span>)}</div>
                <button type="button" onClick={visitSection} className="mt-auto flex items-center justify-between gap-3 border-t border-black/15 pt-4 text-sm font-medium text-left">{topic.action}<ArrowUpRight size={19} /></button>
              </div>
              <button type="button" disabled={isLoading} onClick={() => handleSend(undefined, topic.prompt)} className="mt-4 flex items-center justify-between gap-3 rounded-xl px-1 py-2 text-sm text-zinc-600 dark:text-zinc-300 disabled:opacity-40"><span className="flex items-center gap-2"><ElsaAILogo size={16} />Let Elsa give you the short version</span><ArrowUpRight size={16} /></button>
            </div>
          ) : isWelcome ? (
            <div className="flex min-h-full flex-col justify-center py-8">
              <ElsaAILogo size={32} className="mb-5 text-emerald-500" />
              <h3 className="text-3xl tracking-tight font-medium">Your curiosity.<br />My starting point.</h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500">Ask about the work, the person, or where to start.</p>
              <button type="button" onClick={() => handleSend(undefined, 'Give me a concise introduction to Sabareesh and his work.')} className="mt-7 flex items-center justify-between rounded-xl border border-black/10 dark:border-white/10 p-4 text-sm">Give me the 30-second intro<ArrowUpRight size={17} /></button>
            </div>
          ) : (            <div role="log" aria-live="polite" aria-label="Chat messages" className="space-y-6">
              {messages.filter(msg => msg.id !== INITIAL_MESSAGE.id).map(msg => (
                <div key={msg.id} className={msg.role === 'user' ? 'flex justify-end' : ''}>
                  <div className={`elsa-message group relative min-w-0 text-sm leading-7 break-words ${msg.role === 'user' ? 'max-w-[88%] rounded-2xl rounded-br-md bg-zinc-100 dark:bg-white/[0.07] px-4 py-2.5 whitespace-pre-wrap' : 'pb-6'}`}>
                    {msg.role === 'ai' && <div className="mb-2 flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400"><ElsaAILogo size={14} />Elsa</div>}
                    {msg.role === 'ai' && typingId === msg.id ? <TypingMessage fullText={msg.text} onDone={() => setTypingId(null)} /> : <MessageText text={msg.text} role={msg.role} />}
                    {msg.role === 'ai' && <CopyButton text={msg.text} />}
                  </div>
                </div>
              ))}
              {isLoading && <div role="status" className="flex items-center gap-2.5 text-sm text-zinc-500"><ElsaAILogo size={16} className="text-emerald-500 motion-safe:animate-pulse" />Thinking<span className="motion-safe:animate-pulse">…</span></div>}
            </div>
          )}
          {!explore && !isWelcome && <div ref={messagesEndRef} className="h-2" />}
        </div>

        <div className="elsa-composer shrink-0 px-4 pb-4 pt-2">
          <form onSubmit={handleSend} className="flex items-center gap-2 rounded-2xl border border-black/15 dark:border-white/15 bg-zinc-50 dark:bg-white/[0.03] p-2 pl-4 transition-colors focus-within:border-emerald-500">
            <input ref={inputRef} type="text" value={inputValue} onChange={event => setInputValue(event.target.value)}
              aria-label="Your message to Elsa" placeholder="What would you like to know?"
              className="min-w-0 flex-1 bg-transparent py-2 text-base sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400"
              onKeyDown={event => { if (event.key === 'Enter' && event.nativeEvent.isComposing) event.preventDefault(); }} />
            <button type="submit" disabled={!inputValue.trim() || isLoading} aria-label="Send message" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white transition-colors hover:bg-emerald-700 disabled:bg-zinc-200 disabled:text-zinc-400 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600"><ArrowUp size={20} /></button>
          </form>
          <p className="mt-2.5 text-center text-[11px] text-zinc-400 dark:text-zinc-500">Explore at your pace. Ask anything along the way.</p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AIChatModal;
