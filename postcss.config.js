module.exports = (ctx) => ({
  plugins: {
    'postcss-import-ext-glob': {},
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    cssnano: ctx.env === 'production' ? {} : false,
  },
})
