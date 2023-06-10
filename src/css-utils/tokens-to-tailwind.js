const slugify = require('slugify')

/**
 * Converts human readable tokens into tailwind config friendly ones
 *
 * @param {array} tokens {name: string, value: any}
 * @return {object} {key, value}
 */
module.exports = (tokens) => {
  let response = {}

  const opts = {
    remove: /[^ a-zA-Z0-9]/g, // only keep space, letter, and number characters
    lower: true,
  }
  const nameSlug = (text) => slugify(text, opts)

  tokens.forEach(({ name, value }) => {
    // wrap font names with spaces in double quotes
    if (Array.isArray(value)) {
      value = value.map((font) => (font.includes(' ') ? `"${font}"` : font))
    }

    response[nameSlug(name)] = value
  })

  return response
}
