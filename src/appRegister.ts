import { registerMicroApps, start, initGlobalState } from 'qiankun';
import store from './store';
import router from './router';
import appStore from './utils/app-store'; // 导入qiankun应用间通信机制appStore

interface IRegistrableApp {
  name: string;
  entry: string; // 入口
  localEntry?: string; // 本地入口（development时优先）
  routePrefixRegExp: RegExp; // 路由统一前缀匹配（推荐）
  extraRoutePrefixList: string[]; // 兼容某些无特定前缀路由（不推荐）
}
// 模块配置
const apps: IRegistrableApp[] = [
  {
    name: 'dome', // app name registered
    entry: `http://localhost:8088/index.html`,
    routePrefixRegExp: /^\/dome(\/.*)?(\?.*)?(#.*)?$/i,
    extraRoutePrefixList: ['sub-dome']
  }
];
// 本地环境判断
const isDev: boolean = process.env.NODE_ENV === 'development'; // 根据开发环境|线上环境加载不同entry
/**
 * @name 声明要传递给子应用的信息
 * @param router 主应要传递给子应用的路由信息
 * @param store 主应要传递给子应用的状态信息
 */
let props = {
  router,
  store
};

// 获取当前hash路由
function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  const href = window.location.href;
  const index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1);
}

//  ----------------------- 注册子应用 -----------------------
registerMicroApps(
  apps.map((item) => {
    const {
      name,
      entry,
      localEntry,
      routePrefixRegExp,
      extraRoutePrefixList
    } = item;
    return {
      name,
      entry: isDev ? localEntry || entry : entry,
      container: '#subappContainer',
      activeRule: () => {
        // 根据当前路由匹配前缀
        const curHash = getHash();
        const extraRegExp = eval(
          `/^\\/(${(extraRoutePrefixList || []).join(
            '|'
          )})(\\/.*)?(\\?.*)?(#.*)?$/i`
        );
        return extraRegExp.test(curHash) || routePrefixRegExp.test(curHash);
      },
      props
    };
  })
);

start(); // 启动微前端

// 启动qiankun应用间通信机制
appStore(initGlobalState);
