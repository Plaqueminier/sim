import { Link } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokensTab } from "./tokens-tab";
import { ComponentsTab } from "./components-tab";

export function DesignShowcase() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl p-6">
        <Link
          to="/"
          className="text-muted-foreground hover:text-foreground text-sm transition-colors"
        >
          ← Back to home
        </Link>
        <h1 className="text-4xl font-bold mt-6 mb-2">Design System</h1>
        <p className="text-muted-foreground mb-8">
          Design tokens and generic components. Static reference:{" "}
          <span className="font-mono text-xs">docs/colors.html</span>
        </p>

        <Tabs defaultValue="tokens">
          <TabsList className="bg-surface-1">
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
          </TabsList>

          <TabsContent value="tokens" className="mt-8">
            <TokensTab />
          </TabsContent>

          <TabsContent value="components" className="mt-8">
            <ComponentsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
