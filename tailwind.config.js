/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/src/assets/images/appointment.png')",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        dptheme: {
          primary: "#0FCFEC",

          secondary: "#19D3AE",

          accent: "#3A4256",

          neutral: "#3D4451",

          "base-100": "#FFFFFF",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#F87272",
        },
      },
    ],
  },
};
