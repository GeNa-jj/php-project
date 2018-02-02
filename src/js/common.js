/*
	* 封装常用方法
	* 提取公共代码
 */


/**
 * [生成一个范围内的随机整数]
 * @param  {Number} min [范围最小值]
 * @param  {Number} max [范围内最大值]
 * @return {Number}     [返回随机整数]
 */
function randomNumber(min,max){
	return parseInt(Math.random()*(max-min+1) + min);
}


/**
 * [生成4位随机数字验证码]
 * @return {String} [返回随机4位数字的字符串]
 */
function vCode(){
	var res = '';
	for(var i=0;i<4;i++){
		res += parseInt(Math.random()*10);
	}
	return res;
}


/**
 * [输入任何数字求阶乘]
 * @param  {Number} num [任意数字]
 * @return {Number}   [返回这个数的阶乘]
 */
function factorial(num){
    var res = 1;
    for(var i=2;i<=n;i++){
        res*=i;
    }
    if(n===0){
        res=0;
    } 
    return res;
}




/**
 * [根据输入的行或列得到一个表格]
 * @param  {Number} row [生成的行数]
 * @param  {Number} col [生成的列数]
 * @return {String}      [返回您需要的表格]
 */
function table(row,col){
    var str = '<table><tbody>';
    for(var i=1;i<=row;i++){
        str+='<tr>';
        for(var j=1;j<=col;j++){
            str+='<td>'+'表格'+i+'-'+j+'</td>';
        }
    str+='</tr>';
    }
    str+='</tbody></table>';
    return str;
}



/**
 * [生成随机颜色]
 * @return {String} [返回rgb颜色字符串]
 */
function randomColor(){
    var r = parseInt(Math.random()*256);
    var g = parseInt(Math.random()*256);
    var b = parseInt(Math.random()*256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


/**
 * [生成十六进制随机颜色]
 * @return {String} [返回十六进制颜色字符串]
 */
function getColor(){
    var res = '#';
    var str = '0123456789abcdef';
    for(var i=0;i<6;i++){
        var idx = parseInt(Math.random()*str.length);
        res += str.charAt(idx);
    }
    return res
}



var element = {

    // 方法
    /**
     * [获取元素节点]
     * @param  {Node} nodes [传入的节点]
     * @return {Element}       [返回元素节点]
     */
    get:function(nodes){
        var res = [];
        for(var i=0;i<nodes.length;i++){
            if(nodes[i].nodeType === 1){
                res.push(nodes[i]);
            }
        }
        return res;
    },

    /**
     * [获取子元素]
     * @param  {Elment} e [传入的元素节点]
     * @return {Element}   [返回子元素节点]
     */
    children:function(e){
        var nodes = e.childNodes;
        var res = element.get(nodes);//得到子元素
        return res;
    },
    
    /**
     * [获取下一个元素]
     * @param  {Element}   e [传入的元素节点]
     * @return {Element}   [返回下一个元素节点]
     */
    next:function(e){
        var node = e.nextSibling;
        for(var i=0;true;i++){
            if(node.nodeType!=1){
                node=node.nextSibling;
            }
            else{return node;}
        }
    },

    /**
     * [获取上一个元素]
     * @param  {Element}   e [传入的元素节点]
     * @return {Element}   [返回上一个元素节点]
     */
    prev:function(e){
        var node = e.previousSibling;
        for(var i=0;true;i++){
            if(node.nodeType!=1){
                node=node.previousSibling;
            }
            else{return node;}
        }
    }
}

/**
 * [获取css样式]
 * @param  {Element} ele  [需要获取的元素]
 * @param  {String} attr [需要的属性样式]
 * @return {String}      [返回这个属性的样式]
 */
function getCss(ele,attr){
    // 兼容的思路：判断当前浏览器是否支持这个方法
    // 而不是判断当前时什么浏览器
    if(window.getComputedStyle){
        return getComputedStyle(ele)[attr]
    }else if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        // 如果以上两个都不支持，则直接返回内联样式
        return ele.style[attr];
    }
}

// getCss(box,'font-size');//30


var Event = {
    /**
     * [绑定事件的方法，兼容所有浏览器]
     * @param  {Element}  ele       [绑定事件的元素]
     * @param  {String}  type      [事件类型]
     * @param  {Function}  handler   [事件处理函数]
     * @param  {Boolean} isCapture [是否捕获]
     */
    bind:function(ele,type,handler,isCapture){
        // W3C标准的事件监听器
        if(ele.addEventListener){
            ele.addEventListener(type,handler,isCapture)
        }

        // IE8以下浏览器
        else if(ele.attachEvent){
            ele.attachEvent('on'+type,handler)
        }

        // DOM节点绑定方式
        else{
            ele['on' + type] = handler;
        }
    },
    remove:function(ele,type,handler,isCapture){
        if(ele.removeEventListener){
            ele.removeEventListener(type,handler,isCapture)
        }

        // IE8以下浏览器
        else if(ele.detachEvent){
            ele.detachEvent('on'+type,handler)
        }

        else{
            ele['on' + type] = null;
        }
    }
}

// 给元素绑定事件
// Event.bind(box,'click',function(){},true);
// Event.remove(box,'click',fn,true)




var Cookie = {
    /**
     * [写入修改cookie]
     * @param {String} name   [cookie名]
     * @param {String} val    [cookie值]
     * @param {[Object]} params [cookie参数]
        * expires {Date} 
        * path    {String}
        * domain  {String}
        * secure  {Boolean}
     */
    set:function(name,val,params){
        // params={expires,path,domain,secure}

        // cookie名与cookie值
        var cookieStr = name +'=' + val;

        params = params || {};

        // 有效期
        if(params.expires){
            cookieStr += ';expires=' + params.expires.toUTCString();
        }

        // 路径
        if(params.path){
            cookieStr += ';path=' + params.path;
        }

        // 域名
        if(params.domain){
            cookieStr += ';domain=' + params.domain;
        }

        // 安全性
        if(params.secure){
            cookieStr += ';secure';
        }

        document.cookie = cookieStr;
    },
    /**
     * [获取cookie]
     * @param  {String} name [需要获取的cookie名]
     * @return {[type]}      [description]
     */
    get:function(name){
        var cookies = document.cookie;

        // 如果cookie不存在，直接返回空字符串
        if(cookies.length===0){
            return '';
        }

        var res = '';

        cookies = cookies.split('; ');
        for(var i=0;i<cookies.length;i++){
            var arr = cookies[i].split('=');
            if(arr[0] === name){
                res = arr[1];
                break;
            }
        }


        return res;
    },
    /**
     * [删除cookie]
     * @param  {String} name [删除cookie]
     */
    remove:function(name){
        var now = new Date();
        now.setDate(now.getDate()-10);

        // document.cookie = name + '=x;expires=' + now.toUTCString(); 
        this.set(name,'null',{expires:now});
    }
}

// 需求驱动开发
// Cookie.set('goodslist',JSON.stringify(goodslist),null,'')
// Cookie.set('top','200px')
// now = new Date()
// now.setDate(now.getDate()+7)
// Cookie.set('left','100px',{expires:now,path:'/'})
// Cookie.get('top');//得到top的cookie值
// Cookie.remove('top');



/**
 * [缓冲动画]
 * @param  {Element}   ele      [需要动画的元素]
 * @param  {Object}   opt      [需要动画的属性对象集合]
 * @param  {callback} callback [回调函数]
 */
function animate(ele,opt,callback){
    // opt= {left:100,top:200,fontSize:40}

    // 属性（动画）数量
    ele.timerLen = 0;

    // 遍历设置定时器（动画）
    for(var attr in opt){
        // 遍历过程设定动画数量
        ele.timerLen++;

        // 匿名函数传递attr
        (function(attr){
            var timername = attr + 'timer';
            var target = opt[attr];

            // 清除同名timer
            clearInterval(ele[timername]);

            ele[timername] = setInterval(function(){
                // 获取当前值
                var current = getCss(ele,attr);//100px,45deg,0.3

                // 提取单位
                var unit = current.match(/[a-zA-Z]+$/);//[px],[deg],null

                unit = unit ? unit[0] : '';

                // 提取值
                current = parseFloat(current);

                // 计算缓冲速度
                var speed = (target-current)/10;//-0.5,10,0.2
                
                //透明度
                if(attr === 'opacity'){
                    if(speed>-0.01&&speed<0){
                        speed = -0.01;
                    }else if(speed<0.01&&speed>0){
                        speed = 0.01;
                        
                    }
                    current += speed;
                    current = current.toFixed(2)
                }else{
                    // 避免速度变成0
                    speed = speed<0 ? Math.floor(speed) : Math.ceil(speed);
                    current += speed;
                }

                // 当到达目标值时
                if(current === target || speed === 0){
                    clearInterval(ele[timername]);
                    current = target;

                    ele.timerLen--;

                    // 动画完成后执行回掉函数
                    if(ele.timerLen === 0){
                        typeof callback === 'function' && callback();
                    }
                }
                ele.style[attr] = current + unit;
            },30);

        })(attr);
    }
}


/**
 * [数据类型判断]
 * @param  {All} data [数据类型]
 * @return {String}      [返回数据类型字符串]
 */
function type(data){
    return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
}