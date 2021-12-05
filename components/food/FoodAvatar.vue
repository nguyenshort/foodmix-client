<template>
  <lazy-post-avatar :is-ready='isReady' :avatar='recipe.avatar' >
    <template #bottom>
      <lazy-icon-button class='bg-white' :icon=" isBookmark ? 'check' : 'bookmark'" :callback='bookmarkHandle' />
      <button class='bg-white h-9 rounded-full w-9 ml-3'><fa icon="share-alt" /></button>
    </template>
  </lazy-post-avatar>
</template>

<script>


import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FoodAvatar',
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('recipe', ['recipe', 'isReady', 'isBookmark']),
    ...mapGetters('pref', ['user', 'auth'])
  },
  mounted() {},
  methods: {
    ...mapActions('recipe', ['toggleBookmark']),

    async bookmarkHandle() {

      if(!this.auth) {
        return this.$nuxt.$emit('loginModal')
      }
      this.isLoading = true
      await this.toggleBookmark()
      this.isLoading = false

    }
  }
}
</script>
