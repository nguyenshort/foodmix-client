export const state = () => ({
  /**
   * @property { { name: String, avatar: String, email: String } } user
   */
  user: {},
  showHeader: true
})

// getters
export const getters = {
  user: (state) => state.user,
  auth: (state) => Object.keys(state.user).length > 0,
  showHeader: (state) => state.showHeader
}

// mutations
export const mutations = {
  SET_USER(state, data) {
    state.user = data
  },

  SET_SHOW_HEADER(state, data) {
    state.showHeader = data
  }
}

// actions
export const actions = {
  async getMe({ commit, dispatch }) {
    try {

      const { data } = await this.$axios.$get('/users/me')
      dispatch('setUser', data)

    } catch (e) {
      this.$cookies.removeAll()
    }
  },

  setUser({ commit }, payload) {
    commit('SET_USER', payload)
  },

  setShowHeader({ commit }, payload) {
    commit('SET_SHOW_HEADER', payload)
  }
}
