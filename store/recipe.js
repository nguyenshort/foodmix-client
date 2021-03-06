export const state = () => ({
  recipe: [],
  reviews: [],
  isReady: false,
  isBookmark: false
})

// getters
export const getters = {
  recipe: (state) => state.recipe,
  isReady: (state) => state.isReady,
  reviews: (state) => state.reviews,
  isBookmark: (state) => state.isBookmark
}

// mutations
export const mutations = {
  SET_RECIPE(state, data) {
    state.recipe = data
  },

  SET_IS_READY(state, data) {
    state.isReady = data
  },

  SET_REVIEWS(state, data) {
    state.reviews = data
  },

  PUSH_REVIEWS(state, data) {
    state.reviews.unshift(...data)
  },

  PUSH_REVIEW(state, data) {
    state.reviews.unshift(data)
  },

  SET_IS_BOOKMARK(state, data) {
    state.isBookmark = data
  }
}

// actions
export const actions = {

  async getRecipe({ commit }, payload) {

    try {

      // reset ready
      commit('SET_IS_READY', false)
      commit('SET_REVIEWS', [])

      const { data } = await this.$axios.$get(`/recipes/${payload}`)
      commit('SET_RECIPE', data)

    } catch (e) {
      console.log(e)
    }

  },

  setIsReady({ commit }, payload) {
    commit('SET_IS_READY', payload)
  },

  async addReview({ commit, getters, rootState }, { rating, content }) {

    try {
      const { data } = await this.$axios.$post(`/recipes/${getters.recipe.slug}/review`, { rating, content })

      // update recipe
      commit('SET_RECIPE', Object.assign({}, getters.recipe, data.recipe))

      commit('PUSH_REVIEW', Object.assign({}, data.review, { user: rootState.pref.user }))

    } catch (e) {

      console.log(e)

    }

  },

  async getReviews({ commit, getters }, { order, page, limit }) {

    try {
      const { data } = await this.$axios.$get(`/recipes/${getters.recipe.slug}/reviews`, { params: { order, page, limit } })
      commit('PUSH_REVIEWS', data)
    } catch (e) {

    }

  },

  async toggleBookmark({ commit, getters }) {
    try {
      if(getters.isBookmark) {
        await this.$axios.$delete(`/recipes/${getters.recipe.slug}/bookmark`)
      } else {
        await this.$axios.$post(`/recipes/${getters.recipe.slug}/bookmark`)
      }
      commit('SET_IS_BOOKMARK', !getters.isBookmark)
    } catch (e) {}
  },

  async checkBookmark({ commit, getters }) {
    try {
      const { data } = await this.$axios.$get(`/recipes/${getters.recipe.slug}/bookmark`)
      commit('SET_IS_BOOKMARK', data)
    } catch (e) {

    }
  }
}
