<template>
  <transition name="switcher" mode='out-in'>

    <template v-if='active'>

      <template v-if='isLoading'>
        <slot name='spin'></slot>
        <v-lottie-player
          v-if='!$scopedSlots["spin"]'
          class='mx-auto'
          width='100px'
          height='100px'
          loop
          path="https://assets7.lottiefiles.com/packages/lf20_qX4zwY.json"
        />
      </template>

      <template v-else>
        <slot name='button' :callback='callback'></slot>
        <button
          v-if='!$scopedSlots["button"]'
          class="cursor-pointer duration-300 flex items-center justify-center py-3 rounded-lg text-sm transition-all w-full"
          :class='{
          [theme]: true
        }'
          @click='getMore()'
        >
          Xem Thêm
          <fa class='ml-2 transform -translate-y-0.5' icon="sort-down" />
        </button>
      </template>

    </template>
    <template v-else>
      <slot name='no-more'></slot>
      <lazy-empty-content
        v-if='!$scopedSlots["no-more"]'
        sub-title='Mọi thứ tới đây đã hết !!!'
      ></lazy-empty-content>
    </template>

  </transition>
</template>

<script>
export default {
  name: 'ShowMoreButton',
  props: {
    callback: {
      type: Function,
      default: async () => {}
    },
    theme: {
      type: String,
      default: 'bg-white text-gray-500 hover:bg-indigo-700 hover:text-white'
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isLoading: false,
      active: true
    }
  },
  methods: {
    async getMore() {
      this.isLoading = true
      await this.callback()
      setTimeout(()=> {
        this.isLoading = false
      }, this.delay)
    },

    /**
     * @param show { Boolean }
     */
    setActive(show) {
      this.active = show
    }
  }
}
</script>
