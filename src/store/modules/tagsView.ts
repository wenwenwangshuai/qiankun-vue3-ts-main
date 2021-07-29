import { Module, ActionTree, MutationTree } from 'vuex';
import { IModulesState, ITagsViewState } from '@/interface/store';
import { IInitMenu, ITiledMenusObj } from '@/interface/user';
import { pathToRegexp } from 'path-to-regexp';
import store from '@/store';

const state: ITagsViewState = {
  visitedViews: []
};

const pathToMenuObj = (path: string): ITiledMenusObj | undefined => {
  let menuItem: ITiledMenusObj | undefined;
  const tiledMenus = store.state.user.tiledMenus;
  for (let item in tiledMenus) {
    if (pathToRegexp(tiledMenus[item].path).exec(path)) {
      menuItem = tiledMenus[item];
      break;
    }
  }
  return menuItem;
};

const mutations: MutationTree<ITagsViewState> = {
  ADD_VISITED_VIEW: (state: ITagsViewState, path: string) => {
    if (path === '/') {
      return;
    }
    if (state.visitedViews.findIndex((v) => v.path === path) > -1) {
      return;
    }
    const menuItem = pathToMenuObj(path);
    if (menuItem) {
      state.visitedViews.push({
        ...menuItem,
        path
      });
    } else {
      console.log('获取菜单名称错误', path);
    }
  },
  DEL_VISITED_VIEW: (state: ITagsViewState, view: IInitMenu) => {
    state.visitedViews = state.visitedViews.filter(
      (item) => item.permission !== view.permission
    );
  },
  DEL_OTHERS_VISITED_VIEWS: (state: ITagsViewState, view: IInitMenu) => {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.permission === view.permission;
    });
  },
  DEL_ALL_VISITED_VIEWS: (state: ITagsViewState) => {
    state.visitedViews = state.visitedViews.filter((item) => item.affix);
  }
};

const actions: ActionTree<ITagsViewState, IModulesState> = {
  addView({ dispatch }, path: string) {
    dispatch('addVisitedView', path);
  },
  addVisitedView({ commit }, path: string) {
    commit('ADD_VISITED_VIEW', path);
  },
  delView({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch('delVisitedView', view);
      resolve({
        visitedViews: [...state.visitedViews]
      });
    });
  },
  delVisitedView({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_VISITED_VIEW', view);
      resolve([...state.visitedViews]);
    });
  },
  delOthersViews({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch('delOthersVisitedViews', view);
      resolve({
        visitedViews: [...state.visitedViews]
      });
    });
  },
  delOthersVisitedViews({ commit, state }, view) {
    return new Promise((resolve) => {
      commit('DEL_OTHERS_VISITED_VIEWS', view);
      resolve([...state.visitedViews]);
    });
  },
  delAllViews({ dispatch, state }, view) {
    return new Promise((resolve) => {
      dispatch('delAllVisitedViews', view);
      resolve({
        visitedViews: [...state.visitedViews]
      });
    });
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit('DEL_ALL_VISITED_VIEWS');
      resolve([...state.visitedViews]);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
} as Module<ITagsViewState, IModulesState>;
