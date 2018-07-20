一些心得收集

### 第一点

> 在渐进式开发中，提到如何一步步渐进的去进行框架演进，其实在我们的项目中也体现的十分的明显；   
1. 先抽离一些公共的代码；
2. 再将其封装成插件；
3. 然后才是将其发布成npm包，那么团队其他项目想使用的时候，只需要npm install就好；

https://eggjs.app/zh-cn/tutorials/progressive.html ： 其演示如何整个架构如何去演变；


### 第二点

区别框架开发者，应用开发者，插件开发者


### 第三点

> 从1.0到2.0最大的差别在异步函数的处理方式，所以写法也有些区别；从 yieldable 到 awaitable;
比如：

- promise

```js
function echo (msg){
    return Promise.resolve(msg);
}
// 1.0
yield echo('guimei');

// 2.0
await echo('guimei');

```

- array - yield[]

```js

// 1.0
const [a, b] = yield [
    ctx.service.news.list(topic);
    ctx.service.news.get(uid);
]

// 2.0
const [a, b] = await Promise.all([
    ctx.service.news.list(topic);
    ctx.service.news.get(uid);
])
```

- object - yield {}   
类似   


### 目录约定



```js
egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js   // 路由
│   ├── controller    // 解析用户的输入，处理后返回相应的结果
│   |   └── home.js
│   ├── service (可选)    // 
│   |   └── user.js
│   ├── middleware (可选)
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选)
│   |   └── reset.css
│   ├── view (可选)
│   |   └── home.tpl
│   └── extend (可选)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js

```

> 上面各个文件的作用和约定我们慢慢理解，但是先理解一下 Loader, Egg 在 koa 的基础上进行增强最重要的就是就是基于一定的约定。
> 根据功能差异将代码放在不同的目录下管理，对整体的开发成本提升有显著的提高，Loader实现了这一套约定，并且抽象了很多底层的api。

Loader 一些使用还是没有看懂，带我再仔细看看～



### 框架内置基础对象

- 基本对象
从Koa继承而来的4个对象(Application, Context, Request, Response)以及框架扩展的一些对象（Controller, Service, Helper, Config, Logger）

- Application
> 全局应用对象；
> 事件：server, error, request和response

```js
module.exports = app => {
    app.once('server', server => {
        // websocket
    })
    app.on('error', (err, ctx) => {
        // report error
    })
    app.on('request', ctx => {

    }
    app.on('response', ctx => {
        const used = Date.now() - ctx.starttime;
        // log total cost
    }
}
```

- Context 请求级别对象，继承自 Koa.Context;
> 一般会挂在this, 或者是参数中

- Request & Response
> context也代理了很多api

- Controller
> Controller 基类 里面包含了: ctx实例， app实例，config，service，logger对象

```js
    // 从egg上获取
    const Controller = require('egg').Controller;
    class UserController extends Controller{
        // implement
    }
    module.exports = UserController;
```

- Service
> 写法和Controller没什么差异

- Helper
> Helper 用来提供一些实用的 utility 函数。它的作用在于我们可以将一些常用的动作抽离在 helper.js 里面成为一个独立的函数，这样可以用 JavaScript 来写复杂的逻辑，避免逻辑分散各处，同时可以更好的编写测试用例。