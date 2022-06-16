module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import "src/sass/abstracts/_color.scss";
          @import "src/sass/abstracts/_fonts.scss";
        `,
      },
    },
  },
};