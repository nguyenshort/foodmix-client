<template>
  <button
    class='bt text-sm bg-indigo-500 text-white p-2 rounded-full focus:outline-none'
    :class='{
      [`p-${padding}`]: padding,
      [`bg-${background}-500`]: background,
      _loading: isLoading
    }'
    :type='type'
    @click='handle()'
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  name: 'RoundedButton',
  props: {
    padding: {
      type: Number,
      default: 2
    },
    background: {
      type: String,
      default: 'indigo'
    },
    title: {
      type: String,
      required: true
    },
    callback: {
      type: Function,
      default: async () => {}
    },
    type: {
      type: String,
      default: 'button'
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    async handle() {
      this.isLoading = true
      await this.callback()
      this.isLoading = false
    },

    /**
     * @param value { Boolean }
     */
    setLoading(value) {
      this.isLoading = value
    }
  }
}
</script>
