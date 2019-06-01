node 中package.json 包结构描述文件

```markdown
{
	"name": "package_name", // 包名(小写字母、数字、.、_-) 必须唯一
	"description: "", // 包简介
	"version": "", // 语义化版本号  major.minor.revision
	"keywords: "", // 关键词数组, npm 中用来进行分类搜索
	"maintainers: [ // 包维护者列表
    {
      "name": "",
      "email": "",
      "web": ""
    }
	],
	"contributors": [ // 贡献者列表
    {
			"name": "",
			"email": "",
			"web": ""
    }
	],
	"bugs": "", // 一个可以反馈bug的网页地址或邮件地址
	"licenses": [ // 当前包所使用的许可证列表
    {
      "type": "GPLv2",
      "url" "http://www.example.com/licenses/gpl.html"
    }
  ],
	"repository": { // 托管源代码的位置列表
		"type": "git",
		"url": "git+https://github.com/vuejs/vue.git"
	},
	"dependencies": { // 当前包所需要依赖的包列表
  
  },
  "homepage": "", // 当前包的网站地址
  "os": [ // 操作系统支持列表
		"darwin",
		"linux"
  ],
  "cpu": [ // CPU架构的支持列表
		"x64",
		"ia32"
  ],
  "engines": { // 支持的javascript 引擎列表
		"node" : ">=0.10.3 <0.12"
  },
	"builtin": "", // 标志当前包是否是内建在底层系统的标准组件
	"directories": "", // 包目录说明

  "implements": "", // 实现规范的列表

  "scripts": { // 脚本说明对象
		"dev": "",
		"build:win": ""
  },
  "author": "", // 包作者
  "bin": "", { // 一个或多个可执行的文件希望被放到PATH中
		"npm" : "./cli.js"
  },
	"main": "", // 模块主入口
  "devDependencies": { // 一些模块只在开发时需要依赖

  }
}

```

![code](http://imgoss.bfrontend.com/2019-06-01-101923.png)