<template>
  <lazy-post-avatar :is-ready='isReady' :avatar='recipe.avatar' >
    <template #bottom>
      <button
        class='bg-white h-9 rounded-full w-9 bt'
        :class='{
          _loading: isLoading
        }'
        @click='toggleBookmark()'
      >
        <fa :icon=" isBookmark ? 'check' : 'bookmark'" />
      </button>
      <button class='bg-white h-9 rounded-full w-9 ml-3'><fa icon="share-alt" /></button>
    </template>
  </lazy-post-avatar>
</template>

<script>


import { mapGetters } from 'vuex'

export default {
  name: 'FoodAvatar',
  data() {
    return {
      isBookmark: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters('recipe', ['recipe', 'isReady']),
    ...mapGetters('pref', ['user', 'auth'])
  },
  mounted() {
    this.checkBookmark()
  },
  methods: {
    async checkBookmark() {
      if(!this.auth) {
        return
      }
      try {

        const { data } = await this.$axios.$get(`/recipes/${this.recipe.slug}/bookmark`)
        this.isBookmark = data

      } catch (e) {}
    },

    async toggleBookmark() {


      if(!this.auth) {
        return this.$nuxt.$emit('loginModal')
      }
      this.isLoading = true
      try {
        if(this.isBookmark) {
          await this.$axios.$delete(`/recipes/${this.recipe.slug}/bookmark`)
        } else {
          await this.$axios.$post(`/recipes/${this.recipe.slug}/bookmark`)
        }
        this.isBookmark = !this.isBookmark
      } catch (e) {

      }

      this.isLoading = false

    }
  }
}
</script>
