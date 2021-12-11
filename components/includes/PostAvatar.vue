<template>
  <div
    class='relative'
    :style='{
      height: `${width}px`
    }'
  >
    <div class='h-full overflow-hidden relative rounded-lg shadow-lg w-full'>
      <div class='absolute bottom-0 m-4 z-10'>
        <slot name='bottom'></slot>
      </div>
      <img
        class='cursor-pointer duration-1000 food-avatar h-full lazyload object-cover transform transition w-full'
        :data-src='$CDN(avatar)'
        alt=''
        src='data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
        :class='{
          "scale-110": !isReady,
          "scale-100": isReady
        }'
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostAvatar',
  props: {
    avatar: {
      type: String,
      required: true
    },
    isReady: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      width: 0
    }
  },
  mounted() {
    this.configView()
  },
  methods: {
    configView() {
      this.width = this.$el.scrollWidth
    }
  }
}
</script>
