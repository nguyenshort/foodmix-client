<template>
  <nuxt-link
    :to='{
      name: "food",
      params: {
        slug: recipe.slug
      }
    }'
    class='overflow-hidden rounded-lg cursor-pointer food-item block'
  >
    <img
      src='data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
      class='rounded-lg lazyload w-full h-full'
      :data-src='recipe.avatar'
      alt=''
    />
    <slot></slot>
    <div v-if='!$scopedSlots["default"]' class='mt-2'>
      <p class='text-sm'>{{ recipe.name }}</p>
      <div class='flex items-center justify-between'>

        <div>
          <fa icon="star" class='text-indigo-500 text-sm'/>

          <span class='text-xs text-gray-500'>{{ recipe.rating }}({{ recipe.countRating }})</span>
        </div>

        <span class='text-xs text-gray-500 '>By {{ recipe.user.name }}</span>

      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'FoodItem',
  props: {
    recipe: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
