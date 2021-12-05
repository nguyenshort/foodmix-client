<template>
  <div
    class='translate-sidebar delay-300 transition duration-1000 translate-y-0'
    :class='{
        "opacity-0": !isReady,
        "opacity-100": isReady
    }'
    :style='{
        transform: `translateY(${ overlayHeight * -.6 }px)`
    }'
  >

    <slot></slot>

  </div>
</template>

<script>
export default {
  name: 'TranslateSidebar',
  props: {
    anchor: {
      type: String,
      default: '.post-overlay'
    },
  },
  data() {
    return {
      overlayHeight: 0,
      isReady: false
    }
  },
  mounted() {

    this.setupSidebar()

  },

  methods: {

    setupSidebar() {
      if(window.innerWidth >= 1280) {
        this.overlayHeight = document.querySelector(this.anchor).offsetHeight
        this.isReady = true
      } else {
        this.isReady = true
      }


    }

  }
}
</script>
