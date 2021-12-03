<template>
  <div
    class='fixed flex h-0 h-full items-center justify-center top-0 w-full z-50 transition duration-500 ease-in-out left-0'
    :class='{
      "invisible opacity-0": !showModal,
      "visible opacity-100": showModal
    }'
  >
    <a class='absolute top-0 left-0 w-full h-full close-overlay cursor-pointer' title='Close' @click='dispose()'></a>
    <div
      class='border-indigo-600 border-t-4 modal-content relative py-7 transition duration-500 ease-in-out transform w-full bg-white'
      :style='
        {
          maxWidth: maxWidth + "px"
        }
      '
      :class='{
        "scale-95 opacity-0": !showModal,
        "scale-100 opacity-100": showModal
      }'
    >
      <a class='-translate-x-7 z-10 absolute close-button right-0 text-xl top-0 transform translate-y-5 cursor-pointer' @click='dispose()'>
        <fa icon='times'></fa>
      </a>
      <div class='px-7'>
        <h4 v-if='title' class='font-semibold text-gray-600 text-xl'>{{ title }}</h4>

        <slot :show='showModal'></slot>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  props: {
    title: {
      type: String,
      default: ''
    },
    event: {
      type: String,
      required: true
    },
    maxWidth: {
      type: Number,
      default: 550
    }
  },
  data() {
    return {
      data: {},
      showModal: false
    }
  },
  mounted() {

    this.setupModal()

  },
  destroyed() {
    this.$nuxt.$off(this.event)
  },
  methods: {

    dispose() {
      this.showModal = false
      this.data = {}
      this.$nuxt.$emit(`${this.event}Dispose`)
    },

    init(data) {
      this.data = data
      this.showModal = true
      this.$nuxt.$emit(`${this.event}Init`)
    },

    setupModal() {

      this.$nuxt.$on(this.event, (data) => {

        if (!this.showModal) {
          this.init(data)
        } else {
          this.dispose()
        }

      })

    }

  }
}
</script>
<style>
.close-overlay {
  background-color: hsla(0,0%,100%,.5);
}
.modal-content {
  box-shadow: 0 8px 30px 0 rgb(0 0 0 / 20%);
}
</style>
