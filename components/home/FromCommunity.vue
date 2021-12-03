<template>
  <div class='mt-5'>
    <title-view title='Món Mới Từ Cộng Đồng' />
    <div class='mt-4'>

      <div class='flex flex-wrap'>
        <div v-for='(recipe, index) in recipes' :key='index' class='w-1/3 p-3'>
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
          @click='getMoreHandle()'
        >
          View More <fa class='ml-2' icon="sort-down" />
        </button>
      </client-only>

    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FromCommunity',
  data() {
    return {
      page: 1,
      isLoading: 0
    }
  },
  computed: {
    ...mapGetters('home', ['recipes'])
  },
  methods: {
    ...mapActions('home', ['getRecipes']),

    async getMoreHandle() {
      this.isLoading = true
      await this.getRecipes({ order: 'createdAt', limit: 12, page: this.page })
      this.page++
      this.isLoading = false
    }
  }
}
</script>
