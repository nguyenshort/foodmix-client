<template>
  <div class='title-view flex items-center justify-between'>
    <h4 class='inline-block text-white title-view-content'>
      {{ title }}
      <slot name='title'></slot>
    </h4>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TitleView',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>


<style>

.title-view-content {
  height: 40px;
  background-repeat: no-repeat;
  padding: 6px 32px 0 8px;
  background-position: 100% 50%;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='215' height='44' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 9h195l-12.037 35H20V9z' fill='%23FFBC69'/%3E%3Cpath d='M0 0h204l-12 36H0V0z' fill='url(%23paint0_linear)'/%3E%3Cpath d='M108.81 0H204l-12.108 36H90l18.81-36z' fill='url(%23paint1_linear)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear' y1='15.3' x2='204' y2='15.3' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%233B66F5'/%3E%3Cstop offset='1' stop-color='%23163BCD'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear' x1='199.969' y1='23' x2='75.027' y2='24.805' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%233B66F5'/%3E%3Cstop offset='1' stop-color='%233B66F5' stop-opacity='.69'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
}

</style>
