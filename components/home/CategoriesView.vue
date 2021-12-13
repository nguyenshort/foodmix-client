<template>
  <div class='px-3 xl:px-0'>
    <title-view title='Phân Loại'></title-view>
    <div class='mt-4'>
      <client-only>
        <swiper ref="mySwiper" :options="swiperOptions" @ready='startAnimation'>
          <swiper-slide v-for='(category, index) in categories' :key='index'>
            <nuxt-link :to='{ name: "category", params: { slug: category.slug } }' class='text-sm text-center cursor-pointer flex flex-col items-center'>
              <div class='w-20 h-20 border-8 border-white rounded-full overflow-hidden shadow opacity-0 categories-view-item'>
                <img src='data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' :data-src='category.avatar' alt='' class='object-cover lazyload w-full h-full' />
              </div>
              <p class='mt-2 opacity-0 categories-view-name'>{{ category.name }}</p>
            </nuxt-link>
          </swiper-slide>
        </swiper>
      </client-only>
    </div>
  </div>
</template>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapGetters } from 'vuex'

export default {
  name: 'CategoriesView',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOptions: {
        spaceBetween: 30,
        slidesPerView: 3,
        // loop: false,
        // autoplay: {
        //   delay: 3000,
        // }
        breakpoints: {
          640: {
            slidesPerView: 4
          },
          1024: {
            slidesPerView: 5
          },
          1025: {
            slidesPerView: 6
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('home', ['categories'])
  },
  mounted() {},
  methods: {
    startAnimation() {
      setTimeout(()=> {
        this.$anime({
          targets: '.categories-view-item',
          translateX: [100, 0],
          duration: 1200,
          opacity: [0, 1],
          delay: (el, i) => {
            return 300 + 100 * i;
          },
        })

        this.$anime({
          targets: '.categories-view-name',
          duration: 1200,
          opacity: [0, 1],
          delay: 700
        })
      }, 500)
    }
  }
}
</script>
