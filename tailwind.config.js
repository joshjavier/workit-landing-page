const plugin = require('tailwindcss/plugin')
const postcssJs = require('postcss-js')
const postcss = require('postcss')

const tokensToTailwind = require('./src/css-utils/tokens-to-tailwind.js')
const clampGenerator = require('./src/css-utils/clamp-generator.js')

// Raw design tokens
const colorTokens = require('./src/design-tokens/colors.json')
const fontTokens = require('./src/design-tokens/fonts.json')
const textSizeTokens = require('./src/design-tokens/text-sizes.json')

// Process design tokens
const colors = tokensToTailwind(colorTokens.items)
const fontFamily = tokensToTailwind(fontTokens.items)
const fontSize = tokensToTailwind(clampGenerator(textSizeTokens.items))

module.exports = {
  content: ['./src/**/*.{html,js,njk}'],

  // Disable Tailwind's base styles
  corePlugins: { preflight: false },

  theme: {
    colors,
    fontFamily,
    fontSize,
    /**
     * For spacing, we'll use Tailwind's default spacing scale for static values
     * and to create fluid spacing on the fly with the help of CSS locks.
     */
    backgroundColor: ({ theme }) => theme('colors'),
    textColor: ({ theme }) => theme('colors'),
  },

  plugins: [
    // Generate CSS variables from Tailwind config and add them to :root
    plugin(function ({ addComponents, config }) {
      let result = ''

      const currentConfig = config()

      const groups = [
        { key: 'colors', prefix: 'color' },
        { key: 'fontFamily', prefix: 'font' },
        { key: 'fontSize', prefix: 'size' },
        { key: 'spacing', prefix: 'space' },
      ]

      groups.forEach(({ key, prefix }) => {
        const group = currentConfig.theme[key]
        if (!group) return
        Object.keys(group).forEach((key) => {
          result += `--${prefix}-${key}: ${group[key]};`
        })
      })

      addComponents({
        ':root': postcssJs.objectify(postcss.parse(result)),
      })
    }),
  ],
}
