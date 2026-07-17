import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif TC"', 'ui-serif', 'Georgia', 'serif']
      }
    }
  }
}
