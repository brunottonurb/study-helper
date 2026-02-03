'use client';

import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { CodeExample } from '@/types';
import { useTheme } from './ThemeProvider';

interface CodeBlockProps {
  example: CodeExample;
}

// Map common language names to Prism language identifiers
const languageMap: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  tsx: 'tsx',
  jsx: 'jsx',
  json: 'json',
  text: 'plain',
  plain: 'plain',
  sql: 'sql',
  bash: 'bash',
  shell: 'bash',
};

export default function CodeBlock({ example }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const language = languageMap[example.language.toLowerCase()] || example.language.toLowerCase();
  const prismTheme = theme === 'dark' ? themes.nightOwl : themes.github;

  return (
    <div className="border border-[var(--border)] bg-[var(--paper)] paper-shadow">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--code-bg)]">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-serif font-medium text-[var(--ink)]">{example.title}</span>
          <span className="text-xs font-mono text-[var(--ink-light)] bg-[var(--paper)] px-2 py-0.5 border border-[var(--border)]">
            {example.language}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="text-[var(--ink-light)] hover:text-[var(--ink)] transition-colors p-1"
        >
          {copied ? (
            <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
      
      <Highlight theme={prismTheme} code={example.code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 overflow-x-auto text-sm leading-relaxed`} style={{ ...style, margin: 0, background: 'transparent' }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      
      {example.explanation && (
        <div className="px-4 py-3 border-t border-[var(--border)] bg-[var(--note-bg)]">
          <p className="text-sm text-[var(--ink-light)] italic">
            <span className="font-serif not-italic text-[var(--accent)]">Note: </span>
            {example.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
