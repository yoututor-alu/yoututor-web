import { useState, useEffect, useMemo } from "react";
import { Outlet, useLocation } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import ChatHeader from "../components/ChatHeader";
import SessionHistorySidebar from "../components/HistoryDrawer";
import { useWrapperContext } from "../components/Wrapper";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const { isLoggedIn } = useWrapperContext();

  // Get current session ID from URL for sidebar
  const [currentSessionId, setCurrentSessionId] = useState("1");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setCurrentSessionId(searchParams.get("sessionId") || "1");
    }
  }, [location.search]);

  const headerRight = useMemo(() => {
    if (isLoggedIn) {
      return undefined;
    }

    return (
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="px-4 py-2 rounded-xl border border-gray/40 bg-white text-deepNavy hover:bg-[#BDF0E6] transition"
        >
          Log in
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 rounded-xl bg-deepNavy text-white font-semibold hover:opacity-90 transition shadow-md"
        >
          Get started
        </Link>
      </div>
    );
  }, [isLoggedIn]);

  return (
    <div className="h-screen flex flex-col bg-[#fafafa] overflow-hidden">
      {/* Fixed Header */}
      <ChatHeader
        title={
          isHomePage ? "Learn smarter with YouTutor" : "Interactive Session"
        }
        subtitle={
          isHomePage
            ? "Turn any YouTube video into an interactive lesson in seconds."
            : undefined
        }
        showMenuButton={true}
        showSettingsButton={isLoggedIn}
        rightSlot={headerRight}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
      />

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <SessionHistorySidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          currentSessionId={currentSessionId}
        />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
