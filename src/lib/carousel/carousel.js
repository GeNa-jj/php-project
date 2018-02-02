'use strict';
;(function($){
    $.fn.carousel = function(options){
        var defaults = {
            index:0,
            width:400,
            height:260,
            duration:3000,
            autoPlay:true,
            page:true,
            seamless:true,
            type:'horizontal', //fade,vertical
            pn:true   
        }

        return this.each(function(idx,item){
            var opt = $.extend({},defaults,options);
            // opt.len = opt.imgs.length;
            var $this = $(this);
            $this.addClass('box');
            $this.css({
                width:opt.width,
                height:opt.height
            });
            var len;
            var $ul;
            init();
            function init(){
                $ul = $('<ul/>');
                var html = $.map(opt.imgs,function(item){
                    return '<li><img src="'+item+'"/></li>'
                }).join('\n');
                $ul.html(html).appendTo($this);


                if(opt.seamless){
                    var $li = $('<li/>')
                    $li=$ul.children('li').first().clone();
                    $ul.append($li);
                }
                len = $ul.children('li').length;
                $ul.css('width',len*opt.width);

                if(opt.autoPlay){
                    move();
                }

                if(opt.pn){
                    var $prev=$('<div/>');
                    $prev.addClass('zuo');
                    $prev.text('<');
                    $prev.appendTo($this);
                    $this.on('click','.zuo',function(){
                        opt.index--;
                        bian();            
                    });
                    var $next=$('<div/>');
                    $next.addClass('you');
                    $next.text('>');
                    $next.appendTo($this);
                    $this.on('click','.you',function(){
                        opt.index++;
                        bian();            
                    });
                }
                if(opt.page){
                    if(opt.seamless){
                        var $page = $('<div/>');
                        $page.addClass('page');
                        for(var i=1;i<len;i++){
                            var $span = $('<span/>');
                            $span.text(i);
                            $page.append($span);
                        }
                        $this.append($page);
                        var $spans=$('span');
                        $spans.first().addClass('active');
                        $this.on('click','span',function(){
                            opt.index=this.innerHTML-1;
                            bian();
                        });
                     }else{
                        var $page = $('<div/>');
                        $page.addClass('page');
                        for(var i=1;i<=len;i++){
                            var $span = $('<span/>');
                            $span.text(i);
                            $page.append($span);
                        }
                        $this.append($page);
                        var $spans=$('span');
                        $spans.first().addClass('active');
                        $this.on('click','span',function(){
                            opt.index=this.innerHTML-1;
                            bian();
                        });
                    }   
                }

                $this.mouseenter(function(){
                    if(opt.autoPlay){
                        clearInterval(opt.timer);       
                    }
                    if(opt.pn){
                        $('.zuo').css('display','block');
                        $('.you').css('display','block');
                    } 
                });
                $this.mouseleave(function(){
                    if(opt.autoPlay){
                        opt.timer=setInterval(()=>{
                            show();
                        },opt.duration);
                    }
                    if(opt.pn){
                        $('.zuo').css('display','none');
                        $('.you').css('display','none');
                    } 
                });
            }   

            function move(){
                opt.timer = setInterval(()=>{
                    show();
                },opt.duration);
            }
            function show(){
                opt.index++;
                bian();
            }
            function bian(){
                if(opt.seamless){
                    if(opt.index>=len){
                        opt.index=1;
                        $ul.css('left',0);
                        
                    }else if(opt.index<0){
                        opt.index = len-2;
                        $ul.css('left',-opt.width*(len-1));   
                    }    
                }else{
                    if(opt.index>=len){
                        opt.index=0;
                        
                    }else if(opt.index<0){
                        opt.index = len-1;     
                    }   
                }
                var target = -opt.width*opt.index;
                $ul.stop().animate({'left':target});
                if(opt.page){
                    var $span = $('span');
                    $.each($span,function(idx,item){
                        $(item).removeClass('active');
                    });
                    if(opt.seamless){
                        if(opt.index<len-1){
                            $span.eq(opt.index).addClass('active');
                        }else{
                            $span.first().addClass('active');
                        }
                    }else{
                        if(opt.index<len){
                            $span.eq(opt.index).addClass('active');
                        }else{
                            $span.first().addClass('active');
                        } 
                    }
                    
                }
            }   
        });
    }
})(jQuery);