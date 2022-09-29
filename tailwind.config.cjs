/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundImage: {
        cta: "url('/assets/shared/bg-pattern-call-to-action.svg')",
        'pattern-leaf': "url('/assets/shared/bg-pattern-leaf.svg')",
        'circle-pattern': "url('/assets/shared/bg-pattern-hero-desktop.svg')",
        'contact-bottom-mobile':
          "url('/assets/contact/bg-bottom-pattern-mobile.svg')",
        'contact-mobile':
          "url('/assets/contact/bg-pattern-hero-contact-mobile.svg')"
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif']
      },
      fontSize: {
        heading1: ['3rem', '3rem'],
        heading2: [
          '2.5rem',
          {
            letterSpacing: '2px',
            lineHeight: '3rem'
          }
        ],
        heading3: [
          '1.25rem',
          {
            letterSpacing: '5px',
            lineHeight: '1.625rem'
          }
        ],
        body: ['1rem', '1.625rem']
      },
      colors: {
        peach: {
          300: '#FFAD9B',
          500: '#E7816B'
        },
        gray: {
          300: '#F1F3F5',
          700: '#333136',
          900: '#1D1C1E'
        }
      }
    }
  },
  plugins: []
}
