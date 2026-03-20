//tag
let tag = location.search.split('?')[1] || ''
if (decodeURI(tag) == '首页') {
    tag = ''
}

// 静态文章数据
let articles = [];

// 从 data/articles/index.json 加载文章数据
fetch('../data/articles/index.json')
    .then(response => response.json())
    .then(data => {
        articles = data;
        update();
    })
    .catch(error => {
        console.error('加载文章数据失败:', error);
    });

// 过滤文章   
function filterArticles() {
    let filteredArticles = articles;
    if (tag) {
        filteredArticles = articles.filter(article => {
            return article.tag && article.tag.includes(decodeURI(tag));
        });
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    
    // 按创建时间降序排序
    filteredArticles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    return filteredArticles;
}

// 更新数据
function update() {
const filteredArticles = filterArticles();
    let html = '';
    
// 检查缓存
    const cachedHtml = localStorage.getItem(tag);
    if (cachedHtml) {
        document.getElementById('content').innerHTML = cachedHtml;
        return;
    }
    
    for (let i = 0; i < filteredArticles.length; i++) {
    const article = filteredArticles[i];
        const title = article.title.length < 70 ? article.title : article.title.substring(0, 70) + '......';
        const time = new Date(article.createdAt).toLocaleString();
        html += atricleHTML(article.id, title, time);
    }
    
    document.getElementById('content').innerHTML = html;

    // 缓存数据
    localStorage.setItem(tag, html);
}

// 拼接 html
function atricleHTML(id, title, time) {
return '<div class="item" >' +
        '<a class="title" href="atricle.html?' + id + '">' + title + '</a>' +
    '<div class="time">' + time + '</div></div>';
}

// 发布文章
document.getElementById('title').addEventListener('click', function () {
    // 由于不再使用 LeanCloud，直接跳转到 admin.html
    window.location.href = "admin.html"

}, false);

// 标签按钮
const btn = document.getElementById('btn');
btn.addEventListener("touchstart", e => {
    click(e);
});
btn.addEventListener("click", e => {
    click(e);
});

const click = e => {
    e.preventDefault();
    const tagElement = document.getElementById('tag');
    if (btn.innerText == "标签") {
        btn.innerText = "取消";
        tagElement.style.visibility = 'visible';
    } else {
        btn.innerText = "标签";
        tagElement.style.visibility = 'hidden';
    }
};

// 初始化 - 数据加载完成后会自动调用 update()