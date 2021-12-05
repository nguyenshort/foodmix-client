<template>
  <div class='px-3 lg:px-0'>
    <div>
      <div v-for='(review, index) in reviews' :key='index' class='border-b py-8 last:border-0'>
        <div class='flex'>
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
            <div class='mt-1 break-all whitespace-normal'>
              {{ review.content }}
            </div>
            <nuxt-link
              :to='{
                name: "food",
                params: {
                  slug: review.recipe.slug
                }
              }'
              class='bg-indigo-50 mt-2 rounded-xl p-5 mt-2 block'
            >
              <div class='flex flex-wrap'>
                <div class='sm:w-1/3'>
                  <img class='h-auto w-full rounded' :src='review.recipe.avatar' alt='' />
                </div>
                <div class='sm:w-2/3 mt-3 sm:mt-0 sm:pl-5 flex flex-col justify-evenly'>
                  <h5 class='text-lg font-semibold line-clamp-1'>{{ review.recipe.name }}</h5>
                  <p class='line-clamp-3 lg:line-clamp-4 mt-2 text-sm'>{{ review.recipe.content }}</p>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <lazy-show-more-button v-if='reviews.length' ref='showMore' :callback='getReviews' />
    <lazy-empty-content v-if='page && !reviews.length' />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileReviews',
  data() {
    return {
      reviews: [],
      page: 0,
    }
  },
  async fetch() {
    await this.getReviews()
  },
  computed: {
    ...mapGetters('profile', ['profile'])
  },
  methods: {

    async getReviews() {
      try {
        const { data } = await this.$axios.$get(`/profile/${this.profile.slug}/reviews`, { params: { order: 'createdAt', page: this.page, limit: 6 } })
        if(data.length) {
          this.reviews.push(...data)
        } else if(process.browser) {
          this.$refs.showMore?.setActive(false)
        }
        this.page++
      } catch (e) {}
    }

  }
}
</script>
