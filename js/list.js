//tag
let tag = location.search.split('?')[1] || ''
if (decodeURI(tag) == '首页') {
    tag = ''
}

// 预定义文章文件列表
const articleFiles = [
    '58c9340144d9040069eb2294.json',
    '58c93a5844d9040069eb5515.json',
    '58c951e28ac247005f9a5c99.json',
    '58ce6fff61ff4b00602ea6ad.json',
    '58ce71155c497d0057c6c05f.json',
    '58ce74e7ac502e00589e3306.json',
    '58ce75025c497d0057c6dfc2.json',
    '58ce76c061ff4b00602eda8e.json',
    '58d4dc3761ff4b006052e86c.json',
    '58d9bda761ff4b00606ef59f.json',
    '58da6eb01b69e6006bc7c1da.json',
    '58dde87844d904006d03e62c.json',
    '58e6403c2f301e006230c1f8.json',
    '58f0b312b123db02392c5f0b.json',
    '58fbf42244d9040069e1d51e.json',
    '58fe93ae0ce46300613bfda5.json',
    '590441a9a22b9d0065d7c9c5.json',
    '59055746ac502e0063e84baa.json',
    '5905ad24570c3500581f3982.json',
    '5905bdcc570c3500581fac4b.json',
    '5905be000ce46300616e8c76.json',
    '5905be5e44d904006927dc8e.json',
    '5905be92b123db3ee47f8c41.json',
    '5905bebf5c497d00583d0fb8.json',
    '5905c168a0bb9f0065002188.json',
    '590d5c732f301e006c14447f.json',
    '590db0bc2f301e0057cccacc.json',
    '59299de2a0bb9f0057ea3533.json',
    '592aabee2f301e0057eb6dd4.json',
    '593569502f301e006b100946.json',
    '593a1eb6ac502e006ccb3afa.json',
    '593b342d128fe1006ad12d6d.json',
    '593b495c5c497d006b788eda.json',
    '593b6484ac502e006b2e2d2b.json',
    '593b7328fe88c2006a0eb50b.json',
    '593c027d128fe1006adb616a.json',
    '59452bccda2f600067742c5b.json',
    '594b8c47b123db005db8969a.json',
    '594c9d39b123db005dc2b19b.json',
    '594e1a998d6d810057f71998.json',
    '594f0149570c357d06a5ab2e.json',
    '5959d929ac502e006b7b4a90.json',
    '595fa25ea22b9d006b6eafb8.json',
    '596415580ce4630058716d93.json',
    '5968c1bb1b69e6006cb6c781.json',
    '596f56a6ac502e00617cd324.json',
    '5979bdad61ff4b0057abf5b0.json',
    '5985b575570c35006220ec01.json',
    '5986ed1b128fe100569e187b.json',
    '59ac0e8d1b69e6006436cdcc.json',
    '59b4d82d1b69e600629ca9d0.json',
    '59d03b08fe88c2003c49f882.json',
    '59e1df87570c35088c17341a.json',
    '59e1e984128fe12e51a1f0ca.json',
    '59ec693cfe88c2003c1c6692.json',
    '59f5358c570c350045a511c5.json',
    '59f55fe244d90400459e0aea.json',
    '5a013d3e2f301e0069e9ed3d.json',
    '5a082d6d95450400612de8a2.json',
    '5a0cd4f217d0090040bb65e8.json',
    '5a1eb7ef4fd148004474b290.json',
    '5a38f7dafe88c20063aa5005.json',
    '5a46f1039f545400454bfc6e.json',
    '5a51874067f3560062d6532c.json',
    '5a81a08117d00900351f2c34.json',
    '5a92c95717d009003574b81e.json',
    '5a9fb9ca954504003ffc6597.json',
    '5aad14772f301e003668d1cc.json',
    '5ab72f239f54541cd83f84f5.json',
    '5abfc9c89f54543495c81588.json',
    '5ac02cdaa22b9d00453c5e1b.json',
    '5ac03175ac502e0063ada605.json',
    '5ac74f1017d0090061803b1e.json',
    '5aca0d749f54540522feacbe.json',
    '5aca239417d00900618fd7c6.json',
    '5ae81250a22b9d0044201032.json',
    '5b012ef644d9041d3f1f58a2.json',
    '5b06dcabd50eee008911e364.json',
    '5b0cbc482f301e0038b2e7d7.json',
    '5b168661fb4ffe005b3e9a40.json',
    '5b1e8baf2f301e0039083df8.json',
    '5b350a2dee920a003a31f7d4.json',
    '5b55153b808ca4003c3d734f.json',
    '5b5bef999f5454003502b539.json',
    '5b77860a808ca40070a1932d.json',
    '5b778657fb4ffe00589e670d.json',
    '5b778b41a22b9d0031483cb9.json',
    '5ba25026570c3500639b24a0.json',
    '5ba3ad4bd50eee003d450cd8.json',
    '5ba5add90b61600066a225e0.json',
    '5bd0087cee920a0068c6c241.json',
    '5be830f7756571006823e1f0.json',
    '5c03741b808ca40072bcea73.json',
    '5c0dcbbf9f54540067e9330f.json',
    '5c2b89ee808ca4565c320867.json',
    '5c472df6808ca40728b12e5b.json',
    '5c51c0d2fb4ffe00478b543c.json',
    '5c690817303f39004724911f.json',
    '5ceca3b27b968a007671f926.json',
    '5cece40aba39c800688d6f1f.json',
    '5cf713ceba39c80068f0e405.json',
    '5d1c6afea91c930074e07068.json',
    '5d3d0d57c8959c0068649432.json',
    '5de5ca53844bb40071ee710f.json',
    '5e1d26d421460d006aa512f2.json',
    '5e45ec722a6bfd4d10d3f5d1.json',
    '5e4cf69221b47e006b1840ed.json',
    '5ec67cccb975980006457863.json',
    '5f0c679706e26e0006380473.json',
    '5f88363d63136c2d40a0f769.json',
    '601e63a9574cd0477abf2b44.json',
    '60828fe8cd0f880937dbf32a.json',
    '60dc749998db5c2d234a4124.json',
    '6106b85934bfda01e0054824.json',
    '613dcf9c1aad0e6e3a318427.json',
    '62406d336593e7059fb8caa2.json',
    '6269a22d4fb5b8572dfaa1a1.json',
    '628ac0fdc5d0e73891983ac4.json',
    '62992cd37a6d4e360945de25.json',
    '62a4817c133fee7578dae1b0.json',
    '62e84665aff09f036a4e4eb3.json',
    '635f6a6f9c1aea6e1d6cf666.json',
    '636d00afbba1ad7a0f3e6729.json',
    '638cb618818b282518d7554a.json',
    '63b15a3e8d766d5be96a9b7d.json',
    '641add7e18dbc4732571ccb1.json',
    '641afbd79cc5f14274998413.json',
    '64ab6f799ae3847a63d246db.json',
    '653c6bd744fa007c597ad6c4.json',
    '65c191a9d1ee10790904df0b.json',
    '669dc749d91e3765ba66828e.json',
    '6781e22df2f9f93511bfdbda.json',
    '67b3eab54a556c651fc1ccb7.json',
    '699ff7ff8591971b54262b3d.json'
];

// 先从缓存里面取
update();

// 开始从本地数据文件获取数据
(() => {
    // 读取每个文章文件
    const promises = articleFiles.map(fileName => {
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
                            if (key === 'title') return article.title;
                            if (key === 'time') return article.time;
                            return null;
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
