export const state = () => ({
  /**
   * @property { { name: String, avatar: String, email: String } } user
   */
  profile: {}
})

// getters
export const getters = {
  profile: (state) => state.profile
}

// mutations
export const mutations = {
  SET_PROFILE(state, data) {
    state.profile = data
  }
}

// actions
export const actions = {
  async getProfile({ dispatch }, payload) {
    try {

      const { data } = await this.$axios.$get('/profile/' + payload)
      dispatch('setProfile', data)

    } catch (e) {}
  },

  setProfile({ commit }, payload) {
    commit('SET_PROFILE', payload)
  }
}
