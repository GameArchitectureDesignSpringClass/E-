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
      
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad:function () {
         this._local=require('local');
         let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        
        this.schedule(function(){   //8秒后 清除冰块道具
            this.node.removeFromParent();
        },8,1);
     },
    
     scheduleOnce:function(){
        this.schedule(function(){
            this._local.setice(0);
            cc.log('getice='+this._local.getice());
        },3,1);
     },
     onCollisionEnter:function(other,self){
         if(other.getComponent('player-control').realPlayer==true){
            this._local.setice(1);
            cc.log("ice="+this._local.getice());
          //  this.scheduleOnce();//3秒后解除 冰冻状态  有问题 不执行 解除冰冻  在player-control 里
            this.node.removeFromParent();
         
         };
         
     },
    

     update:function (dt) {
      
     },
});
