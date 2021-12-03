<template>
  <base-modal event='loginModal'>
    <div class='h-90 login-modal-content bg-white -m-7 relative'>
      <form class='flex flex-col items-center pt-12 relative pb-7' @submit.prevent='loginHandle()'>
        <a class='font-semibold logo text-indigo-500 text-xl'>FoodMix</a>
        <p class='font-thin text-sm my-2'>Trở thành đầu bếp giỏi không hề khó</p>
        <div class='mt-3 px-3 w-96'>
          <div class='flex flex-col'>
            <label class='uppercase text-xs text-indigo-500' for='emailLogin'>Địa Chỉ Email</label>
            <input id='emailLogin' v-model='email' class='bg-indigo-100 border-b-2 border-transparent duration-500 ease-in-out focus:border-indigo-500 focus:outline-none font-thin mt-1.5 px-5 py-3 text-gray-600 text-sm transition' type='email' />
          </div>
          <div class='flex flex-col mt-5'>
            <label class='uppercase text-xs text-indigo-500' for='emailPass'>Mật Khẩu</label>
            <input id='emailPass' v-model='password' class='bg-indigo-100 border-b-2 border-transparent duration-500 ease-in-out focus:border-indigo-500 focus:outline-none font-thin mt-1.5 px-5 py-3 text-gray-600 text-sm transition' type='password' />
          </div>
          <button
            class="bt text-sm bg-indigo-500 text-white py-3 w-full mt-5 rounded-full hover:bg-indigo-700 focus:outline-none transition duration-300"
            :class='{
              _loading: isLoading
            }'
            :disabled='!password || !email'
          >
            Sign Up
          </button>
          <p class='uppercase text-xs text-center mt-5'>Không nhớ mật khẩu? <a class='font-semibold text-indigo-500 ml-1 cursor-pointer'>Bấm vào đây</a></p>
          <p class='uppercase text-xs text-center mt-48'>Không có tài khoản? <a class='font-semibold text-indigo-500 ml-1 cursor-pointer'>Bấm vào đây</a></p>
          <div class='text-xs mt-2 text-center'>
            <span class='mr-1'>© 2021 FoodMix</span>
            <i>|</i>
            <span class='mx-1'>Terms of Service</span>
            <i>|</i>
            <span class='ml-1'>Privacy Policy</span>
          </div>
        </div>
      </form>
    </div>
  </base-modal>
</template>

<script>
export default {
  name: 'LoginModal',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  mounted() {
    // this.$nuxt.$emit('loginModal')
  },
  methods: {

    async loginHandle() {

      this.isLoading = true

      try {

        const { data } = await this.$axios.$post('/users/sign-in', { email: this.email, password: this.password })
        this.$cookies.set('_token', data)
        location.reload()

      } catch (e) {}
      this.isLoading = false

    }

  }
}
</script>

<style>
.login-modal-content {}
.login-modal-content:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-image: linear-gradient(
    0deg, white, #ffffffdb, #ffffffc7), url(/images/login-bg.jpg);
}

</style>
