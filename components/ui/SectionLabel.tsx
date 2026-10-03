import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index: string;
  title: string;
  className?: string;
}

export function SectionLabel({ index, title, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-4 mb-10 md:mb-14", className)}>
      {/* Index number */}
      <span className="font-mono text-[10px] tracking-[0.2em] text-tva-amber">
        TIMELINE {index}
      </span>

      {/* Separator line */}
      <div className="h-[1px] w-8 bg-tva-border" />

      {/* Section Title */}
      <span className="font-mono text-[10px] tracking-[0.3em] text-tva-muted uppercase">
        {title}
      </span>

      {/* Growing line to the right */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-tva-border/60 to-transparent" />
    </div>
  );
}
