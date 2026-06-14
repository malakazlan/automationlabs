/* Direction D design tokens for the mockup set. Loaded after the Tailwind Play CDN. */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: '#F6F4F0',
        ink: '#191714',
        cobalt: { DEFAULT: '#1D4ED8', dark: '#1E3FAE', soft: '#EAEEFB' },
      },
      maxWidth: { content: '1200px' },
    },
  },
};
