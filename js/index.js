var APP_ID = '2MY9AH1hE38iVn6cfSMeVXW8-gzGzoHsz';
var APP_KEY = 'rhmGmvC4cz4qohsQlpmP0KV0';
window.AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});


//tag
var tag = location.search.split('?')[1] || '';
if (decodeURI(tag) == '首页') {
    tag = '';
}
//开始查询
var count = 0;
query()

function query() {
    var query = new AV.Query('Atricle');
    query.limit(5);
    query.skip(count * 5);
    query.descending('createdAt');
    console.log(decodeURI(tag));
    query.contains('tag', decodeURI(tag)); //注意转码
    query.find().then(function(results) {

        var html = '';
        for (var i = 0; i < results.length; i++) {
            var id = results[i].id;
            var title = results[i].get('title');
            if (title.length > 40) title = title.substring(0, 40) + '......';
            var content = results[i].get('content').substring(0, 110) + '......';
            var time = results[i].createdAt.toLocaleString();
            html += atricleHTML(id, title, content, time);
        }
        document.getElementById('content').innerHTML = html;
        document.getElementById('count').innerText = count + 1;
    }, function(error) {
        console.error(error);
    });
}

function atricleHTML(id, title, content, time) {

    return '<a class="item" href="atricle.html?' + id + '">' +
        '<h1 class="title">' + title + '</h1>' +
        '<div class="atricle-content">' + content + '</div>' +
        '<div class="time">' + time + '</div></a>';
}

document.getElementById('title').addEventListener('click', function() {
    window.location.href = "updata.html"
}, false);

//翻页
document.getElementById('pageup').onclick = function() {
    if (count == 0) return;
    count--;
    query();
};
document.getElementById('pagebottom').onclick = function() {
    count++;
    query();

};

//标签
var tagStr = '首页,简历,Node,Web,iOS,开源,翻译,算法,MongoDB,Vue,js,Swift';
var tagHTML = '标签：'
var tagArr = tagStr.split(',')
for (var i = 0; i < tagArr.length; i++) {
    tagHTML += ' <a href="index.html?' + tagArr[i] + '">' + tagArr[i] + '</a>';
}
document.getElementById('tag').innerHTML = tagHTML;


//标签按钮
document.getElementById('btn').onclick = function() {

    if (this.innerText == "标签") {
        this.innerText = "取消";
        document.getElementById('tag').style.visibility = 'visible';
    } else {
        this.innerText = "标签";
        document.getElementById('tag').style.visibility = 'hidden';

    }

}
