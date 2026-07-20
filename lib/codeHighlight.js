/**
 * lib/codeHighlight.js
 *
 * Thin wrapper around Prism.js. Tokenizes source into `<span class="token
 * ...">` markup; actual colors come from the selected CODE_THEMES entry via
 * CSS variables (see app/globals.css `.code-window`), not from Prism's own
 * theme stylesheets. Client-only — import from 'use client' components.
 */
import Prism from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'
import { getLanguage } from '@/constants/languages'

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Returns tokenized HTML for the given source + language id (safe to inject). */
export function highlightCode(code, languageValue) {
  const lang = getLanguage(languageValue)
  const grammar = lang.prism && Prism.languages[lang.prism]
  if (!grammar) return escapeHtml(code)
  try {
    return Prism.highlight(code, grammar, lang.prism)
  } catch {
    return escapeHtml(code)
  }
}
