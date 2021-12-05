<template>
  <div class='relative post-overlay'>
    <div class='absolute h-full w-full overflow-hidden'>
      <img
        ref='recipeAvatar'
        class='blur brightness-90 filter h-full lazyload object-cover scale-110 transform w-full'
        :data-src='background'
        alt=''
        src='data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
      />
    </div>
    <div class='m-auto max-w-6xl relative z-10 h-full px-3 xl:px-0'>
      <div class='flex flex-warp h-full'>
        <div class='xl:w-2/3 pt-8 pb-10 w-full'>
          <div
            class='text-white transition duration-300 ease-in-out transform mb-5'
            :class='{
                "translate-y-0 opacity-100": isReady,
                "-translate-y-6 opacity-0": !isReady
              }'
          >
            <breadcrumb-view :breadcrumbs='breadcrumbs' />
          </div>
          <div class='flex flex-wrap h-full lg:px-10 text-white xl:px-0'>
            <h1
              class='capitalize text-xl w-full xl:text-5xl lg:text-left text-center font-semibold transition duration-300 ease-in-out transform delay-200 leading-tight line-clamp-2 xl:my-5'
              :class='{
                "translate-y-0 opacity-100": isReady,
                "-translate-y-6 opacity-0": !isReady
              }'
            >
              {{ title }}
            </h1>

            <div
              class='my-4 w-full xl:hidden lg:mx-0 lg:w-auto'
            >
              <img
                class='h-auto max-w-xs lg:mx-0 block mx-auto lazyload object-cover w-full border-8 rounded-xl shadow-2xl transition duration-300 ease-in-out transform delay-500'
                :data-src='background'
                alt=''
                src='data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
                :class='{
                "opacity-0": !isReady
              }'
              />
            </div>

            <div
              class='transition duration-300 ease-in-out transform delay-700 xl:delay-500 lg:w-1/2 w-full xl:w-full'
              :class='{
                "translate-y-0 opacity-100": isReady,
                "-translate-y-6 opacity-0": !isReady
              }'
            >
              <slot></slot>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostOverlay',
  props: {
    background: {
      type: String,
      required: true
    },
    isReady: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    breadcrumbs: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.startAnimation()
  },
  methods: {
    startAnimation() {

      this.$refs.recipeAvatar.addEventListener('lazyloaded', () => {

        setTimeout(() => {

          this.$emit('ready')

        }, 300)

      })

    }
  }
}
</script>
