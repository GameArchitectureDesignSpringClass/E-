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
     GoldLable:cc.Label,
     //CheckpointLable:cc.Label,
     _local:null,
     beginAudio:{
        default:null, 
        url:cc.AudioClip,
        displayName:"开始音效", 
        },
        _Audio:null,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad:function () {
        
        this._local=require('local');
        if(this._local.getMode()==2){
            cc.audioEngine.play(this.beginAudio,false);
        }
        this.GoldLable.string=this._local.getgold();
        cc.director.preloadScene('checkpoint');
        this.Audio();
       // this.CheckpointLable.string='关卡:'+this._local.getCheckpointNum();
     },
     Audio:function(){
        this._Audio= cc.audioEngine.play(this.beginAudio,false);
       // cc.audioEngine.setVolume(this._Audio,);
    },
     return:function(){
         cc.director.loadScene('checkpoint');
     },
  
     update:function (dt) {
        this.GoldLable.string=this._local.getgold();
       // this.CheckpointLable.string='关卡:'+this._local.getCheckpointNum();
     },
});
