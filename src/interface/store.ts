import { IUserInfo, IInitMenu, ITiledMenusObj, ITiledMenus } from './user';
import { IAppState } from './system';

export interface IUserState {
  userInfo: IUserInfo; // 用户信息
  menu: IInitMenu[]; // 左侧菜单
  tiledMenus: ITiledMenus; // 菜单列表（平铺）
  permission: string[]; // 权限列表
}

// 顶部tag导航
export interface ITagsViewState {
  visitedViews: ITiledMenusObj[]; // 访问过的路由列表
}

export interface IModulesState {
  user: IUserState;
  app: IAppState;
  tagsView: ITagsViewState;
}
