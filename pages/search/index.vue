<template>

  <div class='m-auto max-w-6xl relative'>

    <search-overlay />

    <div class='w-2/3 mx-auto'>
      <div class='mt-16'>
        <client-only>
          <lazy-search-content v-if='$route.query.keyword' :key='$route.fullPath' />
          <v-lottie-player
            v-else
            class='mx-auto'
            width='200px'
            height='200px'
            loop
            path="https://assets10.lottiefiles.com/private_files/lf30_3dLrkA.json"
          />
        </client-only>

      </div>
    </div>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SearchPage',
  async asyncData({ store }) {

    if(!store.state.home.categories.length) {
      await store.dispatch('home/getCategories')
    }

  },
  data() {
    return {
      page: 1,
      isLoading: 0
    }
  },
  computed: {
    ...mapGetters('home', ['categories']),
  }
}
</script>
