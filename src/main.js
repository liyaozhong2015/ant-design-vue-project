import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Button, Layout, Icon, Drawer, Radio, Menu, Upload, Modal, Table, Form, Input, Select, AutoComplete, Avatar, Divider, DatePicker, FormModel, Checkbox, Tabs, notification, LocaleProvider } from "ant-design-vue";
import store from "./store";
//notification的全局配置方法
notification.config({
  duration: 2
});
//在Vue的原型链中增加notification属性
Vue.prototype.$notification = notification;
Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Upload);
Vue.use(Modal);
Vue.use(Table);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(AutoComplete);
Vue.use(Avatar);
Vue.use(Divider);
Vue.use(DatePicker);
Vue.use(FormModel);
Vue.use(Checkbox);
Vue.use(Tabs);
Vue.use(LocaleProvider);
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4330706_58xg2clvark.js',
});
Vue.component("IconFont", IconFont);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
