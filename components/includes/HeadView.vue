<template>

  <FixedHeader :threshold='threshold' @change='setHead($event)'>
    <header
      class='text-gray-700 body-font shadow w-full h-20 _head'
    >
      <div class='max-w-6xl mx-auto flex flex-wrap h-20 flex-col md:flex-row items-center'>
        <nav class='flex lg:w-2/5 flex-wrap items-center text-sm mr-auto'>

          <nuxt-link to='/' class='font-semibold logo mr-16 text-indigo-500 text-xl'>FoodMix</nuxt-link>

          <a
            v-for='(item, index) in items'
            :key='index'
            class='mr-7 cursor-pointer hover:text-indigo-500'
          > {{ item.name }} </a>

        </nav>
        <nuxt-link to='/search' class='mr-7 text-sm'>
          <fa icon='search' />
        </nuxt-link>
        <template v-if='auth'>
          <div class='w-10 h-10 relative user-head'>
            <img :src='$CDN(user.avatar)' class='h-full object-cover w-full cursor-pointer rounded-full overflow-hidden' alt='' />
            <lazy-user-menu />
          </div>
        </template>
        <template v-else>
          <a class='mr-7 cursor-pointer hover:text-indigo-500 text-sm' @click='$nuxt.$emit("loginModal")'> Sign In </a>
          <button
            class='bt text-sm bg-indigo-500 text-white p-2 w-32 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300'
          >
            Sign Up
          </button>
        </template>
      </div>
    </header>
  </FixedHeader>

</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import FixedHeader from 'vue-fixed-header'

export default {
  name: 'HeadView',
  components: {
    FixedHeader
  },
  data() {
    return {
      items: [
        {
          name: 'Home',
          path: '/about'
        },
        {
          name: 'Recipe',
          path: '/about'
        },
        {
          name: 'About',
          path: '/about'
        }
      ],
      threshold: 80,
    }
  },
  computed: {
    ...mapGetters('pref', ['user', 'auth'])
  },
  mounted() {

    this.setupHeader()

  },
  methods: {
    ...mapActions('pref', ['setShowHeader']),

    setupHeader() {
      this.threshold = this.$el.scrollHeight
    },

    setHead(show) {
      this.setShowHeader(show)
    }

  }
}
</script>
