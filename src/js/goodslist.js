require(['config'],function(){
    require(['jquery','header','carousel','common'],function($,h){
        //导入头部/尾部
        $('header').load('../html/header.html',function(){
            
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
        $('footer').load('../html/footer.html');

        var a=0;
        var pageNo = 1;
        var qty = 30;
        //请求数据
        (function(){
            
            $.ajax({
                type:'get',
                url:'../api/goodslist.php',
                data:{pageNo:pageNo,qty:qty},
                success:function(res){
                    console.log(res);
                          
                    show(res);

                    


                    var html2='';
                    for(var i=5;i<15;i++){
                        html2 += `<li data-id="${res.data[i].id}">
                            <a href="#"><img src="${res.data[i].picture}" alt="" /></a>
                            <a class="gl_title" href="#">【包邮】【保税区闪送】${res.data[i].name}</a>
                            <span class="gl_price">${res.data[i].price}</span>
                        </li>` ;
                    }

                    $('.hotlist').html(html2);
                    
                    var n = Math.ceil(res.total/res.qty);
                    var html3='';
                    for(var i=1;i<=n;i++){
                        html3 += `<span class="item">${i}</span>`
                    }
                    $('.items').html(html3).children('span').eq(0).addClass('active');
                    $('.total').text('共'+n+'页');


                    $('.to').find('input').val(1)
                         
                },
                dataType:'json'
            });
        })();
        var $ul = $('.goodsR_c').children('ul');

        //数据生成列表
        function show(res){
            
            var html = $.map(res.data,function(item){
                return `<li data-id="${item.id}">
                    <a href="#" title="${item.name}">
                        <img src="${item.picture}" alt="" />
                        <p class="price">
                            <strong class="price1">${item.price}元人民币</strong>
                            <strong class="price2">/ ${item.discount}折</strong>
                        </p>
                        <p class="name">${item.name}</p>
                    </a>
                </li>`;
            }).join('')
            $ul.html(html);

            var $price2 = $('.price2');
            $price2.each(function(idx,item){  
                if($(item).text()=='/ 0折'){
                    $(item).hide();
                }
            });
        }

        //价格升降排序
        (function(){
            $('.s_up').click(function(){
                a=1;
                $.ajax({
                    type:'get',
                    url:'../api/up_price.php',
                    data:{pageNo:pageNo,qty:qty},
                    success:function(res){
                        console.log(res);
                        $ul.html('');
                        show(res);
                    },
                    dataType:'json'
                });
            });
            $('.s_down').click(function(){
                a=2;
                $.ajax({
                    type:'get',
                    url:'../api/down_price.php',
                    data:{pageNo:pageNo,qty:qty},
                    success:function(res){
                        console.log(res);
                        $ul.html('');
                        show(res);
                    },
                    dataType:'json'
                });
            });
        })();

        //根据页数生成数据
        (function(){
            $('.items').on('click','span',function(){
                var page = $(this).text();
                $(this).addClass('active').siblings().removeClass('active');
                pageNo = page;
                if(a==0){
                    $.ajax({
                        type:'get',
                        url:'../api/goodslist.php',
                        data:{pageNo:pageNo,qty:qty},
                        success:function(res){
                            console.log(res);
                            $ul.html('');
                            show(res);
                        },
                        dataType:'json'
                    });
                }else if(a==1){
                    $.ajax({
                        type:'get',
                        url:'../api/up_price.php',
                        data:{pageNo:pageNo,qty:qty},
                        success:function(res){
                            console.log(res);
                            $ul.html('');
                            show(res);
                        },
                        dataType:'json'
                    });
                }else if(a==2){
                    $.ajax({
                        type:'get',
                        url:'../api/up_price.php',
                        data:{pageNo:pageNo,qty:qty},
                        success:function(res){
                            console.log(res);
                            $ul.html('');
                            show(res);
                        },
                        dataType:'json'
                    });
                }    
            });
            $('.last').click(function(){
                var $item = $('.item');
                var page = $item.filter('.active').text();
                page--;
                if(page<1){
                    page=1;
                }else if(page>5){
                    page=5;
                }
                $item.removeClass('active');
                $item.eq(page-1).addClass('active');
                pageNo = page;
                if(a==0){
                    $.ajax({
                        type:'get',
                        url:'../api/goodslist.php',
                        data:{pageNo:pageNo,qty:qty},
                        success:function(res){
                            console.log(res);
                            $ul.html('');
                            show(res);
                        },
                        dataType:'json'
                    });
                }else if(a==1){
                    $.ajax({
                        type:'get',
                        url:'../api/up_price.php',
                        data:{pageNo:pageNo,qty:qty},
                        success:function(res){
                            console.log(res);
                            $ul.html('');
                            show(res);
                        },
                        dataType:'json'
                    });
                }else if(a==2){
                    $.ajax({
                        type:'get',
                        url:'../api/up_price.php',
                        data:{pageNo:pageNo,qty:qty},
                        success:function(res){
                            console.log(res);
                            $ul.html('');
                            show(res);
                        },
                        dataType:'json'
                    });
                }    
                     
            });
            $('.next').click(function(){
                var $item = $('.item');
                var page = $item.filter('.active').text();
                console.log(page)
                     
                page++;
                if(page<1){
                    page=1;
                }else if(page>5){
                    page=5;
                }
                $item.removeClass('active');
                $item.eq(page-1).addClass('active');
                pageNo = page;
                if(a==0){
                    $.ajax({
                        type:'get',
                        url:'../api/goodslist.php',
                        data:{pageNo:pageNo,qty:qty},
                        success:function(res){
                            console.log(res);
                            $ul.html('');
                            show(res);
                        },
                        dataType:'json'
                    });
                }else if(a==1){
                    $.ajax({
                        type:'get',
                        url:'../api/up_price.php',
                        data:{pageNo:pageNo,qty:qty},
                        success:function(res){
                            console.log(res);
                            $ul.html('');
                            show(res);
                        },
                        dataType:'json'
                    });
                }else if(a==2){
                    $.ajax({
                        type:'get',
                        url:'../api/up_price.php',
                        data:{pageNo:pageNo,qty:qty},
                        success:function(res){
                            console.log(res);
                            $ul.html('');
                            show(res);
                        },
                        dataType:'json'
                    });
                }    
                     
            });
        })();
    });
});