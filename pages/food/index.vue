<template>
  <div class=''>
    <lazy-food-overlay />
    <div class='m-auto max-w-6xl relative z-10'>
      <div class='flex flex-warp'>

        <div class='w-2/3'>

          <div
            class='mt-7 transition duration-300'
            :class='{
                "translate-y-0 opacity-100": isReady,
                "-translate-y-6 opacity-0": !isReady
             }'
          >

            <lazy-food-about />

            <lazy-how-to-cooking />

            <lazy-food-review />

            <lazy-food-may-like />

          </div>

        </div>

        <div class='w-1/3 pl-6'>

          <!-- food sidebar -->
          <lazy-translate-sidebar>

            <lazy-food-avatar />
            <lazy-food-ingredients />
            <lazy-fanpage-side-bar class='mt-7' />

          </lazy-translate-sidebar>

        </div>

      </div>
    </div>
    <lazy-review-modal />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'FoodDetail',
  async asyncData({ store, route }) {
    await store.dispatch('recipe/getRecipe', route.params.slug)
  },
  computed: {
    ...mapGetters('recipe', ['isReady'])
  }
}
</script>
<style>
.food-trans-btn {
  background: #0000003b;
}
.food-avatar:hover {
  transform: scale(1.1);
}
</style>
