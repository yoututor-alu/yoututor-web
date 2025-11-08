import React from "react";
import { Menu, Settings, UserCircle2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
  onOpenHistory?: () => void;
  onToggleSidebar?: () => void;
  onOpenSettings?: () => void;
  showMenuButton?: boolean;
  showSettingsButton?: boolean;
  rightSlot?: React.ReactNode;
}

const ChatHeader = ({
  title = "Interactive Session",
  subtitle,
  onOpenHistory,
  onToggleSidebar,
  onOpenSettings,
  showMenuButton = true,
  showSettingsButton = true,
  rightSlot
}: ChatHeaderProps) => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    if (onToggleSidebar) {
      onToggleSidebar();
    } else if (onOpenHistory) {
      onOpenHistory();
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#fafafa]/95 backdrop-blur-sm border-b border-gray/40 flex-shrink-0">
      <div className="px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <button
              type="button"
              onClick={handleMenuClick}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-gray/30 shadow-sm hover:bg-[#BDF0E6] transition"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5 text-deepNavy" />
            </button>
          )}
          <div>
            <p
              onClick={() => navigate({ to: "/" })}
              className="cursor-pointer text-sm uppercase tracking-[0.3em] text-deepNavy/60"
            >
              YouTutor
            </p>
            <h1 className="text-2xl font-semibold text-deepNavy">{title}</h1>
            {subtitle && (
              <p className="text-sm text-deepNavy/70 mt-1">{subtitle}</p>
            )}
          </div>
        </div>

        {rightSlot ??
          (showSettingsButton && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenSettings}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray/30 text-deepNavy shadow-sm hover:bg-[#BDF0E6] transition"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>
              <div className="h-11 w-11 rounded-2xl bg-white border border-gray/30 flex items-center justify-center shadow-md">
                <UserCircle2 className="h-6 w-6 text-deepNavy" />
              </div>
            </div>
          ))}
      </div>
    </header>
  );
};

export default ChatHeader;
