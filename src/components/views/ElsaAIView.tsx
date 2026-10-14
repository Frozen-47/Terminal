import React, { useState, useRef, useEffect } from 'react';
import { askAI, ChatMessage } from '../../ai';
import { ALL_SUGGESTED_PROMPTS } from '../utils';

export const ElsaAIView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'ai',
      text: "Elsa AI v1.0.0 [Arch Linux Workstation Subshell]\nConnected to local knowledge repository & Groq engine.\nAsk anything regarding Sabareesh's systems engineering, builds, stack, or experience."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await askAI({ message: text, history: newMessages });
      setMessages(prev => [...prev, { role: 'ai', text: reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'ai', text: "error: packet stream failed. unable to contact model." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = ALL_SUGGESTED_PROMPTS.slice(0, 5);

  return (
    <div className="w-full h-full flex flex-col font-mono bg-[#000000] text-[#e6edf3] overflow-hidden select-text">
      {/* Header */}
      <div className="p-3 border-b border-[#22262e] bg-[#0d1117] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[#00e5ff] font-bold text-sm">󰣇</span>
          <span className="text-xs font-bold text-[#e6edf3]">
            elsa-ai@archlinux:~$ interactive-repl (online)
          </span>
        </div>

        <button
          onClick={() => setMessages([{
            role: 'ai',
            text: "Elsa AI session reset. Ready for next query."
          }])}
          className="px-2 py-0.5 text-xs font-mono bg-[#161b22] hover:bg-[#da3633] text-[#8b949e] hover:text-white border border-[#30363d] cursor-pointer"
        >
          [ RESET ]
        </button>
      </div>

      {/* Suggested Prompts Line */}
      <div className="px-3 py-1.5 border-b border-[#22262e] bg-[#0a0c10] flex items-center gap-1.5 overflow-x-auto shrink-0 select-none text-xs">
        <span className="text-[#6e7681] text-[10px] uppercase font-bold shrink-0">
          PROMPTS:
        </span>
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="px-2 py-0.5 text-[11px] bg-[#161b22] hover:bg-[#21262d] text-[#1793d1] hover:text-[#50fa7b] border border-[#30363d] whitespace-nowrap cursor-pointer"
          >
            [ {p} ]
          </button>
        ))}
      </div>

      {/* REPL Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 macos-terminal-scroll text-xs">
        {messages.map((msg, idx) => {
          const isUser = msg.role === 'user';
          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <span className={isUser ? 'text-[#50fa7b]' : 'text-[#00e5ff]'}>
                  {isUser ? '[user@archlinux ~]$' : '[elsa-ai ~]$'}
                </span>
                <span className="text-[10px] text-[#6e7681]">
                  {isUser ? 'INPUT' : 'RESPONSE'}
                </span>
              </div>
              <div className="pl-4 whitespace-pre-wrap text-[#d8dee9] border-l-2 border-[#22262e]">
                {msg.text}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-[#00e5ff]">
            <span>[elsa-ai ~]$</span>
            <span className="animate-pulse">processing neural response...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Line */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-[#22262e] bg-[#0d1117] flex items-center gap-2 shrink-0"
      >
        <span className="text-xs font-bold text-[#50fa7b] shrink-0">
          [prompt]$
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder="query elsa ai about Sabareesh's projects, stack, or experience..."
          className="flex-1 bg-[#161b22] border border-[#30363d] px-3 py-1.5 text-xs text-white placeholder:text-[#484f58] outline-none font-mono focus:border-[#00e5ff]"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-3 py-1.5 bg-[#00e5ff] hover:bg-[#50fa7b] text-black font-bold text-xs transition-none disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          [ EXECUTE ]
        </button>
      </form>
    </div>
  );
};
