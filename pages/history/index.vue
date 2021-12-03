<template>
  <div
    class='history-page'
  >

    <lazy-post-head>
      <template #head>
        <h1 class='font-semibold text-3xl'>
          Lịch Sử
          <span class='text-sm'>({{ count }})</span>
        </h1>
      </template>
      <template #actions>
        <div v-if='count' class='text-sm'>
          <button v-if='!deleteEnable' @click='deleteEnable = true'>Xoá</button>
          <template v-else>
            <button class='mr-3 text-red-500' @click='$nuxt.$emit("deleteHistory")'>Xoá Tất Cả</button>
            <button @click='deleteEnable = false'>Huỷ</button>
          </template>
        </div>
      </template>
    </lazy-post-head>

    <div class='mx-auto max-w-6xl relative z-10'>
      <div class='flex flex-wrap mt-4'>
        <div v-for='(history, index) in histories' :key='index' class='w-1/4 p-3'>
          <div
            class='relative'
            :class='{
              _share: deleteEnable
            }'
          >
            <lazy-food-item class='relative bg-indigo-50' :recipe='history.recipe'>
              <div class='pt-3 px-4 py-5'>
                <div class='flex items-center text-sm w-full justify-between'>
                  <nuxt-link to='/' class='text-indigo-600 text-xs'>
                    {{ history.recipe.category.name }}
                  </nuxt-link>
                  <p>
                    {{ $nuxt.$moment(history.recipe.time).format("mm") }}
                    <fa icon='clock'></fa>
                  </p>
                </div>
                <h4 class='text-normal'>{{ history.recipe.name }}</h4>
                <p class='text-sm font-thin mt-2 line-clamp-3 text-gray-500'>{{ history.recipe.content }}</p>
              </div>
            </lazy-food-item>
            <button
              class='-translate-x-4 absolute bg-red-500 duration-300 h-8 right-0 rounded-full shadow text-white text-xs top-0 transform transition translate-y-4 w-8'
              :class='{
                "opacity-0 scale-0": !deleteEnable
              }'
              @click='deleteHandle(history, index)'
            >
              <fa icon='trash-alt' />
            </button>
          </div>
        </div>
      </div>
      <lazy-empty-content v-if='!count' />
    </div>

    <lazy-base-modal ref='deleteHistory' event='deleteHistory' :max-width='400' title='Cảnh Báo Xoá'>
      <div>
        <p class='my-5'>Hành động này sẽ xoá toàn lịch sử của bạn</p>

        <div class='flex justify-evenly'>
          <button
            class='border-2 border-indigo-600 bt focus:outline-none hover:shadow-none p-2 rounded-full shadow-lg text-gray-600 text-indigo-600 text-sm text-white w-1/3'
            @click='$nuxt.$emit("deleteHistory")'
          >
            Huỷ
          </button>

          <button
            class='bg-red-500 bt border-2 border-red-600 focus:outline-none hover:shadow-none p-2 rounded-full shadow-lg text-sm text-white w-1/3'
            :class='{
              _loading: isDeletingAll
            }'
            @click='deleteAll()'
          >
            Xoá Tất Cả
          </button>
        </div>
      </div>
    </lazy-base-modal>


  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  async asyncData({ $axios }) {
    try {

      const { data } = await $axios.$get('/history/count')
      return {
        count: data
      }

    } catch (e) {}
  },
  data() {
    return {
      isLoading: false,
      deleteEnable: false,
      isDeleting: false,
      isDeletingAll: false,
      histories: []
    }
  },

  created() {

    this.getBookmarks()

  },
  methods: {

    async getBookmarks() {
      if(this.isLoading || !this.count) {
        return
      }
      this.isLoading = true
      try {
        const { data } = await this.$axios.$get('/history', { params: { limit: 6, skip: this.histories.length } })
        this.histories.push(...data)
      } catch (e) {}
      this.isLoading = false
    },

    async deleteHandle(history, index) {

      if(this.isDeleting) {
        return
      }
      this.isDeleting = true
      try {

        await this.$axios.$delete(`/history/${history._id}`)
        this.$delete(this.histories, index)
        this.count--

      } catch (e) {}
      this.isDeleting = false

    },

    async deleteAll() {
      this.isDeletingAll = true
      try {

        await this.$axios.$delete('/history')
        this.count = 0
        this.histories = []
        this.deleteEnable = false

      } catch (e) {
        console.log(e)
      }
      this.isDeletingAll = false
      this.$refs.deleteHistory.dispose()
    }

  }
}
</script>
