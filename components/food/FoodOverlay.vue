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
    <div
      class='flex flex-wrap items-center text-sm transition duration-300 ease-in-out transform delay-500'
      :class='{
                "translate-y-0 opacity-100": isReady,
                "-translate-y-6 opacity-0": !isReady
              }'
    >
      <div class='mr-12'>
        <div>Phân Loại</div>
        <nuxt-link :to='{ name: "category", params: { slug: recipe.category.slug } }' class='font-semibold mt-1 block'>
          {{ recipe.category.name }}
        </nuxt-link>
      </div>
      <div class='mr-12'>
        <div>Thời Gian Chuẩn Bị</div>
        <div class='font-semibold mt-1'>
          {{ $nuxt.$moment(recipe.preparation).format("mm") }} Phút
        </div>
      </div>
      <div class='mr-12'>
        <div>Thời Gian Nấu</div>
        <div class='font-semibold mt-1'>
          {{ $nuxt.$moment(recipe.time).format("mm") }} Phút
        </div>
      </div>

      <div class='ml-auto cursor-pointer' @click='$nuxt.$emit("reviewModal")'>
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

      <div class='ml-20 mr-10'>
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
