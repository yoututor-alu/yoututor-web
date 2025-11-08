import React from "react";
import { Menu, Settings, LogOut } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import UserAvatar from "./UserAvatar";
import { useWrapperContext } from "./Wrapper";

interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
  onOpenHistory?: () => void;
  onToggleSidebar?: () => void;
  showMenuButton?: boolean;
  showSettingsButton?: boolean;
  rightSlot?: React.ReactNode;
}

const ChatHeader = ({
  title = "Interactive Session",
  subtitle,
  onOpenHistory,
  onToggleSidebar,
  showMenuButton = true,
  showSettingsButton = true,
  rightSlot
}: ChatHeaderProps) => {
  const navigate = useNavigate();
  const { handleLogout } = useWrapperContext();

  const handleSettingsClick = () => {
    navigate({ to: "/settings" });
  };

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
            <h1 className="hidden sm:block text-2xl font-semibold text-deepNavy">
              {title}
            </h1>
            {subtitle && (
              <p className="hidden sm:block text-sm text-deepNavy/70 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {rightSlot ??
          (showSettingsButton && (
            <ChakraMenu>
              <MenuButton
                as="button"
                className="focus:outline-none focus:ring-2 focus:ring-deepNavy/20 rounded-full"
              >
                <UserAvatar className="cursor-pointer hover:ring-2 hover:ring-deepNavy/20 transition" />
              </MenuButton>
              <MenuList
                minW="180px"
                bg="white"
                border="1px solid"
                borderColor="rgba(0, 0, 0, 0.1)"
                borderRadius="xl"
                boxShadow="lg"
                p={1}
                zIndex={50}
              >
                <MenuItem
                  onClick={handleSettingsClick}
                  className="flex items-center gap-2"
                  _hover={{ bg: "#BDF0E6" }}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                  _hover={{ bg: "red.50", color: "red.600" }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </MenuItem>
              </MenuList>
            </ChakraMenu>
          ))}
      </div>
    </header>
  );
};

export default ChatHeader;
