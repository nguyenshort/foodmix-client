<template>
  <div>
    <div>
      <div v-for='(review, index) in reviews' :key='index' class='border-b py-8'>
        <div class='flex flex wrap'>
          <div class='flex-shrink-0 h-14 mr-5 overflow-hidden rounded-full w-14'>
            <img class='w-full h-full object-cover' :src='$CDN(review.user.avatar)'  alt='' />
          </div>
          <div class='w-full'>
            <div class='flex items-center justify-between'>
              <h4 class='text-lg font-semibold'>{{ review.user.name }}</h4>
              <div class='text-xs'>{{ $moment(review.createdAt).format('ll') }}</div>
            </div>
            <div class=''>
              <fa v-for='index2 in 5' :key='index2' icon="star" class='text-yellow-500 text-xs mr-0.5'/>
            </div>
            <div class='mt-1'>
              <p>{{ review.content }}</p>
            </div>
            <div class='bg-indigo-50 mt-2 rounded-xl p-5 mt-2'>
              <div class='flex'>
                <div class='h-28 flex-shrink-0'>
                  <img class='h-full w-auto rounded' :src='review.recipe.avatar' alt='' />
                </div>
                <div class='ml-5'>
                  <h5 class='text-lg font-semibold line-clamp-1'>{{ review.recipe.name }}</h5>
                  <p class='line-clamp-3 mt-2 text-sm'>{{ review.recipe.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileReviews',
  data() {
    return {
      isLoading: false,
      reviews: [],
      page: 0,
    }
  },
  async fetch() {
    this.isLoading = true
    try {
      const { data } = await this.$axios.$get(`/profile/${this.profile.slug}/reviews`, { params: { order: 'createdAt', page: this.page, limit: 6 } })
      this.reviews.push(...data)
      this.page++
    } catch (e) {}
    this.isLoading = false
  },
  computed: {
    ...mapGetters('profile', ['profile'])
  }
}
</script>
