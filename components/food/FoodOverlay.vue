<template>
  <lazy-post-overlay
    :title='recipe.name'
    :is-ready='isReady'
    :background='recipe.avatar'
    :breadcrumbs='[
      {
        name: recipe.name,
        to: {
          name: "food",
          params: {
            slug: recipe.slug
          }
        }
      }
    ]'
    @ready='isReadyHandle(true)'
  >
    <div class='flex xl:flex-nowrap flex-wrap items-center text-sm lg:ml-5'>
      <div class='xl:mr-12 w-1/2 sm:w-1/4 mb-4 lg:w-1/2 lg:text-center xl:text-left xl:w-auto'>
        <div>Phân Loại</div>
        <nuxt-link :to='{ name: "category", params: { slug: recipe.category.slug } }' class='font-semibold mt-1 block'>
          {{ recipe.category.name }}
        </nuxt-link>
      </div>
      <div class='xl:mr-12 w-1/2 sm:w-1/4 mb-4 lg:w-1/2 lg:text-center xl:text-left xl:w-auto'>
        <div>Thời Gian Chuẩn Bị</div>
        <div class='font-semibold mt-1'>
          {{ $nuxt.$moment(recipe.preparation).format("mm") }} Phút
        </div>
      </div>
      <div class='xl:mr-12 w-1/2 sm:w-1/4 mb-4 lg:w-1/2 lg:text-center xl:text-left xl:w-auto'>
        <div>Thời Gian Nấu</div>
        <div class='font-semibold mt-1'>
          {{ $nuxt.$moment(recipe.time).format("mm") }} Phút
        </div>
      </div>

      <div class='xl:ml-auto w-1/2 sm:w-1/4 lg:w-1/2 lg:text-center cursor-pointer mb-4 xl:text-left xl:w-auto' @click='$nuxt.$emit("reviewModal")'>
        <div>{{ recipe.countRating }} Đánh Giá</div>
        <div class='mt-1'>
          <fa
            v-for='index in 5'
            :key='index'
            icon="star"
            class='text-sm mr-1'
            :class='{
                      "text-yellow-500": recipe.rating >= index,
                      "text-gray-300": recipe.rating <index
                    }'
          />
        </div>
      </div>

      <!-- Share Button -->

      <div class='hidden xl:block xl:ml-16'>
        <button class='food-trans-btn h-9 inline-flex items-center justify-center rounded-full w-9 ' @click='printWindow()'><fa icon="print" /></button>
        <button
          class='food-trans-btn h-9 inline-flex items-center justify-center rounded-full w-9 ml-3'
          @click='$nuxt.$emit("pushNotify", "App sẽ ra mắt sớm")'
        >
          <fa icon="mobile-alt" />
        </button>
      </div>
    </div>

  </lazy-post-overlay>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'FoodOverlay',
  computed: {
    ...mapGetters('recipe', ['recipe', 'isReady'])
  },
  methods: {
    printWindow() {
      window.print()
    },
    ...mapActions('recipe', ['setIsReady']),
    isReadyHandle(value) {

      this.setIsReady(value)

    }
  }
}
</script>
