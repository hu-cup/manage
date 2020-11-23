import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//配置axios
import axios from './utils/request'
Vue.prototype.$axios = axios

// 页面鉴权
router.beforeEach((to,from,next)=>{
  const token  = store.state.token;
  if(!token){
    if(to.path != '/login'){
      next('/login')
    }else{
      next();
    }
  }else{
    if(to.path=='/login'){
      next('/frist')
    }else{
      next();
    }
  }
})



// 配置element Ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
