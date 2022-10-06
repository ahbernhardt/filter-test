module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      'xs': '480px',
      // => @media (min-width: 576px) { ... }

      'sm': '640px',
      // => @media (min-width: 576px) { ... }

      'md': '820px',
      // => @media (min-width: 820px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      colors: {
        'wolves-aurora': '#78BE20',
        'wolves-navy': '#0C2340',
        'wolves-lake': '#236192',
        'wolves-offwhite': '#f3f3f3',
        'wolves-black': '#000000',
        'wolves-white': '#ffffff',
        'wolves-shadow': '#373A36',
        'wolves-moonlight': '#A0A2A3',
      },
      fontFamily: {
        sans: ['futura-pt'],
        ptBold: ['futura-pt-bold'],
        ptCond: ['futura-pt-condensed'],
      },
    },
  },
}
