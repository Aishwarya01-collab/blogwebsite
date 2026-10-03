"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="font-display text-3xl font-bold text-text-primary mt-10 mb-4 leading-tight">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="font-display text-2xl font-bold text-text-primary mt-8 mb-3 leading-tight border-b border-border pb-2">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-display text-xl font-semibold text-text-primary mt-6 mb-2">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-text-secondary leading-relaxed mb-5 text-[17px]">
            {children}
          </p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-green-bright underline underline-offset-2 hover:text-green-bright/80 transition-colors"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        ),
        code: ({ inline, children }: { inline?: boolean; children?: React.ReactNode }) =>
          inline ? (
            <code className="bg-surface-raised text-green-bright px-1.5 py-0.5 rounded text-[14px] font-mono">
              {children}
            </code>
          ) : (
            <code className="block bg-surface border border-border rounded-sm p-4 mb-5 text-sm font-mono text-text-primary overflow-x-auto leading-relaxed whitespace-pre">
              {children}
            </code>
          ),
        pre: ({ children }) => (
          <pre className="mb-5 overflow-x-auto">{children}</pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-green-bright/50 pl-5 my-6 text-text-muted italic">
            {children}
          </blockquote>
        ),
        ul: ({ children }) => (
          <ul className="list-none mb-5 space-y-1.5 pl-1">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-5 space-y-1.5 text-text-secondary">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-text-secondary text-[17px] leading-relaxed flex gap-2">
            <span className="text-green-bright mt-1.5 shrink-0">›</span>
            <span>{children}</span>
          </li>
        ),
        hr: () => <div className="divider my-8" />,
        strong: ({ children }) => (
          <strong className="text-text-primary font-semibold">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="text-text-muted italic">{children}</em>
        ),
        img: ({ src, alt }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || ""}
            className="w-full rounded-sm border border-border my-6 object-cover"
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
