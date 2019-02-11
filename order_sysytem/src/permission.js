
/**
 * 权限设置
 * created by xuin
 * date 2018-09-14
 */

import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

import { Message } from 'element-ui';

NProgress.configure({showSpinner: false})

// 设置白名单
const whiltList = ['login']

router.beforeEach((to,from,next) => {
  NProgress.start()
  if(getToken()) {
    if(to.path === '/login'){
      next({path: '/'})
      NProgress.done()
    }else {
      next()
    }
  } else {
    if(whiltList.indexOf(to.name) !== -1){
      next()
    } else {
      // Message({
      //   message: '您需要先登录',
      //   type: 'warning'
      // })
      next('/login')

      // next()
      NProgress.done()
    }
    // next()
    // NProgress.done()

  }
})

router.afterEach(() => {
  NProgress.done()
})