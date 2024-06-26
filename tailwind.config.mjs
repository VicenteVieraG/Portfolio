/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                Spurple: "#3F0071",
                Spink: "#FB2576",
                Sblue: "#332FD0",
                Snavy: "#0002A1",
                "select-color": "var(--select-color)"
            }
        }
    },
    plugins: [require("@tailwindcss/typography")]
};
