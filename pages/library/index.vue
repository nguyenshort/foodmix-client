<template>
  <div class='bookmark-pag'>

    <lazy-post-head>
      <template #head>
        <h1 class='font-semibold text-3xl'>
          Thư Viện
          <span class='text-sm'>({{ count }})</span>
        </h1>
      </template>
      <template #actions>
        <div v-if='count' class='text-sm'>
          <button v-if='!deleteEnable' @click='deleteEnable = true'>Xoá</button>
          <template v-else>
            <button class='mr-3 text-red-500' @click='$nuxt.$emit("deleteAllLib")'>Xoá Tất Cả</button>
            <button @click='deleteEnable = false'>Huỷ</button>
          </template>
        </div>
      </template>
    </lazy-post-head>

    <div class='mx-auto max-w-6xl relative z-10 px-3 xl:px-0'>

      <template v-if='count > 0'>

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
                @click='$nuxt.$emit("deleteAllLib")'
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
          <div v-for='(bookmark, index) in bookmarks' :key='index' class='w-full xl:w-1/4 sm:w-1/2 md:w-1/3 px-0 sm:px-3 mb-5'>
            <div
              class='relative'
              :class='{
              _share: deleteEnable
            }'
            >
              <lazy-food-item class='relative' :recipe='bookmark.recipe' />
              <button
                class='-translate-x-4 absolute bg-red-500 duration-300 h-8 right-0 rounded-full shadow text-white text-xs top-0 transform transition translate-y-4 w-8'
                :class='{
                "opacity-0 scale-0": !deleteEnable
              }'
                @click='deleteHandle(bookmark, index)'
              >
                <fa icon='trash-alt' />
              </button>
            </div>
          </div>
        </div>
        <lazy-show-more-button v-if='bookmarks.length' ref='showMore' :callback='getBookmarks' />
      </template>

      <lazy-empty-content v-else />

    </div>

    <lazy-base-modal ref='deleteModel' event='deleteAllLib' :max-width='400' title='Cảnh Báo Xoá'>
      <div>
        <p class='my-5'>Hành động này sẽ xoá toàn bộ công thức bạn đang theo dõi</p>

        <div class='flex justify-evenly'>
          <button
            class='border-2 border-indigo-600 bt focus:outline-none hover:shadow-none p-2 rounded-full shadow-lg text-gray-600 text-indigo-600 text-sm text-white w-1/3'
            @click='$nuxt.$emit("deleteAllLib")'
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
      Thư Viện
    </portal>


  </div>
</template>

<script>
export default {
  name: 'LibraryPage',
  async asyncData({ $axios }) {
    try {

      const { data } = await $axios.$get('/bookmark/count')
      return {
        count: data
      }

    } catch (e) {}
  },
  data() {
    return {
      bookmarks: [],
      deleteEnable: false,
      isDeleting: false,
      isDeletingAll: false
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
          '/bookmark',
          {
            params: {
              limit: 12 - this.bookmarks.length % 12,
              skip: this.bookmarks.length
            }
          }
        )
        this.bookmarks.push(...data)
        if(!data.length) {
          this.$refs.showMore?.setActive(false)
        }
      } catch (e) {}
    },

    async deleteHandle(bookmark, index) {

      if(this.isDeleting) {
        return
      }
      this.isDeleting = true
      try {

        await this.$axios.$delete(`/bookmark/${bookmark._id}`)
        this.$delete(this.bookmarks, index)
        this.count--
        await this.$refs.showMore.getMore()

      } catch (e) {}
      this.isDeleting = false

    },

    async deleteAll() {
      this.isDeletingAll = true
      try {

        await this.$axios.$delete('/bookmark')
        this.count = 0
        this.bookmarks = []
        this.deleteEnable = false

      } catch (e) {
        console.log(e)
      }
      this.isDeletingAll = false
      this.$refs.deleteModel.dispose()
    }
  }
}
</script>
<style>
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

._share {
  /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 1.5s;

  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}
</style>
