<template>
  <div class=''>
    <title-view title='Giới Thiệu Món Ăn'></title-view>
    <div class='mt-4'>
      <p>
        {{ recipe.content }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FoodAbout',
  computed: {
    ...mapGetters('recipe', ['recipe'])
  }
}
</script>
