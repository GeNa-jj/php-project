function Popover(options){
    let defaults = {
        dragable:true,
        Width:400,
        Height:300,
        position:'center',
        title:'zhis is a Popover..',
        content:'this is content',
        overlay:0.8//遮罩层透明度
    };

    let opt = Object.assign({},defaults,options);

    this.dragable = opt.dragable;
    this.Width = opt.Width;
    this.Height = opt.Height;
    this.title = opt.title;
    this.content = opt.content;
    this.overlay = opt.overlay;
    this.position = opt.position;
    this.success = opt.success;
    this.failure = opt.failure;   
    this.x = opt.x,
    this.y = opt.y,
    this.init();
}
Popover.prototype = {
    init(){
        let box = document.createElement('div');
        let head = document.createElement('div');
        let span = document.createElement('span');
        span.innerText = 'x';
        box.classList.add('box');
        head.classList.add('head');
        head.innerText = this.title;
        head.style.width = this.Width + 'px';
        head.appendChild(span);
        box.style.width = this.Width + 'px';
        box.style.height = this.Height + 'px';
        document.body.appendChild(box);
        box.appendChild(head);
        box.innerHTML += this.content;
        this.ele = box;
        this.setPosition(this.x,this.y);
        if(this.overlay !== false){
            let bg = document.createElement('div');
            bg.classList.add('bg');
            bg.style.opacity = this.overlay;
            document.body.appendChild(bg);
            this.bg = bg;
        }
        if(this.dragable){
            this.ele.onmousedown=e=>{
                if(e.target.className==='head'){
                    let l = e.pageX - this.ele.offsetLeft;
                    let t = e.pageY - this.ele.offsetTop;
                    this.move(l,t);
                }    
            }
            document.onmouseup=()=>{
                this.stop();      
            }
        }
        this.ele.onclick=e=>{
            if(e.target.tagName.toLowerCase()==='span'){
                this.close();
            }
        }
        window.onresize=()=>{
            this.setPosition(this.x,this.y);
        }
        return this;
    },
    move(l,t){
        document.onmousemove=el=>{ 
            el.preventDefault();
            this.ele.style.left = el.pageX - l + 'px';
            this.ele.style.top = el.pageY - t + 'px';
        }
        return this;
    },
    stop(){
        document.onmousemove = null;
        return this;
    },
    close(){
        document.body.removeChild(this.ele);
        if(this.overlay !== false){
            document.body.removeChild(this.bg);
        }
        return this;
    },
    setPosition(x,y){
        if(x===undefined){
            if(this.position === 'center'){
                x = (window.innerWidth - this.ele.offsetWidth)/2;
                y = (window.innerHeight - this.ele.offsetHeight)/2;
            }else if(this.position === 'right'){
                x = window.innerWidth-this.ele.offsetWidth;
                y = window.innerHeight - this.ele.offsetHeight;
            }else if(this.position === 'left'){
                x = 0;
                y = window.innerHeight - this.ele.offsetHeight;
            }
        }
        this.ele.style.left = x + 'px';
        this.ele.style.top = y + 'px';

        return this;
    },

}

Object.defineProperty(Popover.prototype,'constructor',{
    configurable: true,
    value:Popover
});


function Confirm(options){
    var defaults = {
        Width:400,
        Height:200,
        title:'',
        content:'你确定这个操作吗',
        overlay:false
    }

    var opt = Object.assign({},defaults,options);

    Popover.call(this,opt);//继承属性
    this.show();
}
Confirm.prototype = Object.create(Popover.prototype);//继承方法

Confirm.prototype.show=function(){
    let btn1 = document.createElement('button');
    let btn2 = document.createElement('button');
    btn1.innerHTML = 'yes';
    btn2.innerHTML = 'no';
    this.ele.appendChild(btn1);
    this.ele.appendChild(btn2);
    btn1.style.position = 'absolute';
    btn1.style.left = 30+'px';
    btn1.style.bottom = 10+'px';
    btn2.style.position = 'absolute';
    btn2.style.right = 30+'px';
    btn2.style.bottom = 10+'px';
    btn1.className='btn1';
    btn2.className='btn2';

    btn1.onclick=()=>{
        this.success('yes')
        this.close();      
    }

    btn2.onclick=()=>{
        this.failure('no')
    }
}