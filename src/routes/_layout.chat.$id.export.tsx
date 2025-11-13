import { createFileRoute } from "@tanstack/react-router";
import Export from "../pages/Export";

export const Route = createFileRoute("/_layout/chat/$id/export")({
  component: Export
});
