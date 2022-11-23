// /** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    } else {
      return `rgb(var(${variableName}))`;
    }
  };
}

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    extend: {
      screens: {
      ...defaultTheme.screens,
        "2xl": "1440px",
      },
      fontFamily: {
        body: ["Open Sans", "system-ui", "sans-serif"],
        heading: ["Open Sans", "system-ui", "sans-serif"],
      },
      colors: {
        light: withOpacity("--color-light"),
        dark: withOpacity("--color-dark"),
        accent: withOpacity("--color-accent"),
        "accent-hover": withOpacity("--color-accent-hover"),
        "accent-300": withOpacity("--color-accent-300"),
        "accent-400": withOpacity("--color-accent-400"),
        "accent-500": withOpacity("--color-accent-500"),
        "accent-600": withOpacity("--color-accent-600"),
        "accent-700": withOpacity("--color-accent-700"),
        "border-50": withOpacity("--color-border-50"),
        "border-100": withOpacity("--color-border-100"),
        "border-200": withOpacity("--color-border-200"),
        "border-base": withOpacity("--color-border-base"),
        "border-400": withOpacity("--color-border-400"),
        "gray-50": withOpacity("--color-gray-50"),
        "gray-100": withOpacity("--color-gray-100"),
        "gray-200": withOpacity("--color-gray-200"),
        "gray-300": withOpacity("--color-gray-300"),
        "gray-400": withOpacity("--color-gray-400"),
        "gray-500": withOpacity("--color-gray-500"),
        "gray-600": withOpacity("--color-gray-600"),
        "gray-700": withOpacity("--color-gray-700"),
        "gray-800": withOpacity("--color-gray-800"),
        "gray-900": withOpacity("--color-gray-900"),
        "orange-50": withOpacity("--color-red-50"),
        "orange-100": withOpacity("--color-red-100"),
        "orange-200": withOpacity("--color-red-200"),
        "orange-300": withOpacity("--color-red-300"),
        "orange-400": withOpacity("--color-red-400"),
        "orange-500": withOpacity("--color-red-500"),
        "orange-600": withOpacity("--color-red-600"),
        "orange-700": withOpacity("--color-red-700"),
        "orange-800": withOpacity("--color-red-800"),
        "orange-900": withOpacity("--color-red-900"),
        
      },

      textColor: {
        body: withOpacity("--text-base"),
        "body-dark": withOpacity("--text-base-dark"),
        muted: withOpacity("--text-muted"),
        "muted-light": withOpacity("--text-muted-light"),
        heading: withOpacity("--text-heading"),
        "sub-heading": withOpacity("--text-sub-heading"),
        bolder: withOpacity("--text-text-bolder"),
      },

      height: {
        13: "3.125rem",
        double: "200%",
      },
      maxWidth: {
        5: "1.25rem",
      },
      maxHeight: {
        5: "1.25rem",
      },
      spacing: {
        22: "5.5rem",
      },

      borderRadius: {
        DEFAULT: "5px",
      },

      boxShadow: {
        base: "rgba(0, 0, 0, 0.16) 0px 4px 16px",
      },
      gridTemplateColumns: {
        fit: "repeat(auto-fit, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
