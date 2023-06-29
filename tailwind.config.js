/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "-white": "#FFFFFF",
        "-columbiaBlue": "#D5F0FE",
        "-uranianBlue": "#AAE1FE",
        "-paleAzure": "#80D3FD",
        "-deepSkyBlue": "#55C4FC",
        "-pictonBlue": "#00a6fb",
        "-steelBlue": "#0582ca",
        "-lapisLazuliBlue": "#006494",
        "-prussianBlue": "#003554",
        "-lightGrey": "#A0ACBD",
        "-grey": "#232323",
        "-darkGrey": "#404040",
        "-smoothBlack": "#1c1c1c",
        "-richBlack": "#000000",
        "-deepRed": "#dc2626",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
