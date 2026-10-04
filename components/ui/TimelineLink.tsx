"use client";

import { useTimeTravel } from "@/components/context/TimeTravelContext";
import { ReactNode } from "react";

interface TimelineLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  "data-article"?: string;
  [key: string]: unknown;
}

export function TimelineLink({ href, children, className, onClick, ...props }: TimelineLinkProps) {
  const { navigateWithTransition } = useTimeTravel();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick();
    navigateWithTransition(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
