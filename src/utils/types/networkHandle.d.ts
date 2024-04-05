export interface INetworkHandler {
  /**
   * @desc 获取网络请求的站点地址;
   *
   * 如果请求的url不是http/https开头, 将使用此站点地址作为前缀.
   */
  readonly requestHost: string | undefined;
  /**
   * @desc 默认的请求选项.
   */
  readonly defaultRequestOption: any;
  /**
   * @desc 默认的查询参数.
   */
  readonly defaultQueryParam: any;

  /**
   * @desc 用于构造请求url; 如果返回null, 则使用内部默认的方法进行构造.
   */
  onGetEncodeURIComponent(url: string, body: any): string;

  /**
   * @desc 接收到服务器反馈消息后, 先进行一次原始数据的处理并将处理后的结果返回.
   */
  onRawHandler(serverData: Response, url: string): void;
  /**
   * @desc: 处理api错误.
   * @param data: 服务器返回的消息.
   * @param err_msg: 使用err_msg来代替服务器的错误消息.
   * @return: 如果正确将返回data, 否则返回null.
   */
  onErrorHandler(data: any, url: string): any;

  /**
   * 显示loading.
   * @param loadingDom 要显示loading的dom.
   * @param delay      延迟多久显示
   */
  onShowLoading(loadingDom?: any, delay?: number): void;

  /**
   * 隐藏loading.
   * @param loadingDom 正在显示loading的dom.
   */
  onHideLoading(loadingDom?: any): void;
}
