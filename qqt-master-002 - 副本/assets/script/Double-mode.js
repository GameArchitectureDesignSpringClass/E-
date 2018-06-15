cc.Class({
    extends: cc.Component,

    properties: {
        _left: false,
        _right: false,
        _up: false,
        _down: false,

        moveSpeed: 0, //移动速度
      
        _leftBlock : 0,
        _rightBlock : 0,
        _upBlock : 0,
        _downBlock : 0,

        otherMode:false,
      
        _local:null,
        r:false,
        l:false,
        d:false,
        u:false,
        
    },

    onLoad: function () {
        
        this._local = require('local');
       // this._local.setdie(0);
        cc.log('local.getplayermoveSpeed='+this._local.getplayermoveSpeed());
       
        this._local.setlefting(0);
         this._local.setdowning(0);
        this._local.setrighting(0);
         this._local.setuping(0);

        //移动很简单  首先开启按键的监听↓
        if(this.otherMode){
            cc.systemEvent.on('keydown',this.onKeyDown,this);
            cc.systemEvent.on('keyup',this.onKeyUp,this);
        }else{
            cc.systemEvent.on('keydown',this.onKeyDown02,this);
            cc.systemEvent.on('keyup',this.onKeyUp02,this);
        }
           
       
        //碰撞也很简单 首先开始碰撞回调↓
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
      //  manager.enabledDebugDraw = true;
       // manager.enabledDrawBoundingBox = true;
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'static-wall'  || other.node.group == 'damage'  || other.node.group == 'player'  || other.node.group == 'boom'){//碰到墙壁或炸弹
            //如果碰撞的分组是墙壁 调用↓
            this.onTouchWall(other,self);
        }
        if(other.node.group == 'prop' ){
            this.onprop(other,self);
        }
    },
    onprop:function(other,self){
        if(other.tag == 1){//炸弹威力道具
            other.node.removeFromParent();
            if(!this.otherMode){
                this._local.setp1power(1);
            }else{
                this._local.setp2power(1);
            }
        }
        if(other.tag == 2){//速度道具
            other.node.removeFromParent();
            if(!this.otherMode){
                this.moveSpeed +=1;
                cc.log('this.moveSpeed='+this.moveSpeed);
            }else{
                this.moveSpeed +=1;
                cc.log('this.moveSpeed='+this.moveSpeed);
            }
        }
        if(other.tag == 3){//炸弹数量道具
            other.node.removeFromParent();
            if(!this.otherMode){
              this._local.setboomnumA(1);
              
                cc.log('this.moveSpeed='+this.moveSpeed);
            }else{
                this._local.setboomnumB(1);
                cc.log('this.moveSpeed='+this.moveSpeed);
            }
        }
    },
    onCollisionExit: function(other,self){
        if(other.node.group == 'static-wall'  || other.node.group == 'damage'  || other.node.group == 'player'  || other.node.group == 'boom'){
            //离开墙壁的时候，记得解除碰撞的标志位↓
            this.onLeaveWall(other,self);
        }
    },

    onTouchWall: function(other,self){
        //check the preAabb and aabb
        
        let blockArray = [];
        //aabb是碰撞发生后嵌入墙壁的包围盒↓
        let selfAabb = self.world.aabb;
        let otherAabb = other.world.aabb;
        //preAabb是碰撞发生前一帧，未碰撞 还在墙壁外的包围盒↓
        let selfPreAabb = self.world.preAabb;
        let otherPreAabb = other.world.preAabb;

        //preAabb not touch by aabb touch => the edge blockArray

        //check left block
        //判断碰撞确实发生的思路是： preAabb的时候某边未嵌入墙壁 但是aabb的时候这个边已经嵌入了墙壁
        //就说明 这preAabb到aabb这个切换过程中，这个边确实碰到了墙壁
        //上下左右四个边都判断一次
        if(selfPreAabb.xMin >= otherAabb.xMax && selfAabb.xMin <= otherAabb.xMax){
            //left block
            let distance = Math.abs(otherAabb.xMax - selfPreAabb.xMin);
            //然后就保存碰撞的边
            blockArray.push({distance: distance, direction: 'left'});
        }
        //check right block
        if(selfPreAabb.xMax <= otherAabb.xMin && selfAabb.xMax >= otherAabb.xMin){
            //right block
            let distance = Math.abs(otherAabb.xMin - selfPreAabb.xMax);
            blockArray.push({distance: distance, direction: 'right'});
        }
        //check up block
        if(selfPreAabb.yMax <= otherAabb.yMin && selfAabb.yMax >= otherAabb.yMin){
            //up block
            let distance = Math.abs(otherAabb.yMin - selfPreAabb.yMax);
            blockArray.push({distance: distance, direction: 'up'});
        }
        //check down block
        if(selfPreAabb.yMin >= otherAabb.yMax && selfAabb.yMin <= otherAabb.yMax){
            //down block
            let distance = Math.abs(otherAabb.yMax - selfPreAabb.yMin);
            blockArray.push({distance: distance, direction: 'down'});
        }
        //让墙壁帮我们保存碰撞的数组
        if(other.blockArray == undefined){other.blockArray = {};}
        other.blockArray[self.node.name] = blockArray;

        //遍历碰撞的数组 设置碰撞的标志位
        for(let item of blockArray){
            let blockName = '_' + item.direction + "Block";
            this[blockName] += 1;
        }
    },

    onLeaveWall: function(other,self){
        //和touchWall部分同理
        if(other.blockArray !== undefined && other.blockArray[self.node.name] !== undefined){
            for(let item of other.blockArray[self.node.name]){
                let blockName = '_' + item.direction + 'Block';
                //不过这次是解除
                this[blockName] -= 1;
            }
            //然后清空碰撞数组
            other.blockArray[self.node.name] = [];
        }
    },

    onKeyDown: function(e){
        //在按下的时候设置方向标志位↓
        switch(e.keyCode){
            case cc.KEY.up: {this._up = true;break}
            case cc.KEY.down: {this._down = true;break}
            case cc.KEY.left: {this._left = true;
              //  this.node.scaleX = -1;this.node.children[0].scaleX = -1;
                break}
            case cc.KEY.right: {this._right = true;
               // this.node.scaleX = 1;this.node.children[0].scaleX = 1;
                break}
        }
    },

    onKeyUp: function(e){
        var anim = this.getComponent(cc.Animation);
        //在弹起的时候解除方向标志位↓
        switch(e.keyCode){
            case cc.KEY.up: {this._up = false;anim.stop();break}
            case cc.KEY.down: {this._down = false;anim.stop();break}
            case cc.KEY.left: {this._left = false;anim.stop();break}
            case cc.KEY.right: {this._right = false;anim.stop();break}
        }    
    },
    onKeyDown02: function(e){
        //在按下的时候设置方向标志位↓
        switch(e.keyCode){
            case cc.KEY.w: {this._up = true;break}
            case cc.KEY.s: {this._down = true;break}
            case cc.KEY.a: {this._left = true;
                //this.node.scaleX = -1;this.node.children[0].scaleX = -1;
                break}
            case cc.KEY.d: {this._right = true;
               // this.node.scaleX = 1;this.node.children[0].scaleX = 1;
                break}
        }
    },

    onKeyUp02: function(e){
        var anim = this.getComponent(cc.Animation);
        //在弹起的时候解除方向标志位↓
        switch(e.keyCode){
            case cc.KEY.w: {this._up = false;anim.stop();break}
            case cc.KEY.s: {this._down = false;anim.stop();break}
            case cc.KEY.a: {this._left = false;anim.stop();break}
            case cc.KEY.d: {this._right = false;anim.stop();break}
        }    
    },
    enemyddd:function(){
        var anim = this.getComponent(cc.Animation);
        if( this.d ){
            this.d=false;
            anim.stop();
            let ddd =  anim.play('rundown');
        }
    },
    enemyuuu:function(){
        var anim = this.getComponent(cc.Animation);
        if( this.u ){
            this.u=false;
            anim.stop();
            let ddd =  anim.play('runup');
        }
    },
    enemyrrr:function(){
        var anim = this.getComponent(cc.Animation);
        if( this.r ){
            this.r=false;
            anim.stop();
            cc.log('right');
            let ddd =  anim.play('runright');
        }
    },
    enemylll:function(){
        var anim = this.getComponent(cc.Animation);
        if( this.l ){
            this.l=false;
            anim.stop();
            cc.log('left');
            let ddd =  anim.play('runleft');
        }
     
    },
    update: function(dt){
        var anim = this.getComponent(cc.Animation);

            if(this._left && !this._leftBlock){
                this.node.x -= this.moveSpeed;
                if(!this.otherMode){
                    let animState = anim.getAnimationState('runleft');
                    let playing = animState.isPlaying;
                    if(playing){return}
                    this.l=true;
                    this.r=false;
                    anim.stop('runright');
                     this.enemylll();
                }else{
                    let animState = anim.getAnimationState('p2runleft');
                    let playing = animState.isPlaying;
                    if(playing){return}
                    anim.stop('runright');
                    anim.stop();
                    anim.play('p2runleft');
                }
               
            }
            if(this._right && !this._rightBlock){
                this.node.x += this.moveSpeed;
                if(!this.otherMode){
                    let animState = anim.getAnimationState('runright');
                    let playing = animState.isPlaying;
                    if(playing){return}
                    this.r=true;
                
                     this.enemyrrr();
                }else{
                    let animState = anim.getAnimationState('p2runright');
                    let playing = animState.isPlaying;
                    if(playing){return}
                    anim.stop('runright');
                    anim.stop();
                    anim.play('p2runright');
                }
               
            }
            if(this._up && !this._upBlock){
                this.node.y += this.moveSpeed;
                if(!this.otherMode){
                    let animState = anim.getAnimationState('runup');
                    let playing = animState.isPlaying;
                    if(playing){return}
                    this.u=true;
              
                     this.enemyuuu();
                }else{
                    let animState = anim.getAnimationState('p2runup');
                    let playing = animState.isPlaying;
                    if(playing){return}
                   
                    anim.stop();
                    anim.play('p2runup');
                }
               
            }
            if(this._down && !this._downBlock){
                this.node.y -= this.moveSpeed;
                if(!this.otherMode){
                    let animState = anim.getAnimationState('rundown');
                    let playing = animState.isPlaying;
                    if(playing){return}
                    this.d=true;
                     this.enemyddd();
                }else{
                    let animState = anim.getAnimationState('p2rundown');
                    let playing = animState.isPlaying;
                    if(playing){return}
                   
                    anim.stop();
                    anim.play('p2rundown');
                }
                
            }
        
    }
});
