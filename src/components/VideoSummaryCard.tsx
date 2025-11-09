import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentSessionState, videoTimestampState } from "../resources/session";
import dayjs from "dayjs";

interface VideoSummaryCardProps {
  // videoId: string;
  // title: string;
  // channel: string;
  // publishedAt: string;
  // summary: string;
  // tags?: string[];
  className?: string;
}

const VideoSummaryCard = ({ className = "" }: VideoSummaryCardProps) => {
  const [session] = useRecoilState(currentSessionState);
  const timestamp = useRecoilValue(videoTimestampState);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (timestamp > 0 && iframeRef.current && session.video) {
      // Update iframe src with start parameter to seek to timestamp and autoplay
      // Using enablejsapi=1 for potential future YouTube API integration
      const newSrc = `https://www.youtube.com/embed/${session.video}?rel=0&start=${Math.floor(timestamp)}&autoplay=1&enablejsapi=1`;
      // Only update if the src is different to avoid unnecessary reloads
      if (iframeRef.current.src !== newSrc) {
        iframeRef.current.src = newSrc;
      }
    }
  }, [timestamp, session.video]);

  return (
    <section
      className={`bg-white rounded-3xl shadow-xl border border-gray/30 overflow-hidden ${className}`}
    >
      <div className="aspect-video bg-[#BDF0E6]">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${session.video}?rel=0`}
          // title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      <div className="p-8 space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-deepNavy mb-1">
            {session.name}
          </h2>
          <p className="text-gray text-sm">
            {session?.channel || "Unnamed Channel"} •{" "}
            {dayjs(session.publishedAt || new Date()).format("MMM DD, YYYY")}
          </p>
        </div>

        <div className="relative max-h-64 overflow-y-auto pr-2 scrollable-summary">
          <p className="text-deepNavy/80 whitespace-pre leading-relaxed">
            {session.summary}
          </p>
          {/* Gradient fade at bottom to indicate scrollable content */}
          <div className="sticky bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        </div>

        {/* {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full bg-[#BDF0E6] text-deepNavy text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )} */}
      </div>
    </section>
  );
};

export default VideoSummaryCard;
