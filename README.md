# __预览__
<img src="http://ac-2my9ah1h.clouddn.com/bf5c4f9e268264800e99.gif">

（上图展示文章编辑）
                                                                                                                              

<img src="http://ac-2my9ah1h.clouddn.com/114e78b1130fd13f2d5d.png">
（上图展示 pc 与 mobile ）


#  __前言__ 
「梁同桌 Blog」 是一款追求「极致简约」的产品，用简约的方法展现文字的美感。
   __「地址： http://www.liangtongzhuo.com 」__

# __功能__
- 在线实抒写 Markdowm
- 代码块高亮
- 自适应布局

# __技术依赖__
- 原生 JavaScript ，ES6 语法
- 第三方框架
 - LeanCloud 储存框架
 - marked 转换 Markdown
 - highlight 代码块高亮


# __技术原理__
静态页面托管到 GitHub 并生成 Pages ，然后通过 LeanCloud 封装好的 REST 接口访问访问数据库，一般博客访问量不大，30,000 / 天 API 免费额度够用。
原来创业重度使用 LeanCloud，非常推荐有大家使用 LeanCloud，REST API 简介易懂。 
我的一款模仿 LeanCloud REST 的框架 https://github.com/liangtongzhuo/ltz-rest

# __如何使用？__
## __1.先fork 再克隆到本地__
https://github.com/liangtongzhuo/blog 进去点击 Fork ，然后再自己仓库 clone 本地。
```
git clone 仓库地址
```
## __2.注册 LeanCloud __
 - 地址：https://leancloud.cn/
 - 注册成功后，创建应用- > 点击设置 -> 点击应用 Key -> 把 App ID 与 App Key 填写到刚刚克隆的 blog文件 内 js/config.js 。
```
const APP_ID = '2MY9AH1hE38iVn6cfSMeVXW8-gzGzoHsz';
const APP_KEY = 'rhmGmvC4cz4qohsQlpmP0KV0';
window.AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
//标签
const tagStr = '首页,非技术文章,Node,Web,iOS,GitHub,动漫,工具,编程疑问,游戏,翻译,算法,Swift,MongoDB,Vue,HTML,JavaScript,书,我';
```

- 这时你完成了配置。

## __3.写文章__
- 打开 index.html，为了界面的简洁没有按钮，点击唯一的标题会跳转登陆界面。
- 第一次进来，仅需要输入密码后点击注册，这时会跳转主页。
- 再一次点击标题就会进入抒写文章界面。
- 修改文章，点击进入预览文章界面，然后点击文章标题就可修改当文章。

 
## __结尾__
好了，确实有稍微麻烦。
GitHub 地址：https://github.com/liangtongzhuo/blog
