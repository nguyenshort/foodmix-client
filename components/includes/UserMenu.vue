<template>
  <div
    class="
      absolute
      duration-300
      ease-in
      invisible
      opacity-0
      right-0
      transition
      user-menu
      w-300
      z-30
    "
  >
    <div class="bg-dark user-menu-content rounded-2xl py-2 mt-4">
      <div class="flex items-center px-5 mt-3 pb-5 text-white">
        <div class="w-11 h-11 rounded-full overflow-hidden mr-4">
          <img class="h-full object-cover w-full" :src="$CDN(user.avatar)" alt="" />
        </div>
        <h5 class="">{{ user.name }}</h5>
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
  },
}
</script>
<style>
.user-head:hover .user-menu {
  visibility: visible;
  opacity: 1;
  transform: translateX(0);
}

.user-head .user-menu {
  transform: translateX(8px);
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
