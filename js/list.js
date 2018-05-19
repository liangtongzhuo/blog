//tag
let tag = location.search.split('?')[1] || ''
if (decodeURI(tag) == '首页') {
    tag = ''
}

// 先从缓存里面取
update();

// 开始查询
(() => {
    const query = new AV.Query('Atricle')
    query.select(['title','time'])
    query.limit(1000)
    query.addDescending('createdAt')
    query.notEqualTo('hidden', 1) //hidden 不为 1 ，也就是不隐藏的。
    query.contains('tag', decodeURI(tag)) //注意转码
    query.find().then(function (results) {
        update(results)
    }, function (error) {
        console.error(error)
    })
})()

// 更新数据
function update(results) {
    let html = ''
    // 如果没有结果从缓存里面取
    if (!results) {
        html = localStorage.getItem(tag)
        document.getElementById('content').innerHTML = html
        return
    }

    for (let i = 0; i < results.length; i++) {
        const id = results[i].id
        let title = results[i].get('title')
        title = title.length < 70 ? title : title.substring(0, 70) + '......'
        const time = results[i].get('time') ? results[i].get('time').toLocaleString() : results[i].createdAt.toLocaleString()
        html += atricleHTML(id, title, time)
    }
    document.getElementById('content').innerHTML = html

    // 缓存数据
    localStorage.setItem(tag, html)
}

// 拼接 html
function atricleHTML(id, title, time) {
    return '<div class="item" >' +
        '<a class="title" href="atricle.html?' + id + '">' + title + '</a>' +
        '<div class="time">' + time + '</div></div>'
}

// 发布文章
document.getElementById('title').addEventListener('click', function () {
    if (AV.User.current()) {
        window.location.href = "updata.html"
    } else {
        window.location.href = "admin.html"
    }

}, false)


let tagHTML = '标签：'
const tagArr = tagStr.split(',')
for (let i = 0; i < tagArr.length; i++) {
    tagHTML += ' <a href="list.html?' + tagArr[i] + '">' + tagArr[i] + '</a>'
}
document.getElementById('tag').innerHTML = tagHTML


// 标签按钮
const btn = document.getElementById('btn')
btn.addEventListener("touchstart", e => {
    click(e)
})
btn.addEventListener("click", e => {
    click(e)
})
const click = e => {
    e.preventDefault()
    const tag = document.getElementById('tag')
    if (btn.innerText == "标签") {
        btn.innerText = "取消"
        tag.style.visibility = 'visible'
    } else {
        btn.innerText = "标签"
        tag.style.visibility = 'hidden'
    }
}
