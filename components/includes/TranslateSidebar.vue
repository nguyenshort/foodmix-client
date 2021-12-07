<template>
  <div class='translate-sidebar opacity-0'>

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

    this.$nuxt.$once('postOverlayReady', () => {
      this.$nextTick(() => {
        this.setupSidebar()
      })
    })

  },

  destroyed() {

    this.$nuxt.$off('postOverlayReady')
  },

  methods: {

    setupSidebar() {
      if(window.innerWidth >= 1280) {
        this.overlayHeight = document.querySelector(this.anchor).offsetHeight
        this.$nextTick(()=> {
          this.$anime({
            targets: this.$el,
            translateY: [0, -this.overlayHeight * 0.6],
            opacity: [0, 1],
            duration: 2000,
            delay: 700
          })
        })
      } else {
        this.$el.classList.remove('opacity-0')
      }


    }

  }
}
</script>
