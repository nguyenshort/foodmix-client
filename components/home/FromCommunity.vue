<template>
  <div class='mt-5 px-3 xl:px-0'>
    <title-view title='Món Mới Từ Cộng Đồng' />
    <div class='mt-7'>

      <div class='flex flex-wrap'>
        <div v-for='(recipe, index) in recipes' :key='index' class='w-full sm:w-1/2 md:w-1/3 px-0 sm:px-3 mb-5'>
          <lazy-food-item :recipe='recipe' />
        </div>
      </div>
      <lazy-show-more-button ref='showMore' :callback='getMoreHandle' />

    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FromCommunity',
  data() {
    return {
      page: 1
    }
  },
  computed: {
    ...mapGetters('home', ['recipes'])
  },
  methods: {
    ...mapActions('home', ['getRecipes']),

    async getMoreHandle() {
      const count = this.recipes.length
      await this.getRecipes({ order: 'createdAt', limit: 12, page: this.page })
      this.$refs.showMore.setActive(count !== this.recipes.length)
      this.page++
    }
  }
}
</script>
