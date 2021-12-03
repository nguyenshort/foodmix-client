<template>
  <div>
    <client-only>
      <v-lottie-player
        loop
        path="https://assets8.lottiefiles.com/packages/lf20_sdd6siet.json"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  layout: 'default'
}
</script>
