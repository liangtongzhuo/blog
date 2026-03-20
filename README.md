# __预览__
<img src="data/files/bf5c4f9e268264800e99.gif"> 

（上图展示文章编辑） 
                                                                                                                             
<img src="data/files/114e78b1130fd13f2d5d.png"> 
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
  - marked 转换 Markdown
  - highlight 代码块高亮

# __技术原理__
静态页面托管到 GitHub 并生成 Pages ，使用本地 JSON 文件存储文章数据，图片存储在本地 files 目录。

## __从 LeanCloud 迁移到本地文件存储__

### __迁移原因__
- 减少对第三方服务的依赖
- 提高网站加载速度
- 便于本地开发和调试
- 数据完全可控，避免服务端限制

### __迁移内容__

#### 1. 数据存储迁移
- **原来**：使用 LeanCloud 的 AV.Query 和 AV.User API
- **现在**：使用本地 JSON 文件存储
  - 每个文章一个 JSON 文件，存放在 `data/articles/` 目录
  - 文件名使用文章 ID 命名，如 `58c9340144d9040069eb2294.json`
  - 文章结构保持不变，包含 title、content、createdAt、tag 等字段

#### 2. 图片存储迁移
- **原来**：图片存储在 LeanCloud 的 _File 对象中
- **现在**：图片下载到本地 `data/files/` 目录
  - 保持原有目录结构
  - 图片路径修改为本地相对路径

#### 3. 代码修改
- **config.js**：移除了 AV.init 配置，只保留 tagStr 变量
- **list.js**：修改为从 `data/articles/` 目录获取文章列表
- **atricle.js**：修改为从 `data/articles/{id}.json` 获取文章内容
- **updata.js**：修改为从本地文件获取文章内容
- **移除**：所有关于 av.js 的代码和依赖

#### 4. 路径修复
- 修复了图片路径的 404 错误
- 确保图片路径在不同页面中正确解析

### __本地开发__

#### 1. 克隆仓库
```bash
git clone https://github.com/liangtongzhuo/blog.git
cd blog
```

#### 2. 启动本地服务器
由于使用本地文件存储，需要启动一个 HTTP 服务器来避免 CORS 错误：

```bash
# 使用 Python 3
python3 -m http.server 8000

# 或使用 Node.js
npx http-server -p 8000
```

然后访问 `http://localhost:8000` 即可查看网站。

#### 3. 目录结构
```
blog/
├── css/             # 样式文件
├── data/            # 数据存储
│   ├── articles/    # 文章 JSON 文件
│   └── files/       # 图片和其他文件
├── js/              # JavaScript 文件
├── lib/             # 第三方库
├── index.html       # 首页
├── list.html        # 文章列表页
├── atricle.html     # 文章详情页
└── updata.html      # 文章编辑页
```

### __如何写文章__

1. **创建文章文件**：在 `data/articles/` 目录中创建一个新的 JSON 文件
2. **文件命名**：使用唯一 ID 作为文件名，如 `new-article-id.json`
3. **文章结构**：
   ```json
   {
     "updatedAt": "2026-03-20T00:00:00.000Z",
     "ACL": {
       "*": {
         "read": true
       }
     },
     "content": "文章内容（支持 Markdown）",
     "createdAt": "2026-03-20T00:00:00.000Z",
     "title": "文章标题",
     "tag": "标签1,标签2"
   }
   ```
4. **添加图片**：将图片放入 `data/files/` 目录，然后在文章中使用相对路径引用
   ```markdown
   <img src="data/files/example.jpg" style="width:200px" />
   ```

### __部署到 GitHub Pages__

1. **提交代码**：
   ```bash
   git add .
   git commit -m "Add new article"
   git push
   ```

2. **启用 GitHub Pages**：
   - 进入 GitHub 仓库 -> Settings -> Pages
   - 选择 main 分支作为源
   - 点击 Save

3. **访问网站**：
   - 部署完成后，访问 `https://yourusername.github.io/blog`

# __结尾__
通过从 LeanCloud 迁移到本地文件存储，博客系统变得更加独立和高效。现在你可以完全控制自己的数据，无需依赖第三方服务，同时保持了原有的功能和界面。

GitHub 地址：https://github.com/liangtongzhuo/blog