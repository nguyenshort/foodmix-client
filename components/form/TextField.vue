<template>
  <div class='pb-2 pt-1 relative'>

    <div class='flex items-center'>

      <label v-if='suffixIcon' :for='inputKID' class='block mr-4'>
        <fa
          :icon='suffixIcon'
          :class='{
          "text-indigo-500 ease-in-out transition duration-300": isFocus
        }'
        ></fa>
      </label>

      <input
        :id='inputKID'
        class='focus:outline-none block'
        :value='value'
        :placeholder='placeholder'
        :type='type'
        @focus='onFocus()'
        @focusout='outFocus()'
        @input="$emit('input', $event.target.value)"
      />

      <span v-if='prefixIcon' class='block ml-4'>
        <fa :icon='prefixIcon' @click='prefixHandle()'></fa>
      </span>
      <slot name='suffix' :handle='prefixHandle'></slot>

    </div>

    <div v-if='errorMessage' ref='errorField' class='text-xs mt-2 text-red-500 opacity-0'>
      {{ errorMessage }}
    </div>

    <span
      class='block absolute w-full left-0 bottom-0 bg-gray-200 h-0.5 ease-in-out transition duration-300'
      :class='{
        "bg-indigo-600": isFocus
      }'
    ></span>
  </div>
</template>

<script>
export default {
  name: 'TextField',
  props: {
    suffixIcon: {
      type: [String, Array],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    prefixIcon: {
      type: [String, Array],
      default: ''
    },
    prefixHandle: {
      type: Function,
      default: () => {}
    },
    type: {
      type: String,
      default: 'text'
    },
    validate: {
      type: Function,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      inputKID: '',
      content: this.value,
      isFocus: false,
      errorMessage: '',
      animate: () => {
        this.$nextTick(()=> {
          this.$anime({
            targets: this.$refs.errorField,
            translateY: [-25, 0],
            opacity: [0, 1],
            duration: 1200
          })
        })
      }
    }
  },
  created() {
    this.inputKID = this.$vnode.key || `input-${Math.random().toFixed(3) * 1000}`
  },
  methods: {
    onFocus() {
      this.isFocus = true
      this.$emit('start')
    },
    outFocus() {
      this.isFocus = false
      const error = this.validate()
      if(error && !this.errorMessage) {
        this.errorMessage = error
        this.animate()
      } else {
        this.errorMessage = ''
      }
      this.$emit('validator', !this.errorMessage)
      this.$emit('finish')
      return this.errorMessage
    }
  }
}
</script>
