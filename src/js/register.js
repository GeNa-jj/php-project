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

        //tab切换
        (function(){
            var $email = $('.email');
            var $tel = $('.tel');
            $('.tab_zc').on('click','li',function(){
                var idx = $(this).index();
                $(this).addClass('selected').siblings().removeClass('selected');
                if(idx==0){
                    $email.show();
                    $tel.hide();
                }else{
                    $email.hide();
                    $tel.show();
                }
            });
        })();

/*-----------邮箱注册------------*/
        (function(){
            //邮箱验证
            var $email = $('.email');
            var $tel = $('.tel');
            var $eml = $('#eml');
            $eml.change(function(){
                var eml = this.value;
                if(eml===''){
                    $(this).next().text('邮箱帐号不能为空!').css('color','#f00');
                    return;
                }else if(!/^[\w]+[\.\-_]*@[a-z0-9\-]{1,63}(\.[a-z\u2E80-\u9FFF]{2,6})+$/.test(eml)){
                   $(this).next().text('请输入正确的邮箱帐号!').css('color','#f00');
                   return;
               }else{
                    $.ajax({
                        type:'get',
                        url:'../api/testemail.php',
                        data:{useemail:eml},
                        success:function(res){  
                            if(res=='yes'){
                                $eml.next().text('该帐号可以注册!').css('color','rgb(30, 183, 29)');
                                     
                            }else if(res=='no'){
                                $eml.next().text('该帐号已存在!').css('color','#f00');
                            }
                                 
                        }
                    });
               }
                       
            });
            
            var $name1 = $('#name1');
            $name1.change(function(){
                var name1 = this.value;
                if(name1==''){
                    $(this).next().text('3~10个字符,只含有汉字、数字、字母、_').css('color','#f00');
                }else if(!/^[\w\u2E80-\u9FFF]{3,10}$/.test(name1)){
                   $(this).next().text('3~10个字符,只含有汉字、数字、字母、_').css('color','#f00');
                }else{
                    $.ajax({
                        type:'get',
                        url:'../api/testname.php',
                        data:{usename:name1},
                        success:function(res){  
                            if(res=='yes'){
                                $name1.next().text('该昵称可用!').css('color','rgb(30, 183, 29)');
                                     
                            }else if(res=='no'){
                                $name1.next().text('该昵称已存在!').css('color','#f00');
                            }
                                 
                        }
                    });
               }
            });

            //密码验证
            var $psw1 = $('#psw1');   
            var $psw2 = $('#psw2');
            $psw1.change(function(){
                var psw1 = this.value;
                if(psw1==''){
                    $(this).next().show().text('请输入密码').css('color','#f00');
                    $(this).closest('p').css('height','67');
                }else if(!/^\w{6,16}$/.test(psw1)){
                   $(this).next().show().text('6~16位字符,只能包含字母,数字或下划线').css('color','#f00');
                   $(this).closest('p').css('height','67');
                }else{
                   $(this).next().hide().text('6~16位字符,只能包含字母,数字或下划线').css('color','#666');
                   $(this).closest('p').css('height','47');
                }
                var psw2 = $psw2.val();
                if(psw2!=''){
                    if(psw1!=psw2){
                        $psw2.focus().next().show().text('两次输入的密码不一致').css('color','#f00');
                        $psw2.closest('p').css('height','67');
                    }else{
                       $psw2.next().hide().text('两次输入的密码不一致').css('color','#666');
                       $psw2.closest('p').css('height','47');
                    }
                }

            });
            $psw2.change(function(){
                var psw1 = $psw1.val();
                var psw2 = this.value;
                if(psw1!=psw2){
                    $(this).next().show().text('两次输入的密码不一致').css('color','#f00');
                    $(this).closest('p').css('height','67');
                }else{
                   $(this).next().hide().text('两次输入的密码不一致').css('color','#666');
                   $(this).closest('p').css('height','47');
                }
            });

            //验证码生成
            var $yzm1 = $('.yzm1');
            $yzm1.text(vCode());

            $('.yzm1_change').click(function(){
                $yzm1.text(vCode());
            });

            var $yzm11 = $('.yzm11');
            $('#yzm1').change(function(){
                if(this.value==''){
                    $yzm11.show();
                }else{
                    $yzm11.hide();
                }
            });

            //注册成功写进数据库
            $('.zhuce1').click(function(){
                if($('.xieyi1 input')[0].checked==false){
                    alert('您没有接受《用户协议》，不能注册！');
                              
                }else{
                    var $span = $email.find('input').next();
                    for(var i=0;i<4;i++){
                        if($span.eq(i).css('color')=='rgb(255, 0, 0)'){
                            return;
                        }        
                    }
                    if($eml.val()==''){
                        $eml.focus().next().text('邮箱帐号不能为空!').css('color','#f00');
                        return;
                    }
                    if($name1.val()==''){
                        $name1.focus().next().text('3~10个字符,只含有汉字、数字、字母、_').css('color','#f00');
                        return;
                    }
                    if($psw1.val()==''){
                        $psw1.focus().next().show().text('请输入密码').css('color','#f00');
                        return;
                    }
                    if($psw2.val()==''){
                        $psw2.next().show().text('两次输入的密码不一致').css('color','#f00');
                        $psw2.focus().closest('p').css('height','67');
                        return;
                    }

                    if($span.eq(5).prev().val()==''){
                        $yzm11.show();
                        return;
                    }

                    if($span.eq(5).prev().val()!=$yzm1.text()){
                        $yzm11.show().text('验证码错误！');
                        return;
                    }else{
                        $.ajax({
                            type:'get',
                            url:'../api/zhuce.php',
                            data:{
                                name:$name1.val(),
                                email:$eml.val(),
                                password:$psw1.val()
                            },
                            success:function(res){   
                                alert('恭喜你，注册成功！');
                                location.reload(); 
                            } 
                                
                        });       
                    }    
                }        
            });
        })();

/*-----------手机注册------------*/
        (function(){
            //手机验证
            var $email = $('.email');
            var $tel = $('.tel');
            var $tell = $('#phone');
            $tell.change(function(){
                var tel = this.value;
                if(tel===''){
                    $(this).next().text('手机号不能为空!').css('color','#f00');
                    return;
                }else if(!/^1[34578]\d{9}$/.test(tel)){
                   $(this).next().text('请输入正确的手机号!').css('color','#f00');
                   return;
               }else{
                    $.ajax({
                        type:'get',
                        url:'../api/testphone.php',
                        data:{phone:tel},
                        success:function(res){
                            if(res=='yes'){
                                $tell.next().text('该手机号可以注册!').css('color','rgb(30, 183, 29)');
                                     
                            }else if(res=='no'){
                                $tell.next().text('该手机号已注册!').css('color','#f00');
                            }
                                 
                        }
                    });
               }
                       
            });
            
            //密码验证
            var $psw3 = $('#psw3');   
            var $psw4 = $('#psw4');
            $psw3.change(function(){
                var psw3 = this.value;
                if(psw3==''){
                    $(this).next().show().text('请输入密码').css('color','#f00');
                    $(this).closest('p').css('height','67');
                }else if(!/^\w{6,16}$/.test(psw3)){
                   $(this).next().show().text('6~16位字符,只能包含字母,数字或下划线').css('color','#f00');
                   $(this).closest('p').css('height','67');
                }else{
                   $(this).next().hide().text('6~16位字符,只能包含字母,数字或下划线').css('color','#666');
                   $(this).closest('p').css('height','47');
                }
                var psw4 = $psw4.val();
                if(psw4!=''){
                    if(psw3!=psw4){
                        $psw4.focus().next().show().text('两次输入的密码不一致').css('color','#f00');
                        $psw4.closest('p').css('height','67');
                    }else{
                       $psw4.next().hide().text('两次输入的密码不一致').css('color','#666');
                       $psw4.closest('p').css('height','47');
                    }
                }

            });
            $psw4.change(function(){
                var psw3 = $psw3.val();
                var psw4 = this.value;
                if(psw3!=psw4){
                    $(this).next().show().text('两次输入的密码不一致').css('color','#f00');

                    $(this).closest('p').css('height','67');
                }else{
                   $(this).next().hide().text('两次输入的密码不一致').css('color','#666');
                   $(this).closest('p').css('height','47');
                }
            });

            //验证码生成
            var $yzm2 = $('.yzm2');
            $yzm2.text(vCode());
            $('.yzm2_change').click(function(){
                $yzm2.text(vCode());
            });

            var $yzm21 = $('.yzm21');
            $('#yzm2').change(function(){
                if(this.value==''){
                    $yzm21.show();
                }else{
                    $yzm21.hide();
                }
            });

            //注册成功写进数据库
            $('.zhuce2').click(function(){
                if($('.xieyi2 input')[0].checked==false){
                    alert('您没有接受《用户协议》，不能注册！');       
                }else{
                    var $span = $tel.find('input').next();
                    for(var i=0;i<3;i++){
                        if($span.eq(i).css('color')=='rgb(255, 0, 0)'){
                            return;
                        }        
                    }
                    if($tell.val()==''){
                        $tell.focus().next().text('手机号不能为空!').css('color','#f00');
                        return;
                    }
                    if($psw3.val()==''){
                        $psw3.focus().next().show().text('请输入密码').css('color','#f00');
                        return;
                    }
                    if($psw4.val()==''){
                        $psw4.next().show().text('两次输入的密码不一致').css('color','#f00');
                        $psw4.focus().closest('p').css('height','67');
                        return;
                    }

                    if($span.eq(3).prev().val()==''){
                        $yzm21.show();console.log($span.eq(3).prev())
                             
                        return;
                    }

                    if($span.eq(3).prev().val()!=$yzm2.text()){
                        $yzm21.show().text('验证码错误！');
                        return;
                    }else{
                        $.ajax({
                            type:'get',
                            url:'../api/zhuce.php',
                            data:{
                                phone:$tell.val(),
                                password:$psw3.val()
                            },
                            success:function(res){   
                                alert('恭喜你，注册成功！');
                                location.reload(); 
                            } 
                                
                        });       
                    }    
                }        
            });
        })();  

/*-----------登录验证------------*/
        (function(){
            var $name = $('#name');
            var $password = $('#password');
            $('.denglu1').click(function(){
                var name = $name.val();
                var password = $password.val();
                if(name===''){
                    $name.focus().next().show().text('账号不能为空');
                }else if(password===''){
                    $name.next().hide();
                    $password.focus().next().show().text('密码不能为空');
                }else{
                    $password.next().hide();
                    $.ajax({
                        type:'get',
                        url:'../api/denglu.php',
                        data:{
                            name:name,
                            password:password
                        },
                        success:function(res){
                            console.log(res)
                                 
                            if(res==='yesyes'){
                                var user = [{
                                    name:name,
                                    password:password
                                }];
                                $name.next().hide();
                                $password.next().hide();
                                alert('恭喜你登录成功！');
                                $name.val('');
                                $password.val('');
                                var now = new Date();
                                now.setDate(now.getDate()+7);
                                Cookie.set('user',JSON.stringify(user),{expires:now,path:'/'}); 
                                window.location.href="../index.html"; 
                                    
                            }else if(res==='yesno'){
                                $name.next().hide();
                                $password.focus().next().show().text('密码错误');
                            }else{
                                $password.next().hide();
                                $name.focus().next().show().text('此账号未注册');;
                            }
                        }
                    });
                }
            });
        })();
    });
});