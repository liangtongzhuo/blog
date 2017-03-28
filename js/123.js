var box = document.getElementById('box');

// box.style.top = '200px';
// box.style.right = '200px';

var b = document.getElementById("body")


b.addEventListener("touchstart", function(event) {
    box.innerText = event.touches[0].clientY;
}, false);
b.addEventListener("touchmove", function(event) {
    // event.preventDefault();
    box.innerText = event.touches[0].clientX;

    box.style.left = event.touches[0].clientX - 50 + 'px';
    box.style.top = event.touches[0].clientY - 50 + 'px';

}, false);
b.addEventListener("touchend", function(event) {
    console.log(event.changedTouches[0].clientX);
    // console.log(event.touches[0].clientX);
}, false);


/*
按我的理解是这样的：
touches:当前屏幕上所有触摸点的集合列表
targetTouches: 绑定事件的那个结点上的触摸点的集合列表
changedTouches: 触发事件时改变的触摸点的集合
*/
