<template>
  <div
    class='translate-sidebar delay-300 transition duration-1000 translate-y-0'
    :class='{
        "opacity-0": overlayHeight === 0,
        "opacity-100": overlayHeight > 0
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
    }
  },
  data() {
    return {
      overlayHeight: 0
    }
  },
  mounted() {

    this.setupSidebar()

  },

  methods: {

    setupSidebar() {

      this.overlayHeight = document.querySelector(this.anchor).offsetHeight

    }

  }
}
</script>
