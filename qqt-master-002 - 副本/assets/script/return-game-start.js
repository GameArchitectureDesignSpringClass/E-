// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
      lable:cc.Label,
      _local:null,
        bj:{
            default:null,
            type:cc.Node,
        },
        pic1:cc.SpriteFrame,
        pic2:cc.SpriteFrame,
    },
    onLoad:function(){
       
      //  this.bj.SpriteFrame = this.pic1;
        this._local = require('local');
        if(this._local.getdie()==1){
            this.lable.string = '玩家2胜利'
           // this.bj.SpriteFrame = this.pic2;
           this.bj.getComponent(cc.Sprite).spriteFrame = this.pic2;
            cc.log('获胜玩家2 = '+this._local.getdie());
        }
        if(this._local.getdie()==2){
            this.lable.string = '玩家1胜利'
          //  this.bj.SpriteFrame = this.pic1;
          this.bj.getComponent(cc.Sprite).spriteFrame = this.pic1;
            cc.log('获胜玩家1 = '+this._local.getdie());
        }
        cc.director.preloadScene('game-start');
        cc.director.preloadScene('Game mode');
        cc.director.preloadScene('Double mode');
        cc.director.preloadScene('Select role');
    },
    gamemode:function(){
        cc.director.loadScene('Game mode');
    },
     selectrote:function(){
        cc.director.loadScene('Select role');
    },
    return:function(){
        cc.director.loadScene('game-start');
    },
   again:function(){
       this._local.setMode(2);
    cc.director.loadScene('Double mode');
   },
    
    // update (dt) {},
});
