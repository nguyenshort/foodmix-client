<template>

  <div>
    <header
      class='text-gray-700 body-font shadow w-full h-16 md:h-20 bg-white z-50 hidden xl:block'
    >
      <div class='max-w-6xl mx-auto flex h-full md:flex-row items-center px-3 xl:px-0 relative'>

        <nuxt-link
          to='/'
          class='font-semibold logo md:mr-16 mr-auto text-indigo-500 text-xl'
        >
          FoodMix
        </nuxt-link>

        <nav class='md:flex lg:w-2/5 flex-wrap items-center text-sm hidden md:block'>
          <nuxt-link
            v-for='(item, index) in items'
            :key='index'
            :to='item.path'
            class='mr-7 cursor-pointer hover:text-indigo-500'
          > {{ item.name }} </nuxt-link>
        </nav>

        <div class='flex items-center ml-auto'>
          <nuxt-link to='/search' class='lg:mr-7 mr-5 text-sm'>
            <fa icon='search' />
          </nuxt-link>
          <div>
            <lazy-user-menu v-if='auth' />
            <template v-else>
              <a class='mr-7 cursor-pointer hover:text-indigo-500 text-sm' @click='$nuxt.$emit("loginModal")'> Sign In </a>
              <button
                class='bt text-sm bg-indigo-500 text-white p-2 w-32 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300'
              >
                Sign Up
              </button>
            </template>
          </div>
        </div>
      </div>
    </header>

    <header
      class='text-gray-700 body-font shadow w-full h-16 md:h-20 bg-white z-50 xl:hidden'
    >
      <div class='max-w-6xl mx-auto flex h-full md:flex-row items-center px-3 xl:px-0 relative'>

        <lazy-animate-switcher>
          <nuxt-link
            v-if='$route.name === "index"'
            to='/'
            class='font-semibold logo md:mr-16 mr-auto text-indigo-500 text-xl'
          >
            FoodMix
          </nuxt-link>

          <div v-else class='text-sm flex items-center'>
            <a
              href='javascript:void(0)'
              class='mr-2'
              @click.prevent='$router.back()'
            >
              <fa class='text-sm' icon='chevron-left'></fa>
            </a>
            <portal-target class='font-semibold' name="title"></portal-target>
          </div>

        </lazy-animate-switcher>

        <div class='flex items-center ml-auto'>

          <lazy-animate-switcher>
            <div v-if='$route.name === "index"'>

              <lazy-user-menu v-if='auth' />

              <button
                  v-else
                  class='bt text-sm bg-indigo-500 text-white p-2 w-32 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300'
                  @click='$nuxt.$emit("loginModal")'
                >
                  Sign Up
                </button>
            </div>
          </lazy-animate-switcher>

          <lazy-animate-switcher>
            <portal-target name="actions"></portal-target>
          </lazy-animate-switcher>

        </div>
      </div>
    </header>
  </div>

</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'HeadView',
  data() {
    return {
      items: [
        {
          name: 'Home',
          path: '/'
        },
        {
          name: 'About',
          path: '/about'
        },
        {
          name: 'Upload',
          path: '/upload'
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
