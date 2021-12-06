<template>
  <div class=''>
    <div class='h-72 xl:h-80 relative'>
      <div v-if='count > 0' class='absolute z-20 text-white text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl xl:text-5xl font-semibold duration-300 ease-linear'>
        <span class='opacity-0 search-item'>
          {{ count }} Công Thức Món Ăn
        </span>
      </div>
      <div class='overflow-hidden w-full h-full rounded-bl-2xl rounded-br-2xl search-bg relative'>
        <img
          ref='bannerImage'
          src='data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
          data-src='/images/cooking.jpg'
          alt=''
          class='h-full object-cover w-full lazyload opacity-0'
        />
      </div>
      <div class='max-w-xl w-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20'>
        <div class='bg-white rounded-xl shadow-xl px-5 mx-3 opacity-0 search-item'>
          <form class='flex flex-wrap items-center' @submit.prevent='submitSearch()'>
            <div class='w-full border-b lg:border-b-0 lg:w-2/5 flex items-center py-5 lg:border-r'>
              <fa class='text-indigo-600 text-sm' icon="search" />
              <input ref='search' v-model='keyword' name='keyword' type='text' placeholder='Tìm món yêu thích...' class='ml-3 focus:outline-none w-full pr-5 text-gray-500' />
            </div>
            <div class='lg:w-2/5 w-2/3 px-5 flex items-center my-5 lg:my-0'>
              <fa class='text-indigo-600 text-sm' icon="utensils" />
              <div class='px-3 text-gray-500 w-full'>
                <select v-model='category' class='appearance-none focus:outline-none w-full'>
                  <option value=''>Tất Cả</option>
                  <option v-for='(category2, index) in categories' :key='index' :value='category2.slug'>
                    {{ category2.name }}
                  </option>
                </select>
              </div>
              <fa class='text-indigo-600 text-sm' icon="sort-down" />
            </div>
            <button
              class="text-sm  bg-indigo-500 text-white py-2 lg:w-1/5 w-1/3 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300"
              type='submit'
            >
              Tìm Kiếm
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SearchOverlay',
  data() {
    return {
      count: 0,
      keyword: '',
      category: ''
    }
  },
  computed: {
    ...mapGetters('home', ['recipes', 'categories']),
  },
  mounted() {
    this.focusSearch()
    this.animationCount()
    this.keyword = this.$route.query.keyword || ''
    this.startAnimation()
  },
  methods: {

    focusSearch() {
      this.$refs.search.focus()
    },

    animationCount() {

      this.count = 300

      const animation = setInterval(() => {

        this.count++
        if(this.count === 360) {
          clearInterval(animation)
        }

      }, 10)

    },

    submitSearch() {

      this.$router.replace({ name: 'search', query: { keyword: this.keyword, category: this.category } })

    },

    startAnimation() {

      this.$refs.bannerImage.addEventListener('lazyloaded', () => {

        this.$anime({
          targets: this.$refs.bannerImage,
          opacity: [0, 1],
          scale: [1, 1.1],
          duration: 1200
        })

        this.$anime({
          targets: ['.search-item'],
          translateY: [-50, 0],
          opacity: [0, 1],
          duration: 1200,
          delay: (el, i) => {
            return 500 + 150 * i
          }
        })

      })

    }

  }
}
</script>

<style>
.search-bg:before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: #6366f18a;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  z-index: 10;
}
</style>
