export const state = () => ({
  /**
   * @property { { name: String, avatar: String, email: String } } user
   */
  user: {},
  showNotify: true
})

// getters
export const getters = {
  user: (state) => state.user,
  auth: (state) => Object.keys(state.user).length > 0,
  showNotify: (state) => state.showNotify
}

// mutations
export const mutations = {
  SET_USER(state, data) {
    state.user = data
  },

  SET_SHOW_NOTIFY(state, data) {
    state.showNotify = data
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

  setShowNotify({ commit }, payload) {
    commit('SET_SHOW_NOTIFY', payload)
  }
}
