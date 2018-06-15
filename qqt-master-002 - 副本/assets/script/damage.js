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
       prop:[cc.Prefab],
    },

   
     onLoad:function () {
         this._local = require('local');
        this.node.on('hurt-by-power',this.onHurt,this);
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
     },
     onCollisionEnter: function(other,self){
      
      
    },
    onCollisionStay: function(other,self){
      
        },
   
    onHurt: function(){
        let num = Math.floor(Math.random()*3);
        cc.log('销毁');
        let prop = cc.instantiate(this.prop[num]);
        this.node.parent.addChild(prop);
        prop.position = this.node.position;
        this.node.removeFromParent();
    },


    // update (dt) {},
});
