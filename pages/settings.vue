<template>
  <div>
    <lazy-post-head title='Cài Đặt'></lazy-post-head>
    <div class='mx-auto max-w-6xl relative z-10'>
      <div class='flex flex-wrap mt-7'>
        <div class='w-1/4 border-r'>
          <ul>
            <li>
              <nuxt-link
                v-slot="{ isActive, navigate, href }"
                to='/settings/account'
                custom
              >
                <a
                  :href='href'
                  class='p-4 block duration-300 transition hover:text-white hover:bg-indigo-500'
                  :class='{
                    "bg-indigo-500 text-white": isActive,
                    "bg-indigo-100": !isActive
                  }'
                  @click='navigate'
                >
                  <fa class='mr-2' icon='user'></fa>
                  Tài Khoản
                </a>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                v-slot="{ isActive, navigate, href }"
                to='/settings/password'
                custom
              >
                <a
                  :href='href'
                  class='p-4 block duration-300 transition hover:text-white hover:bg-indigo-500'
                  :class='{
                    "bg-indigo-500 text-white": isActive,
                    "bg-indigo-100": !isActive
                  }'
                  @click='navigate'
                >
                  <fa class='mr-2' icon='key'></fa>
                  Mật Khẩu
                </a>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class='w-3/4'>
          <nuxt-child />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingPage',
  created() {
    if(this.$route.path === "/settings") {
      this.$router.replace('/settings/account')
    }
  }
}
</script>
<style>
#avatar:hover + div {
  opacity: 1;
}
</style>
