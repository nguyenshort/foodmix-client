<template>
  <div
    class='w-10 h-10 relative user-head'
    @mouseenter='animated()'
  >
    <img :src='$CDN(user.avatar)' class='h-full object-cover w-full cursor-pointer rounded-full overflow-hidden' alt='' />
    <div class="absolute duration-300 ease-in invisible opacity-0 right-0 transition user-menu w-300 z-30"
    >
      <div class="bg-dark user-menu-content rounded-2xl py-2 mt-4 overflow-hidden">
        <div class="flex items-center px-5 mt-3 pb-5 text-white menu-item">
          <div class="w-11 h-11 rounded-full overflow-hidden mr-4">
            <nuxt-link :to='{ name: "profile-reviews", params: { slug: user.slug } }'>
              <img class="h-full object-cover w-full" :src="$CDN(user.avatar)" alt="" />
            </nuxt-link>
          </div>
          <nuxt-link :to='{ name: "profile-reviews", params: { slug: user.slug } }'>
            <h5 class="">{{ user.name }}</h5>
          </nuxt-link>
        </div>
        <ul class="list-menu font-thin text-gray-300">
          <li v-for="(item, index) in items" :key="index" class="menu-item">
            <nuxt-link
              :to="item.to"
              class="
              block
              duration-200
              ease-in
              hover:bg-indigo-600
              menu-item-content
              nuxt-link-active nuxt-link-exact-active
              px-5
              py-3
              relative
              text-white
              transition
            "
            >
              <h5>{{ item.name }}</h5>
              <div v-if="item.sub" class="opacity-50 sub-menu text-xs">
                {{ item.sub }}
              </div>
            </nuxt-link>
          </li>
          <li class="menu-item">
            <a
              href="javascript:void(0)"
              class="
              block
              duration-200
              ease-in
              hover:bg-indigo-600
              menu-item-content
              nuxt-link-active nuxt-link-exact-active
              px-5
              py-3
              relative
              text-white
              transition
            "
              @click.prevent="logOut()"
            >
              <h5>Đăng Xuất</h5>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  data() {
    return {
      items: [
        {
          name: 'Thư Viện',
          sub: 'Những món ăn bạn sưu tập',
          to: {
            name: 'library',
          },
        },
        {
          name: 'Lịch Sử',
          to: {
            name: 'history',
          },
        },
        {
          name: 'Cài Đặt',
          to: {
            name: 'settings',
          },
        },
      ],
    }
  },
  computed: {
    ...mapGetters('pref', ['user']),
  },
  methods: {
    logOut() {
      this.$cookies.removeAll()
      location.reload()
    },
    animated() {
      this.$anime({
        targets: ['.menu-item'],
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1200,
        delay: (el, i) => {
          return 150 * i
        }
      })
    }
  },
}
</script>
<style>
.user-head:hover .user-menu {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
}

.user-head .user-menu {
  transform: translateY(8px);
}
.user-menu-content:before {
  content: '';
  position: absolute;
  top: 2px;
  right: 14px;
  border-left: 6px dashed transparent;
  border-right: 6px dashed transparent;
  height: 0;
  width: 0;
  border-bottom: 7px solid #25262f;
  transform: translateY(100%);
}
</style>
