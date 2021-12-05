<template>
  <div class='px-3 xl:px-0'>
    <div class='flex flex-wrap'>
      <div v-for='(recipe, index) in recipes' :key='index' class=' w-full sm:w-1/2 md:w-1/3 p-3'>
        <lazy-food-item :recipe='recipe' />
      </div>

    </div>
    <lazy-empty-content v-if='!recipes.length && page' />
    <lazy-show-more-button v-if='recipes.length' ref='showMore' :callback='searchAction' />
  </div>
</template>

<script>
export default {
  name: 'SearchContent',
  data() {
    return {
      recipes: [],
      page: 0
    }
  },
  mounted() {
    this.searchAction()
  },
  methods: {

    /**
     * @return Object
     */
    searchQuery() {
      return {
        page: this.page,
        limit: 12,
        keyword: this.$route.query.keyword,
        category: this.$route.query.category
      }
    },

    async searchAction() {
      try {
        const { data } = await this.$axios.$get('/search', { params: this.searchQuery() })
        if(data.length) {
          this.recipes.push(...data)
        } else if(process.browser) {
          this.$refs.showMore?.setActive(data.length)
        }
        this.page++

      } catch (e) {
        console.log(e)
      }
    }

  }
}
</script>
