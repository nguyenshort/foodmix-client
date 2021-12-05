<template>
  <div class='bg-gray-100'>
    <div class='max-w-6xl m-auto '>

      <lazy-search-read-only />

      <banner-view />
      <div class='flex flex-warp mt-7 pb-7'>

        <div class='w-full lg:w-3/5 xl:w-2/3'>

          <lazy-categories-view :categories='[]' />

          <lazy-from-community />

        </div>

        <div class='lg:w-2/5 xl:w-1/3 lg:pl-6 w-full'>
          <fanpage-side-bar />
          <lazy-top-authors class='mt-7' />
        </div>

      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: "HomePage",
  async asyncData({ store }) {
    await store.dispatch('home/init')
    await Promise.all([
      store.dispatch('home/getCategories'),
      store.dispatch('home/getRecipes', { page: 0, order: 'createdAt', limit: 12 })
    ])
  },
}
</script>
