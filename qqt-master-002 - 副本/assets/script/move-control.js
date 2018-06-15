

cc.Class({
    extends: cc.Component,
    

    properties: {
        _left: false,
        _right: false,
        _up: false,
        _down: false,

        moveSpeed: 0,
        playermoveSpeed:0,
        _leftBlock : 0,
        _rightBlock : 0,
        _upBlock : 0,
        _downBlock : 0,

        realPlayer: false,
        _player: null,
        _local:null,
        //把方法放在updata中  调这个数值没用 
       pic:[cc.SpriteFrame],
       wallprefab:cc.Prefab,
       main:cc.Node,
      movetime:0.08,
       _d :false,
       _l : false,
       _u : false,
       _r : false,

       _dd :false,
       _ll : false,
       _uu : false,
       _rr : false,
       player1:cc.SpriteFrame,
       player2:cc.SpriteFrame,
       player1touxian:cc.SpriteFrame,
       player2touxian:cc.SpriteFrame,
       touxianFram:cc.Node,
    },
    onLoad: function () {
        this._local = require('local');
       this._local.setmovetime(this.movetime);
       // cc.log('local.getplayermoveSpeed='+this._local.getplayermoveSpeed());
        if(this.realPlayer ){
        //移动很简单  首先开启按键的监听↓
            if(this._local.getchooseplayer()==1){
                this.touxianFram.getComponent(cc.Sprite).spriteFrame=this.player1touxian;
                this.node.getComponent(cc.Sprite).spriteFrame = this.player1;
                cc.log('this._local.getchooseplayer()=='+this._local.getchooseplayer());
            }else if (this._local.getchooseplayer()==2){
                this.touxianFram.getComponent(cc.Sprite).spriteFrame=this.player2touxian;
                cc.log('this._local.getchooseplayer()=='+this._local.getchooseplayer());
                this.node.getComponent(cc.Sprite).SpriteFrame = this.player2;
            }
            cc.systemEvent.on('keydown',this.onKeyDown,this);
            cc.systemEvent.on('keyup',this.onKeyUp,this);
        }else {
           // this._player = this.node.parent.parent.getChildByName('player');
           this._player = this.node.parent.getChildByName('player');
        }
        //碰撞也很简单 首先开始碰撞回调↓
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
      //  manager.enabledDebugDraw = true;
     //   manager.enabledDrawBoundingBox = true;
        
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'static-wall' || other.node.group == 'boom' ){//碰到墙壁或炸弹
            //如果碰撞的分组是墙壁 调用↓
            this.onTouchWall(other,self);
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'static-wall' || other.node.group == 'boom'){
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
           // this.node.x = otherPreAabb.xMax + this.node.width;
            //然后就保存碰撞的边
            //this.node.x +=66;
            blockArray.push({distance: distance, direction: 'left'});
        }
        //check right block
        if(selfPreAabb.xMax <= otherAabb.xMin && selfAabb.xMax >= otherAabb.xMin){
            //right block
            let distance = Math.abs(otherAabb.xMin - selfPreAabb.xMax);
            //this.node.x -=66;
            blockArray.push({distance: distance, direction: 'right'});
        }
        //check up block
        if(selfPreAabb.yMax <= otherAabb.yMin && selfAabb.yMax >= otherAabb.yMin){
            //up block
            let distance = Math.abs(otherAabb.yMin - selfPreAabb.yMax);
          //  this.node.y -=66;
            blockArray.push({distance: distance, direction: 'up'});
        }
        //check down block
        if(selfPreAabb.yMin >= otherAabb.yMax && selfAabb.yMin <= otherAabb.yMax){
            //down block
            let distance = Math.abs(otherAabb.yMax - selfPreAabb.yMin);
          //  this.node.y+=66;
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
        var anim = this.getComponent(cc.Animation);
        //在按下的时候设置方向标志位↓
        switch(e.keyCode){
            case cc.KEY.up: {
                cc.log("uuuupppp");
                this._left = false;
                this._right = false;
                this._up = true;
                break}
            case cc.KEY.down: {
                this._left = false;
                this._right = false;
                this._down = true;
                break}
            case cc.KEY.left: {
                this._up = false;
                this._down = false;
                this._left = true;
                break}
            case cc.KEY.right: {
                this._up = false;
                this._down = false;
                this._right = true;
                break}
        }
    },

    onKeyUp: function(e){
        
        var anim = this.getComponent(cc.Animation);
        var SpriteFrame = this.node.getComponent(cc.Sprite).SpriteFrame;
        //在弹起的时候解除方向标志位↓
        switch(e.keyCode){
            case cc.KEY.up: {this._up = false; 
                
                anim.stop('runup');
                anim.stop();
                this._local.setuping(0);
               // SpriteFrame = this.pic[0];
                this.unscheduleAllCallbacks();
            break}
            case cc.KEY.down: {this._down = false;
               anim.stop('rundown');
               anim.stop();
             // anim.stop();
               this._local.setdowning(0);
             // SpriteFrame = this.pic[1];
              this.unscheduleAllCallbacks();
            break}
            case cc.KEY.left: {this._left = false; 
                anim.stop('runleft');
                anim.stop();
                this._local.setlefting(0);
              //  SpriteFrame = this.pic[2];
                this.unscheduleAllCallbacks();
            break}
            case cc.KEY.right: {this._right = false;
              anim.stop('runright');
              anim.stop();
               this._local.setrighting(0);
             //  SpriteFrame = this.pic[3];
               this.unscheduleAllCallbacks();
            break}
        }    
    },
    judgemain:function(node){
       let num = 0;
       let x = node.x;
       let y = node.y;
        for(var i;i< this.main.children.length;i++){
            if(x == this.main.children[i].position.x && y == this.main.children[i].position.y){num=1;}
        }
         
      return num;
    },
    left:function(){
        let position =  cc.v2(this.node.x-66,this.node.y);
        if(this._left && this._leftBlock == 0 &&   this.judgemain(position)==0 ){
                this.schedule(function(){
                    if(this.node.x >66){
                        this.node.x-=66;
                    }
                },this._local.getmovetime());
        }
    },
    right:function(){
        let position =  cc.v2(this.node.x+66,this.node.y);
        if(this._right && this._rightBlock==0  && this.judgemain(position)==0 ){
            this.schedule(function(){
                if(this.node.x <950){
                    this.node.x+=66;
                }
            },this._local.getmovetime());
        }
    },
    up:function(move){
       
        let position =  cc.v2(this.node.x,this.node.y+66);
        if( this._up && this._upBlock==0  &&   this.judgemain(position)==0  ){
            this.schedule(function(){
                if(this.node.y <890){
                    this.node.y+=66;
                }
            },this._local.getmovetime());
        }
    },
    down:function(){
        let position =  cc.v2(this.node.x,this.node.y-66);
      /*  var finished = cc.callFunc(function () {
            this._local.setmovetodown(0);
         // return;
        }, this, );
        let action = cc.sequence(cc.moveTo(0.5,position),finished);
        this.node.runAction(action);
        */
        if(this._down && this._downBlock==0  &&   this.judgemain(position)==0){
                   
            this.schedule(function(){
                if(this.node.y>66 ){
                    this.node.y-=66;
                }
            },this._local.getmovetime());
        }
    },
    enemylll:function(){
            var anim = this.getComponent(cc.Animation);
            if( this.l ){
                this.l=false;
                anim.stop();
                let lll =  anim.play('enemy-left');
            }
    },
    enemyrrr:function(){
            var anim = this.getComponent(cc.Animation);
            if( this.r ){
                this.r=false;
                anim.stop();
                let rrr =  anim.play('enemy-right');
            }
    },
    enemyddd:function(){
        var anim = this.getComponent(cc.Animation);
        if( this.d ){
            this.d=false;
            anim.stop();
            let ddd =  anim.play('enemy-down');
        }
    },
    enemyuuu:function(){
            var anim = this.getComponent(cc.Animation);
            if( this.u ){
                this.u=false;
                anim.stop();
                let uuu =  anim.play('enemy-up');
            }
    },
    update: function(dt){
        var anim = this.getComponent(cc.Animation);
        var SpriteFrame = this.node.getComponent(cc.Sprite).SpriteFrame;
      
        if(this._local.getMode()==1){
            this.playermoveSpeed=this._local.getplayermoveSpeed();//更新玩家的移动速度
        }
     
        //然后根据标志位移动玩家
        //能够移动的判断标准是  想往某个方向移动并且那个方向畅通无阻 才能移动
        if(!this.realPlayer){ 
            let anim =  this.getComponent(cc.Animation);
            //计算玩家位置并不断追逐
            if(this._local.getice()==1){//冰冻状态
                return
            }
            let targetVector = cc.pSub(this._player.position,this.node.position);
            let moveStep = cc.pMult(cc.pNormalize(targetVector),this.moveSpeed);
            if(moveStep.x > 0 && !!this._rightBlock){moveStep.x = 0;}
            if(moveStep.x < 0 && !!this._leftBlock){moveStep.x = 0;}
            if(moveStep.y > 0 && !!this._upBlock){moveStep.y = 0;}
            if(moveStep.y < 0 && !!this._downBlock){moveStep.y = 0;}
           // if(moveStep.x > 0){this.node.scaleX = 1;this.node.children[0].scaleX = 1;}
           // if(moveStep.x < 0){this.node.scaleX = -1;this.node.children[0].scaleX = -1;}
            this.node.position = cc.pAdd(this.node.position,moveStep);
         
            if(this._player.position.x > this.node.position.x){
                this. u=false;
                this. d=false;
                this. l=false;
                this. r=true;
                if((this._player.position.y - this.node.position.y) >100){
                    if((this._player.position.x - this.node.position.x)>100){
                        this.u=false;
                        this.d=false;
                        this.l=false;
                        this.r=true;
                    }else{
                        this.u=true;
                        this.d=false;
                        this.l=false;
                        this.r=false;
                    }
                }else if(  (this._player.position.y - this.node.position.y) <=-100){
                            if((this._player.position.x - this.node.position.x)>100){
                                this.u=false;
                                this.d=false;
                                this. l=false;
                                this. r=true;
                            }else{
                                this.u=false;
                                this.d=true;
                                this. l=false;
                                this. r=false;
                            }
                        }
            }else{
                this. u=false;
                this. d=false;
                this. l=true;
                this. r=false;
                if((this._player.position.y - this.node.position.y) >100){
                    if((this._player.position.x - this.node.position.x)<-100){
                        this. u=false;
                        this. d=false;
                        this. l=true;
                        this. r=false;
                    }else{
                        this. u=true;
                        this. d=false;
                        this. l=false;
                        this. r=false;
                    }
                   
                }else if(  (this._player.position.y - this.node.position.y) <=-100){
                    if((this._player.position.x - this.node.position.x)<-100){
                        this. u=false;
                        this. d=false;
                        this. l=true;
                        this. r=false;
                    }else{
                        this. u=false;
                        this. d=true;
                        this. l=false;
                        this. r=false;
                    }
                }
            }
            if( this.u){
                let animState = anim.getAnimationState('enemy-up');
                let playing = animState.isPlaying;
                if(playing){return}
               
               this.enemyuuu();
            }
            if( this.d){
                let animState = anim.getAnimationState('enemy-down');
                let playing = animState.isPlaying;
                if(playing){return}
               
               this.enemyddd();
            }
            if( this.r){
                let animState = anim.getAnimationState('enemy-right');
                let playing = animState.isPlaying;
                if(playing){return}
               
               this.enemyrrr();
            }
            if( this.l ){
                let animState = anim.getAnimationState('enemy-left');
                let playing = animState.isPlaying;
                if(playing){return}
               
               this.enemylll();
            }
          
        }else{
            if(this._left && !this._leftBlock){
              /*  
                let x = this.node.x-66;
                let y = this.node.y;
                for(let i=0;i< this.main.children.length;i++){
                    if(x == this.main.children[i].position.x && y == this.main.children[i].position.y){
                        this._left=false;
                        this.unscheduleAllCallbacks();
                    }
                }*/
            this.node.x -= this.playermoveSpeed;
                if(this._local.getlefting()==0){
                   // cc.log('lll='+this._local.getlefting());
                  //  SpriteFrame = this.pic[3];
                  if(this._local.getchooseplayer()==1){
                    var animleft=  anim.play('runleft');
                  }else if(this._local.getchooseplayer()==2){
                    var animleft=  anim.play('p2runleft');
                  }
                   // let animup=  anim.play('runleft');
                    let num=1;
                    if(animleft.isPlaying){num=1;}else{num=0;}
                    this._local.setlefting(num);
                    this._local.setdowning(0);
                    this._local.setrighting(0);
                    this._local.setuping(0);
                    //this.left();
                   
                }
              
            }
            if(this._right && !this._rightBlock){
               /* let x = this.node.x+66;
                let y = this.node.y;
                for(let i=0;i< this.main.children.length;i++){
                    if(x == this.main.children[i].position.x && y == this.main.children[i].position.y){
                        this._right=false;
                        this.unscheduleAllCallbacks();
                    }
                }*/
              this.node.x += this.playermoveSpeed;
                if(this._local.getrighting()==0){
                   // cc.log('rrr='+this._local.getrighting());
                  //  SpriteFrame = this.pic[2];
                  if(this._local.getchooseplayer()==1){
                    var animright=  anim.play('runright');
                  }else if(this._local.getchooseplayer()==2){
                    var animright=  anim.play('p2runright');
                  }
                   // let animup= anim.play('runright');
                    let num=1;
                    if(animright.isPlaying){num=1;}else{num=0;}
                    this._local.setrighting(num);
                    this._local.setdowning(0);
                    this._local.setlefting(0);
                    this._local.setuping(0);
                    //this.right();
                   
                }
            }
            if(this._up && !this._upBlock){
              /*  let x = this.node.x;
                let y = this.node.y+66;
                for(let i=0;i< this.main.children.length;i++){
                    if(x == this.main.children[i].position.x && y == this.main.children[i].position.y){
                        this._up=false;
                        this.unscheduleAllCallbacks();
                    }
                }*/
                this.node.y += this.playermoveSpeed;
                    if(this._local.getuping()==0){
                      //  cc.log('uuu='+this._local.getuping());
                      //  SpriteFrame = this.pic[0];
                      if(this._local.getchooseplayer()==1){
                        var animup=  anim.play('runup');
                      }else if(this._local.getchooseplayer()==2){
                        var animup=  anim.play('p2runup');
                      }
                       // let animup= anim.play('runup');
                        let num=1;
                        if(animup.isPlaying){num=1;}else{num=0;}
                        this._local.setuping(num);
                        this._local.setdowning(0);
                        this._local.setlefting(0);
                        this._local.setrighting(0);
                        //this.up();
                    
                    }
            }
            if(this._down && !this._downBlock){
               /* let x = this.node.x;
                let y = this.node.y-66;
                for(let i=0;i< this.main.children.length;i++){
                    if(x == this.main.children[i].position.x && y == this.main.children[i].position.y){
                        this._down=false;
                        this.unscheduleAllCallbacks();
                        return
                    }
                }*/
                this.node.y -= this.playermoveSpeed;
             /*if(this._local.getmovetodown()==0 && this._down && this._downBlock==0  &&   this.judgemain(this.node.position)==0){
                this.down();
                this._local.setmovetodown(1);
              }
             */   
                if(this._local.getdowning()==0 ){
                   // cc.log('ddd='+this._local.getdowning());
                   // cc.log('this._local.getmovetodown()='+this._local.getmovetodown());
                  //  SpriteFrame = this.pic[1];
                  if(this._local.getchooseplayer()==1){
                    var animdown=  anim.play('rundown');
                  }else if(this._local.getchooseplayer()==2){
                    var animdown=  anim.play('p2rundown');
                  }
                   // let animup= anim.play('rundown');
                    let num=1;        
                    if(animdown.isPlaying){num=1;}else{num=0;}
                    this._local.setdowning(num);
                    this._local.setuping(0);
                    this._local.setlefting(0);
                    this._local.setrighting(0);
                   // this.down();
                  
                }
            }
           
           
        }
    }
});
