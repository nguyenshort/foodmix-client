<template>
  <div>
    <form class='max-w-xl lg:ml-12' @submit.prevent='updateAccount()'>
      <div class='flex flex-col mt-5'>
        <label class='uppercase text-xs text-indigo-500' for='old'>Mật Khẩu Hiện Tại</label>
        <input id='old' v-model='form.oldPassword' minlength='6' class='bg-indigo-50 border-b-2 border-transparent duration-500 ease-in-out focus:border-indigo-500 focus:outline-none font-thin mt-2 px-5 py-3 text-gray-600 text-sm transition' type='password' placeholder='******' required />
      </div>

      <div class='flex flex-col mt-5'>
        <label class='uppercase text-xs text-indigo-500' for='newPass'>Mật Khẩu Mới</label>
        <input id='newPass' v-model='form.password' minlength='6' class='bg-indigo-50 border-b-2 border-transparent duration-500 ease-in-out focus:border-indigo-500 focus:outline-none font-thin mt-2 px-5 py-3 text-gray-600 text-sm transition' type='password' placeholder='******' required />
      </div>

      <div class='flex flex-col mt-5'>
        <label class='uppercase text-xs text-indigo-500' for='rePass'>Nhập Lại Mật Khẩu Mới</label>
        <input
          id='rePass'
          v-model='form.rePass'
          minlength='6'
          class='border-b-2 border-transparent duration-500 ease-in-out focus:outline-none font-thin mt-2 px-5 py-3 text-gray-600 text-sm transition'
          type='password'
          placeholder='******'
          required
          :class='{
            "bg-red-50 focus:border-red-500": form.rePass !== form.password,
            "bg-indigo-50 focus:border-indigo-500": form.rePass === form.password,
          }'
        />
      </div>

      <button
        class='bt mt-5 text-sm bg-indigo-500 text-white p-2 w-32 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300'
        type='submit'
        :class='{
          _loading: isLoading,
          "opacity-70": form.password.length < 7 || form.password !== form.rePass || form.oldPassword.length < 7
        }'
        :disabled='form.password.length < 7 || form.password !== form.rePass || form.oldPassword.length < 7'
        @click='updateAccount()'
      >
        Lưu Thay Đổi
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PasswordPage',
  data() {
    return {
      isLoading: false,
      form: {
        oldPassword: '',
        password: '',
        rePass: ''
      }
    }
  },
  methods: {
    async updateAccount() {
      this.isLoading = true
      try {
        await this.$axios.$patch('/users', this.form)
        this.form.oldPassword = ''
        this.form.rePass = ''
        this.form.password = ''
      } catch (e) {}
      this.isLoading = false
    }
  }
}
</script>
