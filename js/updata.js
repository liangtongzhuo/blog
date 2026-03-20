
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true, //开启github的markdown
    tables: true, //支持Github表格，必须打开gfm选项
    breaks: true, //支持Github换行符，必须打开gfm选项
    pedantic: false, //只解析符合markdown.pl定义的，不修正markdown的错误
    sanitize: false, //原始输出，忽略HTML标签
    smartLists: true,
    smartypants: false,
    highlight: function (code) { //插件代码高亮
        return hljs.highlightAuto(code).value
    }
})

const input_title = document.getElementById('input_title')
const input_tag = document.getElementById('input_tag')
const input_content = document.getElementById('input_content')


//如果有id，从本地数据文件获取文章
const id = location.search.split('?')[1]
if (id) {
    // 从本地数据文件获取文章数据
    fetch(`data/articles/${id}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`未找到ID为 ${id} 的文章`)
            }
            return response.json()
        })
        .then(article => {
            // 填充内容
            input_title.value = article.title
            input_tag.value = article.tag
            input_content.value = article.content

            //调用更新界面
            updataTitle.apply(input_title)
            updataTag.apply(input_tag)
            updataContent.apply(input_content)
        })
        .catch(error => {
            console.error('获取本地数据出错:', error)
        })
}

//标题
input_title.oninput = updataTitle

function updataTitle() {
    const titleDOM = document.getElementById('title')
    titleDOM.innerText = this.value || '标题'

    // 获取这次输入是否是换行
    let isbr = 0
    if (this.value.substr(this.value.length - 1, this.value.length) == '\n') {
        isbr = 60
    }

    //计算标题高度
    if (titleDOM.clientHeight <= 60) {
        this.style.height = 60 + isbr + 'px'
        return 
    }

    this.style.height = titleDOM.clientHeight + isbr + 'px'
}

//标签
input_tag.oninput = updataTag

function updataTag() {
    const tagDOM = document.getElementById('tag')
    tagDOM.innerText = this.value || '标签用英文「 , 」分割'

    // 获取这次输入是否是换行
    let isbr = 0
    if (this.value.substr(this.value.length - 1, this.value.length) == '\n') {
        isbr = 30
    }

    //计算标题高度
    if (tagDOM.clientHeight <= 30) {
        this.style.height = 30 + isbr + 'px'
        return
    }
    this.style.height = tagDOM.clientHeight + isbr + 'px'
}

//文章内容

//优化，200毫秒秒钟后才渲染图
let input_contentText
setInterval(function() {
    const contentDOM = document.getElementById('content')
    const text = (input_content.value || '内容')
    
    if (input_contentText != text){
        input_contentText = text

        contentDOM.innerHTML = marked(input_content.value || '内容')    
        //计算内容高度
        input_content.style.height = contentDOM.clientHeight + 100 + 'px'
    }
   
},200)

// 由于不再使用 LeanCloud，移除自动保存功能
// 通知用户保存功能已不可用
document.getElementById('notification').innerText = '由于系统更新，保存功能暂时不可用'
document.getElementById('notification').style.opacity = '1'

