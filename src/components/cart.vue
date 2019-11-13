<template>
  <div class="main">
    <div class="tip" v-show="!cartList.length">购物车还是空的哦！快去加购吧，小可爱！</div>
   <li class="cartline" v-for="(item,index) in cartList" :key="index"> 
        <div class="chec"><img  :src="item.bool?duihaoSrc[0]:duihaoSrc[1]"  @click="changeFn(item,index)"></div>
        <div class="img"><img :src="item.ImgUrl" alt=""></div>
        <div class="mess">
            <p>{{item.Name}}</p>
            <div class="oper"><span class="size">{{item.Size}}</span><span class="min" @click="mini(index)">-</span><span class="num">{{item.num}}</span><span class="add" @click="add(index)">+</span></div>
            <div class="pri"><span>{{item.CurrentPrice*item.num}}</span></div>
        </div> 
    </li>
    <div class="cartbottom">
        <div class="bottomimg"><img :src="isbool?duihaoSrc[0]:duihaoSrc[1]"  @click="allchange()" alt=""></div>
        <div class="all">全选</div><div class="clear" @click="clearFn()">清空</div>
        <div class="total">合计：<span>{{allprice}}</span></div>
        <button class="jiesuan">结算</button>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import Store from "storejs";
export default {
    data(){
        return{
            cartList:[],
            allprice:0,
            isAll:[],
            isbool:true,
            duihaoSrc:["https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg","https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg"],
        }
    },
    mounted(){
        this.cartList=this.$store.state.cartList;
        this.cartList.map((item)=>{
            item.bool = true;
        })
        this.count();
    },
    methods:{
        add(index){
            this.cartList[index].num++;
            this.count();//加之后调用计算总价
             Store.set("cartList",this.$store.state.cartList);//存入locallstore
        },
        mini(index){
            if(this.cartList[index].num>1){
                this.cartList[index].num--
                this.count();
            }else{
                MessageBox.confirm('确定删除该商品').then(action => {
                this.cartList.splice(index,1); 
                this.count();
                //减操作后执行更新locallstore
                Store.set("cartList",this.$store.state.cartList);//存入locallstore    
            }).catch( err =>{

            });
                
            }
                  
        },
        changeFn(item,index){
            item.bool=!item.bool;
            this.$set(this.cartList,index,item)
            this.count();//选中或取消后调用计算总价
            Store.set("cartList",this.$store.state.cartList);//存入locallstore 
        },
        allchange(){
            this.isbool = !this.isbool;
            if (this.isbool===true){
                this.cartList.map((item)=>{
                    item.bool=true;
                })
            }else{
               this.cartList.map((item)=>{
                    item.bool=false;
                })
            }
        },
        count(){
            this.allprice = 0;
            this.isAll = [];
            this.cartList.map((item)=>{
                if(item.bool){
                    this.allprice += item.num*item.CurrentPrice;
                    this.isAll.push(item);
                }
            })
            // console.log(this.isAll);
            if(this.isAll.length===this.cartList.length){
                this.isbool = true;
                this.cartList.bool = true;
            }else{
                this.isbool = false;
            }
        },
        clearFn(){
            if(this.isbool!==true){
                this.cartList.splice(0);
                this.count();
                this.isbool=false;
                Store.set("cartList",this.$store.state.cartList);//存入locallstore 
            }
            
        }
    },
};
</script>
<style lang="scss">
.tip{
    text-align: center;
    margin-top: r(30);
    font-size: r(18);
    color: #7a78fd;
}
.cartline{
    width: 100%;
    height: r(122);
    list-style: none;
    // background:#124587;
    .img{
        float: left;
        img{
            width: r(114);
            height: r(106);
        }
    }
    .chec{
        float: left;
        height: r(40);
        width: r(20);
        margin: 0 r(11) 0 r(15);
       
        img{
            width: r(20);
            height: r(20);
            margin-top: r(44);
        }
    }
    .mess{
        margin-top: r(19);
        width: r(195);
        height: r(25);
        height: r(77);
        float: left;
        p{
            font-size: r(16);
        }
        .oper{
            span{
                display: inline-block;
            }
            .size{
                font-size: r(12);
                color: #cccccc;
                margin-top: r(6.5);
                width: r(97.5);
                height: r(12);
            }
            .min,.add{
                height: r(22);
                width: r(22.5);
                margin-left: r(3);
                font-size: r(16);
                color: #333333;
            }
            .num{
               width: r(32.5);
               height: r(25);
                font-size: r(16);
                color: #333333;
            }
        }
        .pri{
            width: r(49);
            height: r(17);
            font-size: r(13);
            color: #030303;
        }
    }
}
.cartbottom{
    position:fixed;
    background: #ffffff;
    bottom: r(49);
    width: 100%;
    height: r(56);
    .bottomimg{
        width: r(20);
        height: r(36.5);
        margin: 0 r(5) 0 r(12);
        img{
        height: r(20);
        width: r(20);
        margin-top: r(16);
    }
    }
    div{
        float: left;
    }
    .all{
        height: r(21);
        width: r(34);
        color: #333333;
        font-size: r(15);
        margin-right: r(15);
        padding: r(17) 0;
    }
    .clear{
        width: r(30);
        height: r(36);
        font-size: r(13);
        margin-right: r(0.5);
        padding-top: r(18.5);
    }
    .total{
        text-align: right;
        width: r(132.5);
        height: r(24);
        font-size: r(12);
        color: #333333;
        padding-top: r(15);
        padding-left: r(10);
        span{
            color: #f2495e;
            font-size: r(18);
            padding-right: r(15);
            font-weight: bold;
        }
    }
    .jiesuan{
        
        width: r(116);
        height: r(56);
        background: #02d4d7;
        font-size: r(16);
        color: #ffffff;
        border:none;
    }
}
.main{
    padding-bottom: r(150);
}
</style>