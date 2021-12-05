<template>
  <transition :name="animation" mode='out-in'>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'AnimateSwitcher',
  props: {
    animation: {
      type: String,
      default: 'switcher'
    }
  }
}
</script>
