<template>
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
        <div class='w-10 h-10 cursor-pointer'>
          <img :src='user.avatar' class='h-full object-cover w-full' alt='' />
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
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderContent',
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
    }
  },
  computed: {
    ...mapGetters('pref', ['user', 'auth'])
  }
}
</script>
