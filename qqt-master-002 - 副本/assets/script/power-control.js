cc.Class({
    extends: cc.Component,

    properties: {
       boomControl: require('boom-control'),
       _gridControl: null,
       _preBoomArray: [],
       state:null,
       _local:null,
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this._gridControl = require('grid-control');
        this._local = require('local');
        this.state = this.boomControl._state;
        this.boomControl.node.on('boom',this.onBoom,this)
    },

    onBoom: function(){
      //  this.getComponent(cc.Sprite).enabled = true;
        //console.log(this._preBoomArray);
        for(let item in this._preBoomArray){
            //console.log(item);
            if(this.checkGrid(this._preBoomArray[item])){
                this._preBoomArray[item].emit('hurt-by-power');
            }
        }
    },

   

    onCollisionEnter: function(other,self){
        let state = this.boomControl._state;
       //let state = this.state;
       if(other.node.group == 'static-wall'){
           this.node.stopAllActions();
           this.node.scaleX =this.node.scaleX - 0.4;
           this.node.parent.width = this.node.parent.width-40 ;
           cc.log( 'this.node.parent.width='+ this.node.parent.width);
       }
       if(other.node.group == 'damage'){
        cc.log('damage');
        other.node.emit('hurt-by-power');
        other.node.removeFromParent();
        }
       
        if(other.node.group == 'static-wall' &&  this.state == 'power-init'){
         /*
          if(this._local.getMode()==2 && this.node.parent.name =='grA'){
           
            if(this.node.scaleX = this._local.getp1power()-0.4){
                return
            }
        }*/
            cc.log('scalex = '+ this.node.scaleX);
           // this.node.scaleX = scaleX - 0.4;
            cc.log('name = '+ this.node.parent.name);
            cc.log('scalex = '+ this.node.scaleX);
            cc.log('other.node.group = '+ other.node.group);
            let otherGrid = this._gridControl.getGrid(other.node.position);
            let selfGrid = this._gridControl.getGrid(this.boomControl.node.position);
            let scaleX = Math.abs(otherGrid.x - selfGrid.x) + Math.abs(otherGrid.y - selfGrid.y);
            if(scaleX <= this.node.scaleX){
                //一帧过后 威力会回退到墙壁前
                cc.log('威力会回退到墙壁前000');
                this.node.scaleX = this.node.scaleX- 0.4;
                this.node.parent.width = this.node.scaleX*60;
            }
        }else if(other.node.group == 'boom' && state == 'time-stamp-init'){
            //一帧过后，所有关联的炮弹会同步爆炸时间
            other.node.emit('time-stamp-sync',this.boomControl._dropTimeStamp);
        }else if(other.node.group == 'player' && state == 'time-stamp-init'){
            //other.node.emit('hurt-by-power');
            other.preBoomIndex = other.node.name;//Date.now();
            this._preBoomArray[other.preBoomIndex] = other.node;
        }else if(other.node.group == 'player' && state == 'booming'){
            
            other.node.emit('hurt-by-power');
            // if(other.preBoomIndex == undefined){
                if(this.checkGrid(other.node)){
                     other.node.emit('hurt-by-power');
                     cc.log('hurt-by-power = '+ other.node.group);
                }
            // }
        }else if(other.node.group == 'damage' && state == 'booming'){
                    cc.log('damage');
                    other.node.removeFromParent();
        }
        
    },

    checkGrid: function(otherNode){
        let otherGrid = this._gridControl.getGrid(otherNode.position);
        let selfGrid = this._gridControl.getGrid(this.boomControl.node.position);
        if(otherGrid.x == selfGrid.x || otherGrid.x == selfGrid.y || otherGrid.y == selfGrid.x || otherGrid.y == selfGrid.y){
            return true;
        }else{
            return false;
        }
    },
    

    onCollisionExit: function(other,self){
        let state = this.boomControl._state;
        if(other.node.group == 'player' && state == 'time-stamp-init'){
            if(other.preBoomIndex != undefined){
                delete this._preBoomArray[other.preBoomIndex];
            }
        }
    },
    update:function(){
        this.node.parent.width = this.node.scaleX*60;
        this.state = this.boomControl._state;
        let state = this.boomControl._state;
      if(  this.state == 'booming'){
       // this.onCollisionEnter();
      }
    },

});
