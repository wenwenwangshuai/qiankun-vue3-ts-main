
// 初始化信息
export interface IInitInfo {
  me: IUserInfo;
  menu: IInitMenu[]; // 菜单列表
  permission: string[]; // 权限列表
}

// 用户信息
export interface IUserInfo {
  userId: number; // 用户ID
  userName: string; // 用户名称
}

// 菜单实例
export interface IInitMenu {
  id: number; // 菜单ID
  menuName: string; // 菜单名称
  path: string; // 菜单路径
  permission: string; // 对应权限名称
  subMenu?: IInitMenu[];
}

export interface ITiledMenus {
  [key: string]: ITiledMenusObj;
}

// 平铺菜单实例
export interface ITiledMenusObj {
  id: number; // 菜单ID
  name: string; // 菜单名称
  path: string; // url路径
  permission: string; // 对应权限名称
  affix?: boolean; // 是否固定（例：首页）
}
