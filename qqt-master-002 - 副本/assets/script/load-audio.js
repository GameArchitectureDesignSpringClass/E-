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
        bgAudio:{
            default:null, 
            url:cc.AudioClip,
            displayName:"背景音乐", 
            },
      
    down:cc.SpriteFrame,
    open:cc.SpriteFrame,
        state:false,
       _id:null,
       
    Frame:{
        default:null,
        type:cc.Node,
    }
    },
    onLoad:function(){
      
        this.local = require('local');
        var ss=cc.sys.localStorage.getItem("AudioState");
       cc.log(ss);
   if(ss==null || ss==true){  
       this._id= cc.audioEngine.play(this.bgAudio,true);
       this.Frame.getComponent(cc.Sprite).spriteFrame = this.open;
       cc.log('001');
    }
    if( this.local.getState()==1){
        this.Frame.getComponent(cc.Sprite).spriteFrame = this.down;
        cc.log('local01');
        cc.log(this.local.getState());
    }
     if(!ss && ss != null){
        this.Frame.getComponent(cc.Sprite).spriteFrame = this.down;
        cc.log('002');
    }
       cc.audioEngine.setVolume(this._id,0.2);//设置声音大小
   
        this.od();//判断 声音是否开启
  
      
    
    },
    
    od:function(){
       
        this.Frame.on('touchstart',function(){
           
            if(this.Frame.getComponent(cc.Sprite).spriteFrame == this.open ){
                
                    this.Frame.getComponent(cc.Sprite).spriteFrame = this.down;
                    cc.audioEngine.pauseAll();
                    this.state = false;
                    cc.sys.localStorage.setItem("AudioState",this.state );
                    this.local.setState(1);//音效开启  1
                    cc.log('down');
            }else if(this.Frame.getComponent(cc.Sprite).spriteFrame == this.down ){
                
                    this.Frame.getComponent(cc.Sprite).spriteFrame = this.open;
                    cc.audioEngine.resumeAll();
                    this.state = true;
                    cc.sys.localStorage.setItem("AudioState",this.state );
                    this.local.setState(2);//音效关闭  2
                    cc.log('open');
            }
           
        },this)
    },
   
});
