import { useNavigate } from "@tanstack/react-router";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useRecoilState } from "recoil";
import { exportSessionState } from "../resources/session";

export interface Message {
  role: "user" | "agent";
  content: string; // markdown string
}

export interface SessionExportProps {
  sessionTitle: string;
  sessionDate: string; // formatted as "MM/DD/YYYY"
  userName: string;
  messages: Message[];
}

const SessionExport: React.FC<SessionExportProps> = ({
  sessionTitle,
  sessionDate,
  userName,
  messages
}) => {
  const [exportSession] = useRecoilState(exportSessionState);

  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8 px-4 print:py-0 print:px-0">
      <div className="max-w-[900px] mx-auto">
        {/* Print Button - Hidden in print view */}
        <div className="flex mb-6 items-center gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="bg-deepNavy text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
            style={{
              background: "#151936",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "999px",
              fontWeight: 600,
              fontSize: "14px"
            }}
          >
            Export PDF
          </button>
          <button
            onClick={() => {
              if (!exportSession.id) {
                return;
              }
              navigate({ to: "/chat/$id", params: { id: exportSession.id } });
            }}
            className="border-2 border-deepNavy text-deepNavy bg-transparent px-6 py-3 rounded-full font-semibold text-sm hover:bg-deepNavy hover:text-white transition-all"
            style={{
              border: "2px solid #151936",
              color: "#151936",
              background: "transparent",
              padding: "12px 24px",
              borderRadius: "999px",
              fontWeight: 600,
              fontSize: "14px"
            }}
          >
            Continue Chatting
          </button>
        </div>

        {/* Letterhead Section */}
        <div
          className="rounded-t-2xl px-8 py-6 print:rounded-t-2xl"
          style={{
            background:
              "linear-gradient(135deg, #BDF0E6 0%, rgba(189, 240, 230, 0.4) 100%)",
            borderRadius: "16px 16px 0 0",
            padding: "24px 32px"
          }}
        >
          <h1
            className="text-[32px] font-bold mb-2 text-deepNavy"
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              letterSpacing: "0.04em"
            }}
          >
            YouTutor
          </h1>
          <p className="text-deepNavy text-lg">
            Personalized insights from your learning session
          </p>
        </div>

        {/* Conversation Wrapper */}
        <div
          className="bg-white rounded-b-2xl px-8 py-8 print:rounded-b-2xl"
          style={{
            background: "#ffffff",
            borderRadius: "0 0 16px 16px",
            padding: "32px",
            boxShadow: "0 16px 40px rgba(21, 25, 54, 0.12)"
          }}
        >
          {/* Session Info */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-deepNavy mb-2">
              {sessionTitle}
            </h2>
            <p className="text-gray text-sm">
              {sessionDate} • {userName}
            </p>
          </div>

          {/* Messages */}
          {messages.length === 0 ? (
            <div className="text-center py-12 text-gray">
              <p>No messages in this session.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <article
                  key={index}
                  className={`message ${
                    message.role === "user" ? "message--user" : "message--agent"
                  } print:break-inside-avoid`}
                  style={{
                    borderRadius: "12px",
                    padding: "16px 20px",
                    boxShadow: "0 4px 12px rgba(21, 25, 54, 0.08)",
                    pageBreakInside: "avoid",
                    breakInside: "avoid"
                  }}
                >
                  {/* Role Label */}
                  <div
                    className="mb-2 text-xs uppercase tracking-wider"
                    style={{
                      fontSize: "12px",
                      letterSpacing: "0.08em",
                      color: "#979797"
                    }}
                  >
                    {message.role === "user" ? "User" : "Agent"}
                  </div>

                  {/* Message Content */}
                  <div className="message-content">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p
                            className="mb-4 last:mb-0"
                            style={{ lineHeight: 1.6 }}
                          >
                            {children}
                          </p>
                        ),
                        h1: ({ children }) => (
                          <h1
                            className="text-2xl font-semibold text-deepNavy mb-3 mt-4 first:mt-0"
                            style={{ lineHeight: 1.6 }}
                          >
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2
                            className="text-xl font-semibold text-deepNavy mb-2 mt-3 first:mt-0"
                            style={{ lineHeight: 1.6 }}
                          >
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3
                            className="text-lg font-semibold text-deepNavy mb-2 mt-3 first:mt-0"
                            style={{ lineHeight: 1.6 }}
                          >
                            {children}
                          </h3>
                        ),
                        h4: ({ children }) => (
                          <h4
                            className="text-base font-semibold text-deepNavy mb-2 mt-3 first:mt-0"
                            style={{ lineHeight: 1.6 }}
                          >
                            {children}
                          </h4>
                        ),
                        h5: ({ children }) => (
                          <h5
                            className="text-sm font-semibold text-deepNavy mb-2 mt-3 first:mt-0"
                            style={{ lineHeight: 1.6 }}
                          >
                            {children}
                          </h5>
                        ),
                        h6: ({ children }) => (
                          <h6
                            className="text-xs font-semibold text-deepNavy mb-2 mt-3 first:mt-0"
                            style={{ lineHeight: 1.6 }}
                          >
                            {children}
                          </h6>
                        ),
                        ul: ({ children }) => (
                          <ul
                            className="list-disc list-inside mb-4 space-y-1"
                            style={{ lineHeight: 1.6 }}
                          >
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol
                            className="list-decimal list-inside mb-4 space-y-1"
                            style={{ lineHeight: 1.6 }}
                          >
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="ml-2" style={{ lineHeight: 1.6 }}>
                            {children}
                          </li>
                        ),
                        code: ({ children, className }) => {
                          const isInline = !className;
                          return isInline ? (
                            <code
                              style={{
                                background: "rgba(21, 25, 54, 0.08)",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                fontSize: "0.875em",
                                fontFamily: "monospace"
                              }}
                            >
                              {children}
                            </code>
                          ) : (
                            <code className={className}>{children}</code>
                          );
                        },
                        pre: ({ children }) => (
                          <pre
                            className="mb-4 overflow-x-auto"
                            style={{
                              background: "rgba(21, 25, 54, 0.08)",
                              padding: "16px",
                              borderRadius: "10px",
                              lineHeight: 1.6
                            }}
                          >
                            {children}
                          </pre>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote
                            className="my-4 italic"
                            style={{
                              borderLeft: "3px solid rgba(189, 240, 230, 0.6)",
                              paddingLeft: "16px",
                              color: "#979797",
                              lineHeight: 1.6
                            }}
                          >
                            {children}
                          </blockquote>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-deepNavy underline hover:opacity-80"
                            style={{ lineHeight: 1.6 }}
                          >
                            {children}
                          </a>
                        ),
                        strong: ({ children }) => (
                          <strong
                            className="font-semibold text-deepNavy"
                            style={{ lineHeight: 1.6 }}
                          >
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic" style={{ lineHeight: 1.6 }}>
                            {children}
                          </em>
                        )
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Print-specific styles */}
      <style>{`
        @media print {
          @page {
            margin: 0.5in;
            size: letter;
          }
          
          /* Reset all layout constraints */
          html, body {
            height: auto !important;
            width: 100% !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background: #fafafa !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* Hide layout elements */
          header,
          nav,
          aside,
          footer,
          [class*="header"],
          [class*="sidebar"],
          [class*="Header"],
          [class*="Sidebar"],
          [class*="ChatHeader"],
          [class*="HistoryDrawer"],
          [class*="Progress"] {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* Override main layout constraints */
          main,
          [class*="layout"],
          [class*="Layout"],
          .print-page {
            height: auto !important;
            overflow: visible !important;
            position: static !important;
            display: block !important;
            page-break-inside: auto !important;
          }
          
          /* Ensure print content is visible */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Remove all height restrictions */
          .min-h-screen,
          .h-screen,
          [style*="height"],
          [style*="max-height"] {
            min-height: auto !important;
            height: auto !important;
            max-height: none !important;
          }
          
          /* Remove overflow restrictions */
          [style*="overflow"],
          [class*="overflow"] {
            overflow: visible !important;
          }
          
          /* Ensure container doesn't limit content */
          .max-w-\\[900px\\] {
            max-width: 100% !important;
            width: 100% !important;
          }
          
          /* Message styling */
          .message {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            orphans: 3;
            widows: 3;
            margin-bottom: 1rem;
          }
          
          .message--user {
            background: #ffffff !important;
            border: 1px solid rgba(189, 240, 230, 0.6) !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          .message--agent {
            background: rgba(189, 240, 230, 0.18) !important;
            border: 1px solid rgba(21, 25, 54, 0.25) !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Allow natural page breaks between messages */
          .space-y-4 > * + * {
            page-break-before: auto;
            break-before: auto;
          }
          
          /* Ensure content flows naturally */
          div {
            page-break-inside: auto;
            break-inside: auto;
          }
          
          /* Remove shadows for cleaner print */
          [style*="box-shadow"] {
            box-shadow: none !important;
          }
        }
        
        /* Screen styles */
        .message--user {
          background: #ffffff;
          border: 1px solid rgba(189, 240, 230, 0.6);
        }
        
        .message--agent {
          background: rgba(189, 240, 230, 0.18);
          border: 1px solid rgba(21, 25, 54, 0.25);
        }
      `}</style>
    </div>
  );
};

export default SessionExport;
