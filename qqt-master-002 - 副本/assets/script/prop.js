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
        props:[cc.Prefab],
    },



     onLoad:function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
       
     },
     addprops:function(){
        var ron = Math.floor(Math.random()*this.props.length);//获取随机的道具 预制
        var newprop=cc.instantiate(this.props[ron]);
        this.node.parent.addChild(newprop);
        newprop.position=this.node.position; 
                       
     },
     onCollisionEnter:function(other,self){
        this.node.removeFromParent();//删除 节点
        this.addprops();// 在原地 放置一个随机道具
     },
   

    // update (dt) {},
});
