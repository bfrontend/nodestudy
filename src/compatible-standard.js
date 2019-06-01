// 兼容多种规范的基本写法

(function(name, definition) {
  // 检测上下文环境是否为`AMD` 或 `CMD`
  var hasDefine = typeof define === 'function',
      hasExports = typeof module !== 'undefined' && module.expports;

  if (hasDefine) {
    // `AMD` 或 `CMD` 环境
    define(definition);
  } else if (hasExports) {
    // 定义为普通的 node mok
    module.expports = definition();
  } else {
    // 将模块的执行结果挂在 window 变量中
    this[name] = definition();
  }
})('hello', function() {
  var hello = function() {};
  return hello;
})