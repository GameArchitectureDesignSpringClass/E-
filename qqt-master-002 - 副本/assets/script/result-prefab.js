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
     // resultLabel:cc.Label,
      
      _local:null,
    },
    onLoad:function(){
        this._local = require('local');
        cc.director.preloadScene('game-start');
        cc.director.preloadScene('checkpoint');
      /*  if(this._local.getgamestate=='WIN'){
            this.resultLabel.string='通关';
        }else if(this._local.getgamestate=='lose'){
            this.resultLabel.string='失败';
        }
        */
    },
    return:function(){
        cc.director.loadScene('game-start');
    },
    result:function(){
        
    },
    checkpoint:function(){
        cc.director.loadScene('checkpoint');
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},


    // update (dt) {},
});
