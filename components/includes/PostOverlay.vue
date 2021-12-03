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
    <div class='m-auto max-w-6xl relative z-10 h-full'>
      <div class='flex flex-warp h-full'>
        <div class='w-2/3 pt-8 pb-10'>
          <div
            class='text-white transition duration-300 ease-in-out transform'
            :class='{
                "translate-y-0 opacity-100": isReady,
                "-translate-y-6 opacity-0": !isReady
              }'
          >
            <breadcrumb-view :breadcrumbs='breadcrumbs' />
          </div>
          <div class='flex flex-col h-full justify-evenly text-white'>
            <h1
              class='capitalize text-5xl my-7 font-semibold transition duration-300 ease-in-out transform delay-200 leading-tight line-clamp-2'
              :class='{
                "translate-y-0 opacity-100": isReady,
                "-translate-y-6 opacity-0": !isReady
              }'
            >
              {{ title }}
            </h1>

            <div
              class='flex flex-wrap items-center text-sm transition duration-300 ease-in-out transform delay-500'
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
