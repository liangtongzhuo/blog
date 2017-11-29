//tag
let tag = location.search.split('?')[1] || ''
if (decodeURI(tag) == '首页') {
    tag = ''
}

// 开始查询
(function () {
    const query = new AV.Query('Atricle')
    query.limit(1000)
    query.descending('createdAt')
    query.notEqualTo('hidden', 1) //hidden 不为 1 ，也就是不隐藏的。
    query.contains('tag', decodeURI(tag)) //注意转码
    query.find().then(function(results) {
        let html = ''
        for (let i = 0; i < results.length; i++) {
            const id = results[i].id
            let title = results[i].get('title')
            title = title.length < 70 ? title : title.substring(0, 70) + '......' 
            const time = results[i].createdAt.toLocaleString()
            html += atricleHTML(id, title, time)
        }
        document.getElementById('content').innerHTML = html
    }, function(error) {
        console.error(error)
    })
})()

function atricleHTML(id, title, time) {
    return '<div class="item" >' +
        '<a class="title" href="atricle.html?' + id + '">' + title + '</a>' +
        '<div class="time">' + time + '</div></div>'
}

//发布文章
document.getElementById('title').addEventListener('click', function() {
    if (AV.User.current()) {
        window.location.href = "updata.html"
    }else{
        window.location.href = "admin.html"
    }

}, false)


let tagHTML = '标签：'
const tagArr = tagStr.split(',')
for (let i = 0; i < tagArr.length; i++) {
    tagHTML += ' <a href="index.html?' + tagArr[i] + '">' + tagArr[i] + '</a>'
}
document.getElementById('tag').innerHTML = tagHTML

//标签按钮
document.getElementById('btn').onclick = function() {
    const tag = document.getElementById('tag')
    if (this.innerText == "标签") {
        this.innerText = "取消"
        tag.style.visibility = 'visible'
    } else {
        this.innerText = "标签"
        tag.style.visibility = 'hidden'
    }
}
