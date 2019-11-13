import swiper from "./swiper.vue";//轮播
import { Tabbar, TabItem } from "mint-ui";//底部导航
export default (Vue)=>{
    // console.log(Vue)
    Vue.component("swiper",swiper);
    Vue.component(Tabbar.name, Tabbar);
    Vue.component(TabItem.name, TabItem);
}
