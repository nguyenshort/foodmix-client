<template>
  <lazy-post-overlay
    :title='category.name'
    :is-ready='isReady'
    :background='category.avatar'
    :breadcrumbs='[
      {
        name: category.name,
        to: {
          name: "category",
          params: {
            slug: category.slug
          }
        }
      }
    ]'
    @ready='isReadyHandle(true)'
  >
    <div class='text-sm'>
      <p>{{ category.content }}</p>
    </div>
  </lazy-post-overlay>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CategoryOverlay',
  computed: {
    ...mapGetters('category', ['category', 'isReady'])
  },
  methods: {
    ...mapActions('category', ['setIsReady']),
    isReadyHandle(value) {

      this.setIsReady(value)

    }
  }
}
</script>
