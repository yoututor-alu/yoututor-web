import { useEffect, useState } from "react";
import ChatPanel from "../components/ChatPanel";
import VideoSummaryCard from "../components/VideoSummaryCard";

const mockVideo = {
  videoId: "dQw4w9WgXcQ",
  title: "How to Study Smarter with YouTube Lectures",
  channel: "Learning Lab",
  publishedAt: "Apr 12, 2025",
  summary:
    "Discover a simple framework to turn any YouTube video into an interactive learning session. We'll cover active note-taking, timed reviews, and how to ask the right follow-up questions for deeper understanding.",
  tags: ["activelearning", "studyhacks", "yoututor"]
};

const Chat = () => {
  const [currentSessionId, setCurrentSessionId] = useState("1");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setCurrentSessionId(searchParams.get("sessionId") || "1");
    }
  }, []);

  return (
    <div className="px-4 py-8 lg:px-8 bg-[#fafafa] min-h-full">
      <div className="mb-6">
        <p className="text-sm text-deepNavy/70">
          Session • 32 minutes remaining
        </p>
        <h2 className="text-3xl font-semibold text-deepNavy mt-2">
          Keep exploring and ask questions as you watch.
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr),minmax(0,1.2fr)]">
        <VideoSummaryCard {...mockVideo} />
        <ChatPanel className="lg:min-h-[640px]" />
      </div>
    </div>
  );
};

export default Chat;
