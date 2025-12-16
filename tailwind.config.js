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
                'bg-primary': '#0a0a0f',
                'bg-secondary': '#13131a',
                'bg-tertiary': '#1a1a24',
            },
        },
    },
    plugins: [],
}
