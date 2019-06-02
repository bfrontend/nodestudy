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

// currying
/**
 * currying 函数柯里化，有称部分求值。一个currying的函数首先会接受一些参数，接受了这些参数后，该函数并不会立即求值，
 * 而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数被真正需要求值的时候，之前传入的所有
 * 参数都会被一次性用于求值。
 */
// 通用函数，接受一个参数，即将要被currying 的函数
var currying = function(fn) {
  var args = [];
  return function() {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
      [].push.apply(args, arguments);
      return arguments.callee;
    }
  }
}
// 将要被currying 的函数
var cost = (function() {
  var money = 0;
  return function() {
    for (var i = 0, l = arguments.length; i < l; i ++) {
      money += arguments[i]
    }
    return money;
  }
})();

var cost = currying(cost);
cost(100)
cost(200)
cost(300)
console.log(cost())

// uncurrying
/**
 * 在javascript 中，当我们调用对象的某个方法时， 其实不用去关心该对象原本是否被设计为拥有这个方法，这事动态类型语言
 * 的特点，也是常说的鸭子类型思想。
 * 同理，一个对象也未必只能使用它自身的方法，那么有什么办法可以让对象去借用一个原本不属于它的方法呢？答案对于我们来说很
 * 简单，call和apply都可以完成这个需求，因为用call和apply可以把任意对象当做this传入某个方法，这样一来，方法中用到
 * this的地方就不再局限于原来规定的对象，而是加以泛化并得到更广的适用性。
 * 而uncurrying的目的是将泛化this的过程提取出来，将fn.call或者fn.apply抽象成通用的函数。
 */
// uncurrying 实现
Function.prototype.uncurrying = function() {
  var self = this;
  return function() {
    return Function.prototype.call.apply(self, arguments);
  }
}
/**
 * 将Array.prototype.push 进行uncurrying 此时push 函数的作用就跟Array.prototype.push 一样了，且不仅仅局限于
 * 只能操作array 对象
 */


var push = Array.prototype.push.uncurrying();

var obj = {
  "length": 1,
  "0": 1
}

push(obj, 2)
console.log(obj)

// 函数节流
/**
 * 当一个函数被频繁调用时，如果会造成很大的性能问题的时候，这个时候可以考虑函数节流，降低函数被调用的频率。
 * throttle函数的原理是，将即将被执行的函数用setTimeout 延迟一段时间执行。如果该次延迟执行还没有完成，则忽略接下来
 * 调用该函数的请求。throttle函数接受2个参数，第一个参数为需要被延迟执行的函数，第二个参数为延迟执行的时间。
 */

var throttle = function(fn, interval) {
  var _self = fn, // 保存需要被延迟执行的函数引用
      timer, // 定时器
      firstTime = true; // 是否是第一次调用

return function () {
  var args = arguments,
      _me = this;

  if (firstTime) { // 如果是第一次调用，不需延迟执行
    _self.apply(_me, args);
    return firstTime = false;
  }

  if (timer) { // 如果定时器还在，说明前一次延迟执行还没有完成
    return false;
  }

  timer = setTimeout(function() { // 延迟一段时间执行
    clearTimeout(timer);
    timer = null;
    _self.apply(_me, args);
  }, interval || 500);
}
}

window.onresize = throttle(function() {
  console.log(1)
}, 500);

// 分时函数
/**
 * 当一次的用户操作会严重地影响页面性能，如在短时间内往页面中大量添加DOM节点显然也会让浏览器吃不消，我们看到的结果往往
 * 就是浏览器的卡顿甚至假死。
 * 这个问题的解决方案之一是下面的timeChunk函数让创建节点的工作分批进行，比如把1秒钟创建1000个节点，改为每隔200毫秒
 * 创建8个节点。
 * timeChunk函数接受3个参数，第一个参数是创建节点时需要用到的数据，第二个参数是封装了创建节点逻辑的函数，第三个参数
 * 表示每一批创建的节点数量。
 */

var timeChunk = function(ary, fn, count){
  var t;
  var start = function() {
    for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
      var obj = ary.shift();
      fn(obj);
    }
  }
  return function() {
    t = setInterval(function() {
      if (ary.length === 0) { // 如果全部节点都已经被创建好
        return clearInterval(t);
      }
      start();
    }, 200);
  }
}

/**
 * 栗子🌰
 * var arr = []
 * for (let i = 0; i < 10000; i++) {
 *  arr.push(i)
 * }
 * function insertDom(obj) {
 *  var dom = document.createElement('div');
 *  dom.innerHTML = obj;
 *  document.body.append(dom);
 * }
 * var dosomething = timeChunk(arr, insertDom, 6)
 * dosomething()
 */

//  惰性加载函数
/**
 * 在web开发中，因为浏览器之间的实现差异，一些嗅探工作总是不可避免。比如我们需要一个在各个浏览器中能够通用的事件
 * 绑定函数addEvent, 常见的写法如下：
 */
// 方案一：
  var addEvent = function(elem, type, handler) {
  if (window.addEventListener) {
    return elem.addEventListener(type, handler, false);
  }
  if (window.attachEvent) {
    return elem.attachEvent('on' + type, handler);
  }
}
/**
 * 缺点： 当它每次被调用的时候都会执行里面的if条件分支，虽然执行这些if分支的开销不算大，但也许有一些办法可以让程序避免
 * 这些重复的执行过程。
 */

// 方案二：
var addEvent = (function() {
if (window.addEventListener) {
  return function(elem, type, handler){
    elem.addEventListener(type, handler, false);
  }
}
if (window.attachEvent) {
  return function(elem, type, handler) {
    elem.attachEvent('on' + type, handler);
  }
}
})();
/**
 * 缺点： 也许我们从头到尾都没有使用过addEvent函数，这样看来，一开始的浏览器嗅探就是完全多余的操作，而且这也会
 * 稍稍延长页面ready的时间
 */
// 方案三：
var addEvent = function(elem, type, handler) {
if (window.addEventListener) {
  addEvent = function(elem, type, handler) {
    elem.addEventListener(type, handler, flase);
  }
} else if (window.attachEvent) {
  addEvent = function(elem, type, handler) {
    elem.attachEvent('on' + type, handler);
  }
}
addEvent(elem, type, handler)
}
/**
 * 此时addEvent已然被声明为一个普通函数，在函数里已然有一些分支判断。但是在第一次进入条件分支之后，在函数内部会重写
 * 这个函数，重写之后的函数就是我们期望的addEvent函数，在下一次进入addEvent函数的时候，addEvent函数里不再存在
 * 条件分支语句。
 */
