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

        //数据生成列表
        (function(){
            var pageNo = 1;
            var qty = 30;
            $.ajax({
                type:'get',
                url:'../api/goodslist.php',
                data:{pageNo:pageNo,qty:qty},
                success:function(res){
                    console.log(res)
                         
                    var $ul = $('.goodsR_c').children('ul');
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
                    $ul.append(html);
                    var $price2 = $('.price2');
                    $price2.each(function(idx,item){  
                        if($(item).text()=='/ 0折'){
                            $(item).hide();
                        }
                    });


                    var html2='';
                    for(var i=5;i<15;i++){
                        html2 += `<li data-id="${res.data[i].id}">
                            <a href="#"><img src="${res.data[i].picture}" alt="" /></a>
                            <a class="gl_title" href="#">【包邮】【保税区闪送】${res.data[i].name}</a>
                            <span class="gl_price">${res.data[i].price}</span>
                        </li>` ;
                    }

                    $('.hotlist').append(html2);
                             
                },
                dataType:'json'
            });
        })();
    });
});