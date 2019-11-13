<template>
  <div class="home">
    <div class="btm_bar">
        <mt-tabbar class="tabbar" v-model="selected">
        <mt-tab-item class="tabitem" :id="'bar'+index" v-for="(item,index) in pathList" :key="index" @click.native="selectIco(index)">
            <img class="img"
            slot="icon"
            :src="item.ImgUrl+(watch===item.path?'2.png':'1.png')"
            />
        </mt-tab-item>
        </mt-tabbar>
        <div>{{selected}}</div>
    </div> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      pathList: [
        { ImgUrl: "https://res.bestcake.com/m-images/ww/foot/foot-menu-a-", path: "/index" },
        { ImgUrl: "https://res.bestcake.com/m-images/ww/foot/foot-menu-b-", path: "/list" },
        { ImgUrl: "https://res.bestcake.com/m-images/ww/foot/foot-menu-c-", path: "/cart" },
        { ImgUrl: "https://res.bestcake.com/m-images/ww/foot/foot-menu-d-", path: "/user" }
      ],
      selected:"",
      num:0
    };
  },
  mounted(){
// :src="`${item.ImgUrl}${num===index?'2.png':'1.png'}`"
  },
  methods: {
    selectIco(index){
        this.num=index;
        this.$router.push(this.pathList[index].path);
    }
  },
  computed:{
    watch(){
      return this.$route.path
    }
  }
};
</script>
<style lang="scss" scoped>
.btm_bar {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1;
    height: r(49);
    border-top: 1px solid #eee;
    background: #fff;
    .tabbar{
        height: 100%;
        background: #fff;
        .tabitem{
            background: #fff;
            width: 25%;
            .img{
                width: r(35);
                height: r(38.5);
            }
        }
    }
   
}
</style>
