// Maps a friendly language id to its Prism grammar name + a default filename
// extension used when generating a suggested export filename.
export const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', prism: 'javascript', ext: 'js' },
  { value: 'typescript', label: 'TypeScript', prism: 'typescript', ext: 'ts' },
  { value: 'jsx', label: 'JSX', prism: 'jsx', ext: 'jsx' },
  { value: 'tsx', label: 'TSX', prism: 'tsx', ext: 'tsx' },
  { value: 'python', label: 'Python', prism: 'python', ext: 'py' },
  { value: 'java', label: 'Java', prism: 'java', ext: 'java' },
  { value: 'csharp', label: 'C#', prism: 'csharp', ext: 'cs' },
  { value: 'cpp', label: 'C++', prism: 'cpp', ext: 'cpp' },
  { value: 'c', label: 'C', prism: 'c', ext: 'c' },
  { value: 'go', label: 'Go', prism: 'go', ext: 'go' },
  { value: 'rust', label: 'Rust', prism: 'rust', ext: 'rs' },
  { value: 'ruby', label: 'Ruby', prism: 'ruby', ext: 'rb' },
  { value: 'php', label: 'PHP', prism: 'php', ext: 'php' },
  { value: 'swift', label: 'Swift', prism: 'swift', ext: 'swift' },
  { value: 'kotlin', label: 'Kotlin', prism: 'kotlin', ext: 'kt' },
  { value: 'sql', label: 'SQL', prism: 'sql', ext: 'sql' },
  { value: 'bash', label: 'Bash', prism: 'bash', ext: 'sh' },
  { value: 'json', label: 'JSON', prism: 'json', ext: 'json' },
  { value: 'yaml', label: 'YAML', prism: 'yaml', ext: 'yaml' },
  { value: 'markdown', label: 'Markdown', prism: 'markdown', ext: 'md' },
  { value: 'css', label: 'CSS', prism: 'css', ext: 'css' },
  { value: 'markup', label: 'HTML', prism: 'markup', ext: 'html' },
  { value: 'plaintext', label: 'Plain text', prism: null, ext: 'txt' },
]

export function getLanguage(value) {
  return LANGUAGES.find(l => l.value === value) ?? LANGUAGES[0]
}
