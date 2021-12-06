<template>

  <div class='m-auto max-w-6xl relative'>

    <search-overlay />

    <div class='lg:w-2/3 w-full mx-auto'>
      <div class='mt-24 lg:mt-16 opacity-0 search-item'>
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

    <portal to="title">
      Tìm Kiếm
    </portal>

    <portal to='actions'>
      <lazy-icon-button icon='home' :callback='() => $router.push("/")' />
    </portal>

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
