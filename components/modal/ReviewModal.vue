<template>
  <base-modal event='reviewModal' title='Đánh Giá Món Ăn' :max-width='600'>
    <template #default>
      <div class='mt-3'>
        <div class='flex flex-wrap mt-7'>
          <div class='w-2/3'>
            <ul class='text pr-7 pb-7 pl-3'>
              <li v-for='(item, index) in reviews' :key='index' class='h-9 flex items-center justify-between'>
                <span class='mr-3'>{{ item }}</span>
                <div>
                  <button v-for='index2 in 5' :key='index2' @click='setPoint(index, index2)'>
                    <fa
                      icon="star"
                      class='text-sm ml-3 cursor-pointer transition duration-300 ease-in-out'
                      :class='{
                    "text-yellow-500": points[index] >= index2,
                    "text-gray-300": points[index] <index2
                  }'
                    />
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div class='flex flex-col items-center justify-center w-1/3'>
            <div class='text-5xl mb-1.5'>{{ rating }}</div>
            <div>Điểm Tổng</div>
          </div>
        </div>
        <textarea v-model='content' placeholder="Nhận xét của bạn là điều rất tuyệt với các tác giả. Hãy nhận xét có tâm và lớn hơn 50 kỹ tự bạn nhé..." class='border-b-2 border-transparent duration-500 ease-in-out focus:border-indigo-600 border-gray-200 focus:outline-none h-52 p-4 transition w-full' />
        <div class='text-right mt-4'>
          <button
            class="text-sm bg-indigo-500 text-white p-2 w-32 rounded-full hover:bg-indigo-700 focus:outline-none transition duration-300 ease-in-out bt"
            :disabled='content.length < 50 || rating === 0'
            :class='{
              "opacity-75": content.length < 50 || rating === 0,
              _loading: isLoading
            }'
            @click='addReview()'
          >
            Đăng Ngay
          </button>
        </div>
      </div>
    </template>
  </base-modal>
</template>

<script>
import reviews from '~/mixins/reviews'

export default {
  name: 'ReviewModal',
  mixins: [reviews],
  data() {
    return {
      points: [],
      content: '',
      isLoading: false
    }
  },
  computed: {
    rating() {

      const total = this.points.reduce((t, c) => t + c, 0) / this.points.length

      return parseFloat(total.toFixed(1))
    }
  },
  mounted() {
    this.setupReview()
  },
  methods: {
    setupReview() {
      this.reviews.forEach((e, i) => {
        this.$nuxt.$set(this.points, i, 0)
      })
    },

    setPoint(index, point) {
      this.$nuxt.$set(this.points, index, point)
    },

    async addReview() {
      this.isLoading = true

      await this.$store.dispatch('recipe/addReview', { rating: this.rating, content: this.content })

      this.isLoading = false

      setTimeout(() => {
        this.$nuxt.$emit('reviewModal')
        this.setupReview()
        this.content = ''
        document.querySelector("#recipe-review").scrollIntoView({behavior: "smooth"})
      })
    }
  }
}
</script>
