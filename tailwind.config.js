/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        purple: {
          primary: "#635FC7",
          hover: "#ABA4ff",
        },
        black: {
          primary: "#000112",
          hover: "#20212c",
        },
        white: {
          primary: "#ffffff",
          hover: "#f4f7fD",
        },
        red: {
          primary: "#EA5555",
          hover: "#FF9898",
        },
        grey: {
          primary: "#828FA3",
          hover: "#E4EBFA",
        },
        dark: {
          grey: {
            primary: "#2B2C37",
            hover: "#3E3F4E",
          },
        },
      },
    },
  },
  plugins: [],
};
