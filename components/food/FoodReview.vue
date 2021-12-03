<template>

  <div
    id='recipe-review'
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true
    }"
    class='mt-7'
  >
    <title-view title=''>
      <div slot='title'>
        Đánh Giá <span class='text-xs'>(12)</span>
      </div>
    </title-view>

    <div class='mt-5'>
      <div class='flex flex-wrap'>
        <div class='w-3/5 border-t-2 border-r-2 border-b-2'>

          <ul class='text pt-7 pr-7 pb-7 pl-3'>
            <li v-for='(item, index) in lists' :key='index' class='h-9 flex items-center justify-between'>
              <span>{{ item }}</span>
              <div>
                <fa v-for='index2 in 5' :key='index2' icon="star" class='text-yellow-500 text-sm ml-2'/>
              </div>
            </li>
          </ul>

        </div>
        <div class='w-2/5 border-t-2 border-b-2'>
          <div class='flex flex-col h-full items-center justify-center'>
            <p class='text-sm mb-2'>Chia Sẻ Cảm Nghĩ Của Bạn</p>
            <button
              class="bg-indigo-500 duration-300 focus:outline-none focus:ring hover:bg-indigo-700 hover:shadow-none px-7 py-3 rounded-full shadow-lg text-sm text-white transition-all"
              @click='$nuxt.$emit("reviewModal")'
            >
              <fa class='mr-1' icon='comment-dots'></fa>
              Viết Đánh Giá
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class='mt-5'>
      <ul>
        <li v-for='(review, index) in reviews' :key='index' class='mb-5 flex'>
          <div class='w-16'>
            <img class='w-11 h-11 object-cover rounded-full' :src='$CDN(review.user.avatar)' alt='' />
          </div>
          <div class='w-full border-b-2 pb-5'>
            <h4 class='font-mono'>{{ review.user.name }}</h4>
            <div class='mb-2'>
              <fa v-for='index2 in 5' :key='index2' icon="star" class='text-yellow-500 text-xs mr-0.5'/>
            </div>
            <div>
              <p class='text-gray-500'>{{ review.content }}</p>
            </div>
            <span class='italic text-gray-500 text-xs mt-3'> {{ $moment(review.createdAt).format('LL') }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FoodReview',
  data() {
    return {
      lists: ['Hướng Dẫn Có Tâm', 'Món Ăn Dễ Nấu', 'Nguyên Liệu Dễ Tìm', 'Giá Thành Thực Hiện'],
      comment: {
        content: 'Ví dụ: một ứng dụng có thể có màn hình hiển thị các sản phẩm. Khi người dùng chạm vào hình ảnh của một sản phẩm, một màn hình mới sẽ hiển thị thông tin chi tiết về sản phẩm.',
        countLike: 10,
        countReply: 3,
        rating: 4.5,
        createdAt: '20/10/2021',
        user: {
          name: 'Yuan',
          avatar: 'https://user-pic.webnovel.com/userheadimg/4310841381-10/100.jpg?uut=1593713531915&imageMogr2/quality/80'
        }
      },
      isLoading: false,
      page: 0,
    }
  },
  computed: {
    ...mapGetters('recipe', ['recipe', 'reviews'])
  },
  methods: {
    ...mapActions('recipe', ['getReviews']),
    async visibilityChanged (isVisible) {
      if(isVisible) {
        this.isLoading = true
        await this.getReviews({ order: 'createdAt', page: 0, limit: 5})
        this.page++
        this.isLoading = false
      }
    }
  }
}
</script>
