import '@/styles/index.scss'; // 引入全局样式
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import directive from '@/utils/global/directive'; // 全局自定义指令
import properties from '@/utils/global/properties'; // 全局方法
// import components from '@/utils/global/components'; // 全局组件
import 'element-plus/lib/theme-chalk/index.css';
import 'dayjs/locale/zh-cn';
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import './appRegister'; // 引入qiankun

export default createApp(App)
  .use(router)
  .use(store)
  .use(properties)
  .use(directive)
  // .use(components)
  .use(ElementPlus, { locale })
  .mount('#app-main');
