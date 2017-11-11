
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
        return hljs.highlightAuto(code).value;
    }
});

const input_title = document.getElementById('input_title');
const input_tag = document.getElementById('input_tag');
const input_content = document.getElementById('input_content');


//如果有id，发送请求获取id
const id = location.search.split('?')[1];
let atricleObject;
if (id) {
    const query = new AV.Query('Atricle');
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
    const titleDOM = document.getElementById('title');
    titleDOM.innerText = this.value || '标题';

    // 获取这次输入是否是换行
    let isbr = 0
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
    const tagDOM = document.getElementById('tag');
    tagDOM.innerText = this.value || '标签用英文「 , 」分割';

    // 获取这次输入是否是换行
    let isbr = 0
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

//优化，200毫秒秒钟后才渲染图
let input_contentText
setInterval(function() {
    const contentDOM = document.getElementById('content');
    const text = (input_content.value || '内容');
    
    if (input_contentText != text){
        input_contentText = text;

        contentDOM.innerHTML = marked(input_content.value || '内容');    
        //计算内容高度
        input_content.style.height = contentDOM.clientHeight + 100 + 'px';
    }
   
},200);


//记录当前标题和内容
let titleCount = 0;
let tagCount = 0;
let contentCount = 0;

//更新内容
function updataAricle() {

    if (input_title.value.length == titleCount &&
        input_content.value.length == contentCount &&
        input_tag.value.length == tagCount)
        return;

    document.getElementById('notification').style.opacity = '1';

    //发送到服务器
    if (!atricleObject) {
        const Atricle = AV.Object.extend('Atricle');
        atricleObject = new Atricle()
        // 新建一个 ACL 实例
        var acl = new AV.ACL();
        acl.setPublicReadAccess(true);
        acl.setWriteAccess(AV.User.current(), true);
        // 将 ACL 实例赋予对象
        atricleObject.setACL(acl);
    }

    atricleObject.set('title', input_title.value);
    atricleObject.set('tag', input_tag.value);
    atricleObject.set('content', input_content.value);

    atricleObject.save().then(function(atricle) {
        titleCount = input_title.value.length;
        tagCount = input_tag.value.length;
        contentCount = input_content.value.length;

    }, function(error) {
        console.log('有错误：',error);
    });

    setTimeout(function() {
        document.getElementById('notification').style.opacity = '0';
    }, 3000);
}
//10秒保存一次
setInterval(updataAricle, 10000);
