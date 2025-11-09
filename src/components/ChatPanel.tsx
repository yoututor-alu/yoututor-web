import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Send, Trash2 } from "lucide-react";
import { useRecoilState } from "recoil";
import { currentSessionState } from "../resources/session";
import { MessageRole } from "../interfaces/session";
import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import {
  SEND_MESSAGE,
  type SendMessageInput,
  type SendMessageResponse
} from "../api/mutations/session";
import {
  handleErrorMessage,
  handleResponseErrors
} from "../utilities/error-handling";
import MessageContent from "./MessageContent";

interface ChatPanelProps {
  className?: string;
}

// Typing indicator component with animated dots
const TypingIndicator = () => {
  return (
    <div className="max-w-xl mr-auto">
      <div className="rounded-2xl px-5 py-4 shadow-sm border border-gray/20 bg-[#fafafa] text-deepNavy">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot w-2 h-2 bg-deepNavy/60 rounded-full" />
          <span className="typing-dot w-2 h-2 bg-deepNavy/60 rounded-full" />
          <span className="typing-dot w-2 h-2 bg-deepNavy/60 rounded-full" />
        </div>
      </div>
    </div>
  );
};

const ChatPanel = ({ className = "" }: ChatPanelProps) => {
  const [session, setSession] = useRecoilState(currentSessionState);

  const [isSending, setIsSending] = useState(false);

  const [sendMessage] = useMutation<SendMessageResponse, SendMessageInput>(
    SEND_MESSAGE
  );

  const [input, setInput] = useState("");

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [session.messages, isSending]);

  const handleSendMessage = async (input: SendMessageInput["input"]) => {
    try {
      const response = await sendMessage({ variables: { input } });

      if (response.errors) {
        handleResponseErrors(response);
        return null;
      }

      if (!response.data?.sendMessage) {
        return null;
      }

      return response.data.sendMessage.messages.slice(-2);
    } catch (error) {
      handleErrorMessage(error);
      return null;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) {
      return;
    }

    const userMessageContent = input.trim();

    const tempID = `temp-user-${Date.now()}`;

    setInput("");

    // Add user message immediately
    setSession(session => ({
      ...session,
      messages: [
        ...session.messages,
        {
          id: tempID,
          content: userMessageContent,
          model: "user",
          role: MessageRole.User,
          createdAt: new Date()
        }
      ]
    }));

    setIsSending(true);

    const messages = await handleSendMessage({
      content: userMessageContent,
      id: session.id
    });

    if (messages === null) {
      setIsSending(false);
      return;
    }

    // Update messages with the response from the server
    setTimeout(() => {
      setSession(session => {
        const sessionMessages = [...session.messages];

        // Update the last message (user message) with server data (proper ID)
        sessionMessages[sessionMessages.length - 1] = messages[0];

        // Add the assistant response as a new message
        sessionMessages.push(messages[1]);

        return {
          ...session,
          messages: sessionMessages
        };
      });
      setIsSending(false);
    }, 500);
  };

  const messages = useMemo(() => {
    return session.messages;
  }, [session.messages]);

  return (
    <section
      className={`bg-white rounded-3xl shadow-xl border border-gray/30 flex flex-col max-h-[800px] ${className}`}
    >
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray/30">
        <div>
          <h2 className="text-xl font-semibold text-deepNavy">Lesson Chat</h2>
          <p className="text-gray text-sm">
            Ask anything about the video. I'll answer in context.
          </p>
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

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-8 py-6 space-y-4 min-h-0"
      >
        <AnimatePresence initial={false}>
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className={`max-w-xl ${message.role === MessageRole.User ? "ml-auto" : "mr-auto"}`}
            >
              <div
                className={`rounded-2xl px-5 py-4 shadow-sm border border-gray/20 ${
                  message.role === MessageRole.User
                    ? "bg-[#BDF0E6] text-deepNavy"
                    : "bg-[#fafafa] text-deepNavy"
                }`}
              >
                {message.role === MessageRole.User ? (
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                ) : (
                  <MessageContent content={message.content} />
                )}
              </div>
              <p className="text-xs text-gray mt-2 text-right">
                {dayjs(message.createdAt).format("hh:mm A")}
              </p>
            </motion.div>
          ))}
          {isSending && (
            <motion.div
              key="typing-indicator"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-fit"
            >
              <TypingIndicator />
            </motion.div>
          )}
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
