/*
 * @Author: lanck.xie
 * @Date: 2024-03-27 14:50:19
 * @Last Modified by: lanck.xie
 * @Last Modified time: 2024-03-28 23:35:43
 */

import net from '@/utils/request'
import { PopularApi } from '../config-api'

/**
 * @description 获取github热门项目
 * @param {popular.searchParamsType} params
 * @return {*}
 */
function getGithubSearchList(params: popular.searchParamsType) {
  return net
    .get(PopularApi.getGithubSearchList, { params, headers: { 'Cache-Control': 'max-age=1800' } })
    .then(res => {
      return Promise.resolve((res as any).items)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export default {
  getGithubSearchList
}
