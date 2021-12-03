<template>
  <div class='pt-7'>
    <div class='h-96 overflow-hidden relative rounded-2xl cursor-pointer'>

      <!-- Text -->
      <transition name='fade'>
        <div v-if='showText' class='absolute px-10 py-16 text-white w-1/2 z-10'>

          <p class='text-5xl'>Choose from thousands of recipes</p>
          <p class='my-11'> Appropriately integrate technically sound value with scalable infomediarie negotiate sustainable strategic theme areas </p>

          <p class=''>Sign Up <fa class='ml-2' icon="long-arrow-alt-right" /> </p>

        </div>
      </transition>

      <img ref='bannerImage' src='data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' class='absolute h-full object-cover w-full lazyload' data-src='/images/banner.jpg' alt=''>

    </div>
  </div>
</template>

<script>
export default {
  name: 'BannerView',
  data() {
    return {
      showText: false
    }
  },
  mounted() {

    this.startAnimation()

  },
  methods: {

    startAnimation() {

      this.$refs.bannerImage.addEventListener('lazyloaded', () => {

        setTimeout(() => {

          this.showText = true

        }, 2000)

      })

    }

  }
}
</script>

<style>

.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(35px);
}

</style>
