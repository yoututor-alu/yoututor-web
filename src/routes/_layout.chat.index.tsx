import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/chat/")({
  component: () => {
    return <Navigate to="/" />;
  }
});
