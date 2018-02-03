require(['config'],function(){
    require(['jquery','carousel','common'],function($){
        //导入头部/尾部
        $('header').load('../html/header.html',function(){
            require(['header'],function(){
                // 隐藏二级导航      
                var $navAll = $('#navAll');
                var $ul = $navAll.find('.navMenu');
                $ul.hide();
                $navAll.mouseenter(function(){
                    $ul.show();
                }).mouseleave(function(){
                    $ul.hide();
                });  
            })
        });
        $('footer').load('../html/footer.html');
    });
});