cc.Class({
    extends: cc.Component,

    properties: {
        hp: 100,
        realPlayer: false,
        hurtValue: 5,//受到伤害扣多少血
        _hpLabel: {
            get: function(){
                return this.node.getChildByName('hp-tips').getComponent(cc.Label);
            }
        },
        _sceneLoading: false,
        hurtDurationOfEnemyTouch: 0.5,//just use in enemy
        _hurtTimeStamp: null,//受伤时间戳
        _enemyRemoving: false,
        _gridControl: null,
        _local:null,
       iceprefab:cc.Prefab,
       ProgressBar:cc.ProgressBar,
       damage:false,
       overAudio:{
        default:null, 
        url:cc.AudioClip,
        displayName:"死亡音效", 
        },
        hurtAudioMan:{
            default:null, 
            url:cc.AudioClip,
            displayName:"男受伤音效", 
            },
         hurtAudioGirl:{
                default:null, 
                url:cc.AudioClip,
                displayName:"女受伤音效", 
                },
    },

    onLoad: function () {
        this._local =require('local');
        this._gridControl = require('grid-control');
        this._hurtTimeStamp = Date.now();// 这个获取当前时间  初始化受伤时间戳
        if(this.realPlayer && this._local.getMode()==1){
            this.hp=this._local.getplayerhp();
            this.ProgressBar.totalLength =    this.hp;
        }
       
        this._hpLabel.string = this.hp;
        this.node.on('hurt-by-power',this.onHurt,this);
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
       cc.director.preloadScene('game-over-scene');
       cc.director.preloadScene('DoubleOver');
    },
    Audio:function(){
        this._Audio= cc.audioEngine.play(this.overAudio,false);
       // cc.audioEngine.setVolume(this._Audio,);
    },
    
    // onCollisionEnter: function(other,self){
    //     console.log('enter',other.node.name);
    //     //console.log(self.node.name);
    // },
   //当产生碰撞 并且被碰撞的物体使ice  
    onCollisionEnter:function(other,self){
        if(this.realPlayer && other.node.group == 'ice'){
           this._local.setice(1);
           this.scheduleOnce();
           cc.log('ice='+this._local.getice());
        }
        
    },
    scheduleOnce:function(){
        this.schedule(function(){
            this._local.setice(0);
            cc.log('getice='+this._local.getice());
        },3,1);
     },
     //逗留碰撞，每帧调用 直到离开
    onCollisionStay: function(other,self){
        if(this.realPlayer && other.node.group == 'player' && this._local.getMode()==1){
            //[add] check the grid
            //玩家和敌人的位置 贴近 
            if(this.checkGridTouch(other.node,self.node)){
                if(this._hurtTimeStamp + this.hurtDurationOfEnemyTouch * 1000 <= Date.now()){
                    this.onHurt();//调用受伤函数方法
                    this._hurtTimeStamp = Date.now();//记录本次受伤时间戳
                }
            }
        }
    },

    checkGridTouch: function(otherNode,selfNode){
        let otherGrid = this._gridControl.getGrid(otherNode.position);
        let selfGrid = this._gridControl.getGrid(selfNode.position);
        if(otherGrid.x == selfGrid.x && otherGrid.y == selfGrid.y){
            return true;
        }else{
            return false;
        }
    },

    // onCollisionExit: function(other,self){
    //     console.log('exit',other.node.name);
    //     //console.log(self.node.name);
    // },
    //敌人死亡时掉落ice 的概率
    rondow:function(){
        cc.log('rondow');
        let ron = Math.random()*100;
        if(0<ron && ron<=15){//冰冻道具掉落概率
            return true;
        }else{
            return false;
        }
    },
    onHurt: function(){
        if(  this._local.getMode()==1 &&  this._local.getchooseplayer()==1 ){
          //  cc.audioEngine.play(this.hurtAudioMan,false);
        }
        if(  this._local.getMode()==1 &&  this._local.getchooseplayer()==2 ){
          //  cc.audioEngine.play(this.hurtAudioGirl,false);
        }
       
        this.hp -= this.hurtValue;
        this.ProgressBar.totalLength -= this.hurtValue;
        if(this.hp <= 0){
            if(this.realPlayer){//判断是否是玩家
                //game over
                this.Audio();//死亡音效
                if(this._local.getMode()==1){
                    if(!this._sceneLoading){
                        this._sceneLoading = true;
                        cc.director.loadScene('game-over-scene');
                        this._local.setgamestate('LOSE');
                       
                       //cc.director.loadScene('checkpoint');
                    }
                }else if(this._local.getMode()==2){
                    if( !this.node.getComponent('Double-mode').otherMode){
                        this._local.setdie(1);
                        cc.director.loadScene('DoubleOver');
                       
                    }else{
                        this._local.setdie(2);
                        cc.director.loadScene('DoubleOver');
                        
                    }
                      
                }

              
               
            }else{
                //enemy removed 敌人被消灭
                if(!this._enemyRemoving  ){
                    this._enemyRemoving = true;
                    window.enemyNum--;
                    this._local.setgold(5);//增加玩家的金币
                    if(this.rondow){ //判断概率，符合在原地放置一个冰冻道具
                        var ice = cc.instantiate(this.iceprefab);
                       this.node.parent.addChild(ice); 
                        ice.position=this.node.position;
                        cc.log('ice');
                    }
                   
                    this.node.removeFromParent();
                }
            }
        }else{
            this._hpLabel.string = this.hp;
        }
        
    }

});
