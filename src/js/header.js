define(["jquery"],function($){
    return {
        header:function(){
        //头部小图标
            var $title_top_fl = $('.title_top_fl');
                 
            $title_top_fl.on('mouseenter','.tviow',function(){
                var y = $(this).css('backgroundPositionY').match(/[-]*\d+/)[0]*1-27;    
                $(this).css({'background-position':'0px '+y+'px'});
            }).on('mouseleave','.tviow',function(){
                $(this).css({'background-position':''});      
            });
            $('.erweima').mouseenter(function(event) {
                $(this).find('img').show();
            }).mouseleave(function(event) {
                $(this).find('img').hide();
            });;
            var $title_top_fr = $('.title_top_fr');
                 
            $title_top_fr.on('mouseenter','.tviow',function(){
                var y = $(this).css('backgroundPositionY').match(/[-]*\d+/)[0]*1-27;    
                $(this).css({'background-position':'10px '+y+'px'});
            }).on('mouseleave','.tviow',function(){
                $(this).css({'background-position':''});      
            });

            //二级导航
            var $ul = $('.navMenu');
            var $navMenu3 = $('.navMenu3');
            var $navMenu2 = $('.navMenu2');
            var idx = null;
            $ul.on('mouseenter','li',function(){   
                    idx = $(this).index(); 
                    var y = $(this).css('backgroundPositionY').match(/[-]\d+/)[0]*1+50;
                    $(this).addClass('act').css({'background-position':'10px '+y+'px','backgroundColor':'#fff'});
                    $navMenu2.css('display','inline-block');
                    $navMenu3.eq(idx).css('display','inline-block');
                               
            }).on('mouseleave','li',function(){
                    $(this).removeClass('act').css({'background-position':'','backgroundColor':''});  
                    $navMenu2.css('display','none');
                    $navMenu3.eq(idx).css('display','none');  
            });
            $navMenu2.mouseenter(function(event) {
                $ul.show();
                $navMenu2.css('display','inline-block');
                $navMenu3.eq(idx).css('display','inline-block');
            }).mouseleave(function(event) {
                $navMenu2.css('display','none');
                $navMenu3.eq(idx).css('display','none');
            });    

            var user = Cookie.get('user') || '[]';     
            user=JSON.parse(user); 
            if(user != '[]'){
                user.forEach(function(item){
                    $('.denglu').text(item.name+'，欢迎登陆！').removeAttr('href');
                    $('.zhuce').text('退出').attr('href','#');
                });
                $('.zhuce').click(function(){
                    var now = new Date();
                    now.setDate(now.getDate()-999);
                    Cookie.set('user','null',{expires:now,path:'/'});

                    // Cookie.remove('user'); 
                    location.reload();     
                });
            }                       
        }
    }
});