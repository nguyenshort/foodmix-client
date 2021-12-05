<template>
  <div class='px-3 xl:px-0 pt-5 xl:hidden'>
    <nuxt-link to='/search' class='flex w-full items-center bg-white shadow px-4 py-3 rounded-full text-gray-500 text-sm'>
      <fa icon='search' class='mr-2' />
      <p>Tìm kiếm món ăn...</p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'SearchReadOnly'
}
</script>
