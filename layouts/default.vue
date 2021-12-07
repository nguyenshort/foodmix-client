<template>
  <div class='food-mix text-gray-500'>

    <svg aria-hidden='true' style='position: absolute; width: 0px; height: 0px; overflow: hidden;'>
      <symbol id="i-good-on" viewBox="0 0 1024 1024"><path d="M47.8814811 948.90666667V414.90963001h97.09037113v533.99703666H47.8814811z"></path><path d="M970.24 754.72592555V366.36444445a48.54518557 48.54518557 0 0 0-48.54518557-48.54518557h-291.27111111V172.18370333a97.09036999 97.09036999 0 0 0-97.09036999-97.09037h-68.93416334a48.54518557 48.54518557 0 0 0-42.13721999 24.46677334L242.06222222 414.90963001v533.99703666h533.99703666a194.18074112 194.18074112 0 0 0 194.18074112-194.18074112z"></path></symbol>
      <symbol id="i-good" viewBox="0 0 1024 1024"><path d="M40.77036999 948.90666667V414.90963001h97.09037113v533.99703666H40.77036999zM526.22222222 414.90963001V172.18370333h-40.77795555L332.0414811 440.68712334V851.81629667h436.90666667a97.09036999 97.09036999 0 0 0 97.09037112-97.09037112v-339.81629554h-339.81629667zM234.95111111 948.90666667V414.90963001l180.19972778-315.34952334A48.54518557 48.54518557 0 0 1 457.28805888 75.09333333H526.22222222a97.09036999 97.09036999 0 0 1 97.09036999 97.09037v145.63555555h291.27111111a48.54518557 48.54518557 0 0 1 48.54518557 48.54518557v388.3614811a194.18074112 194.18074112 0 0 1-194.18074112 194.18074112H234.95111111z"></path></symbol>
      <symbol id="i-say" viewBox="0 0 1024 1024"><path d="M295.12346101 171.49348131c162.595292-103.57278143 375.73989814-77.73911051 508.87828332 61.69852813 133.13320922 139.42728752 149.10650317 353.53981507 38.13196848 511.18162713-110.9745347 157.64698723-317.9285843 214.82682325-494.09548222 136.51834656L109.00301706 915.04356745l34.1567603-239.03521351-7.22059117-17.24660232c-70.08890752-179.59344382-3.41619393-383.68513695 159.17909806-487.26827031z m215.88791291 33.82031747a305.45947735 305.45947735 0 0 0-256.23005534 138.9510904 305.29384315 305.29384315 0 0 0-22.97131445 290.52139399l11.28379164 25.40923505-19.77251521 138.09186594 138.179859-19.72075472 25.41441023 11.28379163c113.74372213 50.44061718 246.71647391 26.86370474 336.16898866-59.60740388 89.45251477-86.47110863 117.49118288-218.54840416 70.89119472-333.8915263-46.60516334-115.33794539-158.53726752-190.89276335-282.96435924-190.99110759v-0.04658452z"></path></symbol>
      <symbol id="i-det" viewBox="0 0 1024 1024"><path d="M75.09333333 414.89021155h194.16132267v194.2195769H75.09333333V414.89021155z m339.79687822 0h194.2195769v194.2195769H414.89021155V414.89021155z m534.01645512 0h-194.16132267v194.2195769H948.90666667V414.89021155z"></path></symbol>
    </svg>

    <head-view />

    <div class='text-gray-600 min-h-screen w-full overflow-hidden'>
      <transition key="transition-layout" name="page-layout" mode="out-in">
        <nuxt />
      </transition>
    </div>

    <footer-view />

    <lazy-login-modal />
    <lazy-sign-up-modal />

    <lazy-notify-view />

  </div>
</template>

<script>

export default {
  name: 'LayoutDefault',
  mounted() {
    // init facebook
    // this.$initFB()
    if(!this.$store.getters['pref/auth']) {
      if(this.$route.query.action === 'loginModal') {
        setTimeout(() => { this.$nuxt.$emit('loginModal') }, 1000)
      }
    }
  }
}
</script>

<style>
html {
  font-family: Nunito Sans, SF Pro Text, SF Pro Icons, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif;
}
.bt {
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

@-webkit-keyframes ball-triangle-path-ball-1 {
  17%,
  50%,
  83% {
    opacity: .25
  }
  0%,
  to {
    opacity: 1;
    transform: translateY(24px)
  }
  33% {
    opacity: 1;
    transform: translate(12px)
  }
  66% {
    opacity: 1;
    transform: translate(24px, 24px)
  }
}

@keyframes ball-triangle-path-ball-1 {
  17%,
  50%,
  83% {
    opacity: .25
  }
  0%,
  to {
    opacity: 1;
    transform: translateY(24px)
  }
  33% {
    opacity: 1;
    transform: translate(12px)
  }
  66% {
    opacity: 1;
    transform: translate(24px, 24px)
  }
}

@-webkit-keyframes ball-triangle-path-ball-2 {
  17%,
  50%,
  83% {
    opacity: .25
  }
  0%,
  to {
    opacity: 1;
    transform: translate(12px)
  }
  33% {
    opacity: 1;
    transform: translate(24px, 24px)
  }
  66% {
    opacity: 1;
    transform: translateY(24px)
  }
}

@keyframes ball-triangle-path-ball-2 {
  17%,
  50%,
  83% {
    opacity: .25
  }
  0%,
  to {
    opacity: 1;
    transform: translate(12px)
  }
  33% {
    opacity: 1;
    transform: translate(24px, 24px)
  }
  66% {
    opacity: 1;
    transform: translateY(24px)
  }
}

@-webkit-keyframes ball-triangle-path-ball-3 {
  17%,
  50%,
  83% {
    opacity: .25
  }
  0%,
  to {
    opacity: 1;
    transform: translate(24px, 24px)
  }
  33% {
    opacity: 1;
    transform: translateY(24px)
  }
  66% {
    opacity: 1;
    transform: translate(12px)
  }
}

@keyframes ball-triangle-path-ball-3 {
  17%,
  50%,
  83% {
    opacity: .25
  }
  0%,
  to {
    opacity: 1;
    transform: translate(24px, 24px)
  }
  33% {
    opacity: 1;
    transform: translateY(24px)
  }
  66% {
    opacity: 1;
    transform: translate(12px)
  }
}

@-webkit-keyframes hide-text {
  0%,
  to {
    color: transparent
  }
}

@keyframes hide-text {
  0%,
  to {
    color: transparent
  }
}

@-webkit-keyframes ball-pulse {
  0%,
  60%,
  to {
    opacity: 1;
    transform: scale(1)
  }
  30% {
    opacity: .1;
    transform: scale(.01)
  }
}

@keyframes ball-pulse {
  0%,
  60%,
  to {
    opacity: 1;
    transform: scale(1)
  }
  30% {
    opacity: .1;
    transform: scale(.01)
  }
}
.bt._loading {
  overflow: hidden;
  pointer-events: none;
  position: relative;
  opacity: .5;
  -webkit-animation: hide-text 1s ease infinite;
  animation: hide-text 1s ease infinite;
}
.bt._loading:before, .bt._loading:after {
  height: 0;
  width: 0;
  border: 5px solid;
  background: #fff;
  border-radius: 100%;
  position: absolute;
  content: "";
  top: 50%;
  margin-top: -6px;
  -webkit-animation: ball-pulse 1s ease infinite;
  animation: ball-pulse 1s ease infinite;
}
.bt._loading:after {
  left: 50%;
  margin-left: 4px;
}
.bt._loading:before {
  right: 50%;
  margin-right: 4px;
  -webkit-animation-delay: -.1s;
  animation-delay: -.1s;
}


.page-layout-enter-active,
.page-layout-leave-active {
  transition: all 0.5s;
}
.page-layout-enter,
.page-layout-leave-active {
  opacity: 0;
}
.page-layout-enter {
  transform: translateY(-25px);
}
.page-layout-leave-active {
  transform: translateY(+25px);
}
.breadcrumb > li:not(:first-child):before {
  content: '/';
  position: absolute;
  left: calc(-1.25rem / 2);
  transform: translateX(-50%);
}

.switcher-enter-active, .switcher-leave-active {
  transition: opacity .3s;
}
.switcher-enter, .switcher-leave-to, .switcher-leave-active  {
  opacity: 0;
}
</style>
