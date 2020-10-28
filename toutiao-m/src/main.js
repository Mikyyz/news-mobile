import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import './styles/index.less'
import './permission' // 权限
import {
  Button,
  Cell,
  CellGroup,
  Search,
  Col,
  Row,
  Icon,
  Swipe,
  Tabbar,
  TabbarItem,
  NavBar,
  Field,
  Form,
  Toast,
  CountDown,
  ActionSheet,
  Image as VanImage,
  Grid,
  GridItem,
  Dialog,
  Tab,
  Tabs,
  List,
  Skeleton,
  PullRefresh,
  Tag,
  Popup,
  Empty,
  Notify,
  Picker,
  DatetimePicker
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
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Form);
Vue.use(Toast);
Vue.use(CountDown);
Vue.use(ActionSheet);
Vue.use(VanImage);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Dialog);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(Skeleton);
Vue.use(PullRefresh);
Vue.use(Tag);
Vue.use(Popup);
Vue.use(Empty);
Vue.use(Notify);
Vue.use(Picker);
Vue.use(DatetimePicker)

var vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


