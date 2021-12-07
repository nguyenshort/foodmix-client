<template>
  <lazy-base-modal
    ref='signInModal'
    event='signInModal'
    title='Đăng Ký'
    :max-width='500'
    @ready='toggleNotify(false); showAnimation = true'
    @dispose='toggleNotify(true); showAnimation = false'
  >

    <div class='max-w-xs mx-auto'>

        <div style='width: 200px; height: 150px' class='mx-auto'>
          <lazy-animate-switcher>
            <v-lottie-player
              v-if='showAnimation'
              width='200px'
              height='150px'
              loop
              path="/json/pizza.json"
            />
          </lazy-animate-switcher>
        </div>


        <div class='text-center'>
          <small class='text-xs italic opacity-90'>Tham cộng đồng ẩm thực lớn</small>
        </div>

        <form ref='form' @submit.prevent='signUp()'>
          <lazy-text-field
            ref='nameField'
            v-model='name'
            class='my-4'
            :suffix-icon='["far", "user"]'
            placeholder='Tên Người Dùng'
            :validate='nameValidate'
          />
          <lazy-text-field
            ref='emailField'
            v-model='email'
            class='my-4'
            :suffix-icon='["far", "envelope"]'
            placeholder='Email ID'
            :validate='emailValidate'
          />
          <lazy-text-field
            ref='passField'
            v-model='password'
            class='my-4'
            type='password'
            suffix-icon='lock'
            placeholder='Password'
            :validate='passwordValidate'
          />

          <div class='text-xs text-center my-1'>
            <p>Đã Có Tài Khoản?
              <a class='text-indigo-500 cursor-pointer' @click.prevent='openSignUp()'>Đăng Nhập Ngay</a></p>
          </div>

          <lazy-rounded-button
            ref='submitButton'
            type='submit'
            class='w-full mt-3'
            title='Đăng Ký'
          />

        </form>

        <div class='text-xs mt-2 text-center mt-14'>
          <span class='mr-1'>© 2021 FoodMix</span>
          <i>|</i>
          <span class='mx-1'>Terms of Service</span>
          <i>|</i>
          <span class='ml-1'>Privacy Policy</span>
        </div>

      </div>

    <lazy-message-modal v-if='errorMessage' :message='errorMessage' :success='false' @done='errorMessage = ""' />

  </lazy-base-modal>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'SignUpModal',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errorMessage: '',
      showAnimation: false
    }
  },
  mounted() {},
  methods: {
    ...mapActions('pref', ['getMe', 'setShowNotify']),

    async signUp() {
      if(!this.validate()) {
        this.errorMessage = 'Hãy hoàn thành các yêu cầu'
        return
      }
      try {
        const { data } = await this.$axios.$post('/users/sign-up',{ name: this.name, email: this.email, password: this.password })
        this.$nuxt.$emit('signInModal')
        await this.$cookies.set('_token', data)

        this.$nuxt.$emit('pusNotify', { msg: 'Đăng Ký Thành Công' })

        setTimeout(()=> {
          location.reload()
        }, 1500)

        // get user

      } catch (e) {
         const { response: { data: { msg } } } = e
         this.errorMessage = ''
         this.errorMessage = typeof msg === 'string' ? msg : msg[0].msg
      }
    },

    validate() {
      const errors = [
        this.$refs.emailField.outFocus(),
        this.$refs.nameField.outFocus(),
        this.$refs.passField.outFocus()
      ]
      return errors.every((value) => !value.length)
    },

    toggleNotify(type) {
      this.setShowNotify(type)
    },

    emailValidate() {
      return /\S+@\S+\.\S+/.test(this.email) ? '' : 'Email không hợp lệ'
    },

    nameValidate() {
      return this.name.length ? '' : 'Tên là bắt buộc'
    },

    passwordValidate() {
      return this.password.length >= 6 ? '' : 'Mạt khẩu phải lớn hơn 6 ký tự'
    },

    openSignUp() {
      this.$refs.signInModal.dispose()
      setTimeout(()=> {
        this.$nuxt.$emit('loginModal')
      }, 300)
    }

  }
}
</script>
