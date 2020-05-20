import request from '@/utils/request';

/**
 * 获取token
 */
export function getToken(params) {
  return request({
    url: '/api/login',
    method: 'post',
    data: params,
  });
}

/**
 * 获取用户角色权限和用户信息
 */
export function getUserRoles(params) {
  return request({
    url: '/api/userRoles',
    method: 'get',
    params,
  });
}
