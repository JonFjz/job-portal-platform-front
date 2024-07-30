/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    content: ['./src/**/*.{html,js,vue}'],
    theme: {
        extend: {
            fontFamily: {
                switzer: ['Switzer', 'sans-serif']
            },
            fontWeight: {
                light: 300,
                normal: 400,
                medium: 500,
                semibold: 600,
                bold: 700
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    sm: '1.5rem',
                    lg: '2.5rem',
                    xl: '3.5rem',
                    '2xl': '4rem',
                },
            },
        },
    },
    plugins: [],
}
