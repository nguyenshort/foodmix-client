export const state = () => ({
  categories: [],
  recipes: []
})

// getters
export const getters = {
  categories: (state) => state.categories,
  recipes: (state) => state.recipes
}

// mutations
export const mutations = {
  SET_CATEGORIES(state, data) {
    state.categories = data
  },
  SET_RECIPES(state, data) {
    state.recipes.push(...data)
  },

  INIT_HOME(state) {
    state.recipes = []
  }
}

// actions
export const actions = {
  async getCategories ({ commit }) {
    try {

      const { data } = await this.$axios.$get('/categories')
      commit('SET_CATEGORIES', data)

    } catch (e) {
      console.log(e)
    }
  },

  async getRecipes({ commit }, { order, page, limit }) {

    try {

      const { data } = await this.$axios.$get('/recipes', { params: { order, page, limit } })
      commit('SET_RECIPES', data)

    } catch (e) {
      console.log(e)
    }

  },

  init({ commit }) {

    commit('INIT_HOME')

  }
}
