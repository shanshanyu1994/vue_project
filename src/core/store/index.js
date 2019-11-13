import Vue from "vue";
import Vuex from "vuex";
import  apis from "@/core/api/apis"
import Store from "storejs";
Vue.use(Vuex);       //this.$store.state

export default new Vuex.Store({
  state: {     //全局属性变量  data
   city:"上海",
   cartList:Store.get("cartList")||[],
   userList:Store.get("userList")||[],
  },
  mutations:{
            //mutations,操作state方法,写函数
            //在组件调用 Vuex mutations方法 使用 commit
            //不要在组件操作 Vuex state
            //   mutations 方法 第一参数 固定就 state
    add(state,data){//加入购物车方法
      // console.log(data);
      var bool=true;
      state.cartList.map((item)=>{
        //重复
        if(item.ID===data.ID){
          // 两种情况  ++  +=   详情页会多一个大于1的num所以+=
        if(data.num>1){//详情页num大于1的情况
            item.num =item.num+data.num;
            bool = false;
          }else{
            item.num++;
            bool=false;
          }
        }
        //不重复  不处理   直接执行下边的新增数据部分
      })


      if(bool){
        //新增数据
        data.num=data.num||1;
        //新增一条后num为data.num或1   因为换磅数之后再加购物车走的是新增，将num赋值为1，但此时页面数字不为1，所以要为data.num
        state.cartList.push(data);//将新的一条数据放入state的cartList
      }
      Store.set("cartList",state.cartList);//存入locallstore
      // console.log(state.cartList);
    }

  },
  getters:{
            //类似 组件内的 computed,函数名字 直接当变量去用
   

  },
  actions:{
      //actions 异步函数,一般写通用接口
      //固定写法第一个参数 写一个 context    //state  getters  commit dispatch
      // actions 里面的方法 使用  dispatch 调用
    
  }


})
