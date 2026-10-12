/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        jade: { 900: '#0B3D37', 800: '#092E29', 700: '#0E4F47', 500: '#1C6F63', 100: '#DCE8E3' },
        paper: '#EAF4F1',
        muted: '#A9C6BF',
        faint: '#7FA39B',
        amber: { 500: '#E8A33D' }, // primary action buttons + the one homepage band. Nothing else.
        shell: '#F4F6F3',
        ink: { 900: '#16211E', 600: '#4C5A55', 400: '#809790' },
        line: 'rgba(22,33,30,.12)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Karla', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        urdu: ['"Noto Nastaliq Urdu"', '"Jameel Noori Nastaleeq"', 'serif'],
      },
      maxWidth: { prose: '68ch' },
    },
  },
  plugins: [],
}
