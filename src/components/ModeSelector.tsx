import { Button } from "@/components/ui/button";

type Mode = "today" | "week" | "total";

interface ModeSelectorProps {
  selectedMode: Mode;
  onModeChange: (mode: Mode) => void;
}

export function ModeSelector({ selectedMode, onModeChange }: ModeSelectorProps) {
  const modes = [
    { id: "today" as const, label: "Today" },
    { id: "week" as const, label: "This Week" },
    { id: "total" as const, label: "Total" },
  ];

  return (
    <div className="flex bg-card border border-border/50 rounded-lg p-1 gap-1">
      {modes.map((mode) => (
        <Button
          key={mode.id}
          variant={selectedMode === mode.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onModeChange(mode.id)}
          className={`transition-all duration-200 ${
            selectedMode === mode.id
              ? "bg-primary text-primary-foreground shadow-glow-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          {mode.label}
        </Button>
      ))}
    </div>
  );
}