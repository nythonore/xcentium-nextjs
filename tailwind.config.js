/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
		},

		extend: {
			fontFamily: {
				sans: ['Barlow', 'sans-serif'],
			},

			colors: {
				white: '#FFFFFF',
				light: '#F2F5FF',
				primary: '#379FB1',
				danger: '#721c24',
				'danger-light': '#F8D7D9',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
