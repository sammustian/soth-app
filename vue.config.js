module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://www.fleaflicker.com/',
        changeOrigin: true,
        logLevel: 'debug' // this what you want
      },
    }
  }
}
