<template>
  <ol class='flex breadcrumb text-xs'>
    <li class='mr-5 relative'>
      <nuxt-link to='/'>Home</nuxt-link>
    </li>
    <li v-for='(breadcrumb, index) in breadcrumbs' :key='index' class='mr-5 relative'>
      <nuxt-link :to='breadcrumb.to'>{{ breadcrumb.name }}</nuxt-link>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'BreadcrumbView',
  props: {
    breadcrumbs: {
      type: Array,
      default: () => []
    }
  }
}
</script>
