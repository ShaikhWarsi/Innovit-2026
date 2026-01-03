/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Orbitron', 'sans-serif'],
            },
            colors: {
                'bg-primary': '#0a0a1a',
                'bg-secondary': '#13131f',
                'bg-tertiary': '#1a1a2a',
                // Indian Tri-color Patriotic Theme
                'saffron': {
                    400: '#FF9933',
                    500: '#FF8C00',
                    600: '#FF7700',
                    700: '#FF6600',
                },
                'india-white': {
                    400: '#FFFFFF',
                    500: '#F5F5F5',
                },
                'india-green': {
                    400: '#138808',
                    500: '#0F6605',
                    600: '#0A5503',
                    700: '#064401',
                },
                'ashoka-blue': {
                    400: '#1E3A8A',
                    500: '#1E40AF',
                    600: '#1E3A9A',
                    700: '#172554',
                },
            },
        },
    },
    plugins: [],
}
