$(function() {
    // 模态窗设定
    $(document).on('click', '.create-actions', function() {
        var buttons1 = [{
            text: '解绑后需要重新绑定设备才能继续控制设备',
            label: true,
        }];
        var buttons2 = [{
            text: '解绑此设备',
            bg: 'danger'
        }];
        var buttons3 = [{
            text: '取消',
        }];
        var groups = [buttons1, buttons2, buttons3];
        $.actions(groups);
    });
    // 动态设定根元素字体大小
    !(function(win, doc) {
        function setFontSize() {
            // 获取屏幕宽度
            var winWidth = window.innerWidth;
            // 计算字体大小
            var size = (winWidth / 375) * 20;
            doc.documentElement.style.cssText = 'font-size:' + (size < 16 ? 16 : size) + 'px' + '!important';
        }
        var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
        var timer = null;
        // 监听横竖屏切换以及缩放屏幕时执行设置字体大小方法,延迟时间是100ms
        win.addEventListener(evt, function() {
            clearTimeout(timer);
            timer = setTimeout(setFontSize, 100);
        }, false);
        // 监听页面加载事件执行字体设置方法,延迟时间是100ms
        win.addEventListener("pageshow", function(e) {
            if (e.persisted) {
                clearTimeout(timer);
                timer = setTimeout(setFontSize, 100);
            }
        }, false);
        // 初始化
        setFontSize();
    }(window, document));
    // 动态设定内边距高度
    judgeHeight(window, document);
    $.init();
});
// 动态设定内边距高度方法 
function judgeHeight(win, doc) {
    function setPadding() {
        // 获取屏幕高度
        var winHeight = window.innerHeight;
        // 计算内边距高度
        var paddingTop = (winHeight / 667) * 3;
        // 获取元素
        var row = doc.getElementsByName("button-group");
        // 设定内边距高度
        row[0].style.cssText = 'padding-top:' + (paddingTop < 3 ? paddingTop : 3) + 'rem';
    }
    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';
    var timer = null;
    // 监听横竖屏切换以及缩放屏幕时执行设置内边距高度方法,延迟时间是100ms
    win.addEventListener(evt, function() {
        clearTimeout(timer);
        timer = setTimeout(setPadding, 100);
    }, false);
    // 监听页面加载事件，执行内边距高度设置方法,延迟时间是100ms
    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);
            timer = setTimeout(setPadding, 100);
        }
    }, false);
    // 初始化
    setPadding();
}
