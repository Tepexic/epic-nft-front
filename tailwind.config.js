module.exports = {
  important: true,
  purge: ["./src/**/*.vue"],
  prefix: "tw-",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    /**
     * Disables Tailwind's container core plugin
     * See: https://tailwindcss.com/docs/configuration#core-plugins
     */
    container: false,
  },
};
