/**
 * @desc 网络消息处理器.
 */

export class NetworkHandler {
  /**
   * @desc 获取网络请求的站点地址;
   *
   */
  get requestHost(): string | undefined {
    return process.env.VUE_APP_URL
  }

  /**
   * @desc 默认的请求选项.
   */
  get defaultRequestOption() {
    const headers: any = {
      'Content-Type': 'application/json',
      'X-HTTP-AUTHENTICATE': '1'
      // "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, x-http-authenticate",
    }

    return {
      timeout: 20 * 1000,
      credentials: 'include',
      mode: 'cors',
      headers
    }
  }

  /**
   * @desc: 处理api错误.
   * @param data: 服务器返回的消息.
   * @param err_msg: 使用err_msg来代替服务器的错误消息.
   * @return: 如果正确将返回data, 否则返回null.
   */
  onErrorHandler(data: any): any {
    // common
    switch (data.code) {
      case 401: {
        console.error('无权限')
        throw data
        return
      }
      case 404: {
        console.error('找不到资源')
        throw new Error('404')
      }
      case 500: {
        const prefixs = [
          'com.netflix.client.ClientException: Load balancer does not have available server for client: ',
          '[500 Internal Server Error] during',
          'failed: connect timed out executing'
        ]

        if (data.err_msg) {
          for (const key in prefixs) {
            if (data.err_msg.indexOf(prefixs[key]) >= 0) {
              console.log({ type: 'error', message: '服务暂时不可用' })
              throw data
            }
          }
        }
        break
      }
      case 'fail': {
        console.error('404error')
        throw new Error('404')
      }
    }
    return data.data || data
  }
}
