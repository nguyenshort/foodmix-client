<template>
  <transition-group id="app-noti" tag="div" name="notify">
    <div
      v-for="notify in messages"
      :key="notify.id"
      class='-translate-x-1/2 w-max -translate-y-1/2 visible opacity-100 capitalize duration-300 fixed left-1/2 px-10 py-3 rounded-lg shadow-2xl text-sm md:text-lg text-white top-1/2 transform transition z-50'
      :class='{
          "bg-red-500": !notify.success,
          "bg-indigo-600": notify.success
      }'
    >
      <p>{{ notify.msg }}</p>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'NotifyView',
  data() {
    return {
      messages: []
    }
  },
  mounted() {
    this.$nuxt.$on('pushNotify', (data) => {
      this.showNotify(data)
    })
  },
  methods: {

    showNotify(message) {
      this.messages.push(Object.assign({}, message, { id: Math.random() }))
      setTimeout(()=> { this.messages.shift() }, 3000)

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
