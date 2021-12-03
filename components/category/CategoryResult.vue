<template>
  <div class='mt-7'>
    <title-view title=''>
      <div slot='title'>
        Công Thức Món Ăn <span class='text-xs'>({{ count }})</span>
      </div>
    </title-view>
    <div class='mt-4'>
      <div v-if='count > 0' class='flex flex-wrap'>
        <div v-for='(recipe, index) in recipes' :key='index' class='w-1/3 p-3'>
          <lazy-food-item :recipe='recipe' />
        </div>
      </div>
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
      isLoading: 0,
      page: 0
    }
  },
  async fetch() {
    try {
      this.isLoading = true

      const { data } = await this.$axios.$get(`/categories/${this.category.slug}/recipes`, { params: { page: 0, limit: 12, order: 'createdAt' } })
      this.recipes.push(...data)
      this.page++

      this.isLoading = false

    } catch (e) {

      console.log(e)

    }
  },
  computed: {
    ...mapGetters('category', ['category', 'count'])
  }
}
</script>
