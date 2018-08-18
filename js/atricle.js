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

const query = new AV.Query('Atricle')
query.get(id).then(function (result) {
    const title = result.get('title')
    const content = marked(result.get('content'))
    const time = result.get('time') ? result.get('time').toLocaleString() : result.createdAt.toLocaleString()
    const tag = result.get('tag')

    atricleContentHTML(title, content, time, tag)
}, function (error) {
    console.error(error)
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
    if (AV.User.current()) {
        window.location.href = 'updata.html?' + id
    }
}, false)
