/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'hsl(262, 83%, 58%)',
                'primary-dark': 'hsl(262, 83%, 48%)',
                accent: 'hsl(142, 76%, 36%)',
                'accent-light': 'hsl(142, 76%, 46%)',
                background: 'hsl(240, 10%, 3.9%)',
                card: 'hsl(240, 4%, 9%)',
                'card-hover': 'hsl(240, 4%, 12%)',
                text: 'hsl(0, 0%, 98%)',
                'text-muted': 'hsl(0, 0%, 65%)',
                border: 'hsl(240, 3.7%, 15.9%)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'gradient': 'gradient 3s ease infinite',
                'slide-up': 'slideUp 0.3s ease-out',
                'fade-in': 'fadeIn 0.5s ease-out',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': {
                        backgroundPosition: '0% 50%',
                    },
                    '50%': {
                        backgroundPosition: '100% 50%',
                    },
                },
                slideUp: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(10px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                fadeIn: {
                    '0%': {
                        opacity: '0',
                    },
                    '100%': {
                        opacity: '1',
                    },
                },
            },
        },
    },
    plugins: [],
}
