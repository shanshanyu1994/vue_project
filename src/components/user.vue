<template>
  <div class="main">
    <div class="login" v-show="bool">
      <div class="back-title"><div class="back"  @click="$router.back()">&lt;</div></div>
      <div class="login-top">密码登录</div>
      <div class="session">
        <div class="login-fast">
          <div class="phone">手机号</div>
          <div class="phonenum">
            <span>+86</span><input type="text" v-model="uname">
          </div>
          <div class="pass">密码</div>
          <input type="password" name="" id="" class="pwd" v-model="upwd">
          <div class="btn">
            <button class="sign" @click="sign()">注册</button><button class="loginto" @click="login()">登录</button>
          </div>
          
        </div>
      </div>
    </div>
    <div class="logined" v-show="!bool">
        <div class="user">
            <div class="photo"><img src="../assets/photo.jpeg" alt="">
            <p>{{uname}}</p>
            </div>
           
            <div class="usermes">
              <ul class="title clear" >
                <li>余额</li>
                <li>吉致券</li>
                <li>优惠券</li>
                <li>兑换券</li>
              </ul>
              <ul class="content clear">
                <li>0.00</li>
                <li>0</li>
                <li>0</li>
                <li>0</li>
              </ul>
            </div>
             <div class="gosign" @click="tosign()">退出登录，去注册</div>
        </div>
        
        <div class="order">我的订单</div>
        <div class="address">收货地址</div>
    </div>
  </div>
</template>

<script>
import usermesg from "@/data/data.json";
import Store from "storejs";
export default {
  data(){
    return{
      uname:"",
      upwd:"",
      bool:true,
      Storearr:Store.get("user")||[],
    }
  },
  computed:{
    // reset(){//监听locallstore数据
    //   this.Storearr = this.Store.get("user")||[];
    // }
  },
  mounted(){
    // console.log(this.Storearr);
    if(this.Storearr.length!==0){//locallstore中有东西
      this.bool = false;//false是遮罩隐藏
    }
  },
  methods:{
    sign(){//注册
      let obj={//定义数据存入格式
        uname: this.uname,
        upwd: this.upwd,
      }
    if(obj.uname&&obj.upwd !==""){//用户名和密码都不为空才可以注册
      this.Storearr.push(obj);
      Store.set("user",this.Storearr);//更新locallstore
    }else{
       alert("用户名或密码不可为空");
    }
    this.uname="";
    this.upwd="";
    // console.log(this.Storearr);
    },
    login(){//注册
      this.Storearr.map((item)=>{//遍历用户信息数组
        if(this.uname===item.uname&&this.upwd===item.upwd){//如果登录成功bool值变为false
          this.bool=!this.bool;
        }
      })
      if(this.bool){//bool值为false时弹出 即用户名或密码错误时
        alert("用户名或密码错误");
      }
    },
    tosign(){
       // Store.clear();//清locallstore
        this.bool=true;
        this.uname="";
        this.upwd="";
    }
  }
};
</script>
<style lang="scss">
.main{
.login{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: -webkit-linear-gradient(-90deg,rgba(54,209,220,1),rgba(9,152,154,1));
  z-index: 4;
  .back-title{
    width: 100%;
    height: r(42);
    .back{
      width: r(37.5);
      height: 100%;
      color: #ffffff;
      font-size: r(30);
      line-height: 100%;
      margin-left: r(10);
    }

  }
  .login-top{
    color:#ffffff;
    font-size: r(31);
    width: r(128);
    height: r(45);
    margin-left: r(20);
  }
  .session{
    width: 100%;
    .login-fast{
      width: r(335);
      margin: 0 r(20);
      // margin-left: r(20);
      .phone{
        color: #ffffff;
        width: 100%;
        height: r(19);
        line-height: r(19);
        font-size: r(14);
      }
      .phonenum{
        height: r(42);
        border-bottom: r(1) solid #ddd;
        span{
          display: inline-block;
          width: r(40);
          height: r(26);
          line-height: r(26);
          background: #ffffff;
          text-align: center;
          color: #157f83;
          font-size: r(16);
        }
        input{
          width: r(265);
          background: none;
          height: r(40);
          border: none;
          color: #fff;
          outline: 0;
          height: 11.2vw;
          padding-left: r(10);
          font-size: 4.6vw;
        }
      }
      .pass{
        width: 100%;
        height: r(20);
        color: #fff;
        margin-top: r(20);
        font-size: r(14);
        line-height: r(20);
      }
      .pwd{
        height: r(42);
        width: 100%;
        border: none;
        border-bottom: 1px solid #ddd;
        outline: 0;
        background: none;
        font-size: r(18);
        color: #fff;
      }
      .btn{
        width: 100%;
        text-align: center;
        .loginto{
        width: r(124);
        height: r(32);
        color:#fff;
        font-size: r(16);
        border: 1px solid #fff;
        background: none;
        border-radius: r(15);
        margin-top: r(20);
        }
        .sign{
        width: r(124);
        height: r(32);
        color:#fff;
        font-size: r(16);
        border: 1px solid #fff;
        background: none;
        border-radius: r(15);
        margin-top: r(20);
        margin-right: r(15);
        }
      }
    }
  }
}
.logined{
  position: fixed;
  top: 0;
  bottom: r(50);
  left: 0;
  right: 0;
  background: #ddd;
  width: 100%;
  height: 100%;
  .user{
    height: r(250);
    width: 100%;
    background: #ffffff;
    margin-bottom: r(8);
    .photo{
      margin-bottom: r(10);
      height: r(150);
      width: 100%;
      border-radius: 50%;
      text-align: center;
      img{
        width: r(100);
        height: r(100);
        border-radius: 50%;
        margin-top: r(20);
      }
    }
  .gosign{
    height: r(20);
    text-align: right;
    padding: 0 r(25);
    font-size: r(12);
    line-height: r(20);
    color: #85bec0;
  }
  .usermes{
      width: 88%;
      padding: 0 r(20);
      margin-bottom: r(15);
      ul{
        li{
          float: left;
          width: 25%;
          text-align: center;
        }
      }
      .title{
        color: rgb(192, 191, 191);
        margin-bottom: r(10);
        font-size: r(14);
      }
      .content{
        font-size: r(16);
      }
    }
  }
  .order{
    height: r(40);
    line-height: r(40);
    padding-left:r(15); 
    width: 96%;
    background: #fff;
    margin-bottom: r(8);
    font-size: r(16);
    color: rgb(156, 156, 156);
  }
  .address{
    height: r(40);
    line-height: r(40);
    padding-left:r(15); 
    width: 96%;
    background: #fff;
    font-size: r(16);
    color: rgb(156, 156, 156);
  }
}
}

</style>