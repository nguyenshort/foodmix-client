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

    <div class='mx-auto max-w-6xl relative z-10 px-3 xl:px-0'>
      <template v-if='count'>

        <div class='flex items-center mt-3 xl:hidden'>
          <h3 class='font-semibold text-md mr-auto'>Tổng số: {{ count }}</h3>

          <lazy-animate-switcher>
            <button
              v-if='!deleteEnable'
              class='bg-indigo-500 bt focus:outline-none p-2 px-3 rounded-full shadow-lg text-white text-xs'
              @click='deleteEnable = true'
            >
              <fa icon='pen' class='mr-1'></fa>
              Sửa
            </button>
            <div v-else>
              <button
                class='bg-red-500 bt focus:outline-none mr-2 p-2 px-3 rounded-full shadow-lg text-white text-xs bt'
                :class='{
                  _loading: isDeletingAll
                }'
                @click='$nuxt.$emit("deleteHistory")'
              >
                <fa icon='trash-alt' class='mr-1'></fa>
                Xoá Tất Cả
              </button>
              <button
                class='bg-indigo-500 bt focus:outline-none p-2 px-3 rounded-full shadow-lg text-white text-xs'
                @click='deleteEnable = false'
              >
                Xong
              </button>
            </div>
          </lazy-animate-switcher>
        </div>

        <div class='flex flex-wrap mt-4'>
          <div v-for='(history, index) in histories' :key='index' class='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-0 sm:px-3 mb-5'>
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

        <lazy-show-more-button v-if='histories.length' ref='showMore' :callback='getBookmarks' />

      </template>
      <lazy-empty-content v-else />
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

    <portal to="title">
      Lịch Sử
    </portal>

  </div>
</template>

<script>
export default {
  name: 'HistoryPage',
  middleware: 'auth',
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
      deleteEnable: false,
      isDeleting: false,
      isDeletingAll: false,
      histories: []
    }
  },

  mounted() {

    this.configView()

  },
  methods: {

    configView() {
      if(this.count > 0) {
        this.getBookmarks()
      }
    },

    async getBookmarks() {
      try {
        const { data } = await this.$axios.$get(
          '/history',
          {
            params: {
              limit: 8 - this.histories.length % 8,
              skip: this.histories.length
            }
          }
        )
        if(data.length) {
          this.histories.push(...data)
        } else if (process.browser) {
            this.$refs.showMore?.setActive(false)
          }
      } catch (e) {}
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
        await this.getBookmarks()

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
