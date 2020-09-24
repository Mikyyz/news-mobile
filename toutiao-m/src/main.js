import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import {
    Button,
    Cell,
    CellGroup,
    Search,
    Col,
    Row,
    Icon,
    Swipe,
    SwipeItem
  } from 'vant';
import 'vant/lib/index.css';

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Search);
Vue.use(Col);
Vue.use(Row);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
