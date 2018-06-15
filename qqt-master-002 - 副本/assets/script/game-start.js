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
        beginAudio:{
            default:null, 
            url:cc.AudioClip,
            displayName:"开始音效", 
            },
       
    },
    onLoad:function(){
        
        this._local=require('local');
        cc.director.preloadScene('producer');
        cc.director.preloadScene('Game mode');
        cc.director.preloadScene('checkpoint');
        cc.director.preloadScene('Double mode');
        cc.director.preloadScene('game-start');
        if(this._local.getMode()==2){
            cc.audioEngine.play(this.beginAudio,false);
        }
    },
    gamemode:function(){
        cc.director.loadScene('Game mode');
    },
    OneMode:function(){
        this._local.setMode(1);
        cc.director.loadScene('Select role');
        //cc.director.loadScene('checkpoint');
    },
    checkpoint:function(){
        cc.director.loadScene('checkpoint');
    },
    Doublemode:function(){
        this._local.setMode(2);
        cc.director.loadScene('Double mode');
    },
    return:function(){
        cc.director.loadScene('game-start');
    },
    exit:function(){
        
    },
    producer:function(){
        cc.director.loadScene('producer');
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    // update (dt) {},
});
