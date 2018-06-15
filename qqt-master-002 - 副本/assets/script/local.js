let gridWidth = 50; 
let checkpoint = 1; 
let power = 1; 
let Gold =500;//初始金币
let BoomNum=0;//当前游戏中的放置的炸弹数量
let initBoomNum=4;//当前游戏中的最多放置几个炸弹数量
let boomnumB=1;//双人模式中 玩家A 的炸弹数量
let boomnumA=2;//双人模式中 玩家B 的炸弹数量
let PlayerHp=100;//当前游戏中的最多放置几个炸弹数量
let addpower01price=100;
let addBoomNum02price=100;
let addPlayerHp03price=50;
let addplayermoveSpeed04price=50;
let playermoveSpeed=3;
let gamestate='lose';
let ice=0;
let chooseplayer=0; //选择哪一个角色1 or 2
let Mode=1;

let uping=0;
let downing=0;
let lefting=0;
let righting=0;

let isdown = 0;
let movetime=0.5;
let movetodown = 0;
let boomposition = cc.v2;
let p1power = 1;
let p2power = 2;
let die =0;

let getdie = function(position){
   
    return  die;
};
let setdie = function(position){
   
    return  die=position;
};
let getp2power = function(position){
   
    return  p2power;
};
let setp2power = function(position){
   
    return  p2power+=position;
};
let getp1power = function(position){
   
    return  p1power;
};
let setp1power = function(position){
   
    return  p1power+=position;
};
let getboomnumA = function(position){
   
    return  boomnumA;
};
let setboomnumA = function(position){
   
    return  boomnumA+=position;
};
let getboomnumB = function(position){
   
    return  boomnumB;
};
let setboomnumB = function(position){
   
    return  boomnumB+=position;
};
let getboomposition = function(position){
   
    return  boomposition;
};
let setboomposition = function(position){
   
    return  boomposition=position;
};
let getmovetodown = function(position){
   
    return  movetodown;
};
let setmovetodown = function(position){
   
    return  movetodown=position;
};
let getmovetime = function(position){
   
    return  movetime;
};
let setmovetime = function(position){
   
    return  movetime=position;
};
let getisdown = function(position){
   
    return  isdown;
};
let setisdown = function(position){
   
    return  isdown=position;
};
let getrighting = function(position){
   
    return  righting;
};
let setrighting = function(position){
   
    return  righting=position;
};
let getlefting= function(position){
   
    return  lefting;
};
let setlefting= function(position){
   
    return  lefting=position;
};
let getdowning = function(position){
   
    return  downing;
};
let setdowning = function(position){
   
    return  downing=position;
};
let getuping = function(position){
   
    return  uping;
};
let setuping = function(position){
   
    return  uping=position;
};
let getMode = function(position){
   
    return  Mode;
};
let setMode = function(position){
   
    return  Mode=position;
};
let getchooseplayer = function(position){
   
    return  chooseplayer;
};
let setchooseplayer = function(position){
   
    return  chooseplayer=position;
};
let setice = function(position){
   
    return  ice=position;
};
let getice = function(position){
 
    return ice
};
let getgamestate = function(position){
       
    return gamestate
};
let setgamestate = function(position){
       
    return gamestate=position
};
let getplayermoveSpeed = function(position){
       
    return playermoveSpeed
};
let setplayermoveSpeed = function(position){
       
    return playermoveSpeed+=position
};
let getinitBoomNum = function(position){
       
    return initBoomNum
};
let setinitBoomNum = function(position){
       
    return initBoomNum+=position
};
let getState = function(position){
       
        return gridWidth
    };
let setState = function(position){
    gridWidth=position;
    };
let getCheckpointNum = function(position){
        return checkpoint
    };
let setCheckpointNum = function(position){
    checkpoint+=position;
    };
let getpower = function(position){
        return power
    };
let setpower = function(position){
    power+=position;
    };
let getgold = function(position){
        return Gold
    };
let setgold = function(position){
    Gold+=position;
    };
let getboomnum = function(position){
        return BoomNum
    };
let setboomnum = function(position){
    BoomNum+=position;
    };
let getplayerhp = function(position){
        return PlayerHp
    };
let setplayerhp = function(position){
    PlayerHp+=position;
    };
let getaddpower01price = function(position){
        return addpower01price
    };
let setaddpower01price = function(position){
    addpower01price +=position;
    };
let getaddBoomNum02price = function(position){
        return addBoomNum02price
    };
let setaddBoomNum02price = function(position){
    addBoomNum02price+=position;
    };
let getaddPlayerHp03price = function(position){
        return addPlayerHp03price
    };
let setaddPlayerHp03price = function(position){
    addPlayerHp03price+=position;
    };
let getaddplayermoveSpeed04price = function(position){
        return addplayermoveSpeed04price
    };
let setaddplayermoveSpeed04price = function(position){
    addplayermoveSpeed04price+=position;
    };
module.exports = {
    
  
    getdie,
    setdie,
    getp1power,
    setp1power,
    getp2power,
    setp2power,
    getboomnumA,
    setboomnumA,
    getboomnumB,
    setboomnumB,
    getboomposition,
    setboomposition,
    getmovetodown,
    setmovetodown,
    getmovetime,
    setmovetime,
    getisdown, 
    setisdown,
    getrighting,
    setrighting,
    getlefting,
    setlefting,
    getdowning,
    setdowning,
    getuping,
    setuping,
    getMode,
    setMode,
    getchooseplayer,
    setchooseplayer,
    getice,
    setice,
    getgamestate,
    setgamestate,
    getplayermoveSpeed,
    setplayermoveSpeed,
    getaddpower01price,
    setaddpower01price,
    getaddBoomNum02price,
    setaddBoomNum02price,
    getaddPlayerHp03price,
    setaddPlayerHp03price,
    getaddplayermoveSpeed04price,
    setaddplayermoveSpeed04price,
    getplayerhp,
    setplayerhp,
    getinitBoomNum,
    setinitBoomNum,
    getboomnum,
    setboomnum,
    getgold,
    setgold,
    getpower,
    setpower,
    getState,
    setState,
    getCheckpointNum,
    setCheckpointNum,
}
window.D = {
    Audio:null,
}