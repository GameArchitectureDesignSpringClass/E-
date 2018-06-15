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
        _addpower01price:null,
        _addBoomNum02price:null,
        _addPlayerHp03price:null,
        _addplayermoveSpeed04price:null,
        _Gold:null,//玩家的金币数量
        prop_01:{
            default:null,
            type:cc.Label,
            displayName:'道具01的价格文本',
        },
        prop_02:{
            default:null,
            type:cc.Label,
            displayName:'道具02的价格文本',
        },
        prop_03:{
            default:null,
            type:cc.Label,
            displayName:'道具03的价格文本',
        },
        prop_04:{
            default:null,
            type:cc.Label,
            displayName:'道具04的价格文本',
        },
        prop_01_button:cc.Button,
        prop_02_button:cc.Button,
        prop_03_button:cc.Button,
        prop_04_button:cc.Button,
        PlayerGold:cc.Label,
       
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad:function () {
        this._local = require('local');
        this._Gold=this._local.getgold();
        this._addpower01price=this._local.getaddpower01price();
        this._addBoomNum02price=this._local.getaddBoomNum02price();
        this._addPlayerHp03price=this._local.getaddPlayerHp03price();
        this._addplayermoveSpeed04price=this._local.getaddplayermoveSpeed04price();
     },
    addpower01:function(){
       /* if(this._addpower01price<this._Gold){
            this.prop_01_button.interactable=false;
        }else{
            this.prop_01_button.interactable=true;
        }
        */
        if(!this.judgeGoldNum()){
            return
        }
        let num=1;
        this._local.setgold(-this._addpower01price);
        cc.log(this._addpower01price);
        this._local.setaddpower01price(100);
        this._local.setpower(num);//修改炸弹威力
        let price = this._addpower01price+100;
        this.prop_01.string = price;
        
    },
    addBoomNum02:function(){
        
        if(!this.judgeGoldNum()){
            return
        }
        
        this._local.setgold(-this._addBoomNum02price);
        let num=1;
        this._local.setaddBoomNum02price(100);
        this._local.setinitBoomNum(num);//修改炸弹数量
        let price = this._addBoomNum02price+100;
        this.prop_02.string = price;
    },
    addPlayerHp03:function(){
        
        if(!this.judgeGoldNum()){
            return
        }
        this._local.setgold(-this._addPlayerHp03price);
        let num=20;
        this._local.setaddPlayerHp03price(50);
        this._local.setplayerhp(num);//修改玩家血量
        let price = this._addPlayerHp03price+50;
        this.prop_03.string = price;
    },
    addplayermoveSpeed04:function(){
     
        if(!this.judgeGoldNum()){
            return
        }
        this._local.setgold(-this._addplayermoveSpeed04price);//修改玩家的金币数量
        let num=1;
        this._local.setaddplayermoveSpeed04price(50);//增加购买价格
        this._local.setplayermoveSpeed(num);//修改玩家移动速度
        let price = this._addplayermoveSpeed04price+50;
        this.prop_04.string = price;
    },
    return:function(){
        cc.director.loadScene('checkpoint');
    },
    judgeGoldNum:function(){//判断玩家游戏金币是否小于0
        if(this._Gold<=0){
            return false;
        }else{
            return true;
        }
    },
     update:function (dt) {
         //每帧更新 数据
        this._Gold=this._local.getgold();
        this._addpower01price=this._local.getaddpower01price();
        this._addBoomNum02price=this._local.getaddBoomNum02price();
        this._addPlayerHp03price=this._local.getaddPlayerHp03price();
        this._addplayermoveSpeed04price=this._local.getaddplayermoveSpeed04price();
        if(this._Gold<this._addpower01price){
            this.prop_01_button.interactable=false;
           
        }
        if(this._Gold<this._addBoomNum02price){
            this.prop_02_button.interactable=false;
            
        }
        if(this._Gold<this._addPlayerHp03price){
            this.prop_03_button.interactable=false;
          
        }
        if(this._Gold<this._addplayermoveSpeed04price){
            this.prop_04_button.interactable=false;
          
        }
        if( this._local.getplayermoveSpeed() >= 7){
            this.prop_01_button.interactable=false;
            this.prop_01.string = '最大';
        }
        if( this._local.getpower() >= 6){
            this.prop_01_button.interactable=false;
            this.prop_01.string = '最大';
        }
        if( this._local.getinitBoomNum() >= 8){
            this.prop_02_button.interactable=false;
            this.prop_02.string = '最大';
        }
        this.PlayerGold.string=this._local.getgold();
     },
});
