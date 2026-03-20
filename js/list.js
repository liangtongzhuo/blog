//tag
let tag = location.search.split('?')[1] || ''
if (decodeURI(tag) == '首页') {
    tag = ''
}

// 先从缓存里面取
update();

// 开始从本地数据文件获取数据
(() => {
    // 从 data/articles 目录获取所有文章文件
    fetch('data/articles/')
        .then(response => response.text())
        .then(html => {
            // 从 HTML 中提取文件名
            const fileNames = html.match(/href="([^"]+\.json)"/g)
                .map(match => match.match(/href="([^"]+)"/)[1])
                .filter(name => name.endsWith('.json'));
            
            // 读取每个文章文件
            const promises = fileNames.map(fileName => {
                return fetch(`data/articles/${fileName}`)
                    .then(response => response.json())
                    .then(article => {
                        // 提取 ID 从文件名
                        const id = fileName.replace('.json', '');
                        // 过滤条件：tag 包含当前标签
                        if (!tag || article.tag.includes(decodeURI(tag))) {
                            // 转换为与 AV.Query 返回结果类似的结构
                            return {
                                id: id,
                                get: function(key) {
                                    if (key === 'title') return article.title
                                    if (key === 'time') return null // 不再有 time 字段
                                    return null
                                },
                                createdAt: new Date(article.createdAt)
                            };
                        }
                        return null;
                    })
                    .catch(error => {
                        console.error(`读取文章文件 ${fileName} 出错:`, error);
                        return null;
                    });
            });
            
            // 等待所有文件读取完成
            Promise.all(promises)
                .then(articles => {
                    // 过滤掉 null 值
                    const results = articles.filter(article => article !== null);
                    
                    // 按 createdAt 降序排序
                    results.sort((a, b) => b.createdAt - a.createdAt);
                    
                    // 更新数据
                    update(results);
                })
                .catch(error => {
                    console.error('获取文章列表出错:', error);
                });
        })
        .catch(error => {
            console.error('获取文章文件列表出错:', error);
        });
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
    // 由于不再使用 LeanCloud，直接跳转到 admin.html
    window.location.href = "admin.html"

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
