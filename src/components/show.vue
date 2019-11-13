<template>
  <div class="body">
    <div class="tolist" @click="$router.back()">更多商品</div>
    <div class="showbann">
         <!-- 轮播和标题 -->
        <swiper :config="{id:'showbanner',info:{pagination:'.swiper-pagination',autoplay:false,speed:200,loop: false,autoplayDisableOnInteraction : false}}">
        <div class="swiper-slide" v-for="(item,index) in Swipers" :key="index">
            <img class="showbanner_img" :src="banners+item+'.jpg'">
        </div>
        </swiper> 
        <div class="cake_title">
        <div class="Name" v-if="types.length!==0">{{types[0].Name}}</div>
        <p class="new"><span>新</span><span>折</span></p>
        </div>
    </div>
    <div class="detail">
        <div class="suger" v-if="isload"><span class="sweet">甜度</span><p><img :src="`https://res.bestcake.com/m-images/ww/jz/tiandu_${info.Sweet||info.CakeType[0].Sweet}.png`" alt=""></p></div>
        <div class="kouwei"><span>口味</span><p>{{info.CategoryName}}</p></div>
        <div class="yuanliao"><span>原材料</span><p>{{info.Resource||info.Resourse}}</p></div>
        <div class="shihe"><span>适宜人群</span><p>所有人群</p></div>
        <div class="condition"><span>保鲜条件</span><p>{{info.KeepFresh||"最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。"}}</p></div>
    </div>
    <div class="mes"></div>
    <div class="Type"  >
        <div class="Size clear">
            <li v-for="(item,index) in types" :key="index">
            <button @click="userSelect(index)" :class="{active:ind===index}">{{item.Size}}</button>
            </li>
        </div>
        <div class="stand clear" v-if="JSON.stringify(this.ProductSize)!=='{}'">
            <ul class="clear">
                <li><span><img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-1.png?v=112" alt=""></span><p>{{this.ProductSize.pc.configsize||this.Pconfig.pc.configsize}}</p></li>
                <li><span><img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-2.png" alt=""></span><p>{{this.ProductSize.pc.configpeople||this.Pconfig.pc.configsize}}</p></li>
                 <li><span><img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png" alt=""></span><p>{{this.ProductSize.pc.configware||this.Pconfig.pc.configware}}</p></li>
                <li><span><img src="https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png" alt=""></span><p>{{this.ProductSize.pc.configtips||this.Pconfig.pc.configtips}}</p></li>
            </ul>
        </div>
       
    </div>
    <div class="Buynum">
        <div class="word">购买数量</div><div class="buy"><div class="do"><span class="add" @click="add()">+</span><span class="num">{{num}}</span><span class="min" @click="mini()">-</span></div></div>
    </div>
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
    <div class="showbottom">
        <p class="sum">{{currenttypes.CurrentPrice*num||"-"}}</p><p class="cart" @click="toCart()">加入购物车</p><button class="buy">立即购买</button>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    data(){
         return{
            params:{},
            //图片路径
            banners:"",
            Swipers:[1,2,3,4],//图片路径后拼接的数字
            types:[],
            info:{},
            isload:false,//用来判断数据是否加载完
            num:1,
            ind:0,
            currenttypes:{},
            ProductSize:{},
            Pconfig:{
                "pc":{configsize:"13.5cm*13.5cm",configpeople:"适合4-5人分享",configtips:"至少需提前一天预约",configware:"含无人份餐具"}
            }
            }
           
    },
   mounted(){
     this.params=this.$route.query;//获取跳路由是传过来的query属性
    //  console.log(this.$route.query);
     this.params.city=this.$store.state.city;
    //  console.log(this.params);
     this.pageInit();
     /*
    ID: "1457"
    Name: "一见倾心"
    SupplyNo: "NS-0083-1"
    city: "上海"
    */
    },
    methods:{
        pageInit(){
            var currentPro;
            if(this.params.SupplyNo.indexOf("KSK")!==-1){//判断接口类型并去除图片地址
                this.banners=this.setImgUrl("jd-detail");
                currentPro=this.$apis.getShowDataTwo({City:this.params.city,ProName:this.params.Name,c:"Product",m:"GetCakeByName"});
            }else if(this.params.SupplyNo.indexOf("NS")!==-1){
                this.banners=this.setImgUrl("ns-detail");
                currentPro=this.$apis.getShowDataOne({Name:this.params.Name,m:"GetNSCakeByName"});
                // console.log(currentPro);
            }else if(this.params.SupplyNo.indexOf("JZ")!==-1){
                this.banners=this.setImgUrl("jz-detail");
                currentPro=this.$apis.getShowDataTwo({City:this.params.city,ProName:this.params.Name,c:"IndexCenter",m:"GetjzCakeInfo"});
            }else if(this.params.SupplyNo.indexOf("RP")!==-1){
                this.banners=this.setImgUrl("rp-detail");
                currentPro=this.$apis.getShowDataOne({Name:this.params.Name,m:"GetRuPCakeByName"});
            }
          currentPro.then((res)=>{
            //因为返回的详情有数组有对象，所以要进行判断
                var res=res.data.Tag;
                // console.log(res);
                if(res.length){
                    res.map((item)=>{//如果可以去到length，说明是数组
                    if(item.City===this.params.city){//根据城市筛选出相应数据
                            // console.log(item);
                            this.types.push(item);
                        }
                        // console.log(this.types);
                    });
                    if(this.types.length===0){
                        this.types = res;
                    }
                     this.info=this.types[0];
                }else{//否则为对象
                    this.types=res.infos.CakeType;
                    this.info=res.infos;
                }
                 //直接调用info会因为没有取到数据而报错，所以要加一个属性到加载完成后为true
            this.isload=true;
            // console.log(this.types,this.info);
            this.userSelect(0);
            
            this.ProductSize = JSON.parse(this.info.ProductConfig||"{}")||this.Pconfig;
            // console.log(this.ProductSize);
          })
        //   console.log(this.banners);
        },
        userSelect(index){
            this.ind=index;
            this.currenttypes = this.types[index];
            // console.log(this.currenttypes);
        },
        mini(){
            if(this.num>1){
                this.num--;
            }else{
                this.num=1;
            }
        },
        add(){
            this.num++;
        },
        toCart(){
            var temp={
                    ID:this.currenttypes.Id||this.currenttypes.ID,
                    Name:this.params.Name,
                    CurrentPrice:Number(this.currenttypes.CurrentPrice),
                    ImgUrl:this.params.ImgUrl,
                    Size:this.currenttypes.Size,
                    num:this.num//详情页比列表页多一个num值
                };
                // console.log(temp);

            MessageBox.confirm('确定加入购物车').then(action => {
                // console.log(123);
                this.$store.commit("add",temp);
                this.$router.push("/cart")
            }).catch( err =>{

            });
        },
        setImgUrl(no){
        return `https://res.bestcake.com/m-images/${no}/${this.params.Name}/${this.params.Name}-`;
        }
    }
};
</script> 
<style lang="scss">
.body{
    background: rgb(247, 243, 243);
    .tolist{
        border: r(1) solid #333333;
        position:fixed;
        top: r(15);
        right: 0;
        height: r(34);
        line-height: r(34);
        text-align: center;
        width: r(82.5);
        font-size: r(16);
        background: rgba(255, 255, 255, 0.5);
        z-index: 3;
    }
    .showbann{
        background: #ffffff;  
        padding-bottom: r(30);
    #showbanner{
        width: 100%;
            height: 66%; 
            .showbanner_img{
                width: 100%;
                height: 100%;
            }
        }
    .cake_title{
        width: 58.3%;
        height: r(61);
        margin: 0  auto;
        background: #ffffff;
    .Name{
        height: r(16);
        line-height: 4.53vw;
        font-weight: bold;
        color: #333;
        font-size: 4.53vw;  
        margin-top: 2vw;
        margin-bottom: 4vw;
        text-align: center;
    }
    .new{
        height: r(30);
        width:100%;
        display: inline-block;
        text-align: center;
        span{
        display: inline-block;
        width: r(30);
        height: r(30);
        font-size: r(15);
        background-color: #f2495e;
        line-height: r(30);
        text-align: center;
        margin-right: r(5);
        }
    }
    
    }
    }
    .detail{
        width: 100%;
        height: r(232);
        margin-top: r(15);
        background: #ffffff;
        padding-top: r(34);
        padding-bottom: r(34);
        div{
            width:100%;
            margin-bottom:r(11); 
            vertical-align: top;
            span{
                display: inline-block;
                width: 25%;
                color: #9a9a9a;
                line-height: r(22);
                margin-left: r(15);
                vertical-align: top;
            }
            p{
                display: inline-block;
                width: 65%;
                line-height: r(22);
                color: #252525;
                img{
                    width: r(84);
                    height: r(16);
                    margin-top: r(2.25);
                }
            }
        }
    }
    .Type{
        width: 100%;
        margin-top: r(15);
        background: #ffffff;
        .Size{
            width: 100%;
            padding-top: r(30);
            li{
                list-style: none;
                float: left;
                // width: 50%;
                height: r(30);
                margin-bottom: r(15);
                button{
                height:r(30);
                border: 1px solid #727272;
                font-size: r(14);
                padding: 0 r(13.4);
                background: #ffffff;
                color: #333333;
                margin-left: r(15);

                
                }
                 .active{
                    border: none;
                    color: #ffffff;
                    background: #02d3d6;
                }
            }
        }
        .stand{
            width: 100%;
            margin-top: r(42.5);
             
            ul{
                width: 100%;
               padding-bottom: r(30);
                li{
                    width: 50%;
                    height: r(24);
                    float: left;
                    margin-bottom: r(15);
                    vertical-align: middle;
                    p{
                        display: inline-block;
                        height: r(24);
                        font-size: r(14);
                        line-height: r(24);
                    }
                    img{
                        width: r(22.5);
                        height: r(22.5);
                        margin-left: r(15);
                        margin-right: r(10);
                    }
                }
            }
        }
            
    }
    .Buynum{
        height: r(22);
        padding: r(15) r(15);
        margin-top: r(15);
        background: #ffffff;
            .word{
                height: 100%;
                width: 50%;
                // display: inline-block;
                line-height: r(22);
                font-size: r(14);
                float: left;
                width: 30%;
                color: #333333;
            }
            .buy{
                width: 30%;
                float: right;
                // text-align: right;
                .do{
                    width: 100%;
                    .min,.add{
                        display: inline-block;
                        font-size: r(16);
                        color: #333;
                        height: 90%;
                        width: r(17);
                        padding: r(3.5);
                        text-align: center;
                    }
                    .num{
                        font-size: r(14);
                        display: inline-block;
                        height: r(22);
                        width: r(28);
                        line-height: r(22);
                        text-align: center;
                    }
                }
                
            }
            span{
                float: right;
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
.showbottom{
    width: 100%;
    height: r(55);
    background:#ffffff;
    position: fixed;
    bottom: 0;
    z-index: 2;
    margin-top: r(15);
    p{
        display: inline-block;
    }
    .sum{
        width: r(135);
        height: r(46);
        color: #f2495e;
        font-size: r(17);
        margin: r(5.5) 0 r(9) r(15);
    }
    .cart{
        width: r(110);
        height: r(26);
        padding: r(16) 0;
        font-size: r(16);
        color: #333333;
        line-height: r(26);
        text-align: center;
    }
    .buy{
        width: r(115);
        height: r(58);
        // padding: r(16) 0;
        background: #02d4d7;
        font-size: r(16);
        color: #fff;
        border: none;
    }
}
</style>