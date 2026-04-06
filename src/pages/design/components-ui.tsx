import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Section, Showcase } from "./shared";

export function ComponentsUI() {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  return (
    <div className="space-y-12">
      <Section title="Button">
        <div className="space-y-6">
          <Showcase title="Variants" description="variant: default | secondary | outline | ghost | destructive | link">
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </Showcase>

          <Showcase title="Sizes" description="size: lg | default | sm | icon">
            <div className="flex flex-wrap items-center gap-2">
              <Button size="lg">Large</Button>
              <Button size="default">Default</Button>
              <Button size="sm">Small</Button>
              <Button size="icon">+</Button>
            </div>
          </Showcase>

          <Showcase title="States" description="disabled">
            <div className="flex flex-wrap gap-2">
              <Button disabled>Disabled Primary</Button>
              <Button variant="secondary" disabled>Disabled Secondary</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
            </div>
          </Showcase>
        </div>
      </Section>

      <Section title="Badge">
        <Showcase title="Variants" description="variant: default | secondary | outline | destructive | custom accent">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge style={{ background: "color-mix(in srgb, var(--sim-ca) 15%, transparent)", color: "var(--sim-ca)" }}>Automata</Badge>
            <Badge style={{ background: "color-mix(in srgb, var(--sim-sorting) 15%, transparent)", color: "var(--sim-sorting)" }}>Sorting</Badge>
            <Badge style={{ background: "color-mix(in srgb, var(--sim-life) 15%, transparent)", color: "var(--sim-life)" }}>Life</Badge>
            <Badge style={{ background: "color-mix(in srgb, var(--sim-particles) 15%, transparent)", color: "var(--sim-particles)" }}>Particles</Badge>
            <Badge style={{ background: "color-mix(in srgb, var(--sim-pathfinding) 15%, transparent)", color: "var(--sim-pathfinding)" }}>Pathfinding</Badge>
            <Badge style={{ background: "color-mix(in srgb, var(--sim-physics) 15%, transparent)", color: "var(--sim-physics)" }}>Physics</Badge>
          </div>
        </Showcase>
      </Section>

      <Section title="Card">
        <Showcase title="Content Card" description="Card, CardHeader, CardTitle, CardDescription, CardContent">
          <div className="max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>A short description of the card's content.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Any content can go here — controls, text, images.</p>
              </CardContent>
            </Card>
          </div>
        </Showcase>
      </Section>

      <Section title="Tabs">
        <Showcase title="Tab Navigation" description="Tabs, TabsList, TabsTrigger, TabsContent">
          <Tabs defaultValue="first">
            <TabsList>
              <TabsTrigger value="first">First</TabsTrigger>
              <TabsTrigger value="second">Second</TabsTrigger>
              <TabsTrigger value="third">Third</TabsTrigger>
            </TabsList>
            <TabsContent value="first" className="mt-3">
              <p className="text-sm text-muted-foreground">Content for the first tab.</p>
            </TabsContent>
            <TabsContent value="second" className="mt-3">
              <p className="text-sm text-muted-foreground">Content for the second tab.</p>
            </TabsContent>
            <TabsContent value="third" className="mt-3">
              <p className="text-sm text-muted-foreground">Content for the third tab.</p>
            </TabsContent>
          </Tabs>
        </Showcase>
      </Section>

      <Section title="Tooltip">
        <Showcase title="Hover Tooltip" description="TooltipProvider, Tooltip, TooltipTrigger, TooltipContent">
          <TooltipProvider>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">?</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Help text goes here</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </Showcase>
      </Section>

      <Section title="Collapsible">
        <Showcase title="Expandable Section" description="Collapsible, CollapsibleTrigger, CollapsibleContent">
          <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
            <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium">
              <ChevronDown className={`h-4 w-4 transition-transform ${collapsibleOpen ? "rotate-180" : ""}`} />
              Click to {collapsibleOpen ? "collapse" : "expand"}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-3 p-3 bg-surface-2 rounded-lg">
                <p className="text-sm text-muted-foreground">This content is collapsible. Any children work here.</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Showcase>
      </Section>

      <Section title="Separator">
        <Showcase title="Visual Divider" description="orientation: horizontal | vertical">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Above</p>
              <Separator />
              <p className="text-sm text-muted-foreground mt-2">Below</p>
            </div>
            <div className="flex items-center gap-4 h-8">
              <span className="text-sm text-muted-foreground">Left</span>
              <Separator orientation="vertical" />
              <span className="text-sm text-muted-foreground">Right</span>
            </div>
          </div>
        </Showcase>
      </Section>
    </div>
  );
}
