// 系统变量
export interface IVueApp {
  VUE_APP_RUN_ENV: string;
}

export interface IAppState {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  device: string;
}
