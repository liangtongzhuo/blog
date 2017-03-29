var APP_ID = '2MY9AH1hE38iVn6cfSMeVXW8-gzGzoHsz';
var APP_KEY = 'rhmGmvC4cz4qohsQlpmP0KV0';
window.AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

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

var input_title = document.getElementById('input_title');
var input_tag = document.getElementById('input_tag');
var input_content = document.getElementById('input_content');


//如果有id，发送请求获取id
var id = location.search.split('?')[1];
var atricleObject
if (id) {
    var query = new AV.Query('Atricle');
    query.get(id).then(function(atricle) {
        atricleObject = atricle
        input_title.value = atricle.get('title');
        input_tag.value = atricle.get('tag');
        input_content.value = atricle.get('content');

        //调用更新界面
        updataTitle.apply(input_title);
        updataTag.apply(input_tag);
        updataContent.apply(input_content);

    }, function(error) {
        console.log('失败');
    });
}

//标题
input_title.oninput = updataTitle;

function updataTitle() {
    var titleDOM = document.getElementById('title');
    titleDOM.innerText = this.value || '标题';

    // 获取这次输入是否是换行
    var isbr = 0
    if (this.value.substr(this.value.length - 1, this.value.length) == '\n') {
        isbr = 60;
    }

    //计算标题高度
    if (titleDOM.clientHeight <= 60) {
        this.style.height = 60 + isbr + 'px';
        return;
    }

    this.style.height = titleDOM.clientHeight + isbr + 'px';
};

//标签
input_tag.oninput = updataTag;

function updataTag() {
    var tagDOM = document.getElementById('tag');
    tagDOM.innerText = this.value || '标签用英文「 , 」分割';

    // 获取这次输入是否是换行
    var isbr = 0
    if (this.value.substr(this.value.length - 1, this.value.length) == '\n') {
        isbr = 30;
    }

    //计算标题高度
    if (tagDOM.clientHeight <= 30) {
        this.style.height = 30 + isbr + 'px';
        return;
    }
    this.style.height = tagDOM.clientHeight + isbr + 'px';
};

//文章内容
input_content.oninput = updataContent;

function updataContent() {
    var contentDOM = document.getElementById('content');
    contentDOM.innerHTML = marked(this.value || '内容');

    //计算内容高度
    this.style.height = contentDOM.clientHeight + 100 + 'px';
};


//记录当前标题和内容
var titleCount = 0;
var tagCount = 0;
var contentCount = 0;

//更新内容
function updataAricle() {

    if (input_title.value.length == titleCount &&
        input_content.value.length == contentCount &&
        input_tag.value.length == tagCount)
        return;

    document.getElementById('notification').style.visibility = 'visible';

    //发送到服务器
    if (!atricleObject) {
        var Atricle = AV.Object.extend('Atricle');
        atricleObject = new Atricle()
    }

    atricleObject.set('title', input_title.value);
    atricleObject.set('tag', input_tag.value);
    atricleObject.set('content', input_content.value);


    atricleObject.save().then(function(atricle) {
        titleCount = input_title.value.length;
        tagCount = input_tag.value.length;
        contentCount = input_content.value.length;

    }, function(error) {

    });

    setTimeout(function() {
        document.getElementById('notification').style.visibility = 'hidden';
    }, 3000);
}
//10秒保存一次
setInterval(updataAricle, 10000);
