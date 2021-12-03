<template>
  <div class='px-4'>
    <title-view title='Đầu Bếp Nổi Bật' />
    <div class='mt-4'>
      <div v-for='index in 5' :key='index' class='mb-4 flex items-center top-author relative' :ranking='index'>
        <div class='avatar-author relative'>
          <img class='w-16 h-16 rounded-full border-2 border-white shadow' :src='user.avatar'  alt=''/>
        </div>
        <div class='ml-2'>
          <p>{{ user.name }}</p>
          <p class='text-xs text-gray-500'>{{ user.count }} Món ăn</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopAuthors',
  data() {
    return {
      user: {
        name: 'Yuan',
        avatar: 'https://user-pic.webnovel.com/userheadimg/4308112429-10/200.jpg?uut=1591111535475&imageMogr2/quality/80',
        count: 924
      }
    }
  }
}
</script>

<style>
.avatar-author:before {
  content: "";
  height: 100%;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -32px;
  margin-left: -32px;
  background-position: 0 0;
  transform: scale(1.1);
}

.top-author[ranking="1"] .avatar-author:before {
  background: url(/images/sprites2x.png) 50% 50% no-repeat;
  background-size: 4rem;
}

.top-author:before {
  content: attr(ranking);
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 500;
}

.top-author[ranking="1"]:before {
  content: "";
  width: 20px;
  height: 28px;
  background: url(/images/rank.png) no-repeat -65px 0;
  background-size: 106px 64px;
}
.top-author[ranking="2"]:before {
  content: "";
  width: 20px;
  height: 28px;
  background: url(/images/rank.png) no-repeat -86px 0;
  background-size: 106px 64px;
}
.top-author[ranking="3"]:before {
  content: "";
  width: 20px;
  height: 28px;
  background: url(/images/rank.png) no-repeat -65px -36px;
  background-size: 106px 64px;
}
</style>
