import { createFileRoute } from "@tanstack/react-router";
import Chat from "../pages/Chat";

export const Route = createFileRoute("/_layout/chat")({
  component: Chat
});
