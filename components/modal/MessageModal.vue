<template>

  <div>
    <div
      ref='notify'
      class='absolute bottom-0 left-0 w-full px-5 py-3 text-white opacity-0'
      :class='{
        "bg-indigo-500": success,
        "bg-red-500": !success
    }'
    >
      {{ message }}
    </div>
  </div>

</template>

<script>
export default {
  name: 'ErrorMessageModal',
  props: {
    message: {
      type: String,
      default: ''
    },
    success: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.$nextTick(()=> {
      this.$anime({
        targets: this.$refs.notify,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1200,
        complete: () => {
          setTimeout(() => {
            this.$emit('done')
          }, 3000)
        }
      })
    })
  }
}
</script>
