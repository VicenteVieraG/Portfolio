/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			colors: {
				"dark-blue": "#1B263B",
				"dark-gray": "#2C2C2C"
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
