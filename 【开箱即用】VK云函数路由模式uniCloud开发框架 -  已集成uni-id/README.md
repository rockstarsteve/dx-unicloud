### uniCloud云函数路由框架研究Q群:22466457 如有问题或建议可以在群内讨论。
### 插件名称：`vk-unicloud-router`
### 作者：VK
### 更新时间：2020-10-28
## 主要功能 以及 对开发者的价值

#### 1、实现云函数路由模式
```
1.1、路由模式不使用任何第三方包，兼容性强，运行稳定
1.2、减少云函数数量，云函数有个数限制（用一个云函数即可实现多个云函数效果）
1.3、部分通用的代码块可以放在公共区执行，类似公共函数的效果
1.4、可以在开发环境和生产环境中任意切换，开发时，用开发环境，开发过程中不会影响到线上环境。（具体切换方法在文档最后）
```

#### 2、实现`全局过滤器`，过滤非法请求

#### 3、众多现成的`JS API`，让你无需重复造轮子。（持续增加中）

#### 4、全面支持`url化`的云函数请求，您无需关心url化后参数的获取问题

#### 5、已集成`uni-id` 当前版本:`1.1.14`（已支持真实发送邮箱验证码和阿里云短信验证码）
```
5.1、由于每个应用基本都会用上用户系统，官方建议所有`uniCloud`应用均使用`uni-id`作为用户体系，
有了统一的账户规范，并且围绕这套账户规范，有各种各样插件，那么开发者可以随意整合这些插件，让数据连同。

5.2、同时方便其他用户使用`unicloud`插件发布者发布的前后端一体插件，只需要导入一个云函数即可。
(如导入一个社区插件，可能要导入几十个云函数，而使用此云函数路由后，只需导入一个云函数，且已集成`uni-id`，打通账号体系)。
```

#### 6、将`uni-id`的API封装成 `userCenter` 通过this.vk.userCenter 即可调用
 
#### 7、封装`uni.callFunction` 和 `uni.request` 使之合二为一 通过this.vk.callFunction 调用

#### 8、【1.2.2 新增】 `vk.baseDao`数据库工具包，使小白也能轻松上手对数据库的调用。

#### 9、【1.2.7 新增】 集成`uview-ui` UI框架（感谢`uview-ui`作者）。

#### 10、【1.2.9 新增】 前后端一体动态数据组件

#### 10.1、`vk-u-notice-bar` `uniCloud`动态数据组件 - `公告`

#### 10.2、`vk-u-swiper` `uniCloud`动态数据组件 - `图片轮播`

#### 10.3、`vk-u-grid-button` `uniCloud`动态数据组件 - `图文导航（宫格按钮）`

#### 11、【1.3.8 新增】 `商品SKU选择器组件`（打造uni插件市场功能最全的SKU选择器组件）
#### 12、【1.4.3 新增】 全网首家云函数临时缓存功能(数据储存在内存中,不依赖云数据库,也不依赖redis等缓存数据库)

#### 13、【1.4.6 新增】对 `Vuex` 进行了深度封装（支持持久化），现在可以很方便的使用Vuex进行读取和储存。

#### 14、【1.4.8 新增】自定义过滤器（在业务云函数执行之前，统一拦截，进行过滤后再放行，支持设置多个过滤器，并按指定顺序执行）

#### 15、作者亲自在群内解答框架使用问题，让你轻松上手`uniCloud云开发`。

#### 16、其他好处…

##### 插件首页体验地址

![插件首页体验地址](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-vk-cloud-router-test/51de83e0-e9ae-11ea-81ea-f115fe74321c.png?x-oss-process=image/resize,h_250 "插件首页体验地址")
 
## 快速上手

[点击查看『安装步骤』](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B%20-%20%E5%AE%89%E8%A3%85%E6%AD%A5%E9%AA%A4?sort_id=2912167)

## 云函数框架目录结构

```html
.
├── common─────────────────# 自定义官方公共模块包
│ └── config──────────────────# 全局配置公共模块
│ └── uni-id──────────────────# uni-id官方公共模块
├── router─────────────────# 正式环境云函数主入口(函数路由器)
│ └── node_modules─────────# npm包
│ └── dao──────────────────# dao层(用于直接操作数据库)
│ └── service──────────────# 逻辑层(用于业务逻辑)
│ ── └── components_dynamic──# 动态数据组件服务
│ ──── └── kh──────────────────# kh函数为必须登录后才能访问的函数(客户端用户)
│ ──── └── pub─────────────────# pub函数为所有人都可以访问,不限制
│ ──── └── sys─────────────────# sys函数为后端管理人员才能访问的函数(商家后台工作人员)
│ ──── └── util────────────────# 工具包
│ ── └── db_test─────────────# vk.baseDao 数据库API调用测试服务
│ ──── └── kh──────────────────# kh函数为必须登录后才能访问的函数(客户端用户)
│ ──── └── pub─────────────────# pub函数为所有人都可以访问,不限制
│ ──── └── sys─────────────────# sys函数为后端管理人员才能访问的函数(商家后台工作人员)
│ ──── └── util────────────────# 工具包
│ ── └── order───────────────# 订单服务
│ ──── └── kh──────────────────# kh函数为必须登录后才能访问的函数(客户端用户)
│ ──── └── pub─────────────────# pub函数为所有人都可以访问,不限制
│ ──── └── sys─────────────────# sys函数为后端管理人员才能访问的函数(商家后台工作人员)
│ ──── └── util────────────────# 订单服务专用的工具包
│ ── └── user────────────────# 用户服务(已集成uniID)
│ ──── └── kh──────────────────# kh函数为必须登录后才能访问的函数(客户端用户)
│ ──── └── pub─────────────────# pub函数为所有人都可以访问,不限制
│ ──── └── sys─────────────────# sys函数为后端管理人员才能访问的函数(商家后台工作人员)
│ ──── └── util────────────────# 用户服务专用的工具包
│ ── └── muban.js──────────────# service下空函数模板
│ └── util─────────────────# 工具包
│ ── └── checkIsLogin.js──────# 检测客户端用户是否已登录
│ ── └── checkSysAuth.js──────# 管理后台的权限检测
│ ── └── filter.js────────────# 全局过滤器
│ ── └── pubFunction.js───────# 公共函数包
│ └── index.js─────────────# 入口函数
│ └── package-lock.json────# 工具包
└── └── package.json──────────# 第三方依赖配置文件(若使用npm，自动生成)
.
├── router-test───────────────# 函数路由(开发测试环境)
│ └── ...─────────# ...
│ └── ...─────────# ...
└── └── ...─────────# ...
```

## 云函数service模板文件示例
```js
module.exports = {
  /**
  * 此函数名称
  * @url user/sys/test1 前端调用的url参数地址
  * @description 此函数描述
  * @params {Object} data 请求参数
  * @params {String} uniIdToken 用户token
  * @params {String} userInfo 当前登录用户信息(同理,是可信任的)(只有kh函数才带此参数)
  * @params {Object} util 公共工具包
	* @params {Object} filterResponse 过滤器返回的数据
  * @params {Object} originalParam 原始请求参数(包含了原始event和context)
  * data 请求参数 说明
  * @params {String} uid  当前登录用户id,若用户已登录且token有效,则data中会带uid参数
  * (此参数是后端过滤器通过token获取并添加到data中的,是可信任的)(只有kh函数才带此参数)
  * res 返回参数说明
  * @params {Number} code 错误码，0表示成功
  * @params {String} msg 详细信息
  */
  main: async (event) => {
    let { data = {}, userInfo, util, filterResponse, originalParam } = event;
    let { customUtil, uniID, config, pubFun, vk , db, _ } = util;
    let { uid } = data;
    let res = { code : 0, msg : '' };
    // 业务逻辑开始----------------------------------------------------------- 
    // 可写与数据库的交互逻辑等等
  
  
    // 业务逻辑结束-----------------------------------------------------------
    return res;
  }
}
```
#### 成功时返回
```js
// 注意：所有成功请求必须返回code：0 code为其他值，代表失败，如兑换失败，您的积分不足！
// 如成功时返回 res.code = 0 表示执行成功;
return {
  code : 0,
  msg : '兑换成功！' 
}
```
#### 失败时返回
```js
return {
  code : -1,
  msg : '兑换失败，您的积分不足！'
}

```

## this.vk.callFunction函数的参数说明
```js
/**
 * 云函数请求封装 - 统一入口
 * @description 通过云函数路由，1个云函数实现多个云函数的效果。
 * @params {String}   url       请求路径，该路径实为router云函数的service目录下的路径
 * @params {Object}   data      请求参数
 * @params {String}   title     遮罩层提示语，为空或不传则代表不显示遮罩层。
 * @params {Boolean}  isRequest 是否使用云函数url化地址访问云函数，默认false
 * @params {Boolean}  noAlert   为true代表请求错误时，不会有弹窗提示。默认为false
 * @params {Function} success   请求成功时，执行的回调函数
 * @params {Function} fail      请求失败时，执行的回调函数
 * @params {Function} complete  无论请求成功与否，都会执行的回调函数
 */
```


## 前端调用云函数示例

```js

this.vk.callFunction({
	url: 'user/kh/setAvatar',
	title:'请求中...',
	data:{
		avatar: "https://xxxxxxx.jpg"
	},
	success(data) {
		// 修改成功
	}
});

```

## 云函数url化方式调用云函数示例

[点击查看『云函数url化』方式调用云函数示例](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/%E4%BA%91%E5%87%BD%E6%95%B0url%E5%8C%96%E6%96%B9%E5%BC%8F%E8%B0%83%E7%94%A8%E4%BA%91%E5%87%BD%E6%95%B0%E7%A4%BA%E4%BE%8B?sort_id=2912174)

## 前端非法token拦截器

[点击查看『前端非法token拦截器』](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/%E9%85%8D%E7%BD%AE%E5%89%8D%E7%AB%AF%E9%9D%9E%E6%B3%95token%E6%8B%A6%E6%88%AA%E5%99%A8?sort_id=2912176)

## vk.baseDao数据库API

[点击查看『vk.baseDao』数据库API](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/%60vk.baseDao%60%E6%95%B0%E6%8D%AE%E5%BA%93API?sort_id=2912178)

## 列表渲染前后端一体模板

[点击查看『列表渲染』前后端一体模板](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/%60%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93%60%E5%89%8D%E5%90%8E%E7%AB%AF%E4%B8%80%E4%BD%93%E6%A8%A1%E6%9D%BF?sort_id=2912179)

## 前后端一体动态数据组件

[点击查看『前后端一体动态数据组件』](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/%E8%AF%B4%E6%98%8E?sort_id=2912181)

## 商品SKU选择器组件

[点击查看『商品SKU选择器组件』](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/%E6%96%B0%20-%20%E5%95%86%E5%93%81SKU%E9%80%89%E6%8B%A9%E5%99%A8%E7%BB%84%E4%BB%B6?sort_id=2912199)

## 如何切换 正式环境 和 开发环境

[点击查看如何『切换正式环境和开发环境』](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/%E5%A6%82%E4%BD%95%E5%88%87%E6%8D%A2%E6%AD%A3%E5%BC%8F%E7%8E%AF%E5%A2%83%E5%92%8C%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83?sort_id=2912182)

## 本插件更新步骤
[点击查看本插件『更新步骤』](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/%E6%8F%92%E4%BB%B6%E6%9B%B4%E6%96%B0%E6%AD%A5%E9%AA%A4?sort_id=2912183)

## uniCloud云函数路由框架研究Q群:`22466457` 如有问题或建议可以在群内讨论。
## 你也可以在评论区发布留言交流心得。