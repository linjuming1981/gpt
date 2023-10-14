// 存储请求和响应的数组
unsafeWindow.responses = [];

// 重写XMLHttpRequest的open方法
var originalOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url) {
  // 拦截异步请求
  if (arguments[2] === true) {
    // 保存请求URL
    var requestURL = url;
    let ctime = Date.now()
    
    // 重写onload回调函数
    var originalOnload = this.onload;
    this.onload = function() {
      unsafeWindow.responses.push({
        url: requestURL,
        resText: this.responseText,
        ctime,
      })

      // 执行原始的onload回调函数
      if (originalOnload) {
        originalOnload.apply(this, arguments);
      }
    };
  }
  
  // 调用原始的open方法
  originalOpen.apply(this, arguments);
};
