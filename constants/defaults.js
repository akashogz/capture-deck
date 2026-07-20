  export const DEFAULT_SETTINGS = {
    backgroundRatio: 'auto',
    backgroundType: 'gradient',
    backgroundColor: '#1a1a2e',
    backgroundImage: '',
    gradientId: 'purple-pink',
    gradientFrom: '#8B5CF6',
    gradientTo: '#EC4899',
    gradientAngle: 135,

    frameType: 'minimal',

    paddingPreset: 'comfortable',
    paddingValue: 60,
    borderRadius: 12,
    imageScale: 0.88,

    shadowSize: 'large',
    shadowColor: '#000000',

    exportFormat: 'png',
    exportQuality: 'high',
    exportResolution: '720p',
    transparentBackground: false,
    customFilename: '',
  }

  export const DEFAULT_VIEWPORT = {
    preset: 'desktop',
    width: 1440,
    height: 2560,
    fullPage: false,
    darkMode: false,
    delay: 0,
    blockAds: false,
    hideCookieBanner: false,
  }

  // ─── Content-mode defaults ──────────────────────────────────────────────────
  // Each non-website mode owns its own content object so switching modes never
  // loses what the user typed into another one.

  export const DEFAULT_CODE = {
    code: `function greet(name) {\n  const message = \`Hello, \${name}!\`\n  console.log(message)\n  return message\n}\n\ngreet('world')`,
    language: 'javascript',
    theme: 'dracula',
    fileName: 'index.js',
    fontSize: 15,
    showLineNumbers: true,
    showWindowChrome: true,
  }

  export const DEFAULT_QUOTE = {
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    role: 'Co-founder, Apple',
    font: 'serif',
    fontSize: 40,
    quoteCardBorderRadius: 0,
    align: 'center',
    textColor: '#ffffff',
    showQuoteMark: true,
  }

  export const DEFAULT_LYRICS = {
    text: 'Blackbird singing in the dead of night\nTake these broken wings and learn to fly\nAll your life\nYou were only waiting for this moment to arise',
    title: 'Blackbird',
    artist: 'The Beatles',
    font: 'sans',
    cover: null,
    lyricsCardBorderRadius: 12,
    fontSize: 28,
    align: 'center',
    textColor: '#ffffff',
    showMusicIcon: true,
  }
