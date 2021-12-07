<template>
  <base-modal event='reviewModal' title='Đánh Giá Món Ăn' :max-width='600'>
    <template #default>
      <div class='mt-3'>
        <div ref='reviewForm'>
          <div class='flex flex-wrap mt-7'>
            <div class='w-full sm:w-2/3'>
              <ul class='text pr-7 pb-7 pl-3'>
                <li v-for='(item, index) in reviews' :key='index' class='flex items-center justify-between flex-wrap py-2 border-b sm:border-b-0'>
                  <span class='mr-3 w-full sm:w-auto'>{{ item }}</span>
                  <div class='w-full sm:w-auto'>
                    <button v-for='index2 in 5' :key='index2' @click='setPoint(index, index2)'>
                      <fa
                        icon="star"
                        class='text-sm mr-3 cursor-pointer transition duration-300 ease-in-out'
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
            <div class='flex flex-col items-center justify-center w-full sm:w-1/3'>
              <div class='text-5xl mb-1.5'>{{ rating }}</div>
              <div>Điểm Tổng</div>
            </div>
          </div>
          <textarea v-model='content' placeholder="Nhận xét của bạn là điều rất tuyệt với các tác giả. Hãy nhận xét có tâm và lớn hơn 50 kỹ tự bạn nhé..." class='border-b-2 border-transparent duration-500 ease-in-out focus:border-indigo-600 border-gray-200 focus:outline-none h-52 p-4 transition w-full' />
        </div>
        <div class='text-right mt-4'>

          <lazy-rounded-button
            title='Đăng Ngay'
            :callback='addReview'
            class='px-3'
          />


        </div>
      </div>
      <lazy-message-modal v-if='errorMessage' :message='errorMessage' :success='false' @done='errorMessage = ""' />
    </template>
  </base-modal>
</template>

<script>
import { mapActions } from 'vuex'
import reviews from '~/mixins/reviews'

export default {
  name: 'ReviewModal',
  mixins: [reviews],
  data() {
    return {
      points: [],
      content: '',
      errorMessage: ''
    }
  },
  computed: {
    rating() {

      const total = this.points.reduce((t, c) => t + c, 0) / this.points.length

      return parseFloat(total.toFixed(1))
    }
  },
  mounted() {
    this.$nextTick(()=> {
      this.setupReview()
    })
  },
  methods: {
    ...mapActions('pref', ['getMe', 'setShowNotify']),
    setupReview() {
      this.reviews.forEach((e, i) => {
        this.$nuxt.$set(this.points, i, 0)
      })
      // config view
      const doc = document.querySelector('html')
      const fs = window.getComputedStyle(doc, null).getPropertyValue('font-size')
      const intFs = parseFloat(fs.replace(/px/, ''))
      // padding tối thiểu trên dưới
      const spacing = intFs * 0.75 * 2
      if(window.innerHeight < document.querySelector("#reviewModal-body").offsetHeight + spacing) {
        this.$refs.reviewForm.style.overflowY = "auto"
        this.$refs.reviewForm.style.height = window.innerHeight - spacing - 150 + "px"
      }
    },

    setPoint(index, point) {
      this.$nuxt.$set(this.points, index, point)
    },

    async addReview() {

      if(!this.validateForm()) {
        return
      }


      await this.$store.dispatch('recipe/addReview', { rating: this.rating, content: this.content })

      setTimeout(() => {
        this.$nuxt.$emit('reviewModal')
        this.setupReview()
        this.content = ''
        document.querySelector("#recipe-review").scrollIntoView({behavior: "smooth"})
      })
    },

    validateForm() {
      if(this.content.length < 50) {
        this.errorMessage = 'Nội dung đánh giá phải lớn hơn 50 ký tự'
        return false
      }
      if(!this.points.every((e) => e > 0)) {
        this.errorMessage = 'Bạn phải chấm tất cả các điểm'
        return false
      }
      return true
    }
  }
}
</script>
