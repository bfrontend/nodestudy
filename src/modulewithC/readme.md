## 执行顺序

1. npm i node-gyp -g 编译工具 将C语言代码编译为二进制文件
2. 新建binding.gyp 编译配置文件
3. node-gyp configure 生成系统相关的项目文件
4. node-gyp build 生成二进制的 hello.node 文件