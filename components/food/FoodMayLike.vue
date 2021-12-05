<template>
  <div
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true
    }"
    class='mt-7'
  >
    <title-view title='Có Thể Bạn Thích'></title-view>
    <div class='mt-4'>
      <div class='flex flex-wrap'>
        <div v-for='(recipe, index) in recipes' :key='index' class='w-full sm:w-1/2 md:w-1/3 px-0 sm:px-3 mb-5'>
          <lazy-food-item :recipe='recipe' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'FoodMayLike',
  data() {
    return {
      isLoading: false,
      page: 0,
      recipes: []
    }
  },
  computed: {
    ...mapGetters('recipe', ['recipe'])
  },
  methods: {
    async visibilityChanged (isVisible) {
      if(isVisible) {
        this.isLoading = true
        try {

          const { data } = await this.$axios.$get('/search/random', { params: { size: 6, exclude: this.recipe._id } })
          this.recipes = data

        } catch (e) {}
        this.page++
        this.isLoading = false
      }
    }
  }
}
</script>
