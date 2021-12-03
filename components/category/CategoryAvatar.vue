<template>
  <lazy-post-avatar :is-ready='isReady' :avatar='category.avatar' />
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'CategoryAvatar',
  computed: {
    ...mapGetters('category', ['category', 'isReady'])
  }
}
</script>
