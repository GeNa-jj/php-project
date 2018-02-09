require(['config'],function(){
    require(['jquery','header','carousel','zoom','common'],function($,h){
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
            var id = location.search.slice(1).split('=')[1];
            $.ajax({
                url:'../api/goodsdetail.php',
                data:{id:id},
                success:function(res){
                    console.log(res);

                    $('.nav_name').text(res.type);
                    $('.main_lt').find('img').attr('src',res.picture);
                    $('.main_lb').find('img').attr('src',res.picture);
                    var html = `<ul>
                            <li>
                                <h2>${res.name}</h2>
                            </li>
                            <li>
                                <p>价格：¥<span class="m_sale">${res.price_off}</span></p>
                                <p>市场价：<del class="m_price">¥${res.price}</del></p>
                            </li>
                            <li>
                                <span class="m_l1">品牌：${res.brand}</span>
                                <span class="m_l2">产地：${res.production}</span>
                                <span class="m_l3">所属国：${res.production}</span>
                            </li>
                            <li>编 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<span>${res.id}</span></li>
                            <li>库 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存：
                                <div class="active">日本发货<i></i></div>
                            </li>
                            <li>配送信息：
                                <div class="active"><img src="../img/wenhao.jpg" height="14" width="14" alt="" />海外直邮<i style="display:block"></i></div>
                                <div><img src="../img/wenhao.jpg" height="14" width="14" alt="" />经济航空运<i></i></div>
                                <div>海运<i></i></div>
                                <div>特惠直邮<i></i></div>
                                <a>海外直邮，发货后约3~10天到货</a>
                            </li>
                            <li>
                                <span>数量信息：</span>
                                <div>
                                    <a class="jian"></a>
                                    <input type="text" value="1"/>
                                    <a class="jia"></a>
                                </div>
                                
                            </li>
                            <li>
                                销 量 ：
                                <span>${res.sales}</span>
                            </li>
                            <li>
                                <a class="btn_append">
                                <img src="../img/car-btn.png" height="19" width="19" alt="" /> 加入购物车</a>
                                <a href="./car.html" class="btn_buy">立即购买</a>
                            </li>
                            <li>
                                <div>
                                    <a class="zan">赞（<span>2</span>）</a>
                                    <a>加入收藏</a>
                                    <a class="yhhd" style="position: relative;">优惠活动
                                        <div style="position: absolute; border-radius: 5px; display: none; text-align: center; left: -100px; top: 30px; width: 280px; padding: 15px; border: solid 5px #E98450; background: #fff;padding-left:0">
                                                <div style="line-height: 18px;">打开微信扫描二维码关注摩西，及时掌握最新优惠信息，还支持微信下单哦！
                                                </div>
                                                <img src="../img/erweima.png" width="200" height="200" />
                                                <div style="float:left;padding-left:20px;">摩西官方微信：moximoxishopping
                                                </div>
                                            </div>
                                    </a>
                                    

                                </div>
                            </li>
                        </ul>`;
                        $('.main_c').html(html);


                        var $li = $('.main_c').find('li').eq(5);
                        $li.on('click','div',function(){
                            $(this).addClass('active').find('i').show();
                                 
                            $(this).siblings().removeClass('active').find('i').hide();

                            var $a = $(this).parent().find('a');
                            var idx = $(this).index();
                            if(idx==0){
                                $a.text('海外直邮，发货后约3~10天到货');
                            }else if(idx==1){
                                $a.text('经济航空运，发货后约7~20天到货');
                            }else if(idx==2){
                                $a.text('海外直邮，发货后约2~3月到货');
                            }else{
                                $a.text('特惠直邮（DPS），发货后约9~11天到货');
                            }
                        });

                        $('.jian').click(function(){
                            var n = $(this).next().val();
                            n--;
                            if(n<1){
                                n=1;
                            }
                            $(this).next().val(n);
                                 
                        });
                        $('.jia').click(function(){
                            var n = $(this).prev().val();
                            n++;  
                            $(this).prev().val(n);

                        });
                        
                        $('.yhhd').mouseover(function(){
                            $(this).children('div').show();
                        }).mouseleave(function(){
                            $(this).children('div').hide();
                        });
                        
                        $('.zan').click(function(){
                            var zan = $(this).find('span').text();
                            zan++;
                            $(this).find('span').text(zan);

                            $(this).off();
                        });

                        // 加入购物车
                        $('.btn_append').click(function(){
                            var user = Cookie.get('user') || '[]';     
                            user=JSON.parse(user); 
                            if(user != ''){
                                     
                                $.ajax({
                                    url:'../api/addcar.php',
                                    data:{
                                        user:user[0].name,
                                        id:res.id,
                                        qty:$('.jia').prev().val(),
                                        dispatching:$('.main_c').find('li').eq(5).find('div').filter('.active').text()
                                    },
                                    success:function(res1){
                                        if(res1=='yes'){
                                            var $imgCopy = $('<img/>')
                                            $imgCopy.attr('src',res.picture);
                                            $imgCopy.css({
                                                position:'absolute',
                                                left:$('.main_lt').offset().left,
                                                top:$('.main_lt').offset().top,
                                                width:$('.main_lt').width(),
                                                height:$('.main_lt').height()
                                            }).appendTo('body');
                                            $('body').css({
                                                position:'relative'
                                            });
                                            $imgCopy.animate({
                                                left:$('#head_car_count').offset().left,
                                                top:$('#head_car_count').offset().top,
                                                width:0,
                                                height:0
                                                },function(){
                                                    $(this).remove();
                                            })

                                                 
                                            $.ajax({
                                                url:'../api/car_num.php',
                                                data:{user:user[0].name},
                                                success:function(res){
                                                    $('#head_car_count').text(res);
                                                         
                                                }
                                            });
                                        }
                                             
                                    }
                                });
                                     
                            }else{
                                alert('未登录，无法加入购物车');
                            }         
                            
                        });
                },
                dataType:'json'
            });
                 
        })();

        // 放大镜等各种功能
        (function(){
            $('.main_lt').zoom();

            var $ul = $('.main_lb').find('ul');
            $('.next').click(function(){
                $ul.animate({'left':-273});
                
            });
            $('.prev').click(function(){
                $ul.animate({'left':0});
                     
            });

            $('.main_lbc').on('click','img',function(){
                $('.main_lt').children('img')[0].src=$(this)[0].src;      
            });
            var $tab = $('.allT').find('ul');
            $tab.on('click','li',function(){
                $(this).addClass('active').siblings().removeClass('active');
                var n = $(this).index();
                if(n==0){
                    $('.allA').show();
                    $('.allB').hide();
                    $('.allC').hide();

                }else if(n==1){
                    $('.allA').hide();
                    $('.allB').show();
                    $('.allC').hide();
                }else{
                    $('.allA').hide();
                    $('.allB').hide();
                    $('.allC').show();
                }
            })
        })();
    });
});