export default function ({ $axios, redirect, $cookies, app }) {



  $axios.setToken($cookies.get('_token') || '', 'Bearer')

  $axios.onRequest(config => {
    // config.withCredentials = true
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 404) {
      redirect('/404')
    }

    // Unauthorized yêu cầu đăng nhập
    if (code === 401) {
      redirect('/?action=loginModal')
    }

    const data = error.response.data
    if(typeof data === 'object' && data !== null && data.code === 2 && data.msg) {

      if(process.browser) {
        window.$nuxt.$emit('pushNotify', { msg: data.msg, success: false })
      }

    }

  })

  $axios.onResponse(response => {
    console.log('Response from ' + response.config.url)
    const data = response.data
    if(typeof data === 'object' && data !== null && data.code === 2 && data.msg) {

      if(process.browser) {
        window.$nuxt.$emit('pushNotify', { msg: data.msg, success: true })
      }

    }
  })
}
