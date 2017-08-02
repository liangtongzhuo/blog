marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true, //开启github的markdown
    tables: true, //支持Github表格，必须打开gfm选项
    breaks: false, //支持Github换行符，必须打开gfm选项
    pedantic: false, //只解析符合markdown.pl定义的，不修正markdown的错误
    sanitize: false, //原始输出，忽略HTML标签
    smartLists: true,
    smartypants: false
});


//获取url，剪切出id

var url = location.search;
var id = url.split('?')[1].split('=')[0];

var query = new AV.Query('Atricle');
query.descending('createdAt');
query.get(id).then(function(result) {
    var title = result.get('title');
    var content = marked(result.get('content'));
    var time = result.createdAt.toLocaleString();
    var tag = result.get('tag');


    atricleContentHTML(title, content, time, tag)
}, function(error) {
    console.error(error);
});

function atricleContentHTML(title, content, time, tag) {
    document.title = title
    document.getElementById('title').innerText = title
    document.getElementById('content').innerHTML = content
    document.getElementById('time').innerText = time

    var tagHTML = '标签：'
    var tagArr = tag.split(',')
    for (var i = 0; i < tagArr.length; i++) {
        tagHTML += ' <a href="index.html?' + tagArr[i] + '">' + tagArr[i] + '</a>';
    }
    document.getElementById('tag').innerHTML = tagHTML;

}

//跳转网页
document.getElementById('title').addEventListener("click", function() {
    if (AV.User.current()) {
        window.location.href = 'updata.html?' + id;
    }
}, false);
