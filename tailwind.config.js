/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'porter': ['Porter Sans Block', 'sans-serif']
      },
      inset: {
        '0': '0',
        auto: 'auto',
        '5': '5%',
        '10': '10%',
        '15': '15%',
        '20': '20%',
        '25': '25%',
        '30': '30%',
        '35': '35%',
        '40': '40%',
        '45': '45%',
        '50': '50%',
        '55': '55%',
        '59': '59%',
        '60': '60%',
        '65': '65%',
        '70': '70%',
        '75': '75%',
        '80': '80%',
        '85': '85%',
        '90': '90%',
        '95': '95%',
        full: '100%',
      },
      fontSize: {
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px
        'tiny': '0.9375rem', // 15px
        'base': '1rem',      // 16px
        'lg': '1.125rem',    // 18px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px
        '3xl': '1.875rem',   // 30px
        '4xl': '2.25rem',    // 36px
        '5xl': '3rem',       // 48px
        '6xl': '3.75rem',    // 60px
        '7xl': '4.4rem',     // 72px
        '8xl': '5.5rem',       // 96px
        '9xl': '8rem',       // 128px
      },
      // Extiende las clases de altura
      height: {
        '10vh': '10vh',
        '50vh': '50vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '90vh': '90vh',
        '95vh': '95vh',
        '100vh': '100vh',
      },
      width: {
        '10': '10%',
        '50': '50%',
        '70': '70%',
        '80': '80%',
        '90': '90%',
        '95': '95%',
        '100': '100%',
      }
    },
    screens: {
      'sm': '340px',
      // => @media (min-width: 640px) { ... }

      'md': '610px',
      // => @media (min-width: 768px) { ... }

      'lg': '768px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1024px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1280px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}

