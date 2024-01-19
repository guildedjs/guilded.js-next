const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

colors.lightBlue = undefined;
colors.warmGray = undefined;
colors.trueGray = undefined;
colors.coolGray = undefined;
colors.blueGray = undefined;
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-mono)", ...fontFamily.sans],
			},
			borderWidth: {
				".5": ".5px",
			},
			borderColor: {
				guilded: "#F5C400",
				slate: "#292B32",
			},
			colors: {
				gray: "#191B1F",
				guilded: "#F5C400",
				black: "#111820",
				slate: "#292B32",
				white: "#ececee",
			},
		},
	},
	plugins: [],
};
