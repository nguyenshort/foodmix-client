<template>
  <div class=''>
    <div class='h-80 relative'>
      <div v-if='count > 0' class='absolute z-10 text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-semibold duration-300 ease-linear'>
        {{ count }} Công Thức Món Ăn
      </div>
      <div class='overflow-hidden w-full h-full rounded-bl-2xl rounded-br-2xl search-bg relative'>
        <img src='/images/cooking.jpg' alt='' class='h-full object-cover w-full' />
      </div>
      <div class='max-w-xl w-full bg-white rounded-xl shadow-xl absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 px-5'>
        <form class='flex items-center' @submit.prevent='submitSearch()'>
          <div class='w-2/5 flex items-center py-5 border-r'>
            <fa class='text-indigo-600 text-sm' icon="search" />
            <input ref='search' v-model='keyword' name='keyword' type='text' placeholder='Tìm món yêu thích...' class='ml-3 focus:outline-none w-full pr-5 text-gray-500' />
          </div>
          <div class='w-2/5 px-5 flex items-center'>
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
            class="text-sm  bg-indigo-500 text-white py-2 w-1/5 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300"
            type='submit'
          >
            Tìm Kiếm
          </button>
        </form>
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
}
</style>
