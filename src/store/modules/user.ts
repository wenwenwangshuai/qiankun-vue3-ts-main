import { IUserInfo, IInitMenu, ITiledMenus } from '@/interface/user';
import { Module, ActionTree, MutationTree } from 'vuex';
import { IUserState, IModulesState } from '@/interface/store';
import { getInitInfo } from '@/api/user';
import router from '@/router'

const state: Partial<IUserState> = {
  userInfo: undefined,
  menu: [],
  tiledMenus: {},
  permission: []
};

const mutations: MutationTree<IUserState> = {
  SET_USER_INFO: (state: IUserState, userInfo: IUserInfo) => {
    state.userInfo = userInfo;
  },
  SET_MENU: (state: IUserState, menu: IInitMenu[]) => {
    state.menu = menu;
  },
  SET_TILED_MENUS: (state: IUserState, menu: IInitMenu[]) => {
    const obj: ITiledMenus = {};
    const fn = (list: IInitMenu[]) => {
      list.forEach((item) => {
        obj[item.permission] = {
          id: item.id,
          name: item.menuName,
          path: item.path,
          permission: item.permission
        };
        if (item.subMenu && item.subMenu.length > 0) {
          fn(item.subMenu);
        }
      });
    };
    fn(menu);
    state.tiledMenus = obj;
  },
  SET_PERMISSION: (state: IUserState, permission: string[]) => {
    state.permission = permission;
  }
};

const actions: ActionTree<IUserState, IModulesState> = {
  // get user info
  getUserInfo: ({ commit, state, dispatch }) => {
    return new Promise((resolve, reject) => {
      getInitInfo()
        .then((res) => {
          commit('SET_USER_INFO', res.me);
          commit('SET_TILED_MENUS', res.menu || []);
          commit('SET_MENU', res.menu || []);
          commit('SET_PERMISSION', res.permission || []);
          resolve(state);
        })
        .catch(() => {
          // 获取信息失败则重新登录
          dispatch('logout')
        });
    });
  },
  // 退出登录
  logout: ({ commit, state }, redirectUrl: string) => {
    // 清除token
    router.push(`/login?redirect=${redirectUrl || ''}`);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
} as Module<IUserState, IModulesState>;
