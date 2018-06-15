cc.Class({
    extends: cc.Component,

    properties: {
       //enemyPrefab: cc.Prefab,
       enemyPrefabArray: [cc.Prefab],
       time: 10,
       num: 1,
       _currentTime: 1,
       ground: cc.Node,
       _sceneLoading: false,
       _local:null,
      
    },

    onLoad: function () {
        window.enemyNum = 0;
        //this.generator();
        this.schedule(this.generator.bind(this),1);
        this._local = require('local');
    },

    generator: function(){
        if(window.enemyNum == 0){
            if(this._currentTime == this.time){
                if(!this._sceneLoading){
                    this._sceneLoading = true;
                  //  cc.director.loadScene('win-scene');
                  //cc.director.loadScene('checkpoint');
                  cc.director.loadScene('post');
                  this._local.setgamestate('WIN');//游戏状态 胜利
                    this._local.setCheckpointNum(1);//解锁关卡
                    return ;
                }
            }  
            let enemyNum = this.num * this._currentTime;
            for(let i = 0; i < enemyNum; i++){
                let enemyIdx = Math.floor(Math.random() * this.enemyPrefabArray.length);//随机获取敌人类型
                let enemy = cc.instantiate(this.enemyPrefabArray[enemyIdx]);
                let randomPosition = null;
                if(Math.random() > 0.5){
                    let x = Math.round(cc.random0To1() * 120)+20;
                    let y = cc.random0To1() * 825;
                    if(y < 110){y+=110;}
                    if(y > 715){y-=110;}
                   // randomPosition = cc.v2(Math.round(cc.random0To1() * 900),cc.random0To1() * 825);
                   randomPosition = cc.v2(x,y);
                }else{
                    let xx = Math.round(cc.random0To1() * 120-5)+780;
                    let yy = cc.random0To1() * 825;
                    if(yy < 110){yy += 110;}
                    if(yy > 715){yy -= 110;}
                   // randomPosition =  cc.v2(Math.round(cc.random0To1() * 500),cc.random0To1() * 400);
                   randomPosition = cc.v2(xx,yy);
                }
                this.ground.addChild(enemy);
                enemy.name = 'enemy' + Date.now();
                enemy.position = randomPosition;
                window.enemyNum++;
            }
            this._currentTime++;
        }
        
        
    }

});
