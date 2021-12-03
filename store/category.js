export const state = () => ({
  category: {},
  isReady: false,
  count: 0
})

// getters
export const getters = {
  category: (state) => state.category,
  isReady: (state) => state.isReady,
  count: (state) => state.count

}

// mutations
export const mutations = {
  SET_CATEGORY(state, data) {
    state.category = data
  },
  SET_IS_READY(state, data) {
    state.isReady = data
  },
  SET_COUNT(state, data) {
    state.count = data
  }
}

// actions
export const actions = {
  async getCategory({ commit }, payload) {
    try {

      const { data } = await this.$axios.$get(`/categories/${payload}`)
      commit('SET_CATEGORY', data)

    } catch (e) {
      console.log(e)
    }
  },

  setIsReady({ commit }, payload) {
    commit('SET_IS_READY', payload)
  },

  async getCountRecipe({ commit }, payload) {
    try {

      const { data } = await this.$axios.$get(`/categories/${payload}/count`)
      commit('SET_COUNT', data)

    } catch (e) {}
  }
}
