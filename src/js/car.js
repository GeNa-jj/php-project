require(['config'],function(){
    require(['jquery','header','carousel','common'],function($,h){
        //导入头部/尾部
        $('header').load('./header.html',function(){
            
                // 隐藏二级导航      
                var $navAll = $('#navAll');
                var $ul = $navAll.find('.navMenu');
                $ul.hide();
                $navAll.mouseenter(function(){
                    $ul.show();
                }).mouseleave(function(){
                    $ul.hide();
                });  
                $('.navMenu2').mouseenter(function(event) {
                    $ul.show();
                }).mouseleave(function(event) {
                    $ul.hide();
                }); 

                h.header();
           
        });
        $('footer').load('./footer.html'); 

        // 数据生成
        (function(){
            var user = Cookie.get('user') || '[]';     
            user=JSON.parse(user); 
            function show(res){
                if(res!='no'){
                    $('.car_none').text('');
                    $('.car').show();
                    var total=0; 
                    var html = '';   
                    html = $.map(res,function(item){
                        total+=item.qty*item.price_off;
                        return `<li data-id="${item.id}">
                            <div class="goods">
                                <img src="${item.picture}" alt="" />
                                <p><a href="goodsdetail.html?id=${item.id}">${item.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<span class="dispatching">${item.dispatching}</span>]</a></p>
                            </div>
                            <div class="price">
                                <span>${item.price_off}</span>
                            </div>
                            <div class="qty">
                                <a class="jian">-</a>
                                <input type="text" value="${item.qty}" disabled/>
                                <a class="jia">+</a>
                            </div>
                            <div class="sum">
                                <span>${(item.qty*item.price_off).toFixed(2)}</span>元
                            </div>
                            <div class="action">
                                <a>移入收藏夹</a>
                                <a class="del">删除</a>
                            </div>
                        </li>`;
                    });
                    $('.car_c').find('ul').html(html);
                    $('.total').text(total.toFixed(2));       
                         
                }else{
                    $('.car_none').text('购物车中没有商品');
                    $('.car').hide(); 
                    $('.car_c').find('ul').html('');   
                }
                $('#head_car_count').text($('.car_c li').length);
            }
            function updata(){
                $.ajax({
                    url:'../api/car.php',
                    data:{user:user[0].name},
                    success:function(res){
                        console.log(res);
                        show(res);  
                        $('.jian').click(function(){    
                            var id = $(this).closest('li')[0].dataset.id;
                            var dispatching = $(this).closest('li').find('.dispatching').text();
                            var n = $(this).next().val();
                            n--;   
                            if(n<1){
                                n=1;
                            }else{
                                $.ajax({
                                    url:'../api/car_action.php',
                                    data:{
                                        user:user[0].name,
                                        id:id,
                                        action:'-',
                                        dispatching:dispatching
                                    },
                                    success:function(res){
                                        updata();             
                                    }
                                });
                                
                            }
                                 
                        });
                        $('.jia').click(function(){
                            var id = $(this).closest('li')[0].dataset.id;
                            var dispatching = $(this).closest('li').find('.dispatching').text();
                            var n = $(this).prev().val();
                            n++;  
                            $.ajax({
                                url:'../api/car_action.php',
                                data:{
                                    user:user[0].name,
                                    id:id,
                                    action:'+',
                                    dispatching:dispatching
                                },
                                success:function(res){
                                    updata();               
                                }
                            });

                        });
                        $('.del').click(function(){
                            var id = $(this).closest('li')[0].dataset.id;
                            var dispatching = $(this).closest('li').find('.dispatching').text();
                            if(confirm('您确定删除这件商品吗？')){
                                $.ajax({
                                    url:'../api/car_action.php',
                                    data:{
                                        user:user[0].name,
                                        id:id,
                                        action:'del',
                                        dispatching:dispatching
                                    },
                                    success:function(res){
                                        updata();               
                                    }
                                });  
                            }
                        });
                              
                             
                    },
                    dataType:'json'
                });
            }
            if(user!=''){
                updata(); 
            }
        })();

        // 轮播商品
        (function(){
            $.ajax({
                type:'get',
                url:'../api/goodslist.php',
                data:{pageNo:1,qty:100},
                success:function(res){
                    var html='';
                    for(var i=5;i<11;i++){
                        html += `<a href="goodsdetail.html?id=${res.data[i].id}">
                            <img src="${res.data[i].picture}" alt="" />
                            <p>【日本直邮】${res.data[i].name}</p>
                            <span>折后${res.data[i].price_off}元人民币</span>
                        </a>` ;
                    }

                    $('.banner_b').find('li').eq(0).html(html);

                    html='';
                    for(var i=11;i<17;i++){
                        html += `<a>
                            <img src="${res.data[i].picture}" alt="" />
                            <p>【日本直邮】${res.data[i].name}</p>
                            <span>折后${res.data[i].price_off}元人民币</span>
                        </a>` ;
                    }

                    $('.banner_b').find('li').eq(1).html(html);

                    var timer;
                    timer = setInterval(function(){
                        lunbo();
                    },5000);
                    $('.banner').mouseenter(function(event){
                        clearInterval(timer);
                    }).mouseleave(function(event){
                        clearInterval(timer);
                        timer = setInterval(function(){
                            lunbo();
                        },5000);
                    });

                    function lunbo(){
                        $('.banner_b').find('li').eq(0).animate({'left':'-1172'},function(){
                            var $a = $(this).clone();
                            $(this).remove();    
                            $('.banner_b').find('ul').append($a);
                            $a.css('left','1172px');
                              
                        });
                        $('.banner_b').find('li').eq(1).animate({'left':'0'});
                    }

                    $('.you').click(function(){
                        lunbo();
                    });
                    $('.zuo').click(function(){
                        var $a = $('.banner_b').find('li').eq(1).clone();
                        $('.banner_b').find('li').eq(1).remove();    
                        $('.banner_b').find('ul').prepend($a);
                        $a.css('left','-1172px');

                        $('.banner_b').find('li').eq(0).animate({'left':'0'});
                        $('.banner_b').find('li').eq(1).animate({'left':'1172'});
                    });
                },
                dataType:'json'
            });
        })();
        
    });
});