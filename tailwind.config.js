/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1440px",
        contentContainer: "1140px",
        containerSmall: "1024px",
        containerxs: "768px",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        bodyFont: ["Montserrat", "sans-serif"],
        titleFont: ["Inter", "sans-serif"],
      },
      boxShadow: {
        navbarShadow: "0px 10px 30px -10px rgba(2, 12, 27, 0.7)",
      },
      colors: {
        bodyColor: "#131A22",
        textOrange: "#FEBD69",
        textLight: "#ccd6f6",
        textDark: "#8892b0",
        hoverColor: "#000000",
        customBg: "#18202A",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
}

// xs:text-red-500
// sm:text-blue-500
// sml:text-green-500
// md:text-purple-500
// mdl:text-yellow-500
// lg:text-black-500
// lg:text-cyan-500
// lgl:text-indigo-500
// xl:text-rose-500
