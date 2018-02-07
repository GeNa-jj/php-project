//  $('.goods').zoom({
//     position:'right'
// });
"use strict";
;(function($){
    $.fn.zoom = function(options){
        var defaults = {
            width:450,
            height:300,
            position:'right',
            gap:0
        }
            
        return this.each(function(){
            var opt = $.extend({},defaults,options);
            var $small = $(this);
            var $smallImg = $small.find('img');

            $small.addClass('zoom');

            init();

            function init(){
                var $big = $('<div/>').addClass('zoom-big');
                $big.css({
                    width:opt.width,
                    height:opt.height
                });

                var left,top;
                switch(opt.position){
                    case 'left':
                        left=$small.offset().left-opt.width-opt.gap;
                        top=$small.offset().top;
                        break;
                    case 'right':
                        left=$small.offset().left+$small.outerWidth()+opt.gap;
                        top=$small.offset().top;
                        break;
                    case 'top':
                        left=$small.offset().left;
                        top=$small.offset().top-opt.height-opt.gap;
                        break;
                    case 'bottom':
                        left=$small.offset().left;
                        top=$small.offset().top+$small.outerHeight()+opt.gap;
                        break;
                }

                var $bigImg = $('<img/>').attr('src',$smallImg.attr('data-big') || $smallImg[0].src);

                $bigImg.appendTo($big);

                $big.css({
                    left:left,
                    top:top
                }).appendTo($small);

                var $minzoom = $('<span/>').addClass('minzoom');
                $minzoom.appendTo($small);

                var ratio;

                $small.on('mouseenter',function(){
                    $bigImg.attr('src',$smallImg.attr('data-big') || $smallImg[0].src);
                         
                    $minzoom.show();
                    $big.show();

                    ratio = $bigImg.width()/$smallImg.width();
                    $minzoom.css({
                        width:$big.width()/ratio,
                        height:$big.height()/ratio
                    });
                }).on('mouseleave',function(){
                    $minzoom.hide();
                    $big.hide();
                }).mousemove(function(e){
                    var left = e.pageX - $small.offset().left - $minzoom.outerWidth()/2;
                    var top = e.pageY - $small.offset().top - $minzoom.outerHeight()/2;

                    if(left<0){
                        left = 0;
                    }else if(left > $smallImg.innerWidth()-$minzoom.outerWidth()){
                        left = $smallImg.innerWidth()-$minzoom.outerWidth()
                    }


                    if(top < 0){
                        top = 0;
                    }else if(top > $smallImg.innerHeight()-$minzoom.outerHeight()){
                        top = $smallImg.innerHeight()-$minzoom.outerHeight()
                    }

                    $minzoom.css({
                        left:left,
                        top:top
                    });

                    $bigImg.css({
                        left:-left*ratio,
                        top:-top*ratio
                    })
                })
            }
        });
             
    }
})(jQuery);