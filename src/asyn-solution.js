// 异步编程解决方案

// 一. 事件发布/订阅模式
var events = require('events');
var emitter = new events.EventEmitter();
emitter.on('event1', function(message) {
  console.log(message)
})

emitter.emit('event1', 'i am message')

// var http = require('http');
// var options = {
//   host: 'www.baidu.com',
//   port: 80,
//   path: '/upload',
//   method: 'GET'
// }

// var req = http.request(options, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   console.log('HEADERS: ' + JSON.stringify(res.headers));
//   res.setEncoding('utf8');
//   res.on('data', function(chunk) {
//     console.log('BODY: ' + chunk);
//   });
//   res.on('end', function() {
//     console.log('end')
//   });
//   req.on('error', function(e) {
//     console.log('problem with request: ' + e.message);
//   });
//   req.write('data\n');
//   req.write('data\n');
//   req.end();
// })

// 注意事项： 
/**
 * 如果对一个时间添加超过10个侦听器，将会得到一个警告⚠️。这一条设计与node自身单线程运行有关，设计者认为侦听器太多可能
 * 导致内存泄漏，所以存在这样一条警告。调用emitter.setMaxListeners(0)可以将此限制关掉
 */
// 1. 继承 events 模块
function Stream() {
  events.EventEmitter.call(this);
}
Util.inherits(Stream, events.EventEmitter);

// 2. 使用事件队列解决雪崩问题

// 所谓雪崩问题就是在高访问量、大并发量的情况下缓存失效的情景，此时大量的请求同时涌入数据库中，数据库无法同时承受如此大
// 的查询请求，进而往前影响到网站整体的响应速度。

var proxy = new events.EventEmitter();
var status = 'ready';
var select = function (callback) {
  proxy.once('selected', callback);
  if (status === 'ready') {
    status = 'pending';
    db.select("SQL", function(results) {
      proxy.emit('selected', results);
      status = 'ready'
    })
  }
}

// 3. 多异步之间的协作方案
/**
 * 需求描述(渲染页面)
 * 前提条件
 * * 模板读取
 * * 数据读取
 * * 本地化资源读取
 */
var times = 3;
var after = function(times, callback) {
  var count = 0, results = {};
  return function(key, value) {
    results[key] = value;
    count++;
    if (count === times) {
      callback(results)
    }
  }
}
function render(results) {
  console.log('to render', results)
}

var done = after(times, render)

fs.readFile(template_path, 'utf8', function(err, template) {
  done('template', template)
})
db.query(sql, function(err, data) {
  done('data', data)
})
loc.get(function (err, resources) {
  done('resources', resources)
})

// setTimeout模拟如下
var nums = 3;
var done = after(nums, function(results) { console.log('results', results) })
setTimeout(function() { done('first', {first:'first data'}) }, 3000)
setTimeout(function() { done('second', {second:'second data'}) }, 2000)
setTimeout(function() { done('third', {third:'third data'}) }, 1000)
