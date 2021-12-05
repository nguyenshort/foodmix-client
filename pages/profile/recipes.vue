<template>
  <div class='px-3 lg:px-0'>
    <div class='flex flex-wrap'>
      <div v-for='(recipe, index) in recipes' :key='index' class='w-full sm:w-1/2 md:w-1/3 px-0 sm:px-3 mb-5'>
        <lazy-food-item :recipe='recipe' />
      </div>
    </div>
    <client-only>
      <v-lottie-player
        v-if='isLoading'
        class='mx-auto'
        width='100px'
        height='100px'
        loop
        path="https://assets7.lottiefiles.com/packages/lf20_qX4zwY.json"
      />

      <button
        v-else
        class="bg-white cursor-pointer duration-300 flex hover:bg-indigo-700 hover:text-white items-center justify-center py-3 rounded-lg text-gray-500 text-sm transition-all w-full"
        @click='$fetch()'
      >
        View More <fa class='ml-2' icon="sort-down" />
      </button>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileRecipe',
  data() {
    return {
      page: 0,
      recipes: [],
      isLoading: false
    }
  },
  async fetch() {
    this.isLoading = true
    try {
      const { data } = await this.$axios.$get(`/profile/${this.profile.slug}/recipes`, { params: { order: 'createdAt', page: this.page, limit: 6 } })
      this.recipes.push(...data)
      this.page++
    } catch (e) {
      console.log(e)
    }
    this.isLoading = false
  },
  computed: {
    ...mapGetters('profile', ['profile'])
  },
  methods: {}
}
</script>
