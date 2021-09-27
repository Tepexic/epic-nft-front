module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        ident: "postcss",
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
  },
};
