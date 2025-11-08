import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Send, Trash2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatPanelProps {
  className?: string;
}

const createId = () => Math.random().toString(36).slice(2, 10);

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hi! I'm YouTutor. Drop a question about this video and I'll guide you through the key ideas, offer summaries, and point out must-know concepts.",
    timestamp: "09:02"
  },
  {
    id: "2",
    role: "user",
    content: "Can you outline the main steps covered in this tutorial?",
    timestamp: "09:05"
  },
  {
    id: "3",
    role: "assistant",
    content: "Absolutely! The speaker breaks the workflow into four parts: planning, scripting, recording, and editing. Each section includes practical tips that I'll list as we dive deeper.",
    timestamp: "09:05"
  }
];

const ChatPanel = ({ className = "" }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: createId(),
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const assistantMessage: Message = {
      id: createId(),
      role: "assistant",
      content: "Here's a thoughtful response from YouTutor explaining the concept and linking it back to the video.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <section className={`bg-white rounded-3xl shadow-xl border border-gray/30 flex flex-col h-full ${className}`}>
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray/30">
        <div>
          <h2 className="text-xl font-semibold text-deepNavy">Lesson Chat</h2>
          <p className="text-gray text-sm">Ask anything about the video. I'll answer in context.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray/30 text-gray cursor-not-allowed"
          >
            <ArrowUpRight className="h-4 w-4" />
            Export
          </button>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray/30 text-gray cursor-not-allowed"
          >
            <Trash2 className="h-4 w-4" />
            Clear chat
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={`max-w-xl ${message.role === "user" ? "ml-auto" : "mr-auto"}`}
            >
              <div
                className={`rounded-2xl px-5 py-4 shadow-sm border border-gray/20 ${
                  message.role === "user" ? "bg-[#BDF0E6] text-deepNavy" : "bg-[#fafafa] text-deepNavy"
                }`}
              >
                <p className="leading-relaxed">{message.content}</p>
              </div>
              <p className="text-xs text-gray mt-2 text-right">{message.timestamp}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t border-gray/30 px-6 py-5">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask YouTutor anything about this video..."
            rows={2}
            className="flex-1 resize-none rounded-2xl border border-gray/40 bg-white px-4 py-3 text-deepNavy placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-[#BDF0E6]"
          />
          <button
            type="button"
            onClick={handleSend}
            className="flex-shrink-0 h-12 w-12 rounded-2xl bg-deepNavy text-white inline-flex items-center justify-center shadow-lg hover:opacity-90 transition"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatPanel;
