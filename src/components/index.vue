<template>
  <div class="main">
    <!-- logo -->
   <div class="city">
    <img src="https://res.bestcake.com/images/newIndex/localtion.png" alt=""><p>上海</p><img class="nex" src="https://res.bestcake.com/images/newIndex/more.png" alt="">
   </div>
  <div v-if="SwiperBannerList.length!==0" class="bann">
    <swiper :config="{id:'banner',info:{pagination:'.swiper-pagination',autoplay:true,speed:2000,loop: true,autoplayDisableOnInteraction : false}}">
       <div class="swiper-slide" v-for="(item,index) in SwiperBannerList" :key="index">
         <img class="banner_img" :src="item.ImgUrl">
       </div>
    </swiper>
  </div>
  <div class="promise"><img src="https://res.bestcake.com/images/newIndex/title.png?v=1" alt=""></div>
  <div class="guanggao">
    <img :src="Guang" alt="">
  </div>
    <div class="icon" v-if="TopIconList.length!==0">
    <div class="iconList" v-for="(item,index) in TopIconList" :key="index" >
      <img :src="item.ImgUrl" alt="">
      <p class="actName">{{item.ActName}}</p>
    </div>
    </div>
    <div class="tips">
    <div class="tz">通知</div><marquee behavior="" direction="">每甄每客官方申明：我司近期发现有客户通过非正常渠道售卖的代金卡无法正常使用，目前我司正通过法律途径解决此问题。我司在此郑重申明，从未授权过任何渠道售卖我司代金卡，请客户通过正常渠道（如：官网、公司销售）进行购买消费。</marquee>
    </div>
    <div class="centertext">
    <div class="centercontent" v-for="(item,index) in CenterContentList" :key="index">
      <img :src="item.ImgUrl" alt="">
    </div>
    </div>
  <div>
    <div v-for="(item,index) in SaleList" :key="index">
        <img class="title_img" :src="item.TabImgUrl">
        <swiper class="beaut" :config="{id:'banner'+index,info:{ slidesPerView: 2.5,spaceBetween:0}}">
        <div class="swiper-slide beauitem" v-for="(value,idx) in item.CakeList" :key="idx">
          <img class="list_img" :src="value.ImgUrl" @click="toPath(value)"/>
          <div class="name">{{value.Name}}</div>
          <div class="flag"><span class="price">￥{{value.Price}}</span><span class="size">/{{value.Size}}</span></div>
        </div> 
        </swiper>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {
     SwiperBannerList:[],
     SaleList:[],
     TopIconList:[],
     CenterContentList:[],
     Guang:""
    };
  },
  mounted() {
    this.$apis.getIndexData().then((res)=>{
      var res = res.data.Tag.mainresult;
      // console.log(res);
      var SaleList = res.SaleList;
      this.Guang=res.AbsoluteBannerList[0].ImgUrl;
      // console.log(this.Guang);
      SaleList.map((item)=>{
        item.CakeList = JSON.parse(item.CakeList);
        item.CakeList.map((item)=>{
          item.ImgUrl=this.$global.setImgUrl(item);
        })
      })
      this.SaleList=SaleList;
      this.SwiperBannerList=res.SwiperBannerList;
      this.TopIconList = res.TopIconList;
      this.CenterContentList = res.CenterContentList;
      // console.log(this.SwiperBannerList);  
    })
  },
  methods:{
     toPath(item){//路由跳转
      console.log(item);
      this.$router.push({path:"/show",query:{SupplyNo:item.SupplyNo,Name:item.Name,ID:item.ID||item.Id,ImgUrl:item.ImgUrl}});
      //跳转时给一个query参数
    },
  }
};
</script>

<style lang="scss" scoped>
.main{
  background:#fff;
  width: 100%;
}
.city{
  background: #fff;
}
.guanggao{
  img{
    width: 100%;
  }
}
.icon{
  display: flex;
  flex-wrap: wrap;
  width: r(325);
  height: r(196);
  margin: 0 auto;
  padding-bottom: r(20);
  flex-direction: row;
  text-align: center;
  .iconList{
  display:flex;
  flex-direction: column;
  width:25%;
  img{
    width: r(52);
    height: r(52);
    margin: 0 auto;
    margin-top: r(16);
  }
  p{
    font-size: 3.2vw;
    margin-top: r(11);
  }
}
}
.tips{
  width: 95%;
  margin: 0 auto;
  height:r(48);
  line-height: r(48);
  background: #fff;
  border-bottom: r(8) solid rgb(245,245,245);
  border-top:r(8) solid rgb(245,245,245);
  padding-top: r(8);
  .tz{
    float: left;
    width: 9.6vw;
    height: 4.8vw;
    line-height: 4.8vw;
    text-align: center;
    margin-left: r(16);
    margin-top:r(11);
    border-radius: 1.0667vw;
    background: #1fb1b8;
    color:#fff;
  }
  marquee{
    float: left;
    width: r(285);
    height: r(40);
    line-height: r(40);
    color: #1fb1b8;
    font-size: 0.45rem;
    margin-left: r(8);
  }
}
.centertext{
    width: r(343);
    padding: r(16);
    height: r(209);
    display: flex;
    flex-direction: row;
     flex-wrap: wrap;
     margin: 0 auto;
  .centercontent{
    width: r(158);
    height: r(100);
    margin-right: r(9);
    margin: 0 auto;
  img{
    width: 100%;
    height: 100%;
    border-radius:0.25rem;
  }
}
}

.title_img {
  width: 100%;
  height: r(142);
}
.promise{
  width: 100%;
  height: r(36);
  img{
    width: 100%;
    height: r(36);
  }
}
.bann{
  width: 90%;
  margin: 0 auto;
  border-radius: 0.3rem;
  background: #fff;
  #banner{
  border: none;
  border-radius: 0.3rem;
  .banner_img{
  width:100%;
  height:100%;
  border-radius: 0.3rem;
    }
  }
}

.city{
  // padding-left: 0.26rem; 
  height: 1.17rem;
  line-height: 1.17rem;
  margin: 0 r(16);
  img{
    width: r(18.75);
    height: r(22);
    margin-top: r(11);
    float: left;
  }
  .nex{
    width: r(9);
    height: r(16);
    margin-top: r(14);
    margin-left: r(4);
  }
  p{
    float: left;
    font-size: r(14);
    margin-left: r(4);
    line-height: 1.17rem;
  }
}
.beaut{
  width: 96%;
  height: r(236);
  display: flex;
  flex-direction: row;
  border: none;
  padding: r(15)  0;
  padding-left: r(12);
  .beauitem{
     display: flex;
    flex-direction: column;
    height: r(220);
    border: none;
    box-shadow: 0 r(2) r(6) rgba(0,0,0,0.1);
    .list_img{
      width: r(120);
      height: r(120);
      margin: 0 auto;
    }
    .name{
      width:r(119);
      height: r(40);
      margin: 0 r(19);
      margin-top: r(5);
      font-size: r(14);
      color: #333333;
      line-height: r(20);
      overflow: hidden;
    }
    .flag{
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0 r(19);
      .price{
        font-size: r(16);
        color: #cc2825;
      }
      .size{
        font-size: r(14);
        color: #999999;
        white-space: nowrap;
      }
    }

  }
}
</style>
