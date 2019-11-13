<template>
  <div>
    <!-- 一级选项卡 -->
      <div class="tab">
      <span class="zy" @click="selecData(1)">自营</span>
      <span class="yx" @click="selecData(2)">美式严选</span>
      </div>
      <!-- 二级选项卡 -->
      <div class="title">
        <ul>
          <li v-for="(item,index) in listData" :key="index">
            <p @click="selecGood(index)" :class="{active:num===index}">{{item.title}}</p>
          </li>
        </ul>
      </div>
  <div class="goods">
    <!-- 商品列表 -->
    <ul>
      <li v-for="(item,index) in listGood.list" :key="index">
        <img :src="item.ImgUrl" alt="" @click="toPath(item)">
        <h3>{{item.Name}}</h3>
        <p class="dir">{{item.Means}}</p>
        <p class="pri"><span class="cur">￥{{item.CurrentPrice*0.5}}</span><del>￥{{item.CurrentPrice}}</del><span class="size">/{{item.Size}}</span></p>
        <img id="car" src="https://res.bestcake.com\m-images-2\list-cart.png?v=1" alt="" @click="add(item)">
      </li>
    </ul>
  </div>
  <!-- 公告 -->
  <div class="gongao ">
    <div class="gongao1 clear">
      <div class="gongao1l">划线价格</div>
      <div class="gongao1r">商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。 </div>
    </div>
    <div class="gongao1 clear">
      <div class="gongao1l">未划线价格</div>
      <div class="gongao1r">商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。 </div>

    </div>
  </div>
      <router-view />
      
  </div>
</template>

<script>
export default {
  data(){
    return {
      goodsList:[
        {title:"女神",mark:"NS",list:[]},
        {title:"经典",mark:"KSK",list:[]},
        {title:"伴手礼",mark:"JZ",list:[]},
        {title:"乳品",mark:"RP",list:[]}
      ],
      listData:[],//自营和严选筛选出的数据
      listGood:[],//每个商品的数据
      num:0
    }
  },
  mounted(){
    this.pageInit();
  },
  methods:{
    pageInit(){
      this._getListData((res)=>{
        // console.log(res);
        var res = res.data.Tag.cakelist;
        // console.log(res);
        this.goodsList.map((item,index)=>{
          res.map((it)=>{
          if(it.SupplyNo.indexOf(item.mark)!== -1){
            item.list.push(it);
            it.ImgUrl = this.$global.setImgUrl(it);
          }
          })
        })
      this.selecData(1);
      this.selecGood(0);
      })
    },
    selecData(status){//筛选自营和严选数据
      if(status===1){
        this.listData = this.goodsList.slice(0,3);
       this.selecGood(0);
       $(".zy").css({color:"#1db0b8",borderBottom:"2px solid #1db0b8"});
       $(".yx").css({color:"#333333",borderBottom:"none"});
      }else{
        this.listData = this.goodsList.slice(3);
      this.selecGood(0);
       $(".yx").css({color:"#1db0b8",borderBottom:"2px solid #1db0b8"});
       $(".zy").css({color:"#333333",borderBottom:"none"});
      }
      //  console.log(this.listData);
    },
   
    selecGood(index){ //筛选商品数据
      this.num=index;
      if(index===0){
        this.listGood = this.listData[0];
      }else if(index === 1){
        this.listGood = this.listData[1];
      }else if(index ===2){
        this.listGood = this.listData[2];
      }
      // console.log(this.listGood);
    },
    add(item){//加入购物车方法
      // console.log(item);
      var temp={
        ID:item.ID,
        Name:item.Name,
        CurrentPrice:item.CurrentPrice,
        ImgUrl:item.ImgUrl,
        Size:item.Size,
      }
      this.$store.commit("add",temp);//调用store中的add方法
      // console.log(temp);
    },
    toPath(item){//路由跳转
      // console.log(item);
      this.$router.push({path:"/show",query:{SupplyNo:item.SupplyNo,Name:item.Name,ID:item.ID||item.Id,ImgUrl:item.ImgUrl}});
      //跳转时给一个query参数
    },
    _getListData(callBack){//调接口
      this.$apis.getListData().then(res=>{
        callBack(res);
      })
    }
  },
};
</script>
<style lang="scss">
.tab{
  height: r(49);
  font-size: r(16);
  width: 100%;
 line-height: r(49);
 .zy{
    display: inline-block;
    // border-bottom: r(2) solid #1db0b8;
    // color: #1db0b8;
    width: 50%;
    text-align: center;
  }
  .yx{
     display: inline-block;
    width: 50%;
    text-align: center;
  }
} 
.title{
  width: 100%;
  height: r(22);
  margin-top: r(28);
  ul{
    width: 80%;
    height: r(22);
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    li{
    margin: 0 auto;
    float: left;
    height: r(22);
    line-height: r(22);
    p{
      // box-shadow: #1db0b8 inset 5px;
      font-size: r(14);
     
    }
    .active{
      font-size: r(16);
      font-weight: bold;
      border-bottom: r(3) solid #1fb1b9;
    }
  }
  }
  
}
.goods{
  padding: 0 r(6);
  ul{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    li{
      width: 48%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      img{
        width: r(165);
        height: r(165);
      }
      h3{
        font-size: r(14);
        color: #333333;
        padding-left: r(7.5);
      }
      .dir{
        width: r(140);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: r(16);
        line-height: r(16);
        font-size: r(12);
        color: #999999;
        padding-left: r(7.5);
      }
      .pri{
        font-size: r(12);
        .cur{
          color: #f30;
        font-size: r(16);
        }
        del{
         color: #999999; 
        }
        .size{
          color: #bcbcbc;
        }
        
      }
      #car{
          width: r(20);
          height: r(20);
          position: relative;
          left: r(135);
          bottom: r(20);
        }
    }
  }
}
.gongao{
  padding: r(7.5) 0;
  width: 100%;
  margin-bottom: r(50);
  .gongao1{
    margin: 0 r(15) r(15);
    .gongao1l{
      float: left;
      width: r(101);
      font-size: r(14);
      color: #181818;
      line-height: r(22);
    }
    .gongao1r{
      float: left;
      width: r(244);
      font-size: r(14);
      color: #a4a4a4;
      line-height: r(22);
    }
  }
}

</style>
