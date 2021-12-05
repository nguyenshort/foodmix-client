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
              class='duration-500 h-full object-cover transform transition w-full lazyload ease-in-out'
              :class='{
                "opacity-0 scale-105": !isReady
              }'
              alt=''
            />
          </div>
          <div
            class='absolute transition duration-500 ease-in-out lg:border-8 border-4 border-white bottom-0 lg:h-32 left-0 overflow-hidden rounded-full shadow-md transform translate-x-1/4 translate-y-1/2 lg:w-32 w-24 h-24'
            :class='{
              "scale-110 opacity-0": !isReady
            }'
          >
            <img
              src='data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
              :data-src='$CDN(profile.avatar)'
              class='w-full h-full object-cover lazyload'
              alt=''
            />
          </div>
        </div>
        <div class='mt-4'>
          <h5
            class='font-semibold lg:ml-44 text-2xl lg:text-3xl transition mr-3 line-clamp-1 duration-500 ease-in-out transform delay-150 ml-32'
            :class='{
              "-translate-y-5 opacity-0": !isReady
            }'
          >
            {{ profile.name }}
          </h5>
          <p
            class='mt-8 transition duration-500 ease-in-out transform delay-300 px-3 lg:px-0'
            :class='{
              "-translate-y-5 opacity-0": !isReady
            }'
          >
            {{ profile.about || '--' }}
          </p>
          <div
            class='flex items-center mt-5 transition duration-500 ease-in-out transform delay-500 px-3 lg:px-0 flex-wrap'
            :class='{
              "-translate-y-5 opacity-0": !isReady
            }'
          >
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

          <div
            class='mt-5 text-xl flex transition duration-500 ease-in-out transform delay-700 px-3 lg:px-0'
            :class='{
              "-translate-y-5 opacity-0": !isReady
            }'
          >
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
    <div
      class='mx-auto max-w-4xl relative mt-7 min-h-screen-1/2 transition duration-500 ease-in-out transform delay-1000'
      :class='{
         "opacity-0": !isReady
      }'
    >
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
    this.startAnimation()
  },
  methods: {

    startAnimation() {

      this.$refs.bannerImage.addEventListener('lazyloaded', () => {

        setTimeout(() => {

          this.isReady = true

        }, 100)

      })

    }

  }
}
</script>
