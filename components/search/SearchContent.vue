<template>
  <div class='flex flex-wrap'>
    <div v-for='(recipe, index) in recipes' :key='index' class='w-1/3 p-3'>
      <lazy-food-item :recipe='recipe' />
    </div>
    <client-only>
      <v-lottie-player
        v-if='page > 0 && recipes.length === 0'
        class='mx-auto'
        width='200px'
        height='200px'
        loop
        path="https://assets2.lottiefiles.com/packages/lf20_igmdciyh.json"
      />
    </client-only>

    <client-only>
      <div v-if='page > 0 && recipes.length && canLoad' class='w-full'>
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
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'SearchContent',
  data() {
    return {
      recipes: [],
      page: 0,
      isLoading: false,
      canLoad: true,
    }
  },
  async fetch() {
    this.isLoading = true
    try {
      const { data } = await this.$axios.$get('/search', { params: this.searchQuery() })
      this.recipes.push(...data)
      this.page++
      if(!data.length) {
        this.canLoad = false
      }
    } catch (e) {
      console.log(e)
    }
    this.isLoading = false
  },
  methods: {

    /**
     * @return Object
     */
    searchQuery() {
      return {
        page: this.page,
        limit: 12,
        keyword: this.$route.query.keyword,
        category: this.$route.query.category
      }
    }

  }
}
</script>
