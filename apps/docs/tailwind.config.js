const colors = require("tailwindcss/colors");
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-mono)', ...fontFamily.sans],
			},
			colors: {
				...colors,
			},
			borderWidth: {
				".5": ".5px",
			},
			borderColor: {
				guilded: "#F5C400",
			},
			colors: {
				"dark-gray": "#191B1F",
				gray: "#191B1F",
				guilded: "#F5C400",
				black: "#111820",
				slate: "#292B32",
				white: "#ececee"
			},
		},
	},
	plugins: [],
}