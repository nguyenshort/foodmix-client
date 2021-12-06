<template>
  <div class=''>
    <lazy-food-overlay />
    <div class='m-auto max-w-6xl relative z-10'>
      <div class='block lg:flex'>

        <div class='mt-7 px-3 xl:px-0 w-full lg:w-3/5 xl:w-2/3 recipe-body opacity-0'>

          <lazy-food-about />

          <div class='mt-7 lg:hidden'>
            <title-view title='Thành Phần Món Ăn'></title-view>
            <lazy-food-ingredients />
          </div>

          <lazy-how-to-cooking />

          <lazy-food-review />

          <lazy-food-may-like />

        </div>

        <lazy-translate-sidebar class='lg:w-2/5 xl:w-1/3 lg:px-6 w-full mt-7 xl:mt-0'>

          <lazy-food-avatar class='hidden xl:block' />
          <lazy-food-ingredients class='hidden lg:block' />
          <lazy-fanpage-side-bar class='mt-7' />

        </lazy-translate-sidebar>

      </div>
    </div>
    <lazy-review-modal />

    <portal to="title">
      Công Thức Nấu Ăn
    </portal>
    <portal to='actions'>
      <div>
        <lazy-icon-button
          class='mr-2'
          :class='{
            "text-red-600": isBookmark
          }'
          icon='heart'
          :callback='bookmarkHandle'
        />
        <button class='text-sm'>
          <fa icon='external-link-alt' />
        </button>
      </div>
    </portal>

    <lazy-floating-action-button
      icon='pen'
      :is-ready='isReady'
      :delay='700'
      :callback='() => $nuxt.$emit("reviewModal")'
    ></lazy-floating-action-button>

  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'FoodDetail',
  async asyncData({ store, route }) {
    await store.dispatch('recipe/getRecipe', route.params.slug)
  },
  computed: {
    ...mapGetters('recipe', ['isReady', 'recipe', 'isBookmark']),
    ...mapGetters('pref', ['user', 'auth'])
  },
  mounted() {
    this.checkBookmarkHandle()
  },
  methods: {
    ...mapActions('recipe', ['toggleBookmark', 'checkBookmark']),
    async checkBookmarkHandle() {
      if(!this.auth) {
        return
      }
      await this.checkBookmark()
    },
    async bookmarkHandle() {

      if(!this.auth) {
        return this.$nuxt.$emit('loginModal')
      }
      this.isLoading = true
      await this.toggleBookmark()
      this.isLoading = false

    }
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
