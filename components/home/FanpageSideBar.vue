<template>
  <div class='px-3 xl:px-0'>
    <title-view title='Fanpage' />
    <div class='mt-4'>
      <client-only>
        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=300&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=155915046224033" width="380" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FanpageSideBar'
}
</script>
