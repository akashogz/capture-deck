'use client'
import { useMemo } from 'react'
import { highlightCode } from '@/lib/codeHighlight'
import { getCodeTheme } from '@/constants/codeThemes'

export function CodeCard({ code, borderRadius, shadow }) {
  const theme = getCodeTheme(code.theme)
  const lines = code.code.split('\n')

  const highlightedLines = useMemo(
    () => lines.map(line => highlightCode(line || ' ', code.language)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [code.code, code.language]
  )

  const themeVars = {
    '--tok-comment': theme.comment,
    '--tok-keyword': theme.keyword,
    '--tok-string': theme.string,
    '--tok-number': theme.number,
    '--tok-function': theme.function,
    '--tok-classname': theme.className,
    '--tok-punctuation': theme.punctuation,
    '--tok-tag': theme.tag,
    '--tok-attrname': theme.attrName,
  }

  return (
    <div
      className="code-window overflow-hidden"
      style={{
        borderRadius: `${borderRadius}px`,
        boxShadow: shadow,
        background: theme.background,
        color: theme.text,
        minWidth: 360,
        maxWidth: 900,
        ...themeVars,
      }}
    >
      {code.showWindowChrome && (
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ background: theme.chromeBackground }}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
          </div>
          {code.fileName && (
            <span
              className="mx-auto text-xs font-medium tracking-wide"
              style={{ color: theme.comment, fontFamily: 'var(--font-jetbrains)' }}
            >
              {code.fileName}
            </span>
          )}
        </div>
      )}

      <pre
        className="m-0 overflow-x-auto"
        style={{
          fontFamily: 'var(--font-jetbrains)',
          fontSize: `${code.fontSize}px`,
          lineHeight: 1.6,
          padding: '24px 28px',
          background: theme.background,
        }}
      >
        <code>
          {highlightedLines.map((html, i) => (
            <div key={i} className="flex">
              {code.showLineNumbers && (
                <span
                  className="select-none text-right pr-5 shrink-0"
                  style={{ color: theme.lineNumber, minWidth: `${String(lines.length).length + 1.5}ch` }}
                >
                  {i + 1}
                </span>
              )}
              <span dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
