<template>
  <div>
    <lazy-category-overlay />
    <div class='m-auto max-w-6xl relative z-10'>
      <div class='block lg:flex'>

        <div class='transition duration-300 delay-500 ease-in-out transform px-3 xl:px-0 w-full lg:w-3/5 xl:w-2/3'>
          <lazy-category-result />
        </div>

        <lazy-translate-sidebar class='lg:w-2/5 xl:w-1/3 lg:px-6 w-full mt-7 xl:mt-0'>

          <lazy-category-avatar  class='hidden xl:block'/>

          <lazy-fanpage-side-bar class='mt-7' />

        </lazy-translate-sidebar>

      </div>
    </div>

    <portal to="title">
      Phân Loại Món Ăn
    </portal>

    <portal to='actions'>
      <div>
        <button class='text-sm'>
          <fa icon='external-link-alt' />
        </button>
      </div>
    </portal>

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
