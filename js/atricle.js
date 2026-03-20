marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true, //开启github的markdown
    tables: true, //支持Github表格，必须打开gfm选项
    breaks: true, //支持Github换行符，必须打开gfm选项
    pedantic: false, //只解析符合markdown.pl定义的，不修正markdown的错误
    sanitize: false, //忽略HTML标签
    smartLists: true,//使用新语法
    smartypants: false,//使用新语法，比如在引用语法中加入破折号。
    highlight: function (code) { //插件代码高亮
        return hljs.highlightAuto(code).value
    }
})


//获取url，剪切出id
const url = location.search
const id = url.split('?')[1].split('=')[0]

// 从本地数据文件获取文章数据
fetch(`data/articles/${id}.json`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`未找到ID为 ${id} 的文章`)
        }
        return response.json()
    })
    .then(article => {
        // 渲染内容
        const title = article.title
        const content = marked(article.content)
        const time = new Date(article.createdAt).toLocaleString()
        const tag = article.tag

        atricleContentHTML(title, content, time, tag)
    })
    .catch(error => {
        console.error('获取本地数据出错:', error)
    })

function atricleContentHTML(title, content, time, tag) {
    document.title = title
    document.getElementById('title').innerText = title
    document.getElementById('content').innerHTML = content
    document.getElementById('time').innerText = time

    let tagHTML = ''
    var tagArr = tag.split(',')
    for (let i = 0; i < tagArr.length; i++) {
        tagHTML += ' <a href="list.html?' + tagArr[i] + '">' + tagArr[i] + '</a>'
    }
    document.getElementById('tag').innerHTML = tagHTML
}

//跳转编辑网页
document.getElementById('title').addEventListener("click", function () {
    // 由于不再使用 LeanCloud，直接跳转到编辑页面
    window.location.href = 'updata.html?' + id
}, false)
