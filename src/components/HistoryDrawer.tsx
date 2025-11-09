import {
  X,
  MessageSquare,
  Clock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useLazyQuery } from "@apollo/client";
import {
  GET_SESSIONS,
  type GetSessionsInput,
  type GetSessionsResponse
} from "../api/queries/session";
import { useRecoilState } from "recoil";
import { currentSessionState, sessionListState } from "../resources/session";
import {
  handleErrorMessage,
  handleResponseErrors
} from "../utilities/error-handling";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface SessionHistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentSessionId?: string;
}

const SessionHistorySidebar = ({
  isOpen,
  onClose
}: SessionHistorySidebarProps) => {
  const [currentSession, setCurrentSession] =
    useRecoilState(currentSessionState);

  const [sessions, setSessions] = useRecoilState(sessionListState);

  const [currentPage, setCurrentPage] = useState(1);

  const [getSessions] = useLazyQuery<GetSessionsResponse, GetSessionsInput>(
    GET_SESSIONS
  );

  const handleGetSessions = async (page: number = 1) => {
    try {
      const filter: GetSessionsInput["filter"] = {
        take: 10,
        page: page
      };

      const response = await getSessions({ variables: { filter } });

      if (response.error) {
        return handleResponseErrors(response);
      }

      if (!response.data?.getSessions) {
        return;
      }

      setSessions(response.data.getSessions);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    handleGetSessions(currentPage);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < sessions.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
            <h2 className="text-xl font-semibold text-deepNavy">
              Chat History
            </h2>
            <p className="text-sm text-gray mt-1">
              {sessions.totalCount} sessions
            </p>
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
          {sessions.list.length > 0 ? (
            sessions.list.map(session => (
              <Link
                key={session.id}
                to="/chat/$id"
                params={{ id: session.id }}
                onClick={() => {
                  setCurrentSession(session);
                  onClose();
                }}
                className={`block p-2.5 rounded-xl border transition-all ${
                  currentSession.id === session.id
                    ? "border-deepNavy bg-[#BDF0E6] shadow-sm"
                    : "border-gray/30 bg-white hover:border-gray/50 hover:shadow-sm"
                }`}
              >
                <div className="flex gap-2.5">
                  <img
                    src={`https://img.youtube.com/vi/${session.video}/mqdefault.jpg`}
                    alt={session.name || "Unititled"}
                    className="w-14 h-10 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-deepNavy text-xs line-clamp-1 mb-1">
                      {session.name || "Untitled"}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {session.messages.length || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {dayjs(session.createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 text-gray text-sm">
              No sessions found
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {sessions.totalPages > 1 && (
          <div className="px-3 pb-3 border-t border-gray/30 pt-3">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  currentPage === 1
                    ? "text-gray/40 cursor-not-allowed bg-gray/10"
                    : "text-deepNavy bg-white border border-gray/30 hover:bg-[#BDF0E6] hover:border-deepNavy"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <span className="text-sm text-gray">
                Page {currentPage} of {sessions.totalPages}
              </span>
              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage >= sessions.totalPages}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  currentPage >= sessions.totalPages
                    ? "text-gray/40 cursor-not-allowed bg-gray/10"
                    : "text-deepNavy bg-white border border-gray/30 hover:bg-[#BDF0E6] hover:border-deepNavy"
                }`}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

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
