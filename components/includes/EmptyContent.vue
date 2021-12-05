<template>
  <div>
    <v-lottie-player
      class='mx-auto'
      width='200px'
      height='200px'
      loop
      :path="lottie"
    />
    <p class='text-center mt-3 italic text-sm text-gray-500'>
      {{ subTitle }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'EmptyContent',
  props: {
    subTitle: {
      type: String,
      default: 'Chẳng có gì ở đây cả !!!'
    },
    lottie: {
      type: String,
      default: 'https://assets2.lottiefiles.com/packages/lf20_igmdciyh.json'
    }
  }
}
</script>
