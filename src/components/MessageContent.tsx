import React, { useMemo } from "react";
import { useSetRecoilState } from "recoil";
import ReactMarkdown from "react-markdown";
import { videoTimestampState } from "../resources/session";
import { findTimestamps } from "../utilities/timestamp";

interface MessageContentProps {
  content: string;
}

const MessageContent = ({ content }: MessageContentProps) => {
  const setVideoTimestamp = useSetRecoilState(videoTimestampState);

  const handleTimestampClick = (seconds: number, e: React.MouseEvent) => {
    e.preventDefault();
    setVideoTimestamp(seconds);
  };

  // Process content to replace timestamps with special markdown links
  const processedContent = useMemo(() => {
    const timestamps = findTimestamps(content);
    if (timestamps.length === 0) {
      return content;
    }

    let processed = content;
    // Replace timestamps in reverse order to maintain indices
    for (let i = timestamps.length - 1; i >= 0; i--) {
      const { match, index, seconds } = timestamps[i];
      const replacement = `[${match}](//timestamp://${seconds})`;

      processed =
        processed.slice(0, index) +
        replacement +
        processed.slice(index + match.length);
    }
    return processed;
  }, [content]);

  return (
    <div className="leading-relaxed prose prose-sm max-w-none">
      <ReactMarkdown
        components={{
          // Customize paragraph to preserve whitespace
          p: ({ children }) => (
            <p className="whitespace-pre-wrap mb-4 last:mb-0">{children}</p>
          ),
          // Customize links to handle timestamp links
          a: ({ href, children }) => {
            // Check if this is a timestamp link
            if (href?.startsWith("//timestamp://")) {
              const seconds = parseInt(href.replace("//timestamp://", ""), 10);

              return (
                <button
                  type="button"
                  onClick={e => handleTimestampClick(seconds, e)}
                  className="!text-[#C2185B] hover:!text-[#A0144A] underline font-medium transition-colors !decoration-[#C2185B] hover:!decoration-[#A0144A] !bg-transparent border-0 p-0 cursor-pointer font-inherit text-inherit inline"
                  style={{ textDecoration: "underline" }}
                >
                  {children}
                </button>
              );
            }
            // Regular links
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C2185B] hover:text-[#A0144A] underline"
              >
                {children}
              </a>
            );
          },
          // Style other markdown elements
          h1: ({ children }) => (
            <h1 className="text-2xl font-semibold text-deepNavy mb-3 mt-4 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-deepNavy mb-2 mt-3 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-deepNavy mb-2 mt-3 first:mt-0">
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="ml-2">{children}</li>,
          code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-deepNavy">
                {children}
              </code>
            ) : (
              <code className={className}>{children}</code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-700">
              {children}
            </blockquote>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-deepNavy">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
};

export default MessageContent;
