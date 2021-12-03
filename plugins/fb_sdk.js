export default (ctx, inject) => {

  const init = (options) => {
    window.FB.init(options)
  }

  inject("initFB", () => {

    if (process.browser) {

      init({
        appId            : 'your-app-id',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v12.0'
      })

      console.log('Facebook SDK Ready')

      window.$nuxt.$emit('fb_init')

    }

  })

}
