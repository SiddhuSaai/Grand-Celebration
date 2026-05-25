import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#090C16',
        gold: '#CFA85B',
        champagne: '#F4D89A',
        navy: '#0B1020',
        wine: '#7A263D',
        plum: '#24152B',
        emerald: '#174C43',
        sage: '#65795E',
        rose: '#B76E79',
        cream: '#F6EFE3',
        ivory: '#FFF8EC',
        pearl: '#FFFDF8',
        charcoal: '#272330'
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif']
      },
      boxShadow: {
        luxe: '0 24px 70px rgba(9, 12, 22, 0.16)',
        premium: '0 30px 95px rgba(122, 38, 61, 0.2)'
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #CFA85B 0%, #F4D89A 100%)',
        'premium-dark': 'linear-gradient(135deg, #090C16 0%, #24152B 46%, #7A263D 100%)',
        'premium-soft': 'linear-gradient(135deg, #FFFDF8 0%, #F6EFE3 58%, #F4D89A 100%)',
        'emerald-luxe': 'linear-gradient(135deg, #090C16 0%, #174C43 52%, #65795E 100%)'
      }
    }
  },
  plugins: []
};

export default config;
