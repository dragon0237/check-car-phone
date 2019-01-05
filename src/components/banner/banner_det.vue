<template>
  <mu-carousel hide-controls>
    <mu-carousel-item  v-for="(index,item) in bannerUrl" :key="index">
      <img :src="item.picUrl">
    </mu-carousel-item>
  </mu-carousel>
</template>

<script>
    export default {
      name: "banner_det",
      data () {

      }
    }
</script>

<style scoped>

</style>
