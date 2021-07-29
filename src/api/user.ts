import request from '@/utils/request';
import { IInitInfo } from '@/interface/user';

// 获取初始化菜单及权限信息
export const getInitInfo = (): Promise<IInitInfo> => {
  // return request({
  //   url: '/api/auth/initInfo',
  //   method: 'post',
  // });
  return new Promise((resolve) => {
    resolve({
      me: {
        userId: 1,
        userName: '经典优美句子'
      },
      menu: [{
        id: 1,
        menuName: '测试菜单',
        path: '/sub-dome',
        permission: 'dome-menu'
      }],
      permission: ['dome-menu']
    })
  })
};