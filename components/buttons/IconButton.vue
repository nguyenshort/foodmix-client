<template>
  <button
    class='h-9 rounded-full w-9 bt'
    :class='{
        _loading: isLoading,
        [`h-${size} w-${size}`]: size
     }'
    @click='clickHandle()'
  >
    <fa v-if='!$scopedSlots["default"] && icon' :icon="icon" />
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    size: {
      type: Number,
      default: 9
    },
    icon: {
      type: String,
      default: ''
    },
    callback: {
      type: Function,
      default: async () => {}
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    async clickHandle() {
      this.isLoading = true
      this.$emit('change', true)
      await this.callback()
      this.isLoading = false
      this.$emit('change', false)
    }
  }
}
</script>
