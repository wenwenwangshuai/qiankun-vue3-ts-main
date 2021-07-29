import { GetterTree } from 'vuex';
import { IModulesState } from '@/interface/store';

const getters = {
  userInfo: (state: IModulesState) => state.user.userInfo,
  menu: (state: IModulesState) => state.user.menu,
  permission: (state: IModulesState) => state.user.permission,
  tiledMenus: (state: IModulesState) => state.user.tiledMenus,
  app: (state: IModulesState) => state.app,
  sidebar: (state: IModulesState) => state.app.sidebar,
  tagsView: (state: IModulesState) => state.tagsView
};
export default getters as GetterTree<IModulesState, IModulesState>;
