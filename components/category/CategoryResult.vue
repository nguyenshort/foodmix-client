<template>
  <div class='mt-7'>
    <title-view title=''>
      <div slot='title'>
        Công Thức Món Ăn <span class='text-xs'>({{ count }})</span>
      </div>
    </title-view>
    <div class='mt-4'>

      <template v-if='count > 0'>

        <div class='flex flex-wrap'>
          <div v-for='(recipe, index) in recipes' :key='index' class='w-full sm:w-1/2 md:w-1/3 px-0 sm:px-3 mb-5'>
            <lazy-food-item :recipe='recipe' />
          </div>
        </div>

        <lazy-show-more-button ref='showMore' :callback='$fetch' />

      </template>

      <client-only v-else>
        <lazy-empty-content />
      </client-only>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'CategoryResult',
  data() {
    return {
      recipes: [],
      page: 0
    }
  },
  async fetch() {
    try {

      const { data } = await this.$axios.$get(`/categories/${this.category.slug}/recipes`, { params: { page: this.page, limit: 12, order: 'createdAt' } })
      if(data.length) {
        this.recipes.push(...data)
        this.page++
      } else {
        this.$refs.showMore.setActive(false)
      }

    } catch (e) {}
  },
  computed: {
    ...mapGetters('category', ['category', 'count'])
  }
}
</script>
