import directive from "./directive.js";
import Apis from "@/core/api/apis.js";
import { Button } from 'mint-ui';
import Common from "@/components/common";
import Global from "@/core/global";//自动去找global下的index.js
export default (Vue)=>{
    // console.dir(Vue)  //directive  filter
    Common(Vue);
    directive(Vue);
    Vue.prototype.$eventBus=new Vue();  //$on $emit  {$on:fn(),$emit:fn}
    Vue.prototype.$apis=Apis;       //Apis->   {fn(){}}; 
    Vue.prototype.$global=Global;
    // Vue.prototype.uname="Msea____";        测试  this.uname
    Vue.component(Button.name, Button);
   
}