cc.Class({
    extends: cc.Component,

    properties: {
        _dropTimeStamp:null, //时间戳
        restDuration: 3,
        _booming: false,
        _powerHandler: {
            get: function(){
                return this.node.getChildByName('power-handler');//炸弹的威力范围
            }
        },
        boomDuration: 0.5,
        power: 1,//炸弹威力
        //power-init state
        //time-stamp-init state
        _state: null,
        _boomMap: null,
        _gridControl: null,
        _local:null,
        _effect:null,
        effectAudio:{
            default:null, 
            url:cc.AudioClip,
            displayName:"爆炸音效", 
            },
        right:cc.Node,
        rightpower:cc.Node,
        left:cc.Node,
        leftpower:cc.Node,
        up:cc.Node,
        uppower:cc.Node,
        down:cc.Node,
        downpower:cc.Node,
    },
    
    //design the way to get the grid position of player
    init: function () {
        this._boomMap = require('boom-map');
        this._gridControl = require('grid-control');
        this._local = require('local');
       
        this.node.on('time-stamp-sync',this.onTimeStampSync,this);

        if(this._local.getMode()==1){
            this.power = this._local.getpower();
        }else if(this._local.getMode()==2 && this.node.parent.name =='grA'){
            this.power = this._local.getp1power();
        }else if(this._local.getMode()==2 && this.node.parent.name =='grB'){
            this.power = this._local.getp2power();
        }
       
        cc.log(' this.power='+this.power);
        //初始化威力scale
       // for(let item of this._powerHandler.children){
        //    item.scaleX = this.power + 0.4;
       // }
       //
     /*  this.right.width = this.power * 60;
        this.rightpower.scaleX =  this.power;
        
        this.left.width = this.power * 60;
        this.leftpower.scaleX =  this.power;

        this.up.width = this.power * 60;
        this.uppower.scaleX =  this.power;

        this.down.width = this.power * 60;
        this.downpower.scaleX =  this.power;
*/
        //炮弹被放下后 会马上记录当前的时间戳
        this._dropTimeStamp = Date.now();
        //炮弹距离初始化状态
        this._state = 'power-init';
        //开启碰撞检测 修正炮弹威力
        this._powerHandler.active = true;
        this.scheduleOnce(function(){
            //重置碰撞
            this._powerHandler.active = false;
            this.scheduleOnce(function(){
                //炮弹时间初始化状态
                this._state = 'time-stamp-init';
                //[error]重新开启碰撞 同步炮弹爆炸时间
                this._powerHandler.active = true;
            }.bind(this),0)
        }.bind(this),0);
    }, 

    onTimeStampSync: function(e){
        let currentTimeStamp = this._dropTimeStamp;
        let innerTimeStamp = e.detail;
        if(innerTimeStamp < currentTimeStamp){
            this._dropTimeStamp = innerTimeStamp;
            this.node.emit('time-stamp-sync',innerTimeStamp);
        }
        
    },
    BoomEffect:function(){
        this._effect= cc.audioEngine.play(this.effectAudio,false);
        cc.audioEngine.setVolume(this._effect,0.1);

    },
    boom: function(){
        //渲染炮弹威力
        var anim = this.getComponent(cc.Animation);
        anim.play('explode01');
        this._state = 'booming';
        this.right.getComponent(cc.Sprite).enabled = true;
        this.left.getComponent(cc.Sprite).enabled = true;
        this.up.getComponent(cc.Sprite).enabled = true;
        this.down.getComponent(cc.Sprite).enabled = true;
      
        this.ggxx();
        this.node.emit('boom');
      
        this.scheduleOnce(function(){
                        //指定时间后 炮弹自动销毁↓
                        this._boomMap.unsetBoom(this._gridControl.getGrid(this.node.position));
                        this._local.setboomnum(-1);//每当炸弹销毁，游戏中的炸弹数量减1
                        this.BoomEffect();//调用爆炸音效
                        this.node.removeFromParent();
        }.bind(this),this.boomDuration);
    },
    ggxx:function(){
        let ss = cc.scaleTo(0.2,this.power,1);
        let dd = cc.scaleTo(0.2,this.power,1);
        let ww = cc.scaleTo(0.2,this.power,1);
        let aa = cc.scaleTo(0.2,this.power,1);
       
        this.rightpower.runAction(ss);
        this.leftpower.runAction(dd);
        this.uppower.runAction(ww);
        this.downpower.runAction(aa);
       // this.right.width = this.power * 60;
       // this.rightpower.scaleX =  this.power;
        
     //   this.left.width = this.power * 60;
      //  this.leftpower.scaleX =  this.power;

      //  this.up.width = this.power * 60;
      //  this.uppower.scaleX =  this.power;

       // this.down.width = this.power * 60;
      //  this.downpower.scaleX =  this.power;
    },
    update: function(){
        this.right.width = this.rightpower.scaleX*60;
        this.left.width = this.power * 60;
        this.up.width = this.power * 60;
        this.down.width = this.power * 60;
        //然后在update判断是否到达了要爆炸的时间
        if((this._dropTimeStamp + this.restDuration * 1000) <= Date.now()){
            //boom
            if(!this._booming){
                this._booming = true;
                this.boom();
            }
        }
    }

    

});
