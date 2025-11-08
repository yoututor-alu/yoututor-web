import { X, MessageSquare, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

interface Session {
  id: string;
  videoId: string;
  videoTitle: string;
  channel: string;
  thumbnail: string;
  lastMessage: string;
  timestamp: string;
  messageCount: number;
}

const mockSessions: Session[] = [
  {
    id: "1",
    videoId: "dQw4w9WgXcQ",
    videoTitle: "How to Study Smarter with YouTube Lectures",
    channel: "Learning Lab",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    lastMessage: "Absolutely! The speaker breaks the workflow into four parts...",
    timestamp: "2 hours ago",
    messageCount: 12
  },
  {
    id: "2",
    videoId: "example2",
    videoTitle: "React Hooks Explained for Beginners",
    channel: "Code Academy",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    lastMessage: "Great question! useState is one of the most fundamental hooks...",
    timestamp: "Yesterday",
    messageCount: 8
  },
  {
    id: "3",
    videoId: "example3",
    videoTitle: "Machine Learning Fundamentals",
    channel: "AI Insights",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    lastMessage: "Neural networks consist of layers of interconnected nodes...",
    timestamp: "3 days ago",
    messageCount: 15
  },
  {
    id: "4",
    videoId: "example4",
    videoTitle: "JavaScript Async/Await Tutorial",
    channel: "Web Dev Simplified",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    lastMessage: "Async functions always return a promise...",
    timestamp: "1 week ago",
    messageCount: 6
  }
];

interface SessionHistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentSessionId?: string;
}

const SessionHistorySidebar = ({ isOpen, onClose, currentSessionId }: SessionHistorySidebarProps) => {
  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Fixed overlay on mobile, sticky collapsible on desktop */}
      <aside
        className={`bg-white border-r border-gray/30 flex flex-col flex-shrink-0 transition-all duration-300 overflow-y-auto ${
          // Mobile: fixed overlay that slides in/out
          isOpen
            ? "fixed left-0 top-0 z-40 w-80 translate-x-0 shadow-2xl h-screen"
            : "fixed left-0 top-0 z-40 w-80 -translate-x-full h-screen"
        } ${
          // Desktop: sticky, collapsible - width changes to 0 when closed
          isOpen
            ? "lg:sticky lg:top-0 lg:z-20 lg:w-80 lg:translate-x-0 lg:shadow-none lg:h-full"
            : "lg:sticky lg:top-0 lg:z-20 lg:w-0 lg:translate-x-0 lg:h-full lg:overflow-hidden lg:border-r-0"
        }`}
      >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray/30">
              <div>
                <h2 className="text-xl font-semibold text-deepNavy">Chat History</h2>
                <p className="text-sm text-gray mt-1">{mockSessions.length} sessions</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#fafafa] hover:bg-[#BDF0E6] transition"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5 text-deepNavy" />
              </button>
            </div>

            {/* Sessions List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {mockSessions.map(session => (
                <Link
                  key={session.id}
                  to="/chat"
                  search={{ sessionId: session.id }}
                  onClick={onClose}
                  className={`block p-2.5 rounded-xl border transition-all ${
                    currentSessionId === session.id
                      ? "border-deepNavy bg-[#BDF0E6] shadow-sm"
                      : "border-gray/30 bg-white hover:border-gray/50 hover:shadow-sm"
                  }`}
                >
                  <div className="flex gap-2.5">
                    <img
                      src={session.thumbnail}
                      alt={session.videoTitle}
                      className="w-14 h-10 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-deepNavy text-xs line-clamp-1 mb-1">
                        {session.videoTitle}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {session.messageCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {session.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray/30">
              <Link
                to="/chat"
                onClick={onClose}
                className="block w-full py-3 rounded-xl bg-deepNavy text-white font-semibold hover:opacity-90 transition shadow-md text-center"
              >
                New Chat
              </Link>
            </div>
          </aside>
    </>
  );
};

export default SessionHistorySidebar;

