

cc.Class({
    extends: cc.Component,

    properties: {
        checkpoint:[cc.Button],
        _local:null,
    },

   

     onLoad:function () {
        this._local = require('local');
        //初始化关卡的状态
        for(let x=0;x<this.checkpoint.length;x++){
            this.checkpoint[x].interactable = false;
        }
        this.JudgeLevels();
        cc.director.preloadScene('store');
        cc.director.preloadScene('first-scene');
        cc.director.preloadScene('second-scene');
     },
     JudgeLevels:function(){
         for(let x=0;x<this._local.getCheckpointNum();x++){
            this.checkpoint[x].interactable = true;
         }
     },
     loadstore:function(){
        cc.director.loadScene('store');
     },
    loadScene_01:function(){ 
        cc.director.loadScene('first-scene');
    },
    loadScene_02:function(){ 
        cc.director.loadScene('second-scene');
    }

    // update (dt) {},
});
