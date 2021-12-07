<template>
  <div class='mt-7'>
    <title-view title='Cách Chế Biến'></title-view>
    <div class='mt-8'>
      <div class='step-overlay scrollbar-track-gray-200 scrollbar-thumb-indigo-500 scrollbar-thin'>
        <div ref='steps' class='xl:pl-24 pl-20 relative'>
          <div class='-translate-y-1/2 absolute left-10 xl:left-12 step-overlay-line t-1/2 top-1/2 transform w-0.5' :style='{ height: height + "px" }'>
            <div class='bg-indigo-500 w-full h-full'></div>
          </div>
          <div v-for='(step, index) in recipe.stepper' :key='index' class='border-b mr-5 py-5 relative'>
          <span class='-left-10 xl:-left-12 -translate-x-1/2 -translate-y-1/2 absolute step-icon text-white top-1/2 transform shadow-lg'>
            <span class='step-icon-content w-10 h-10 rounded-full flex items-center justify-center bg-indigo-500 relative'>
              <span>
               {{ index + 1 }}
              </span>
            </span>
          </span>
            <p class=''>{{ step.content }}</p>
            <div v-if='!step.image' class='mt-3'>
              <img class='h-28 object-cover w-44 rounded-lg' :src='step.image'  alt=''/>
            </div>
            <div class='mt-3'>
              <img
                class='h-28 object-cover w-44 rounded-lg lazyload'
                src='data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
                data-src='https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=160&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300'
                alt=''
              />
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
  name: 'HowTo',
  data() {
    return {
      height: 0,
      showImage: ''
    }
  },
  computed: {
    ...mapGetters('recipe', ['recipe'])
  },
  mounted() {
    this.setupStepHeight()
  },
  methods: {

    setupStepHeight() {

      this.height = this.$refs.steps.offsetHeight - this.$refs.steps.lastChild.offsetHeight * 0.3 - this.$refs.steps.firstChild.offsetHeight * 0.3

    }

  }
}
</script>

<style>
.step-icon-content:before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
  transform: scale(1.7);
  background: white;
  z-index: -1;
}
.step-icon-content:after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 50%;
  transform: scale(1.2);
  background: transparent;
  border: solid #6366f1 1px;
  z-index: -1;
}
.step-overlay {
  max-height: 500px;
  overflow: auto;
}
</style>
