<template>
  <div>
    <lazy-category-overlay />
    <div class='m-auto max-w-6xl relative z-10'>
      <div class='flex flex-warp'>

        <div class='w-2/3'>
          <lazy-category-result />
        </div>

        <div class='w-1/3 pl-6'>

          <!-- food sidebar -->
          <lazy-translate-sidebar>

            <lazy-category-avatar />

            <lazy-fanpage-side-bar class='mt-7' />

          </lazy-translate-sidebar>

        </div>

      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'CategoryPage',
  async asyncData({ store, params }) {
    await Promise.all([
      store.dispatch('category/getCategory', params.slug),
      store.dispatch('category/getCountRecipe', params.slug)
    ])
  },
  computed: {
    ...mapGetters('category', ['category'])
  }
}
</script>
