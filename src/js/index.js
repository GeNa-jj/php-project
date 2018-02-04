require(['config'],function(){
    require(['jquery','carousel','common'],function($){
        //导入头部/尾部
        $('header').load('html/header.html',function(){
            require(['header']);
        });
        $('footer').load('html/footer.html');
        //banner    
        (function(){
            var $box = $('.bannerL');
            $box.carousel({
                width:810,
                height:400,
                duration:5000,
                imgs:['img/banner1.jpg','img/banner2.jpg','img/banner3.jpg','img/banner4.jpg','img/banner5.jpg']
            });
        })();
        //主内容js
        (function(){
            $('.hotSales').on('mouseenter','.hotact img',function(){
                $(this).css({
                    width:253,
                    height:150
                });
            }).on('mouseleave','.hotact img',function(){
                $(this).css({
                    width:251,
                    height:148
                });
            });
            var $ul = $('.brandSalesBC ul');
            $ul.on('mouseenter','li img',function(){
                $(this).stop().animate({left:-5});
                     
            }).on('mouseleave','li img',function(){
                $(this).stop().animate({left:0});
                     
            });
            $('.hdtjBL').carousel({
                width:299,
                height:451,
                pn:false,
                imgs:['img/banner_1.jpg','img/banner_2.jpg','img/banner_3.jpg','img/banner_4.jpg']
            });
            var $bsq_tab = $('.bsq_tab');
            var $inbaosuiqu = $('.inbaosuiqu');
            $bsq_tab.on('mouseenter','li',function(){
                var idx = $(this).index();
                $(this).addClass('active').css('cursor','pointer').siblings().removeClass('active');
                $inbaosuiqu.eq(idx).css('display','block').siblings('div').css('display','none');
            });
            $('.bsq_1L').carousel({
                width:299,
                height:451,
                pn:false,
                autoPlay:false,
                imgs:['img/bsq_a1.jpg']
            });
            $('.bsq_2L').carousel({
                width:299,
                height:451,
                pn:false,
                imgs:['img/bsq_c1.jpg','img/bsq_c2.jpg']
            });
            var $spbj_tab = $('.spbj_tab');
            var $inshipinbaojian = $('.inshipinbaojian');
            $spbj_tab.on('mouseenter','li',function(){
                var idx = $(this).index();
                $(this).addClass('active').css('cursor','pointer').siblings().removeClass('active');
                $inshipinbaojian.eq(idx).css('display','block').siblings('div').css('display','none');  
            });
            $('.spbj_1L').carousel({
                width:299,
                height:451,
                pn:false,
                imgs:['img/spbj_a1.jpg','img/spbj_a2.jpg','img/spbj_a3.jpg']
            });
            $('.spbj_2L').carousel({
                width:299,
                height:451,
                pn:false,
                imgs:['img/spbj_c1.jpg','img/bsq_c2.jpg']
            });
            $('.spbj_3L').carousel({
                width:299,
                height:451,
                pn:false,
                imgs:['img/spbj_e1.jpg','img/spbj_e2.jpg']
            });
            $('.yeypBL').carousel({
                width:299,
                height:451,
                pn:false,
                autoPlay:false,
                imgs:['img/yeyp_a1.jpg']
            });
            $('.yeypBL').carousel({
                width:299,
                height:451,
                pn:false,
                autoPlay:false,
                imgs:['img/yeyp_a1.jpg']
            });
            $('.mzBL').carousel({
                width:299,
                height:451,
                pn:false,
                imgs:['img/mz_a1.jpg','img/mz_a2.jpg']
            });
            $('.jjrhBL').carousel({
                width:299,
                height:451,
                pn:false,
                imgs:['img/jjrh_a1.jpg','img/jjrh_a2.jpg']
            });
            $('.smdzBL').carousel({
                width:299,
                height:451,
                pn:false,
                autoPlay:false,
                imgs:['img/smdz_a1.jpg']
            });
            $('.xbssBL').carousel({
                width:299,
                height:451,
                pn:false,
                imgs:['img/xbss_a1.jpg','img/xbss_a2.jpg']
            });
            $('.crypBL').carousel({
                width:299,
                height:451,
                pn:false,
                autoPlay:false,
                imgs:['img/cryp_a1.jpg']
            });
        })();
        //楼梯
        (function(){
            var $louti = $('.louti');
            var $li = $louti.find('a');
            $louti.on('click','li',function(){
                 var num = $(this).index();
                 if(num==9){
                    $('html,body').animate({'scrollTop':0}); 
                 }else{
                    $('html,body').animate({'scrollTop':num*520+970})                  
                 }
            });
            $(window).scroll(function(){
                var y = window.scrollY;
                     
                if(y>870&&y<5180){
                    $louti.fadeIn();
                }else{
                    $louti.fadeOut();
                }
                var n = Math.floor((y-870)/520);
                if(n<0){
                    n=0;
                }else if(n>8){
                    n=8;
                }
                $li.removeClass('active');
                $li.eq(n).addClass('active');       
            });
        })();
        //右列表
        (function(){
            $('.right_list').mouseenter(function(event) {console.log(666)
                 
                $(this).find('ul').show();
            }).mouseleave(function(event) {
                $(this).find('ul').hide();
            });
        });
    });
});