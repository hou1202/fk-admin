import request from '@/utils/request'

export function homeIndex(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: '/administration/login',
    method: 'post',
    data
  })
}

