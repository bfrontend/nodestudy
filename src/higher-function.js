// 函数式编程

// 1. 高阶函数  函数作为参数进行传递
var emitter = new events.EventEmitter();
emitter.on('event_foo', function () {
  // TODO: something
  console.log('asdf')
})

var points = [40,100,1,5,56,10];
points.sort((a,b) => a-b);

// 偏函数 通过指定部分参数来产生一个新的定制函数的形式 为偏函数
var isType = function(type){
  return function (obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`
  }
}

var isString = isType('String');
var isFunction = isType('Function')

// 判断数据类型
var Util = {};
for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
  (function(type) {
    Type['is' + type] = function(obj) {
      return Object.prototype.toString.call(obj) === '[object '+ type +']';
    }
  })(type)
};
Type.isArray([]); // 输出：true
Type.isString("str");// 输出：true

// 这个函数可以根据传入的times参数和具体方法，生成一个需要调用指定次数才真正执行实际函数的函数
_.after = function(times, func) {
  if (times <= 0) return func();
  return function() {
    if (--times < 1) { return func.apply(this, arguments) }
  }
}

// 单例

class Animal{
  static getInstance() {
    return Animal.instance || ( Animal.instance = new Animal(...arguments) );
  }
  constructor(name){
    this.name = name
  }
  sayhello() {
    return this.name
  }
}
var dog = Animal.getInstance('asdf')

// AOP 面向切面编程 的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。
Function.prototype.before = function(beforefn) {
  var _self = this; // 保存原函数的引用
  return function() { // 返回包含了原函数和新函数的代理函数
    beforefn.apply(this, arguments); // 执行新函数，修正this
    return _self.apply(this, arguments); // 执行原函数
  }
}

Function.prototype.after = function(afterfn) {
  var _self = this;
  return function() {
    var ret = _self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  }
}

function good() {
  console.log('good')
}

good = good.before(function() {

  console.log(1);

}).after(function() {

  console.log(3);

});