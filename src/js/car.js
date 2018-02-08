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
            $.ajax({
                url:'../api/car.php',
                data:{user:user[0].name},
                success:function(res){
                    if(res!='no'){
                        $('.car_none').text('');
                        var html = $.map(res,function(item){
                            return `<li>
                                <div class="goods">
                                    <img src="${item.picture}" alt="" />
                                    <p><a href="goodsdetail.html">${item.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[${item.dispatching}]</a></p>
                                </div>
                                <div class="price">
                                    <span>${item.price_off}</span>
                                </div>
                                <div class="qty">
                                    <a class="jian">-</a>
                                    <input type="text" value="${item.qty}"/>
                                    <a class="jia">+</a>
                                </div>
                                <div class="sum">
                                    <span>${item.qty*item.price_off}</span>元
                                </div>
                                <div class="action">
                                    <a>移入收藏夹</a>
                                    <a class="del">删除</a>
                                </div>
                            </li>`;
                        });
                        $('.car_c').find('ul').html(html);
                        
                    }


                         
                },
                dataType:'json'
            });
            $.ajax({
                type:'get',
                url:'../api/goodslist.php',
                data:{pageNo:1,qty:100},
                success:function(res){
                    var html='';
                    for(var i=5;i<11;i++){
                        html += `<a>
                            <img src="${res.data[i].picture}" alt="" />
                            <p>【日本直邮】${res.data[i].name}</p>
                            <span>折后${res.data[i].price_off}元人民币</span>
                        </a>` ;
                    }

                    $('.car_bb').find('li').eq(0).html(html);

                    html='';
                    for(var i=11;i<17;i++){
                        html += `<a>
                            <img src="${res.data[i].picture}" alt="" />
                            <p>【日本直邮】${res.data[i].name}</p>
                            <span>折后${res.data[i].price_off}元人民币</span>
                        </a>` ;
                    }

                    $('.car_bb').find('li').eq(1).html(html);

                },
                dataType:'json'
            });
        })();
    });
});