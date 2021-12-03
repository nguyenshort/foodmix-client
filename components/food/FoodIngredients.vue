<template>
  <div class='w-80 relative bg-gray-100 mt-8 p-4 rounded-lg shadow'>

    <h2 class='font-semibold text-xl'>Nguyên Liệu</h2>

    <div class='mt-3'>

      <button
        class='text-white h-8 rounded-full w-8 text-sm'
        :class='coefficient <= 1 ? "bg-indigo-300" : "bg-indigo-500"'
        :disabled='coefficient <= 1'
        @click='coefficient--'
      >
        <fa icon='minus' />

      </button>

      <span class='text-xs mx-2'>{{ coefficient }} Người</span>

      <button
        class='text-white h-8 rounded-full w-8 bg-indigo-500 text-sm'
        @click='coefficient++'
      >
        <fa icon='plus' />
      </button>

    </div>

    <div>
      <div v-for='(item, index) in recipe.ingredients' :key='index' class='text-sm flex items-center mt-3'>
        <span class='flex h-8 items-center justify-center w-8'>
          <span class='text-white h-5 rounded-full w-5 bg-indigo-500 text-xs flex items-center justify-center'>
          <fa icon='check' />
        </span>
        </span>
        <span class='mr-1'>{{ item.count * coefficient }}</span>
        <span class='mr-1'>{{ item.unit }}</span>
        <span class='mr-1'>{{ item.name }}</span>
      </div>
    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FoodIngredients',
  data() {
    return {
      coefficient: 1
    }
  },
  computed: {
    ...mapGetters('recipe', ['recipe'])
  }
}
</script>
