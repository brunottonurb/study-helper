import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownProps {
  children: string;
  className?: string;
}

export default function Markdown({ children, className = '' }: MarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        // Inline elements
        strong: ({ children }) => <strong className="font-semibold text-[var(--ink)]">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        code: ({ children }) => (
          <code className="bg-[var(--code-bg)] text-[var(--ink)] px-1 py-0.5 text-sm font-mono border border-[var(--border)]">
            {children}
          </code>
        ),
        a: ({ href, children }) => (
          <a href={href} className="text-[var(--accent)] hover:underline" target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        // Block elements
        p: ({ children }) => <span className="inline">{children}</span>,
        ul: ({ children }) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside space-y-1">{children}</ol>,
        li: ({ children }) => <li className="text-sm">{children}</li>,
      }}
    >
      {children}
    </ReactMarkdown>
    </div>
  );
}
