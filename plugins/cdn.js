export default (ctx, inject) => {

  /**
   * @param url { String }
   */
  inject("CDN", (url) => {
    /**
     * @global
     */
    return (/^(http|https)/.test(url) ? url : process.env.CDN_DOMAIN + url)
  })

}
