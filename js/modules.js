$(function() {
    $(document).on('click', '.create-actions', function() {
        var buttons1 = [{
            text: '解绑后需要重新绑定设备才能继续控制设备',
            label: true,
        }];
        var buttons2 =[{
            text:'解绑此设备',
            bg:'danger'
        }];
        var buttons3 = [{
            text: '取消',
        }];
        var groups = [buttons1, buttons2,buttons3];
        $.actions(groups);
    });
    $(document).on("pageInit", "#page-ptr", function(e, id, page) {
        var $content = $(page).find(".content").on('refresh', function(e) {
            // 模拟2s的加载过程
            setTimeout(function() {
                var cardHTML = '<div class="card">' +
                    '<div class="card-header">标题</div>' +
                    '<div class="card-content">' +
                    '<div class="card-content-inner">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                $content.find('.row4').prepend(cardHTML);
                // $(window).scrollTop(0);
                // 加载完毕需要重置
                $.pullToRefreshDone($content);
            }, 0);
        });
    });
    $(document).on("pageInit", "#page-infinite-scroll-bottom", function(e, id, page) {
        var loading = false;
        // 每次加载添加多少条目
        var itemsPerLoad = 20;
        // 最多可加载的条目
        var maxItems = 100;
        var lastIndex = $('.list-container li').length;

        function addItems(number, lastIndex) {
            // 生成新条目的HTML
            var html = '';
            for (var i = lastIndex + 1; i <= lastIndex + number; i++) {
                html += '<li class="item-content"><div class="item-inner"><div class="item-title">新条目'+i+'</div></div></li>';
            }
            // 添加新条目
            $('.infinite-scroll .list-container').append(html);
        }
         addItems(itemsPerLoad, 0);
         var lastIndex = 20;
        $(page).on('infinite', function() {
            // 如果正在加载，则退出
            if (loading) return;
            // 设置flag
            loading = true;
            // 模拟1s的加载过程
            setTimeout(function() {
                // 重置加载flag
                loading = false;
                if (lastIndex >= maxItems) {
                    // 加载完毕，则注销无限加载事件，以防不必要的加载
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    // 删除加载提示符
                    $('.infinite-scroll-preloader').remove();
                    return;
                }
                addItems(itemsPerLoad, lastIndex);
                // 更新最后加载的序号
                lastIndex = $('.list-container li').length;
                $.refreshScroller();
            }, 1000);
        });
    });
    $(document).on('click', '.toast', function() {
        $.toast("操作失败");
    });
    $(".picker").picker({
  toolbarTemplate: '<header class="bar bar-nav">\
  <button class="button button-link pull-left close-picker">取消</button>\
  <button class="button button-link pull-right close-picker">确定</button>\
  <h1 class="title">标题</h1>\
  </header>',
  cols: [
    {
      textAlign: 'center',
      values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
    }
  ]
});
    var width=document.documentElement.clientWidth;
    var set_width=(width/375)*20;
    var root=document.documentElement;
    root.style.cssText="font-size:"+set_width+'px'+'!important';
    $.init();
});
