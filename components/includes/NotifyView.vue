<template>
  <div class='-translate-x-1/2 -translate-y-1/2 fixed left-1/2 top-1/2 transform z-50'>

    <div
      v-if='canShow'
      ref='notify'
      class='px-10 py-3 rounded-lg shadow-2xl text-sm md:text-lg text-white w-max opacity-0 capitalize'
      :class='{
        "bg-red-500": !message.success,
        "bg-indigo-600": message.success
      }'
    >
      <p>{{ message.msg }}</p>

    </div>

  </div>
</template>

<script>
export default {
  name: 'NotifyView',
  data() {
    return {
      message: {},
      animation: () => {
        this.$anime({
          targets: this.$refs.notify,
          translateY: [-50, 0],
          opacity: [0, 1],
          duration: 1200,
          complete: () => {

            setTimeout(()=> {
              this.message = {}
            }, 2000)

          }
        })
      }
    }
  },
  computed: {
    canShow() {
      return Object.keys(this.message).length
    }
  },
  mounted() {
    this.$nuxt.$on('pushNotify', (data) => {
      this.showNotify(data)
    })
  },
  methods: {

    showNotify(message) {
      this.message = Object.assign({}, message, { id: Math.random() })
      this.$nextTick(()=> {
        this.animation()
      })
    }

  }
}
</script>
<style>
.notify-enter,
.list-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
