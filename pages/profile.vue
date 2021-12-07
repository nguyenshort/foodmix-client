<template>
  <div>
    <div class='bg-gray-100'>
      <div class='mx-auto max-w-4xl relative'>
        <div class='w-full bg-indigo-100 h-64 relative'>
          <div class='w-full h-full overflow-hidden'>
            <img
              ref='bannerImage'
              src='data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
              :data-src='$CDN(profile.banner)'
              class='h-full object-cover w-full lazyload opacity-0 profile-image'
              alt=''
            />
          </div>
          <div class='absolute bottom-0 lg:h-32 left-0 transform translate-x-1/4 translate-y-1/2 lg:w-32 w-24 h-24'>
            <div class='opacity-0 profile-image lg:border-8 border-4 border-white rounded-full shadow-md overflow-hidden'>
              <img
                src='data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
                :data-src='$CDN(profile.avatar)'
                class='w-full h-full object-cover lazyload'
                alt=''
              />
            </div>
          </div>
        </div>
        <div class='mt-4'>
          <h5 class='font-semibold lg:ml-44 text-2xl lg:text-3xl mr-3 line-clamp-1 opacity-0 ml-32 profile-item'
          >
            {{ profile.name }}
          </h5>
          <p class='mt-8 opacity-0 px-3 lg:px-0 profile-item'>
            {{ profile.about || '--' }}
          </p>
          <div class='flex items-center mt-5 opacity-0 px-3 lg:px-0 flex-wrap profile-item'>
            <div class='mr-10 sm:mb-0 mb-5'>
              <fa icon='calendar-alt'></fa>
              <span>{{ $moment(profile.createdAt).format('ll') }}</span>
            </div>
            <div class='mr-10 sm:mb-0  mb-5'>
              <fa icon='map-marker-alt'></fa>
              <span>{{ profile.province || '--' }}</span>
            </div>
            <div class='mr-10'>
              <fa icon='drumstick-bite'></fa>
              <span>30</span>
            </div>
          </div>

          <div class='mt-5 text-xl flex opacity-0 px-3 lg:px-0 profile-item'>
            <nuxt-link
              v-slot="{ isActive, navigate, href }"
              :to='{ name: "profile-reviews", params: { slug: $route.params.slug } }'
              custom
            >
              <a
                :href='href'
                class='block border-b-2 transition duration-300 pb-2 ease-in-out mr-4'
                :class='{
                  "border-indigo-500": isActive,
                  "border-transparent text-gray-400": !isActive
                }'
                @click='navigate'
              >Đánh Giá</a>
            </nuxt-link>
            <nuxt-link
              v-slot="{ isActive, navigate, href }"
              :to='{ name: "profile-recipes", params: { slug: $route.params.slug } }'
              custom
            >
              <a
                :href='href'
                class='block border-b-2 mr-4 transition duration-300 pb-2 ease-in-out'
                :class='{
                  "border-indigo-500": isActive,
                  "border-transparent text-gray-400": !isActive
                }'
                @click='navigate'
              >Công Thức</a>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class='mx-auto max-w-4xl relative mt-7 min-h-screen-1/2 opacity-0 profile-item'>
      <nuxt-child />
    </div>
    <portal to="title">
      Trang Cá Nhân
    </portal>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'ProfilePage',
  async asyncData({ store, route }) {
    await store.dispatch('profile/getProfile', route.params.slug)
  },
  data() {
    return {
      isReady: false
    }
  },
  computed: {
    ...mapGetters('profile', ['profile'])
  },
  created() {
    if(this.$route.name === "profile") {
      this.$router.replace({ name: 'profile-reviews', params: { slug: this.$route.params.slug }})
    }
  },
  mounted() {
    this.$nextTick(()=> {
      this.startAnimation()
    })
  },
  methods: {

    startAnimation() {

      this.$refs.bannerImage.addEventListener('lazyloaded', () => {

        this.$anime({
          targets: ['.profile-image'],
          opacity: [0, 1],
          scale: [1, 1.1],
          duration: 1200
        })

        this.$anime({
          targets: ['.profile-item'],
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
