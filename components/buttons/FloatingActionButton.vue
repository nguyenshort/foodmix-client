<template>
  <button
    class='-translate-x-6 -translate-y-6 bg-indigo-600 bottom-0 duration-300 ease-linear fixed flex h-12 items-center shadow-lg justify-center right-0 rounded-full text-lg text-white transform transition w-12 z-40 xl:hidden'
    :class='{
        _loading: isLoading,
        "scale-0 opacity-0": !isReady,
        [`delay-${delay}`]: delay
     }'
    @click='clickHandle()'
  >
    <fa v-if='!$scopedSlots["default"] && icon' :icon="icon" />
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'FloatingActionButton',
  props: {
    icon: {
      type: String,
      default: 'heart'
    },
    callback: {
      type: Function,
      default: async () => {}
    },
    isReady: {
      type: Boolean,
      default: true
    },
    delay: {
      type: Number,
      default: 700
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
