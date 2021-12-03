<template>
  <div class=''>
    <title-view title='Phân Loại'></title-view>
    <div class='mt-4'>
      <client-only>
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for='(category, index) in categories' :key='index'>
            <nuxt-link :to='{ name: "category", params: { slug: category.slug } }' class='text-sm text-center cursor-pointer'>
              <img :src='category.avatar' alt='' class='rounded-full' />
              <div class='mt-1'>{{ category.name }}</div>
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
        slidesPerView: 7,
        loop: true,
        autoplay: {
          delay: 3000,
        }
      }
    }
  },
  computed: {
    ...mapGetters('home', ['categories'])
  }
}
</script>
