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
       _local:null,
       button01:{
           default:null,
           type:cc.Node,
       },
       button02:{
        default:null,
        type:cc.Node,
    }
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad:function () {
        this._local = require('local');
        cc.director.preloadScene('checkpoint');
        cc.director.preloadScene('game-start');
     },
    return:function(){
        cc.director.loadScene('game-start');
    },
     player01:function(){
         this._local.setchooseplayer(1);
       cc.director.loadScene('checkpoint');
     },
     player02:function(){
        this._local.setchooseplayer(2);
        cc.director.loadScene('checkpoint');
    },


    // update (dt) {},
});
