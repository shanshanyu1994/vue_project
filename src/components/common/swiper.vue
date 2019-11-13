<template>
 <div class="swiper-container" :id="config.id">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
     <div class="swiper-pagination"  v-if="config.info.pagination"></div>
  </div> 
</template>
<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";

export default {
  props:["config"],//props 当属性变量使用 this.xxx
  mounted() {
    this.$nextTick(() => {
      new Swiper("#"+this.config.id,this.config.info);
    });
  }
};
</script>
<style lang="scss">
.swiper-container{
  height:200px;
}
</style>
