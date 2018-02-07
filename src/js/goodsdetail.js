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

        // 数据生成
        (function(){
            var id = location.search.slice(1).split('=')[1];
            $.ajax({
                url:'../api/goodsdetail.php',
                data:{id:id},
                success:function(res){
                    console.log(res);

                    $('.main_lt').find('img').attr('src',res.picture);
                    $('.main_lb').find('img').attr('src',res.picture);
                    var html = `<ul>
                            <li>
                                <h2>${res.name}</h2>
                            </li>
                            <li>
                                <p>价格：¥<span class="m_sale">${res.price}</span></p>
                                <p>市场价：<del class="m_price">¥${res.price_off}</del></p>
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
                                <div class="active"><img src="../img/wenhao.jpg" height="14" width="14" alt="" />海外直邮<i></i></div>
                                <div><img src="../img/wenhao.jpg" height="14" width="14" alt="" />经济航空运<i></i></div>
                                <div>海运<i></i></div>
                                <div>特惠直邮<i></i></div>
                                <a>海外直邮，发货后约3~10天到货</a>
                            </li>
                            <li>
                                <span>数量信息：</span>
                                <div>
                                    <a></a>
                                    <input type="text" value="1"/>
                                    <a></a>
                                </div>
                                
                            </li>
                            <li>
                                销 量 ：
                                <span>2453</span>
                            </li>
                            <li>
                                <a class="btn_append">
                                <img src="../img/car-btn.png" height="19" width="19" alt="" /> 加入购物车</a>
                                <a class="btn_buy">立即购买</a>
                            </li>
                            <li>
                                <div>
                                    <a>赞（<span>2</span>）</a>
                                    <a>加入收藏</a>
                                    <a>优惠活动</a>
                                </div>
                            </li>
                        </ul>`;
                        $('.main_c').html(html);
                         
                },
                dataType:'json'
            });
                 
        })();
    });
});