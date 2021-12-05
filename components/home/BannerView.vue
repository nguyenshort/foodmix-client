<template>
  <div class='pt-7 px-3 xl:px-0'>
    <div class='md:h-96 h-56 overflow-hidden relative rounded-2xl cursor-pointer'>

      <!-- Text -->
        <div class='absolute flex flex-col h-full justify-evenly p-5 text-white z-10 lg:w-1/2 lg:pl-10'>

          <p class='md:text-5xl text-2xl font-semibold opacity-0 banner-item'>Choose from thousands of recipes</p>
          <p class='line-clamp-2 md:line-clamp-none opacity-0 banner-item'> Appropriately integrate technically sound value with scalable infomediarie negotiate sustainable strategic theme areas </p>

          <p class='opacity-0 banner-item'>Sign Up <fa class='ml-2' icon="long-arrow-alt-right" /> </p>

        </div>

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

        this.$anime({
          targets: ['.banner-item'],
          translateY: [50, 0],
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

<style>

.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(35px);
}

</style>
