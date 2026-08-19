import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif TC"', 'ui-serif', 'Georgia', 'serif']
      },
      colors: {
        morandi: {
          50: '#F7F2EA',
          100: '#EFE7D9',
          200: '#E1D5C1',
          300: '#CBB9A0',
          400: '#AB9578',
          500: '#705D46',
          700: '#5C4E3C',
          800: '#453A2C',
          900: '#332A20',
          950: '#241D16'
        },
        clay: {
          200: '#E3C8AE',
          600: '#96633C',
          700: '#7C5030'
        }
      }
    }
  }
}
