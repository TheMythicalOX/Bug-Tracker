/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "pritext": "#4754b2",
                "back": "#ffdce2",
                "darkback": "#240006",
                "primary": "#ba59b5",
                "secondary": "#87588c",
                "accent": "#CB429F"
            }
        }
    },
    plugins: []
};
