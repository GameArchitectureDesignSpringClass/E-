

cc.Class({
    extends: cc.Component,

    properties: {
        //boomPrefab: cc.Prefab,
        boomPrefabArray: [cc.Prefab],
        groundPanel: cc.Node,
        _gridControl: null,
        _boomMap: null,
        _local:null,
       grA:cc.Node,
       grB:cc.Node,
        
    },

    onLoad: function () {
        this._local=require('local');
        if(this._local.getMode()==1){
            cc.systemEvent.on('keydown',this.onKeyDown,this);
        }else if(this._local.getMode()==2){
            if(this.node.getComponent('Double-mode').otherMode==true){
                cc.systemEvent.on('keydown',this.onKeyDown02,this);
            }else{
                cc.systemEvent.on('keydown',this.onKeyDown01,this);
            }
            
        }
       
        this._gridControl = require('grid-control');
        this._boomMap = require('boom-map');
        
        
    },

    onKeyDown: function(e){
        if(e.keyCode == cc.KEY.space){
            this.dropBoom();
           // this.pDistance();
        }
    },
    onKeyDown01: function(e){
        if(e.keyCode == cc.KEY.j){//双人模式 玩家01  按J 放炸弹
            this.dropBoom();
        }
    },
    onKeyDown02: function(e){
        if(e.keyCode == cc.KEY.enter){//双人模式 玩家02  按enter 放炸弹
            this.dropBoom();
        }
    },
    getChildNum:function(){
        if(this._local.getMode()==1){
            let initboomnum=this._local.getinitBoomNum();
            if(this._local.getboomnum()<initboomnum){//游戏中的炸弹数量小于initboomnum时，返回true 
                return true;
            }else{
                return false;
            }
        }else if((this._local.getMode()==2) && !this.node.getComponent('Double-mode').otherMode){
            let p1boomnum=this._local.getboomnumA();
            if(this.grA.childrenCount<p1boomnum){//游戏中的炸弹数量小于initboomnum时，返回true 
                return true;
            }else{
                return false;
            }
       } else if((this._local.getMode()==2) && this.node.getComponent('Double-mode').otherMode){
        let p2boomnum=this._local.getboomnumB();
        if(this.grB.childrenCount<p2boomnum){//游戏中的炸弹数量小于initboomnum时，返回true 
            return true;
        }else{
            return false;
        }
       }
     
    },
  
    pos:function(){
       let x = Math.floor(this.node.x/60)*60+30;
       let y = Math.floor(this.node.y/60)*60+15;
       var boompos = cc.v2(x,y);
       return boompos;
    },
    //[fix] design the way the cal the grid position and drop the boom in the center of grid
    dropBoom: function(){
       if(!this.getChildNum() ){
           cc.log('***');
            return
       }
       let pos = this._local.getboomposition();
       
        let grid = this._gridControl.getGrid(this.pos());
        if(this._boomMap.isBoomSet(grid)){return;}//判断这个坐标 是否已经放置了炸弹
        this._boomMap.setBoom(grid);
        let boomIdx = Math.floor(Math.random() * this.boomPrefabArray.length);
        let boom = cc.instantiate(this.boomPrefabArray[boomIdx]);
        if(this._local.getMode()==2 && !this.node.getComponent('Double-mode').otherMode){
            this.grA.addChild(boom);
        }else if(this._local.getMode()==2 && this.node.getComponent('Double-mode').otherMode){
            this.grB.addChild(boom);
        }else{
            this.groundPanel.addChild(boom);
        }
        
        this._local.setboomnum(1);//每放置一个炸弹，数量加1
        //[add] set grid position of boom
        //boom.position = this.node.position;
       // boom.position = this._gridControl.getGridPosition(this.node.position);
       //boom.position=this.node.position;
       boom.position=this.pos()
     
        boom.getComponent('boom-control').init();//初始化 炸弹
        boom.zIndex = this.node.zIndex - 1;
    },
    update:function(dt){
        //this.pDistance();
    },
});
