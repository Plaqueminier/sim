import { createFileRoute } from "@tanstack/react-router";
import { DesignShowcase } from "@/pages/design";

export const Route = createFileRoute("/design/")({
  component: DesignShowcase,
});
