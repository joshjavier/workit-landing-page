const markdownIt = require('markdown-it')

module.exports = (config) => {
  config.addPassthroughCopy('src/images')
  config.addPassthroughCopy('src/fonts')

  // Add filter to transform markdown to HTML
  config.addFilter('md', (content) => {
    const md = new markdownIt({ html: true })
    let inline = !content.includes('\n') || content.length < 200

    return inline ? md.renderInline(content) : md.render(content)
  })

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  }
}
