<template>
  <div class='bg-gray-100 h-36'>
    <div class='flex h-full items-end justify-between m-auto max-w-6xl relative w-full z-10 pb-3'>
      <slot name='head'></slot>
      <h1 v-if='!$scopedSlots["head"]' class='font-semibold text-3xl'>
        {{ title }}
      </h1>
      <slot name='actions'></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostHead',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
