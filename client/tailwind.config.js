module.exports = {
    theme: {
        extend: {
            colors: {
                primary: "#0ae448",
                secondary: "#abff84",
                gray: {
                    900: "#0d0d0d", // Darker gray (almost black)
                    950: "#050505", // Deep black
                },
            },
            backgroundImage: {
                'primary-gradient': 'linear-gradient(90deg, #0ae448, #abff84)',
            },
            borderImage: {
                'primary-gradient': 'linear-gradient(90deg, #0ae448, #abff84)',
            },
            borderImageSlice: {
                '1': '1', // Ensures full gradient is applied to border
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.border-gradient': {
                    borderImage: 'linear-gradient(90deg, #0ae448, #abff84) 1',
                },
            });
        },
    ],
};
