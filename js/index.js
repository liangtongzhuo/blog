var APP_ID = '2MY9AH1hE38iVn6cfSMeVXW8-gzGzoHsz';
var APP_KEY = 'rhmGmvC4cz4qohsQlpmP0KV0';
window.AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var query = new AV.Query('Atricle');
query.descending('createdAt');
query.find().then(function(results) {

    var html = '';
    for (var i = 0; i < results.length; i++) {
      var id = results[i].id;
      var title = results[i].get('title');
      if (title.length>40) title = title.substring(0,40)+'......';
      var content = results[i].get('content').substring(0,110)+'......';
      var time = results[i].createdAt.toLocaleString();
      html += atricleHTML(id,title,content,time);
    }
    document.getElementById('content').innerHTML=html;
}, function(error) {
    console.error(error);
});


function atricleHTML(id,title,content,time){

    return '<a class="item" href="atricle.html?'+id+'">'
    +'<h1 class="title">'+title+'</h1>'
    +'<div class="atricle-content">'+content+'</div>'
    +'<div class="time">'+time+'</div></a>';
}

document.getElementById('title').addEventListener('click', function(){
   window.location.href = "updata.html"
},false);
